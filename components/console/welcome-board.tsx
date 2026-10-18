import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { PROFILE, shelfWork, type Shelf } from '@/lib/work'
import s from './welcome-board.module.css'

// The Welcome tile's board: an introduction that changes with the tab, laid
// out like the console's widget grid. Facts here are the approved ones from
// the case studies and resumes.

type Chip = { label: string; href?: string; tone?: 'accent' }

function Chips({ chips }: { chips: Chip[] }) {
  return (
    <ul className={s.chips}>
      {chips.map((c) => (
        <li key={c.label} data-tone={c.tone}>
          {c.href ? (
            c.href.startsWith('http') ? (
              <a href={c.href} target="_blank" rel="noreferrer">
                {c.label}
              </a>
            ) : (
              <Link href={c.href}>{c.label}</Link>
            )
          ) : (
            <span>{c.label}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function Card({ title, icon, children, span, href, className = '' }: { title?: string; icon?: ReactNode; children: ReactNode; span?: 'tall' | 'wide'; href?: string; className?: string }) {
  const body = (
    <>
      {title && (
        <h3 className={s.cardTitle}>
          {icon && <span className={s.cardIcon}>{icon}</span>}
          {title}
        </h3>
      )}
      {children}
    </>
  )
  return href ? (
    <Link href={href} className={`${s.card} ${s.cardLink} ${className}`} data-span={span}>
      {body}
    </Link>
  ) : (
    <div className={`${s.card} ${className}`} data-span={span}>
      {body}
    </div>
  )
}

const I = {
  user: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 20h16M7 16v-4M12 16V8M17 16v-7" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M14 6l4 4-9 9H5v-4zM16 4l4 4" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />
    </svg>
  ),
  steps: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 6h4v4H4zM10 14h4v4h-4zM16 6h4v4h-4zM8 8h8M12 10v4" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" />
    </svg>
  ),
  brief: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 8h16v11H4zM9 8V5h6v3" />
    </svg>
  ),
}

function Profile({ line, sub }: { line: string; sub: string }) {
  return (
    <Card className={s.profile}>
      <div className={s.profileHead}>
        <Image src="/jemari.webp" alt="" width={72} height={72} className={s.avatar} />
        <div>
          <p className={s.profileName}>{PROFILE.name}</p>
          <p className={s.profileSub}>{sub}</p>
        </div>
      </div>
      <p className={s.profileLine}>{line}</p>
    </Card>
  )
}

function Stats({ title, items }: { title: string; items: { value: string; label: string }[] }) {
  return (
    <Card title={title} icon={I.chart}>
      <dl className={s.stats}>
        {items.map((x) => (
          <div key={x.label}>
            <dt>{x.label}</dt>
            <dd>{x.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}

function Feature({ title, label, sub, href, img, focus }: { title: string; label: string; sub: string; href: string; img: string; focus?: string }) {
  return (
    <Card span="tall" href={href} className={s.feature}>
      <Image src={img} alt="" fill sizes="(min-width: 900px) 30vw, 100vw" className={s.featureImg} style={{ objectPosition: focus }} />
      <span className={s.featureScrim} aria-hidden />
      <span className={s.featureTop}>
        <span className={s.cardIcon}>{I.star}</span>
        {label}
      </span>
      <span className={s.featureText}>
        <b>{title}</b>
        <span>{sub}</span>
      </span>
    </Card>
  )
}

// Brand's Start here card, built from the Colors cover: the cover as a
// record sleeve over a blurred field of its own paint, with the palette.
const COLORS_SWATCHES = ['#e23a46', '#f2c94c', '#5fd9a0', '#3d74c9', '#a8326b']

function ColorsStart() {
  return (
    <Link href="/work/youngboy" className={`${s.card} ${s.cardLink} ${s.colors}`} data-span="tall">
      <Image src="/work/youngboy/releases/colors/cover.webp" alt="" fill sizes="30vw" className={s.colorsField} />
      <span className={s.colorsTop}>
        <span className={s.cardIcon}>{I.star}</span>
        Start here
      </span>
      <span className={s.sleeveWrap} aria-hidden>
        <span className={s.vinyl} />
        <span className={s.sleeve}>
          <Image src="/work/youngboy/releases/colors/cover.webp" alt="" fill sizes="(min-width: 900px) 18vw, 60vw" />
        </span>
      </span>
      <span className={s.colorsText}>
        <b>YoungBoy Never Broke Again</b>
        <span>20+ releases, art directed and designed end to end. This one is Colors.</span>
        <span className={s.swatches} aria-hidden>
          {COLORS_SWATCHES.map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
        </span>
      </span>
    </Link>
  )
}

function Tags({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return (
    <Card title={title} icon={icon}>
      <ul className={s.tags}>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </Card>
  )
}

function Rows({ title, icon, rows }: { title: string; icon: ReactNode; rows: { name: string; note: string; href?: string; tag?: string }[] }) {
  return (
    <Card title={title} icon={icon}>
      <ul className={s.rows}>
        {rows.map((r) => (
          <li key={r.name}>
            <span>
              {r.href ? <Link href={r.href}>{r.name}</Link> : <b>{r.name}</b>}
              {r.tag && <em>{r.tag}</em>}
            </span>
            <small>{r.note}</small>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function Education() {
  return (
    <Card title="Education" icon={I.cap}>
      <ul className={s.rows}>
        <li>
          <span>
            <b>MS, Information Systems</b>
          </span>
          <small>AI for Business Innovation · Georgia State, 2026</small>
        </li>
        <li>
          <span>
            <b>BFA, Graphic Design</b>
          </span>
          <small>Georgia State, 2023</small>
        </li>
      </ul>
    </Card>
  )
}

function Resume({ href, label }: { href: string; label: string }) {
  return (
    <Card title="Resume" icon={I.doc} href={href}>
      <p className={s.cardText}>{label}</p>
      <span className={s.cta}>Open resume →</span>
    </Card>
  )
}

const CLIENT_LOGOS = ['umg', 'motown', 'apg', 'ar', 'cap', 'dj', 'emp', 'ff']

function Clients() {
  return (
    <Card title="Labels and partners" icon={I.brief} span="wide">
      <ul className={s.logos}>
        {CLIENT_LOGOS.map((c) => (
          <li key={c}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/work/trisp-studio/logos/${c}.webp`} alt="" />
          </li>
        ))}
      </ul>
    </Card>
  )
}

function Brand() {
  return (
    <>
      <Profile
        sub="Art director & designer · Atlanta"
        line="I give music and brands a look people remember. Eight years of releases for YoungBoy Never Broke Again, campaigns released through Atlantic Records and Motown, and my own studio since 2016."
      />
      <ColorsStart />
      <Stats
        title="By the numbers"
        items={[
          { value: '20+', label: 'YoungBoy releases' },
          { value: '8 yrs', label: 'of release work' },
          { value: '400+', label: 'client projects' },
          { value: '500M+', label: 'Fast X soundtrack streams' },
        ]}
      />
      <Tags title="What I do" icon={I.tools} items={['Art direction', 'Brand identity', 'Album art', 'Typography', 'Campaigns', 'Motion', 'Websites']} />
      <Clients />
      <Education />
      <Resume href="/resume" label="Designer resume, one page, with a PDF to download." />
    </>
  )
}

function Product() {
  return (
    <>
      <Profile
        sub="AI systems & product · Atlanta"
        line="I design and build AI systems people actually use. AI does the tedious part, and a person approves what matters. I design each system, direct AI coding tools to build it, and run it in production."
      />
      <Feature title="TRISP Studio" label="Start here" sub="A website designed as a system: components, flows and dark mode" href="/work/trisp-studio?from=product" img="/work/trisp-website/home-light.webp" focus="left top" />
      <Stats
        title="In production"
        items={[
          { value: '11', label: 'leagues run on Trilo' },
          { value: '2,152', label: 'Trilo commands since January' },
          { value: '<10 min', label: 'KOA sales workflow, down from hours' },
          { value: '~90%', label: 'less content time on Navigate IDD' },
        ]}
      />
      <Card title="How I work" icon={I.steps}>
        <ol className={s.steps}>
          <li>Find the tedious part people do by hand.</li>
          <li>Design the system: data, triggers, prompts and approval points.</li>
          <li>Build with Claude, Codex and ChatGPT, reviewing what ships.</li>
          <li>Keep facts like prices and availability in code, not the model.</li>
        </ol>
      </Card>
      <Rows
        title="Experience"
        icon={I.brief}
        rows={[
          { name: 'Kampgrounds of America', tag: 'AI engineering intern', note: 'Multi-agent group sales pipeline and review dashboard.', href: '/projects/group-sales-automation' },
          { name: 'Trilo', tag: 'Founder', note: 'AI Discord product for dynasty leagues.', href: '/work/trilo' },
          { name: 'TRISP Studio', tag: 'Founder', note: 'The session system the studio runs on.', href: '/projects/trisp-session-portal' },
        ]}
      />
      <Rows
        title="More systems"
        icon={I.layers}
        rows={[
          { name: 'Navigate IDD', note: 'Policy to multilingual video with expert approval gates.', href: '/work/navigate-idd' },
          { name: 'Nova', tag: 'Retired', note: 'Booking assistant with live calendar slots and a guard against offering times that aren’t open.' },
          { name: 'Email booking agent', note: 'Drafts inquiry replies with real availability in under 30 seconds.' },
          { name: 'Contract generation', note: 'Structured intake to draft contracts for attorney review.', href: '/projects/contract-generation' },
          { name: 'Directing AI', note: 'How I direct AI on design and video work.', href: '/work/directing-ai' },
        ]}
      />
      <Tags title="Stack" icon={I.tools} items={['OpenAI', 'Claude', 'Gemini', 'Pinecone', 'n8n', 'Supabase', 'Postgres', 'TypeScript', 'Python', 'React', 'Next.js', 'Vercel', 'Stripe']} />
      <Education />
      <Resume href="/resume/ai" label="AI systems resume: KOA, Trilo and the systems behind my studio." />
    </>
  )
}

function Motion() {
  return (
    <>
      <Profile
        sub="Motion designer · Atlanta"
        line="Motion for music and entertainment: release teasers, lyric videos, visualizers and campaign systems, from eight years of YoungBoy releases to the Fast X soundtrack rollout."
      />
      <Feature title="Cold December" label="Start here" sub="A kinetic type lyric video for Rod Wave" href="/work/cold-december" img="/work/cold-december/hero.webp" />
      <Stats
        title="By the numbers"
        items={[
          { value: '8 yrs', label: 'of motion for YoungBoy releases' },
          { value: '50+', label: 'assets for the Fast X rollout' },
          { value: '500M+', label: 'Fast X soundtrack streams' },
        ]}
      />
      <Tags title="Tools" icon={I.tools} items={['After Effects', 'Cinema 4D', 'Premiere Pro', 'Blender', 'Expression-driven templates', 'Code-based video']} />
      <Rows
        title="Systems, not one-offs"
        icon={I.layers}
        rows={[
          { name: 'Template systems', note: 'Expression-driven After Effects templates and batch rendering for whole rollouts.' },
          { name: 'Video as code', note: 'Explainers and promos written as code and timed to the narration.', href: '/work/directing-ai' },
        ]}
      />
      <Education />
      <Resume href="/resume" label="Designer resume, one page, with a PDF to download." />
    </>
  )
}

const BOARDS: Record<Shelf, { chips: Chip[]; body: () => ReactNode }> = {
  brand: {
    chips: [
      { label: 'Based in Atlanta, GA' },
      { label: 'About me', href: '/about' },
      { label: 'Resume', href: '/resume' },
      { label: 'Get in touch', href: '/contact', tone: 'accent' },
    ],
    body: Brand,
  },
  product: {
    chips: [
      { label: 'MS, Information Systems · AI for Business' },
      { label: 'AI systems resume', href: '/resume/ai' },
      { label: 'GitHub', href: PROFILE.github },
      { label: 'Get in touch', href: '/contact', tone: 'accent' },
    ],
    body: Product,
  },
  motion: {
    chips: [
      { label: 'Based in Atlanta, GA' },
      { label: 'About me', href: '/about' },
      { label: 'Resume', href: '/resume' },
      { label: 'Get in touch', href: '/contact', tone: 'accent' },
    ],
    body: Motion,
  },
}

export function WelcomeBoard({ shelf }: { shelf: Shelf }) {
  const board = BOARDS[shelf]
  const Body = board.body
  const work = shelfWork(shelf).slice(0, 4)
  return (
    <div className={s.board}>
      <Chips chips={board.chips} />
      <div className={s.grid}>
        <Body />
      </div>
      <section className={s.news} aria-label="Projects">
        <h2>Projects</h2>
        <ul>
          {work.map((w) => (
            <li key={w.slug}>
              <Link href={w.shelf === shelf ? `/work/${w.slug}` : `/work/${w.slug}?from=${shelf}`}>
                <span className={s.newsImg}>
                  <Image src={w.hero} alt="" fill sizes="(min-width: 900px) 24vw, 50vw" style={{ objectPosition: w.heroMode === 'framed' ? 'left top' : w.focus }} />
                </span>
                <b>{w.title}</b>
                <span>{w.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
