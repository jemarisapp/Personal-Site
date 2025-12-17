/**
 * MAIN WORKFLOW FOR SERVERLESS BOOKING AGENT
 * 
 * This file shows the exact logic flow and variable names used in the email processing handler.
 * Use this for portfolio visualization to match terminal logs.
 */

// ============================================================================
// 1. ENTRY POINT: Webhook Handler
// ============================================================================
// File: api/webhook.ts

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { secret } = req.query;
    if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
        console.warn("Unauthorized webhook attempt");
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const message = req.body?.message;
        if (!message) {
            return res.status(400).json({ error: 'Bad Request: No message found' });
        }

        console.log(`Webhook triggered by messageId: ${message.messageId}`);

        // Main processing entry point
        const results = await processInquiries();

        res.status(200).json({ ok: true, processed: results.length });
    } catch (err) {
        console.error("Error in webhook handler", err);
        res.status(500).json({ error: "Internal error" });
    }
}

// ============================================================================
// 2. MAIN PROCESSING WORKFLOW
// ============================================================================
// File: src/utils/processInquiries.ts

import { listInquiryMessages } from "../gmail/listInquiries";
import { extractMessageBody } from "../gmail/getMessageBody";
import { hasDraftInThread } from "../gmail/checkDrafts";
import { extractInquiry } from "../llm/extractInquiry";
import { checkAvailability } from "../calendar/checkAvailability";
import { draftReply } from "../llm/draftReply";
import { createDraftReply } from "../gmail/createDraft";
import { markEmailProcessed } from "../gmail/labels";

export async function processInquiries() {
  const messages = await listInquiryMessages();
  const results = [];

  for (const msg of messages) {
    if (!msg.id || !msg.threadId) {
      console.warn("Skipping message without id or threadId:", msg);
      continue;
    }

    try {
      console.log(`Processing message: ${msg.id}`);

      // Check for existing drafts (Idempotency)
      const draftExists = await hasDraftInThread(msg.threadId);
      if (draftExists) {
        console.log(`Skipping thread ${msg.threadId} - Draft already exists.`);
        results.push({ id: msg.id, status: 'skipped_draft_exists' });
        continue;
      }

      // Mark as processed immediately to prevent race conditions
      await markEmailProcessed(msg.threadId);
      console.log(`Marked thread ${msg.threadId} as processed (claimed for processing).`);

      // Extract email body
      const body = await extractMessageBody(msg.id);

      // ========================================================================
      // STEP 1: INTENT EXTRACTION (LLM/Gemini)
      // ========================================================================
      const inquiry = await extractInquiry(body);

      // ========================================================================
      // STEP 2: CALENDAR CHECK (Availability)
      // ========================================================================
      let availability = null;
      if (inquiry.preferred_date && inquiry.preferred_time) {
        availability = await checkAvailability(
          inquiry.preferred_date,
          inquiry.preferred_time
        );
      }

      // ========================================================================
      // STEP 3: PRICING LOOKUP (happens inside draftReply)
      // ========================================================================
      // Pricing is filtered from PACKAGES config based on inquiry.session_type
      // See draftReply function below for exact filtering logic

      // ========================================================================
      // STEP 4: DRAFT GENERATION (LLM/Gemini)
      // ========================================================================
      const replyText = await draftReply({
        inquiry,
        availability,
      });

      // Create the draft in Gmail
      await createDraftReply({
        threadId: msg.threadId,
        to: inquiry.email,
        body: replyText,
      });

      await markEmailProcessed(msg.threadId);
      results.push({ id: msg.id, status: 'processed' });
    } catch (error) {
      console.error(`Failed to process message ${msg.id}:`, error);
      results.push({ id: msg.id, status: 'error', error });
    }
  }
  return results;
}

// ============================================================================
// STEP 1 DETAILS: Intent Extraction (LLM)
// ============================================================================
// File: src/llm/extractInquiry.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function extractInquiry(text: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-pro-preview",
    systemInstruction: `...extraction instructions...`
  });

  const result = await model.generateContent(text);
  const response = await result.response;
  let content = response.text() || "{}";
  content = content.replace(/```json\n?|```/g, "").trim();

  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse JSON:", content);
    throw new Error("Invalid JSON response from extraction");
  }
}

// Returns: { name, email, instagram, phone, session_type, preferred_date, 
//            preferred_time, location, notes }

// ============================================================================
// STEP 2 DETAILS: Calendar Check
// ============================================================================
// File: src/calendar/checkAvailability.ts

export async function checkAvailability(
  date: string,      // YYYY-MM-DD format
  time: string,      // HH:MM format
  durationHours: number = 1
): Promise<{ isAvailable: boolean; alternatives: string[] }> {
  const { calendar } = getGoogleClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  
  // Convert date/time strings to Date objects
  const getDateObj = (d: string, t: string) => {
    const [year, month, day] = d.split('-').map(Number);
    const [hour, minute] = t.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute);
  };

  const start = getDateObj(date, time);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

  // Check primary slot
  const primaryRes = await calendar.freebusy.query({
    requestBody: {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      items: [{ id: calendarId }],
    },
  });

  const busy = primaryRes.data.calendars?.[calendarId]?.busy || [];
  
  if (busy.length === 0) {
    return { isAvailable: true, alternatives: [] };
  }

  // If busy, find alternatives (day before, same day, day after at 9am, 11am, 2pm, 4pm)
  // ... alternative finding logic ...
  
  return { isAvailable: false, alternatives };
}

// ============================================================================
// STEP 3 DETAILS: Pricing Lookup
// ============================================================================
// File: src/config/pricing.ts

export const PACKAGES = [
  // Graduation packages, Studio packages, On-Location packages, Prom packages
  // Each has: name, type, price, durationMinutes, edits, includes
];

// Pricing filtering happens inside draftReply():
// - Filter by inquiry.session_type
// - Further filter by inquiry.session_subtype for Prom (solo vs couple)
// - Fallback to general studio/on-location if no match

// ============================================================================
// STEP 4 DETAILS: Draft Generation (LLM)
// ============================================================================
// File: src/llm/draftReply.ts

export async function draftReply({ inquiry, availability }: any) {
  // Filter packages based on session type
  let filteredPackages = PACKAGES.filter(
    p => p.type === (inquiry.session_type || "").toLowerCase()
  );

  // Further filter for Prom if subtype exists
  if (inquiry.session_type === "prom" && inquiry.session_subtype) {
    filteredPackages = filteredPackages.filter(
      p => p.subtype === inquiry.session_subtype.toLowerCase()
    );
  }

  // Fallback to general packages if no match
  if (filteredPackages.length === 0) {
    filteredPackages = PACKAGES.filter(p => 
      ["studio", "on-location"].includes(p.type) && !p.name.toLowerCase().includes("graduation")
    );
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-pro-preview",
    systemInstruction: `...brand voice, policies, FAQ, samples...`
  });

  const prompt = `
    **Context Data:**
    Inquiry: ${JSON.stringify(inquiry)}
    Is Available: ${availability}
    Relevant Packages: ${JSON.stringify(filteredPackages)}
    
    Please draft the email response based on the inquiry above.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text() || "";
}
