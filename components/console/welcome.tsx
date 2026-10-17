'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { PROFILE, type Shelf } from '@/lib/work'
import s from './welcome.module.css'

// Deterministic "random" so server and client render the same particles.
function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

// Values are rounded so server and browser serialize them identically.
const round = (x: number, d = 2) => Number(x.toFixed(d))

const PARTICLES = Array.from({ length: 46 }, (_, i) => {
  const near = seeded(i + 1) > 0.82
  const size = round(near ? 10 + seeded(i + 31) * 16 : 2 + seeded(i + 31) * 5, 1)
  return {
    left: `${round(seeded(i + 11) * 100)}%`,
    top: `${round(35 + seeded(i + 23) * 62)}%`,
    width: `${size}px`,
    height: `${size}px`,
    filter: near ? 'blur(4px)' : 'none',
    opacity: round(near ? 0.25 : 0.35 + seeded(i + 61) * 0.5),
    animationDuration: `${round(14 + seeded(i + 41) * 18)}s`,
    animationDelay: `${round(-seeded(i + 53) * 20)}s`,
  }
})

function Clock() {
  const [now, setNow] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    tick()
    const id = window.setInterval(tick, 15000)
    return () => window.clearInterval(id)
  }, [])
  return <p className={s.clock}>{now}</p>
}

// Each area of work is a "profile" to pick, shown with a piece from it.
type Option =
  | { id: Shelf; label: string; image: string }
  | { id: 'hello'; label: string; image?: undefined }

const LEFT: Option[] = [
  { id: 'product', label: 'Product & AI', image: '/work/navigate-idd/hero.webp' },
  { id: 'brand', label: 'Brand & Visual', image: '/work/youngboy/green-flag-activity.webp' },
]
const RIGHT: Option[] = [
  { id: 'motion', label: 'Motion', image: '/work/cold-december/hero.webp' },
  { id: 'hello', label: 'Say hi' },
]
const ORDER = [...LEFT.map((o) => o.id), 'me', ...RIGHT.map((o) => o.id)] as const
type Focus = (typeof ORDER)[number] | 'about'

export function WelcomeScreen() {
  const router = useRouter()
  const [focus, setFocus] = useState<Focus>('me')
  const [leaving, setLeaving] = useState(false)
  const refs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    router.prefetch('/home')
    refs.current.me?.focus({ preventScroll: true })
  }, [router])

  // Zoom away, then go. The shelves live at /home, so Back returns here.
  const go = (href: string) => {
    if (leaving) return
    setLeaving(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(() => router.push(href), reduce ? 0 : 600)
  }

  const pick = (o: Option) => (o.id === 'hello' ? router.push(PROFILE.contact) : go(`/home?shelf=${o.id}`))

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      go('/home')
      return
    }
    const i = ORDER.indexOf(focus as (typeof ORDER)[number])
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = ORDER[Math.max(0, Math.min(ORDER.length - 1, (i < 0 ? 2 : i) + step))]
    setFocus(next)
    refs.current[next]?.focus()
  }

  const option = (o: Option) => (
    <button
      key={o.id}
      type="button"
      ref={(el) => {
        refs.current[o.id] = el
      }}
      className={s.side}
      data-area={o.id}
      onClick={() => pick(o)}
      onFocus={() => setFocus(o.id)}
      onMouseEnter={() => setFocus(o.id)}
      data-focus={focus === o.id}
    >
      <span className={s.sideIcon} aria-hidden>
        {o.image ? <Image src={o.image} alt="" width={160} height={160} /> : '+'}
      </span>
      <span className={s.sideLabel}>{o.label}</span>
    </button>
  )

  return (
    <div
      className={s.welcome}
      data-leaving={leaving}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      onKeyDown={onKeyDown}
    >
      <div className={s.scene} aria-hidden>
        <div className={s.beam} />
        {PARTICLES.map((p, i) => (
          <span key={i} className={s.particle} style={p} />
        ))}
      </div>

      <Clock />

      <div className={s.content}>
        <h1 id="welcome-title" className={s.title}>
          Welcome
        </h1>
        <p className={s.subtitle}>Where do you want to start?</p>

        <div className={s.profiles}>
          <div className={s.group}>{LEFT.map(option)}</div>

          <div className={s.meWrap}>
            <span className={s.controller} aria-hidden>
              <svg viewBox="0 0 24 16" width="22" height="15">
                <path
                  d="M6.5 1h11c2.6 0 4.2 1.6 4.8 4.4l1.2 6.1c.4 2.1-1.5 3.6-3.3 2.6l-3.5-2H7.3l-3.5 2c-1.8 1-3.7-.5-3.3-2.6l1.2-6.1C2.3 2.6 3.9 1 6.5 1Z"
                  fill="currentColor"
                />
              </svg>
              <span>1</span>
            </span>
            <button
              type="button"
              ref={(el) => {
                refs.current.me = el
              }}
              className={s.me}
              onClick={() => go('/home')}
              onFocus={() => setFocus('me')}
              onMouseEnter={() => setFocus('me')}
              data-focus={focus === 'me'}
              aria-label="Enter Jemari Sapp's portfolio"
            >
              <Image src="/jemari.webp" alt="" width={360} height={360} priority />
            </button>
            <p className={s.name}>{PROFILE.name}</p>
            <p className={s.about}>{PROFILE.line}, based in Atlanta.</p>
            <a
              href="/about"
              ref={(el) => {
                refs.current.about = el
              }}
              className={s.options}
              onFocus={() => setFocus('about')}
              onMouseEnter={() => setFocus('about')}
              data-focus={focus === 'about'}
            >
              <span className={s.optionsIcon} aria-hidden>
                <i />
                <i />
                <i />
              </span>
              About me
            </a>
          </div>

          <div className={s.group}>{RIGHT.map(option)}</div>
        </div>
      </div>

      <button type="button" className={s.select} onClick={() => go('/home')}>
        <span className={s.cross} aria-hidden>
          ✕
        </span>
        Enter
      </button>
    </div>
  )
}
