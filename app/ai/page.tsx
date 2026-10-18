import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteBar } from '@/components/case/site-bar'
import { PROFILE } from '@/lib/work'
import s from './ai.module.css'

// The front door for AI, automation, product and solutions roles. The same
// work as the design shelves, framed by architecture, stack and results.
export const metadata: Metadata = {
  title: 'AI systems',
  description:
    'AI systems and automation by Jemari Sapp: multi-agent pipelines, retrieval-grounded content, AI assistants and the products around them.',
  alternates: { canonical: '/ai' },
}

type Step = { label: string; human?: boolean }

type System = {
  name: string
  status: string
  line: string
  problem: string
  flow: Step[]
  stack: string[]
  role: string
  results: string[]
  href?: string
  linkLabel?: string
  image?: { src: string; w: number; h: number; alt: string }
}

const FEATURED: System[] = [
  {
    name: 'Multi-agent group sales automation',
    status: 'Kampgrounds of America · AI engineering internship',
    line: 'A multi-agent pipeline that finds group sales leads, qualifies and scores them, checks availability and drafts outreach for a sales manager to approve.',
    problem: 'Each lead took hours of manual searching, routing, availability checks and email drafting before anyone could act on it.',
    flow: [
      { label: 'Discover events' },
      { label: 'Qualify' },
      { label: 'Check availability' },
      { label: 'Score' },
      { label: 'Draft outreach' },
      { label: 'Manager approves', human: true },
    ],
    stack: ['Airia agents', 'Supabase', 'React', 'TypeScript', 'Server-side API routes'],
    role: 'Built the review dashboard and pipeline monitoring, connected it to Supabase, and moved agent execution behind server routes to protect API keys.',
    results: ['A manual workflow cut from hours to under 10 minutes, with final review kept in human hands.'],
    href: '/projects/group-sales-automation',
    linkLabel: 'Read the case study',
  },
  {
    name: 'Navigate IDD',
    status: 'Team project · led AI systems design',
    line: 'Turns Medicaid waiver policy into multilingual explainer videos, with every script grounded in the official documents and approved by an expert.',
    problem: 'Families need clear answers about disability services, but the policy is dense, mostly in English, and videos were slow to make and quick to go out of date.',
    flow: [
      { label: 'Embed policy in Pinecone' },
      { label: 'Draft from retrieved sections' },
      { label: 'Expert approves', human: true },
      { label: 'Translate' },
      { label: 'Generate avatar video' },
      { label: 'Approve and publish', human: true },
    ],
    stack: ['n8n', 'OpenAI', 'Claude', 'Pinecone', 'Google Sheets as control panel', 'Synthesia', 'Blotato'],
    role: 'Designed the system: retrieval rules, prompts, the approval gates and the spreadsheet control panel across seven connected workflows.',
    results: ['Content creation time cut by about 90%.', 'Videos in five languages.', 'Every script traceable to verified policy text.'],
    href: '/work/navigate-idd',
    linkLabel: 'Explore the pipeline',
    image: { src: '/work/navigate-idd/hero.webp', w: 1920, h: 1080, alt: 'Navigate IDD explainer video' },
  },
  {
    name: 'Trilo',
    status: 'My product · in production',
    line: 'A Discord bot that runs College Football and Madden dynasty leagues: it reads schedule screenshots with AI vision, creates every matchup channel and tracks results.',
    problem: 'Volunteer commissioners spend hours every week on setup and tracking, and leagues fold when they burn out.',
    flow: [
      { label: 'Screenshot uploaded' },
      { label: 'AI vision reads matchups' },
      { label: 'Commissioner confirms', human: true },
      { label: 'Channels and players tagged' },
      { label: 'Results tracked by reaction' },
    ],
    stack: ['Python', 'discord.py', 'OpenAI vision', 'Supabase / Postgres', 'Stripe', 'Railway'],
    role: 'Founder. Designed the product, pricing and licensing, led a normalized v2 data model, and built it with AI coding tools.',
    results: ['11 leagues and 133 players.', '2,152 commands run since January.', '97% of commands complete without an error.'],
    href: '/work/trilo',
    linkLabel: 'See the product',
    image: { src: '/work/trilo-app/hero.webp', w: 2400, h: 1500, alt: 'Trilo app concept screens' },
  },
  {
    name: 'TRISP session system',
    status: 'My studio · in production',
    line: 'The system my photography studio runs on: every client session moves through six stages with automatic emails, and ChatGPT sets new sessions up from my calendar.',
    problem: 'Every session meant repeated follow-ups about status, locations, galleries, favorites and delivery dates.',
    flow: [
      { label: 'Ask ChatGPT to set up a session' },
      { label: 'Finds it on Google Calendar' },
      { label: 'Creates the Supabase record' },
      { label: 'Client portal link sent' },
      { label: 'Emails at each stage' },
    ],
    stack: ['React', 'Supabase', 'Vercel serverless', 'Resend', 'ChatGPT with Supabase and Calendar connectors', 'Codex'],
    role: 'Designed the workflow, data model and interfaces, and built it with Codex as my development team.',
    results: ['Every session since April has run through it.', 'About an hour of admin saved per client, by my estimate.'],
    href: '/projects/trisp-session-portal',
    linkLabel: 'Read the case study',
    image: { src: '/work/directing-ai/system-grid.webp', w: 2000, h: 1245, alt: 'Frames from the session system explainer video' },
  },
]

const MORE: System[] = [
  {
    name: 'Nova',
    status: 'Retired',
    line: 'An AI booking assistant that answered questions on trispstudio.com and offered real open times from my calendar.',
    problem: '',
    flow: [
      { label: 'Visitor asks' },
      { label: 'Pinecone knowledge base' },
      { label: 'Live calendar slots' },
      { label: 'Slot guard checks the reply' },
      { label: 'Logged to Notion, email alert' },
    ],
    stack: ['OpenAI', 'Pinecone', 'Google Calendar', 'Notion', 'Resend', 'Vercel serverless'],
    role: 'Started on Langflow, then rebuilt natively. A guard compares every reply against real open slots and rewrites any time that isn’t actually free.',
    results: [],
  },
  {
    name: 'Email booking agent',
    status: 'TRISP Studio',
    line: 'Reads photography inquiries as they arrive and drafts a reply with real availability, ready for one-click approval.',
    problem: '',
    flow: [
      { label: 'Gmail push event' },
      { label: 'Claim thread with a label' },
      { label: 'Gemini extracts the request' },
      { label: 'Calendar and pricing from code' },
      { label: 'Draft for approval', human: true },
    ],
    stack: ['TypeScript', 'Vercel serverless', 'Gmail API', 'Google Pub/Sub', 'Gemini'],
    role: 'Prices and policies live in code, not in the prompt, so the model handles tone while facts stay fixed. Gmail labels act as the state machine, so no database is needed.',
    results: ['Replies drafted in under 30 seconds instead of 15 to 20 minutes.', 'About $27 a month to run, down from about $70 on a no-code platform.'],
  },
  {
    name: 'AI-assisted contract generation',
    status: 'Legal operations',
    line: 'Turns structured client intake into jurisdiction-appropriate draft contracts for an attorney to review and approve.',
    problem: '',
    flow: [{ label: 'Normalize intake' }, { label: 'Assemble prompts and templates' }, { label: 'Generate first draft' }, { label: 'Attorney reviews', human: true }],
    stack: ['LLMs', 'Structured outputs', 'Prompt engineering', 'Workflow automation'],
    role: 'Designed the workflow, prompts and integration, with attorney control over every final document.',
    results: [],
    href: '/projects/contract-generation',
    linkLabel: 'Read the case study',
  },
  {
    name: 'Code-based video toolkit',
    status: 'TRISP Studio',
    line: 'Explainers, promos and re-cuts written as code: scenes are web pages rendered frame by frame, timed to narration word by word, with music synthesized in code.',
    problem: '',
    flow: [{ label: 'Brief and reference' }, { label: 'Style guide and shot list' }, { label: 'Approve the plan', human: true }, { label: 'Render as code' }, { label: 'Review frames', human: true }],
    stack: ['Python', 'Playwright', 'FFmpeg', 'faster-whisper', 'Claude skills'],
    role: 'Designed the system and its approval gates, and packaged it as five reusable Claude skills.',
    results: [],
    href: '/work/directing-ai',
    linkLabel: 'See how I direct AI',
  },
]

const STACK = [
  { group: 'AI', items: ['OpenAI', 'Claude', 'Gemini', 'RAG with Pinecone', 'Multi-agent workflows', 'Structured outputs', 'n8n', 'Airia', 'Langflow'] },
  { group: 'Backend & data', items: ['Supabase / Postgres', 'Data modeling', 'Vercel serverless', 'Railway', 'Python', 'TypeScript'] },
  { group: 'Integrations', items: ['Google Workspace APIs', 'Gmail and Pub/Sub', 'Stripe', 'Discord', 'Notion', 'Resend', 'Synthesia'] },
  { group: 'Product & front end', items: ['React', 'Next.js', 'Product design', 'Design systems', 'Figma'] },
]

const METHOD = [
  { title: 'Find the tedious part', text: 'Start from the work people already do by hand, and what it costs them each week.' },
  { title: 'Design the system', text: 'Data model, triggers, prompts and the points where a person has to approve.' },
  { title: 'Build with AI', text: 'Direct Claude, Codex and ChatGPT as the development team, reviewing what they produce.' },
  { title: 'Keep facts out of the model', text: 'Prices, policies and availability come from code and real data. The model handles language.' },
]

function Flow({ steps }: { steps: Step[] }) {
  return (
    <ol className={s.flow}>
      {steps.map((x) => (
        <li key={x.label} data-human={x.human ?? false}>
          {x.human && (
            <span className={s.person} aria-hidden>
              ●
            </span>
          )}
          {x.label}
        </li>
      ))}
    </ol>
  )
}

function Featured({ sys }: { sys: System }) {
  return (
    <article className={s.system} data-art={!!sys.image}>
      <div className={s.systemText}>
        <p className={s.status}>{sys.status}</p>
        <h3>{sys.name}</h3>
        <p className={s.line}>{sys.line}</p>
        <p className={s.problem}>
          <b>The problem.</b> {sys.problem}
        </p>
        <Flow steps={sys.flow} />
        <dl className={s.meta}>
          <div>
            <dt>My role</dt>
            <dd>{sys.role}</dd>
          </div>
          <div>
            <dt>Results</dt>
            <dd>
              <ul>
                {sys.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <ul className={s.stack} aria-label="Stack">
          {sys.stack.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        {sys.href && (
          <Link href={sys.href} className={s.more}>
            {sys.linkLabel} →
          </Link>
        )}
      </div>
      {sys.image && (
        <div className={s.systemArt}>
          <Image src={sys.image.src} alt={sys.image.alt} width={sys.image.w} height={sys.image.h} sizes="(min-width: 900px) 40vw, 100vw" />
        </div>
      )}
    </article>
  )
}

export default function AiPage() {
  return (
    <div className={s.page}>
      <SiteBar />
      <main>
        <header className={s.hero}>
          <p className={s.kicker}>AI systems & automation</p>
          <h1>I design and build AI systems people actually use.</h1>
          <p className={s.lede}>
            I’m Jemari Sapp, based in Atlanta, with an MS in Information Systems focused on AI for Business Innovation from
            Georgia State. I turn slow, manual work into systems where AI does the tedious part and a person approves what
            matters. I design each system, direct AI coding tools to build it, and run it in production.
          </p>
          <div className={s.ctas}>
            <Link href="/resume/ai" className={s.primary}>
              View resume
            </Link>
            <a href={`mailto:${PROFILE.email}`} className={s.secondary}>
              {PROFILE.email}
            </a>
            <a href={PROFILE.linkedin} className={s.secondary}>
              LinkedIn
            </a>
            <a href={PROFILE.github} className={s.secondary}>
              GitHub
            </a>
          </div>
        </header>

        <section className={s.method} aria-labelledby="method">
          <h2 id="method">How I work</h2>
          <ol>
            {METHOD.map((m, i) => (
              <li key={m.title}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <b>{m.title}</b>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.systems} aria-labelledby="systems">
          <h2 id="systems">Systems</h2>
          <p className={s.legend}>
            <span className={s.person} aria-hidden>
              ●
            </span>{' '}
            marks where a person approves before anything moves on.
          </p>
          {FEATURED.map((x) => (
            <Featured key={x.name} sys={x} />
          ))}
        </section>

        <section className={s.moreSystems} aria-labelledby="more">
          <h2 id="more">More systems</h2>
          <div className={s.cards}>
            {MORE.map((x) => (
              <article key={x.name} className={s.card}>
                <p className={s.status}>{x.status}</p>
                <h3>{x.name}</h3>
                <p className={s.line}>{x.line}</p>
                <Flow steps={x.flow} />
                <p className={s.cardRole}>{x.role}</p>
                {x.results.length > 0 && (
                  <ul className={s.cardResults}>
                    {x.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}
                <ul className={s.stack} aria-label="Stack">
                  {x.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {x.href && (
                  <Link href={x.href} className={s.more}>
                    {x.linkLabel} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className={s.stackSection} aria-labelledby="stack">
          <h2 id="stack">Stack</h2>
          <div className={s.stackGrid}>
            {STACK.map((g) => (
              <div key={g.group}>
                <h3>{g.group}</h3>
                <ul className={s.stack}>
                  {g.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={s.edu} aria-labelledby="edu">
          <h2 id="edu">Education</h2>
          <div className={s.eduGrid}>
            <div>
              <b>MS, Information Systems</b>
              <span>AI for Business Innovation · Georgia State University, 2026</span>
            </div>
            <div>
              <b>BFA, Graphic Design</b>
              <span>Georgia State University, 2023</span>
            </div>
          </div>
          <p className={s.design}>
            I’m also a designer and art director. If you want to see that side,{' '}
            <Link href="/home">the design portfolio is here</Link>.
          </p>
        </section>
      </main>
    </div>
  )
}
