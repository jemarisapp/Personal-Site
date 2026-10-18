'use client'

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { fraunces, inter } from './fonts'
import s from './trisp-ui.module.css'

type Theme = 'light' | 'dark'

// Arrow keys move through a set of radio-style buttons and pick as they go.
function useRovingKeys(count: number, index: number, set: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (index + step + count) % count
    set(next)
    refs.current[next]?.focus()
  }
  return { refs, onKeyDown }
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  const i = options.findIndex((o) => o.id === value)
  const { refs, onKeyDown } = useRovingKeys(options.length, i, (n) => onChange(options[n].id))
  return (
    <div className={s.segmented} role="radiogroup" aria-label={label} onKeyDown={onKeyDown}>
      {options.map((o, j) => (
        <button
          key={o.id}
          ref={(el) => {
            refs.current[j] = el
          }}
          type="button"
          role="radio"
          aria-checked={o.id === value}
          tabIndex={o.id === value ? 0 : -1}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

const THEMES: { id: Theme; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
]

// The recreated TRISP surface: its fonts and its tokens for the chosen theme.
function Surface({ theme, children, className = '' }: { theme: Theme; children: ReactNode; className?: string }) {
  return (
    <div className={`${s.surface} ${fraunces.variable} ${inter.variable} ${className}`} data-theme={theme}>
      {children}
    </div>
  )
}

const Arrow = () => (
  <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden>
    <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const Chevron = () => (
  <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden>
    <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

const Moon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
    <path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

/* ---- Component kit (hero) ---------------------------------------------- */

type KitTab = 'buttons' | 'cards' | 'nav' | 'forms'

const KIT_TABS: { id: KitTab; label: string }[] = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'nav', label: 'Navigation' },
  { id: 'forms', label: 'Forms' },
]

const KIT_NOTES: Record<KitTab, string> = {
  buttons: 'One Button component with five variants and three sizes. Every button is a full pill, and red is saved for the main action on each screen.',
  cards: 'Cards share one shape: 16px corners, a hairline border and a white surface that turns charcoal in dark mode. A red border marks the recommended choice.',
  nav: 'Three menus match the business: Photography, Creative Services and Studio. The theme switch and the Inquire button stay in reach on every page.',
  forms: 'Labels sit above fields, required fields get a red star, and helper text explains each option’s price before anyone gets to checkout.',
}

export function TrispKit() {
  const [theme, setTheme] = useState<Theme>('light')
  const [tab, setTab] = useState<KitTab>('buttons')
  return (
    <div className={s.kit}>
      <div className={s.kitBar}>
        <Segmented label="Component group" options={KIT_TABS} value={tab} onChange={setTab} />
        <Segmented label="Theme" options={THEMES} value={theme} onChange={setTheme} />
      </div>
      <Surface theme={theme} className={s.kitStage}>
        {tab === 'buttons' && <KitButtons />}
        {tab === 'cards' && <KitCards />}
        {tab === 'nav' && <KitNav />}
        {tab === 'forms' && <KitForms />}
      </Surface>
      <p className={s.kitNote}>{KIT_NOTES[tab]}</p>
    </div>
  )
}

function KitButtons() {
  const variants = ['primary', 'secondary', 'outline', 'ghost', 'white'] as const
  return (
    <div className={s.buttonsDemo}>
      <div className={s.btnGrid}>
        {variants.map((v) => (
          <div key={v} className={s.btnRow}>
            <span className={s.specLabel}>{v}</span>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <button key={size} type="button" className={s.tBtn} data-variant={v} data-size={size}>
                {v === 'primary' ? 'Book Now' : v === 'outline' ? 'View Work' : v === 'ghost' ? 'Learn more' : 'Inquire'}
                {size !== 'sm' && v === 'primary' && <Arrow />}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className={s.pillRow}>
        <span className={s.specLabel}>pills</span>
        <span className={s.tPill}>Studio</span>
        <span className={s.tPill}>On location</span>
        <span className={s.tChip}>Full unedited gallery included</span>
      </div>
    </div>
  )
}

function KitCards() {
  return (
    <div className={s.cardsDemo}>
      <article className={s.tCard}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/youngboy/colors.webp" alt="" className={s.tCardImg} />
        <div className={s.tCardBody}>
          <p className={s.tEyebrowMuted}>Style reference</p>
          <div className={s.tCardHead}>
            <h4 className={s.tH4}>Standard</h4>
            <span className={s.tPrice}>$150</span>
          </div>
          <p className={s.tStrong}>Your image, with a complete visual identity.</p>
          <ul className={s.tChecks}>
            <li>Photo editing and compositing</li>
            <li>Layered effects and typography</li>
            <li>One finished cover</li>
          </ul>
          <button type="button" className={s.tBtn} data-variant="primary" data-size="sm" style={{ width: '100%' }}>
            Book Standard Cover <Arrow />
          </button>
        </div>
      </article>
      <div className={s.cardStack}>
        <article className={s.tCard} data-pick="true">
          <div className={s.tCardBody}>
            <h4 className={s.tH4}>Reserve Your Session</h4>
            <p className={s.tSmall}>Choose a package and submit your preferred date and time.</p>
            <ol className={s.tSteps}>
              <li>
                <b>Request.</b> Pick a package and a time.
              </li>
              <li>
                <b>Confirm.</b> Details within 24 hours.
              </li>
              <li>
                <b>Secure.</b> A 50% deposit locks the date.
              </li>
            </ol>
            <button type="button" className={s.tBtn} data-variant="primary" data-size="sm">
              View Packages & Reserve
            </button>
          </div>
        </article>
        <article className={s.tRow}>
          <div>
            <h4 className={s.tH4}>Graduation</h4>
            <p className={s.tSmall}>Includes Studio & On-Location Sessions</p>
          </div>
          <Chevron />
        </article>
      </div>
    </div>
  )
}

function KitNav() {
  const [open, setOpen] = useState<string | null>('Creative Services')
  return (
    <div className={s.navDemo}>
      <div className={s.tNav}>
        <span className={s.tLogo}>
          TRISP<span>.</span>
        </span>
        <div className={s.tNavLinks}>
          {['Photography', 'Creative Services', 'Studio'].map((m) => (
            <button key={m} type="button" data-open={open === m} onClick={() => setOpen(open === m ? null : m)} aria-expanded={open === m}>
              {m} <Chevron />
            </button>
          ))}
        </div>
        <div className={s.tNavEnd}>
          <span className={s.tIconBtn}>
            <Moon />
          </span>
          <button type="button" className={s.tBtn} data-variant="outline" data-size="sm">
            Inquire Now
          </button>
        </div>
      </div>
      {open && (
        <div className={s.tMenu}>
          {(open === 'Photography'
            ? [
                ['View Packages & Book', 'Pricing for every session type.'],
                ['Graduation', 'Studio, campus, or both.'],
                ['Branding & Headshots', 'Portraits for people and teams.'],
              ]
            : open === 'Studio'
              ? [
                  ['About TRISP Studio', 'The studio and how it works.'],
                  ['Founder Profile', 'Jemari “Trill” Sapp.'],
                  ['Creative Process', 'How a project runs.'],
                ]
              : [
                  ['Cover Art & Motion', 'Cover artwork, motion add-ons and pricing.'],
                  ['Identity Systems', 'Logo, color and typography systems.'],
                  ['Brand Websites & Web Presence', 'Sites that carry the brand online.'],
                ]
          ).map(([title, text]) => (
            <div key={title} className={s.tMenuItem}>
              <b>{title}</b>
              <span>{text}</span>
            </div>
          ))}
        </div>
      )}
      <div className={s.tHeroText}>
        <p className={s.tEyebrow}>Cover art & motion</p>
        <h3 className={s.tH2}>Give your music a visual identity.</h3>
      </div>
    </div>
  )
}

function KitForms() {
  return (
    <form className={s.formDemo} onSubmit={(e) => e.preventDefault()}>
      <h4 className={s.tH4}>1. Your service</h4>
      <label className={s.tField}>
        <span>
          Cover or package <i>*</i>
        </span>
        <select defaultValue="standard">
          <option value="typography">Typography Cover — $100</option>
          <option value="standard">Standard Cover — $150</option>
        </select>
      </label>
      <label className={s.tCheck}>
        <input type="checkbox" defaultChecked />
        <span>
          Add a track list — +$50
          <small>A track-list design to match your cover artwork.</small>
        </span>
      </label>
      <label className={s.tField}>
        <span>
          Design direction <i>*</i>
        </span>
        <textarea rows={3} placeholder="Mood, colors, ideas, exact text, and anything to avoid." />
      </label>
    </form>
  )
}

/* ---- Style guide -------------------------------------------------------- */

const COLORS = [
  { token: 'brand-red', role: 'Actions, eyebrows, focus', light: '#F7211F', dark: '#F7211F' },
  { token: 'brand-cream', role: 'Page background', light: '#FAF7F1', dark: '#101013' },
  { token: 'brand-card', role: 'Cards and fields', light: '#FFFFFF', dark: '#1A1A1E' },
  { token: 'brand-border', role: 'Hairlines', light: '#EFEDE7', dark: '#38383E' },
  { token: 'brand-primary', role: 'Headings and body', light: '#222222', dark: '#F3F3F0' },
  { token: 'brand-secondary', role: 'Supporting text', light: '#5F5F5F', dark: '#B6B6BC' },
  { token: 'brand-dark', role: 'Footer and dark bands', light: '#0F0F0F', dark: '#08080A' },
]

export function TrispStyleGuide() {
  const [theme, setTheme] = useState<Theme>('light')
  return (
    <div className={s.guide}>
      <div className={s.kitBar}>
        <p className={s.guideHint}>Seven color tokens, defined once and swapped for dark mode.</p>
        <Segmented label="Theme" options={THEMES} value={theme} onChange={setTheme} />
      </div>
      <Surface theme={theme} className={s.guideStage}>
        <div className={s.swatches}>
          {COLORS.map((c) => (
            <div key={c.token} className={s.swatch}>
              <span className={s.chip} style={{ background: theme === 'light' ? c.light : c.dark }} />
              <b>{c.token}</b>
              <span>{c.role}</span>
              <code>{theme === 'light' ? c.light : c.dark}</code>
            </div>
          ))}
        </div>

        <div className={s.typeGrid}>
          <div className={s.specimen}>
            <p className={s.specLabel}>Display · Fraunces 700</p>
            <p className={s.tH1}>Creative work with strategic backbone.</p>
            <p className={s.tH2}>One release. A connected look.</p>
            <p className={s.tH4}>Reserve Your Session</p>
          </div>
          <div className={s.specimen}>
            <p className={s.specLabel}>Text · Inter 300 to 700</p>
            <p className={s.tLede}>Photography, websites, visual systems, and campaign work.</p>
            <p className={s.tBody}>Every cover gets the same care. Pricing reflects the concept, construction, and design work your idea needs.</p>
            <p className={s.tEyebrow}>Eyebrow · Cover art & motion</p>
            <p className={s.tSmall}>Helper · Time slots are held on a first-paid basis.</p>
          </div>
        </div>

        <div className={s.shapes}>
          <div>
            <span className={s.specLabel}>Radius</span>
            <div className={s.shapeRow}>
              <span className={s.shape} style={{ borderRadius: 999 }}>Pill · buttons</span>
              <span className={s.shape} style={{ borderRadius: 16 }}>16 · cards</span>
              <span className={s.shape} style={{ borderRadius: 8 }}>8 · fields</span>
            </div>
          </div>
          <div>
            <span className={s.specLabel}>Motion</span>
            <p className={s.tSmall}>300ms on buttons and links. 240ms for the theme change, so light and dark cross-fade instead of snapping.</p>
          </div>
        </div>
      </Surface>
    </div>
  )
}

/* ---- Site map ----------------------------------------------------------- */

const SITEMAP = [
  {
    name: 'Photography',
    for: 'Graduates, families, people',
    groups: [
      ['Overview', ['View Packages & Book', 'Photography Portfolio']],
      ['Sessions', ['Graduation', 'Lifestyle & Editorial', 'Branding & Headshots', 'Couples & Maternity', 'Prom & Formal']],
    ],
    goal: 'Reserve a session',
  },
  {
    name: 'Creative Services',
    for: 'Artists, labels, brands',
    groups: [
      ['Overview', ['Process', 'Selected Creative Work']],
      ['Services', ['Cover Art & Motion', 'Identity Systems', 'Campaign Visual Systems', 'Brand Websites & Web Presence', 'Motion Identity', 'Scalable Design Systems']],
    ],
    goal: 'Book a cover or request a quote',
  },
  {
    name: 'Studio',
    for: 'Anyone deciding to trust the studio',
    groups: [['Studio & founder', ['About TRISP Studio', 'Founder Profile', 'Creative Process']]],
    goal: 'Inquire',
  },
] as const

export function TrispSitemap() {
  return (
    <div className={s.sitemap}>
      <div className={s.mapRoot}>
        <b>trispstudio.com</b>
        <span>“Creative work with strategic backbone.” Two doors: Photography and Creative Services.</span>
      </div>
      <div className={s.mapCols}>
        {SITEMAP.map((col) => (
          <div key={col.name} className={s.mapCol}>
            <p className={s.mapName}>{col.name}</p>
            <p className={s.mapFor}>For {col.for.toLowerCase()}</p>
            {col.groups.map(([label, items]) => (
              <div key={label} className={s.mapGroup}>
                <p>{label}</p>
                <ul>
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p className={s.mapGoal}>
              <span aria-hidden>→</span> {col.goal}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Cover booking: the live price logic ------------------------------- */

const OFFERS = [
  { id: 'typography', name: 'Typography Cover', amount: 100 },
  { id: 'standard', name: 'Standard Cover', amount: 150 },
  { id: 'ambient-package', name: 'Cover + Ambient Motion', amount: 210, motion: 'ambient' },
  { id: 'layered-package', name: 'Cover + Layered Motion', amount: 275, motion: 'layered' },
  { id: 'release-kit', name: 'Single Release Kit', amount: 350, motion: 'layered' },
  { id: 'signature', name: 'Signature Cover, from $300', quote: true },
  { id: 'canvas', name: 'Standalone Spotify Canvas, from $75', quote: true },
] as const

type Motion = 'none' | 'ambient' | 'layered' | 'advanced'
type Format = 'square' | 'vertical' | 'both'

// The same rules as the live site's priceBooking(), in dollars.
function price(sel: { offer: string; motion: Motion; format: Format; canvas: boolean; tracklist: boolean }) {
  const offer = OFFERS.find((o) => o.id === sel.offer)!
  const motion: Motion = offer.id === 'canvas' ? 'none' : 'motion' in offer ? (offer.motion as Motion) : sel.motion
  const lines: { name: string; amount: number }[] = [{ name: offer.name, amount: 'amount' in offer ? offer.amount : 0 }]
  if (!('motion' in offer) && motion !== 'none' && motion !== 'advanced')
    lines.push({ name: `${motion === 'ambient' ? 'Ambient' : 'Layered'} Motion`, amount: motion === 'ambient' ? 75 : 150 })
  if (motion !== 'none' && sel.format === 'both') lines.push({ name: 'Additional Motion Format', amount: 35 })
  if (sel.canvas && offer.id !== 'canvas') lines.push({ name: 'Spotify Canvas', amount: motion !== 'none' ? 35 : 75 })
  if (sel.tracklist && offer.id !== 'canvas') lines.push({ name: 'Track List', amount: 50 })
  const quote = ('quote' in offer && offer.quote) || motion === 'advanced' || (sel.canvas && motion === 'none')
  return { offer, motion, quote, lines, total: lines.reduce((t, l) => t + l.amount, 0) }
}

export function CoverBuilder() {
  const [theme, setTheme] = useState<Theme>('light')
  const [offer, setOffer] = useState('standard')
  const [motion, setMotion] = useState<Motion>('none')
  const [format, setFormat] = useState<Format>('square')
  const [canvas, setCanvas] = useState(false)
  const [tracklist, setTracklist] = useState(false)
  const p = price({ offer, motion, format, canvas, tracklist })
  const isCanvas = offer === 'canvas'
  const packaged = 'motion' in p.offer

  return (
    <div className={s.builder}>
      <div className={s.kitBar}>
        <p className={s.guideHint}>Change the order. The summary follows the site’s real pricing rules.</p>
        <Segmented label="Theme" options={THEMES} value={theme} onChange={setTheme} />
      </div>
      <Surface theme={theme} className={s.builderStage}>
        <form className={s.builderForm} onSubmit={(e) => e.preventDefault()}>
          <h4 className={s.tH4}>1. Your service</h4>
          <label className={s.tField}>
            <span>
              Cover or package <i>*</i>
            </span>
            <select value={offer} onChange={(e) => setOffer(e.target.value)}>
              {OFFERS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                  {'amount' in o ? ` — $${o.amount}` : ''}
                </option>
              ))}
            </select>
          </label>
          {!packaged && !isCanvas && (
            <label className={s.tField}>
              <span>Promotional motion</span>
              <select value={motion} onChange={(e) => setMotion(e.target.value as Motion)}>
                <option value="none">No promotional motion</option>
                <option value="ambient">Ambient — +$75</option>
                <option value="layered">Layered — +$150</option>
                <option value="advanced">Advanced — from +$250, quoted first</option>
              </select>
            </label>
          )}
          {p.motion !== 'none' && !isCanvas && (
            <fieldset className={s.tFormats}>
              <legend>
                Motion format <i>*</i>
              </legend>
              {(['square', 'vertical', 'both'] as const).map((f) => (
                <label key={f}>
                  <input type="radio" name="format" checked={format === f} onChange={() => setFormat(f)} />
                  {f === 'both' ? 'Both — +$35' : f === 'square' ? 'Square (1:1)' : 'Vertical (9:16)'}
                </label>
              ))}
            </fieldset>
          )}
          {!isCanvas && (
            <>
              <label className={s.tCheck}>
                <input type="checkbox" checked={tracklist} onChange={(e) => setTracklist(e.target.checked)} />
                <span>
                  Add a track list — +$50<small>A track-list design to match your cover artwork.</small>
                </span>
              </label>
              <label className={s.tCheck}>
                <input type="checkbox" checked={canvas} onChange={(e) => setCanvas(e.target.checked)} />
                <span>
                  Add Spotify Canvas — {p.motion === 'none' ? 'from $75, quoted first' : '+$35'}
                  <small>A separate 3–8 second vertical video for Spotify.</small>
                </span>
              </label>
            </>
          )}
        </form>
        <div className={s.summary} aria-live="polite">
          <h4 className={s.tH4}>3. Review your order</h4>
          <ul>
            {p.lines.map((l) => (
              <li key={l.name}>
                <span>{l.name}</span>
                <span>{l.amount ? `$${l.amount}` : 'Quoted'}</span>
              </li>
            ))}
          </ul>
          <p className={s.total}>{p.quote ? 'Quote before payment' : `Total: $${p.total} USD`}</p>
          <button type="button" className={s.tBtn} data-variant="primary" data-size="lg">
            {p.quote ? 'Send brief for a quote' : 'Continue to secure payment'}
          </button>
          <p className={s.tSmall}>
            {p.quote ? 'No payment is collected yet.' : 'Full payment upfront through Stripe. Your brief stays saved if you return from checkout.'}
          </p>
        </div>
      </Surface>
    </div>
  )
}
