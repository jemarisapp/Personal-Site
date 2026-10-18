'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import s from './pipeline.module.css'

// The Navigate IDD system as built in n8n: seven workflows joined by one
// Google Sheet. Steps are simplified from the exported workflow (setup and
// formatting nodes folded together), but the order, tools and rules are real.

type Kind = 'trigger' | 'agent' | 'model' | 'vector' | 'doc' | 'sheet' | 'logic' | 'api' | 'loop' | 'drive'

type Step = {
  label: string
  kind: Kind
  sub?: { label: string; kind: Kind }[]
  outs?: { label: string; off?: boolean }[]
}

type Stage = {
  id: string
  label: string
  title: string
  trigger: string
  rows: { label?: string; steps: Step[] }[]
  rules: string[]
  output: string
  shots: { src: string; alt: string }[]
  gate?: boolean
}

const KIND_LABEL: Record<Kind, string> = {
  trigger: 'Trigger',
  agent: 'AI agent',
  model: 'Model',
  vector: 'Vector store',
  doc: 'Google Docs',
  sheet: 'Google Sheets',
  logic: 'Logic',
  api: 'API',
  loop: 'Loop',
  drive: 'Google Drive',
}

const STAGES: Stage[] = [
  {
    id: 'library',
    label: 'Library',
    title: 'Build the policy library',
    trigger: 'A refresh from the dashboard',
    rows: [
      {
        steps: [
          { label: 'Refresh request', kind: 'trigger' },
          { label: 'Count stored vectors', kind: 'api' },
          { label: 'Empty?', kind: 'logic', outs: [{ label: 'Yes: load' }, { label: 'No: clear first' }] },
          { label: 'List waiver documents', kind: 'drive' },
          { label: 'For each document', kind: 'loop' },
          { label: 'Download', kind: 'drive' },
          {
            label: 'Store in Pinecone',
            kind: 'vector',
            sub: [
              { label: 'OpenAI embeddings', kind: 'model' },
              { label: 'Text extraction', kind: 'model' },
            ],
          },
          { label: 'Log to dashboard', kind: 'sheet' },
        ],
      },
    ],
    rules: [
      'The library is rebuilt from scratch on every refresh, so retired policy can’t linger.',
      'Only official waiver documents from one Drive folder go in.',
    ],
    output: 'A searchable index of the waiver documents, the only source scripts are allowed to use.',
    shots: [
      { src: '/navigate-idd/pinecone-vector-store-management.avif', alt: 'The n8n workflow that loads documents into Pinecone' },
      { src: '/navigate-idd/knowledge-layer.avif', alt: 'The Pinecone index of Medicaid waiver content' },
    ],
  },
  {
    id: 'draft',
    label: 'Draft',
    title: 'Draft a script from policy',
    trigger: 'A topic file lands in the Short or Long folder',
    rows: [
      {
        steps: [
          { label: 'New topic file', kind: 'trigger' },
          { label: 'Read the file', kind: 'vector', sub: [{ label: 'Embeddings', kind: 'model' }] },
          {
            label: 'Topic analyzer',
            kind: 'agent',
            sub: [
              { label: 'GPT-4', kind: 'model' },
              { label: 'Structured output: name, summary, confidence', kind: 'logic' },
            ],
          },
          {
            label: 'Script generator',
            kind: 'agent',
            sub: [
              { label: 'GPT-4.1 short · Claude long', kind: 'model' },
              { label: 'Pinecone search tool, top 7', kind: 'vector' },
            ],
          },
          { label: 'Create Google Doc', kind: 'doc' },
          { label: 'Add to dashboard', kind: 'sheet' },
        ],
      },
    ],
    rules: [
      'Use only what the Pinecone search returns. No general knowledge.',
      'Long scripts must run 8 to 12 separate searches before writing.',
      'Plain language for a non-technical parent, with every acronym defined.',
      'Every script ends by pointing viewers to a qualified professional.',
    ],
    output: 'A 1 to 1.5 minute or 3 minute script as a Google Doc, waiting on the dashboard for review.',
    shots: [
      { src: '/navigate-idd/retrieval-augmented-script-generation.avif', alt: 'The n8n script generation workflow' },
      { src: '/navigate-idd/english-document-creation.avif', alt: 'The n8n workflow that writes scripts to Google Docs' },
    ],
  },
  {
    id: 'review',
    label: 'Review',
    title: 'A person approves every step',
    trigger: 'An expert edits the dashboard',
    gate: true,
    rows: [
      {
        steps: [
          { label: 'Dashboard edited', kind: 'trigger' },
          {
            label: 'Which column changed?',
            kind: 'logic',
            outs: [{ label: 'Translate To → Translate' }, { label: 'Video status: Approved → Produce' }, { label: 'Social status: Approved → Publish' }],
          },
        ],
      },
    ],
    rules: [
      'Nothing moves forward on its own. Each stage starts only when a person changes a status.',
      'The spreadsheet is the control panel, so reviewers never touch the automation.',
      'Rejected scripts simply stop here.',
    ],
    output: 'An approval that sends the script on to translation, video or publishing.',
    shots: [
      { src: '/navigate-idd/human-review-and-approval.avif', alt: 'The script approval dashboard in Google Sheets' },
      { src: '/navigate-idd/real-time-dashboard-oversight.avif', alt: 'The approval and publication dashboard' },
    ],
  },
  {
    id: 'translate',
    label: 'Translate',
    title: 'Translate the approved script',
    trigger: 'A reviewer picks a language',
    rows: [
      {
        steps: [
          { label: 'Language chosen', kind: 'trigger' },
          { label: 'Get approved English script', kind: 'doc' },
          { label: 'Translator', kind: 'agent', sub: [{ label: 'OpenAI chat model', kind: 'model' }] },
          { label: 'Create translated Doc', kind: 'doc' },
          { label: 'Add to dashboard', kind: 'sheet' },
        ],
      },
    ],
    rules: [
      'Keep the tone, structure and paragraph breaks of the original.',
      'Keep medical and program terms accurate, and explain acronyms in the target language.',
      'Natural and conversational, at a sixth-grade reading level, not word for word.',
    ],
    output: 'A new script row in Spanish, Chinese, Korean or Vietnamese, which goes back through review.',
    shots: [{ src: '/navigate-idd/ai-script-translation.avif', alt: 'The n8n translation workflow' }],
  },
  {
    id: 'produce',
    label: 'Produce',
    title: 'Produce the video',
    trigger: 'A reviewer approves the script for video',
    rows: [
      {
        label: 'Start the video',
        steps: [
          { label: 'Video approved', kind: 'trigger' },
          { label: 'Get the script', kind: 'doc' },
          {
            label: 'Route by language',
            kind: 'logic',
            outs: [{ label: 'English' }, { label: 'Spanish' }, { label: 'Chinese' }, { label: 'Korean' }, { label: 'Vietnamese' }],
          },
          { label: 'Request avatar video', kind: 'api', sub: [{ label: 'Synthesia', kind: 'api' }] },
          { label: 'Status: Generating', kind: 'sheet' },
        ],
      },
      {
        label: 'Every 10 minutes',
        steps: [
          { label: 'Timer', kind: 'trigger' },
          { label: 'Find generating videos', kind: 'sheet' },
          { label: 'For each video', kind: 'loop' },
          { label: 'Ask Synthesia for status', kind: 'api' },
          { label: 'Complete?', kind: 'logic', outs: [{ label: 'Yes: continue' }, { label: 'No: check again later' }] },
          { label: 'Save to Drive', kind: 'drive' },
          { label: 'Mark complete', kind: 'sheet' },
        ],
      },
    ],
    rules: ['Each language has its own Synthesia request and avatar setup.', 'Finished videos are saved to Drive before anything is published.'],
    output: 'A finished explainer video in Drive, marked complete on the dashboard.',
    shots: [{ src: '/navigate-idd/video-generation.avif', alt: 'The n8n video generation workflow' }],
  },
  {
    id: 'publish',
    label: 'Publish',
    title: 'Publish with ready-made metadata',
    trigger: 'A reviewer approves the video for social',
    rows: [
      {
        steps: [
          { label: 'Social approved', kind: 'trigger' },
          { label: 'Download video and script', kind: 'drive' },
          {
            label: 'Metadata writer',
            kind: 'agent',
            sub: [
              { label: 'GPT-4', kind: 'model' },
              { label: 'Structured output: title, description, tags', kind: 'logic' },
            ],
          },
          { label: 'Upload', kind: 'api', sub: [{ label: 'Blotato', kind: 'api' }] },
          {
            label: 'Post',
            kind: 'api',
            outs: [
              { label: 'YouTube' },
              { label: 'Facebook' },
              { label: 'TikTok', off: true },
              { label: 'Instagram', off: true },
              { label: 'LinkedIn', off: true },
              { label: '+4 more', off: true },
            ],
          },
          { label: 'Mark published', kind: 'sheet' },
        ],
      },
    ],
    rules: ['Titles under 60 characters, descriptions under 400.', '8 to 12 tags focused on healthcare accessibility.', 'Seven more platforms are wired in but switched off for now.'],
    output: 'A published video with its title, description and tags, logged on the dashboard.',
    shots: [{ src: '/navigate-idd/social-media-upload.avif', alt: 'The n8n publishing workflow' }],
  },
]

function KindIcon({ kind }: { kind: Kind }) {
  const paths: Record<Kind, string> = {
    trigger: 'M13 2 4 14h7l-1 8 9-12h-7z',
    agent: 'M12 3a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V7a4 4 0 0 1 4-4z',
    model: 'M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z',
    vector: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
    sheet: 'M4 4h16v16H4zM4 10h16M4 15h16M10 4v16',
    logic: 'M6 4v6a4 4 0 0 0 4 4h8M14 10l4 4-4 4M6 20v-2',
    api: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14',
    loop: 'M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4',
    drive: 'M8 3h8l6 10-4 7H6l-4-7zM2 13h20M8 3l6 10',
  }
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      <path d={paths[kind]} />
    </svg>
  )
}

export function NiddPipeline() {
  const [i, setI] = useState(0)
  const [real, setReal] = useState(false)
  const [running, setRunning] = useState(-1)
  const timer = useRef<number | undefined>(undefined)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const stage = STAGES[i]
  const total = stage.rows.reduce((n, r) => n + r.steps.length, 0)

  useEffect(() => () => window.clearInterval(timer.current), [])

  const pick = (n: number) => {
    window.clearInterval(timer.current)
    setRunning(-1)
    setReal(false)
    setI(n)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (i + step + STAGES.length) % STAGES.length
    pick(next)
    tabs.current[next]?.focus()
  }

  // Walk a highlight through the steps in order, like a run in n8n.
  const run = () => {
    window.clearInterval(timer.current)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRunning(total)
      return
    }
    setRunning(0)
    timer.current = window.setInterval(() => {
      setRunning((r) => {
        if (r >= total) {
          window.clearInterval(timer.current)
          return r
        }
        return r + 1
      })
    }, 420)
  }

  let n = -1
  return (
    <div className={s.pipeline}>
      <div className={s.rail} role="tablist" aria-label="Pipeline stage" onKeyDown={onKeyDown}>
        {STAGES.map((x, j) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[j] = el
            }}
            type="button"
            role="tab"
            id={`nidd-tab-${x.id}`}
            aria-selected={i === j}
            aria-controls="nidd-stage"
            tabIndex={i === j ? 0 : -1}
            data-gate={x.gate ?? false}
            onClick={() => pick(j)}
          >
            <span className={s.railNum}>{j + 1}</span>
            {x.label}
          </button>
        ))}
      </div>

      <div className={s.stage} id="nidd-stage" role="tabpanel" aria-labelledby={`nidd-tab-${stage.id}`}>
        <div className={s.stageHead}>
          <div>
            <h3>{stage.title}</h3>
            <p>
              <b>Starts when</b> {stage.trigger.toLowerCase()}.
            </p>
          </div>
          <div className={s.actions}>
            {!real && (
              <button type="button" onClick={run}>
                ▶ Run it
              </button>
            )}
            <button type="button" aria-pressed={real} onClick={() => setReal((r) => !r)}>
              {real ? 'Back to the diagram' : 'See the real n8n workflow'}
            </button>
          </div>
        </div>

        {real ? (
          <div className={s.shots}>
            {stage.shots.map((x) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={x.src} src={x.src} alt={x.alt} loading="lazy" />
            ))}
          </div>
        ) : (
          <div className={s.graph}>
            {stage.rows.map((row, r) => (
              <div key={r} className={s.row}>
                {row.label && <p className={s.rowLabel}>{row.label}</p>}
                <ol className={s.steps}>
                  {row.steps.map((st) => {
                    n += 1
                    const lit = running >= 0 && n <= running
                    const now = running === n
                    return (
                      <li key={st.label} className={s.step} data-kind={st.kind} data-lit={lit} data-now={now}>
                        <div className={s.node}>
                          <span className={s.icon}>
                            <KindIcon kind={st.kind} />
                          </span>
                          <span className={s.nodeText}>
                            <small>{KIND_LABEL[st.kind]}</small>
                            <b>{st.label}</b>
                          </span>
                        </div>
                        {st.outs && (
                          <ul className={s.outs}>
                            {st.outs.map((o) => (
                              <li key={o.label} data-off={o.off ?? false}>
                                {o.label}
                              </li>
                            ))}
                          </ul>
                        )}
                        {st.sub && (
                          <ul className={s.subs}>
                            {st.sub.map((x) => (
                              <li key={x.label} data-kind={x.kind}>
                                <KindIcon kind={x.kind} />
                                {x.label}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ol>
              </div>
            ))}
          </div>
        )}

        <div className={s.facts}>
          <div>
            <p className={s.factLabel}>{stage.gate ? 'How the gate works' : 'Rules the AI follows'}</p>
            <ul>
              {stage.rules.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className={s.factLabel}>What comes out</p>
            <p className={s.output}>{stage.output}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
