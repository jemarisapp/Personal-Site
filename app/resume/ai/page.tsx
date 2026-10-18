import type { Metadata } from 'next'
import { ResumeView, type ResumeData } from '../resume-view'

export const metadata: Metadata = {
  title: 'Resume · AI systems',
  description: 'Resume of Jemari Sapp, AI systems and automation: multi-agent pipelines, retrieval-grounded content and AI products in production.',
  alternates: { canonical: '/resume/ai' },
}

const AI: ResumeData = {
  label: 'AI systems resume',
  pdf: '/jemari-sapp-resume-ai.pdf',
  switchTo: { href: '/resume', label: 'Designer version' },
  title: 'AI systems, automation & product',
  summary:
    'I design and build AI systems that take slow, manual work off people’s plates while keeping a person in charge of what ships. I run my own products and studio systems in production, direct AI coding tools to build them, and bring a designer’s eye to how people use them. MS in Information Systems, AI for Business Innovation.',
  experience: [
    {
      org: 'Kampgrounds of America',
      role: 'AI Engineering Intern',
      when: 'Mar – May 2026',
      points: [
        'Built the React dashboard where operators monitor and step into a live multi-agent sales pipeline covering lead discovery, qualification, availability, scoring, and outreach.',
        'Automated a manual group sales workflow from hours to under 10 minutes, with final approval kept with the sales manager.',
        'Connected the dashboard to Supabase and moved agent execution behind server-side routes to protect API keys.',
      ],
    },
    {
      org: 'Trilo',
      role: 'Founder & Product Lead',
      when: '2024 – Present',
      points: [
        'Built an AI Discord product for College Football and Madden dynasty leagues that reads schedule screenshots with vision AI and creates every matchup channel after the commissioner confirms.',
        'Runs 11 leagues and 133 players, with 2,152 commands since January and 97% completing without an error.',
        'Led a normalized v2 Postgres data model and shipped Stripe subscriptions with per-server license activation.',
      ],
    },
    {
      org: 'TRISP Studio',
      role: 'Founder',
      when: '2016 – Present',
      points: [
        'Built the studio’s session system on React, Supabase, Vercel, and Resend, with ChatGPT creating sessions from Google Calendar. Every session since April runs through it.',
        'Built Nova, an AI booking assistant with Pinecone retrieval, live calendar availability, and a guard against offering times that aren’t open, and an email agent that drafts inquiry replies in under 30 seconds.',
        'Creative director for campaigns released through Atlantic Records and Motown, and art director for YoungBoy Never Broke Again releases from 2018 to 2026.',
      ],
    },
  ],
  projects: [
    { name: 'Navigate IDD', note: 'Led AI systems design for an n8n, Pinecone, GPT, and Claude pipeline that turns Medicaid policy into multilingual videos with expert approval gates, cutting content time by about 90%.' },
    { name: 'Contract generation', note: 'An AI workflow that turns structured intake into draft contracts for attorney review.' },
    { name: 'Video toolkit', note: 'Code-based video production with Python, Playwright, and FFmpeg, packaged as five reusable Claude skills.' },
  ],
  skills: [
    { group: 'AI', items: ['RAG with Pinecone', 'Multi-agent workflows', 'Structured outputs', 'Prompt design', 'OpenAI', 'Claude', 'Gemini', 'n8n'] },
    { group: 'Build', items: ['TypeScript', 'Python', 'React & Next.js', 'Supabase / Postgres', 'Vercel serverless', 'Stripe'] },
    { group: 'Integrations', items: ['Google Workspace APIs', 'Gmail & Pub/Sub', 'Discord', 'Notion', 'Resend'] },
    { group: 'Also', items: ['Product design', 'Design systems', 'Art direction', 'Motion'] },
  ],
}

export default function ResumeAi() {
  return <ResumeView data={AI} />
}
