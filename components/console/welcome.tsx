'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { PROFILE } from '@/lib/work'
import s from './welcome.module.css'

export const WELCOME_KEY = 'welcome-seen'

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
    const tick = () =>
      setNow(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    tick()
    const id = window.setInterval(tick, 15000)
    return () => window.clearInterval(id)
  }, [])
  return <p className={s.clock}>{now}</p>
}

type Choice = 'hello' | 'me' | 'projects' | 'about'

export function Welcome({ onEnter }: { onEnter: () => void }) {
  const [focus, setFocus] = useState<Choice>('me')
  const [leaving, setLeaving] = useState(false)
  const meRef = useRef<HTMLButtonElement>(null)
  const helloRef = useRef<HTMLAnchorElement>(null)
  const aboutRef = useRef<HTMLAnchorElement>(null)
  const projectsRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    meRef.current?.focus({ preventScroll: true })
  }, [])

  const enter = () => {
    if (leaving) return
    try {
      sessionStorage.setItem(WELCOME_KEY, '1')
    } catch {}
    setLeaving(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(onEnter, reduce ? 0 : 650)
  }

  // Left and right move across the row, like the console's profile picker.
  const order: Choice[] = ['hello', 'me', 'projects']
  const refFor = (c: Choice) =>
    c === 'hello' ? helloRef : c === 'me' ? meRef : c === 'projects' ? projectsRef : aboutRef

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      enter()
      return
    }
    const i = Math.max(0, order.indexOf(focus))
    const next = e.key === 'ArrowRight' ? order[Math.min(i + 1, 2)] : e.key === 'ArrowLeft' ? order[Math.max(i - 1, 0)] : null
    if (!next) return
    e.preventDefault()
    setFocus(next)
    refFor(next).current?.focus()
  }

  return (
    <div className={s.welcome} data-leaving={leaving} role="dialog" aria-modal="true" aria-labelledby="welcome-title" onKeyDown={onKeyDown}>
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
        <p className={s.subtitle}>{PROFILE.line}</p>

        <div className={s.profiles}>
          <Link
            href={PROFILE.contact}
            ref={helloRef}
            className={s.side}
            onFocus={() => setFocus('hello')}
            onMouseEnter={() => setFocus('hello')}
            data-focus={focus === 'hello'}
          >
            <span className={s.sideIcon} aria-hidden>
              +
            </span>
            <span className={s.sideLabel}>Say hi</span>
          </Link>

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
              ref={meRef}
              className={s.me}
              onClick={enter}
              onFocus={() => setFocus('me')}
              onMouseEnter={() => setFocus('me')}
              data-focus={focus === 'me'}
              aria-label="Enter Jemari Sapp's portfolio"
            >
              <Image src="/jemari.webp" alt="" width={360} height={360} priority />
            </button>
            <p className={s.name}>{PROFILE.name}</p>
            <p className={s.about}>Art director &amp; designer in Atlanta. Album art, motion, and AI products.</p>
            <Link
              href="/about"
              ref={aboutRef}
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
            </Link>
          </div>

          <button
            type="button"
            ref={projectsRef}
            className={s.side}
            onClick={enter}
            onFocus={() => setFocus('projects')}
            onMouseEnter={() => setFocus('projects')}
            data-focus={focus === 'projects'}
          >
            <span className={s.sideIcon} aria-hidden>
              <span className={s.grid}>
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
            <span className={s.sideLabel}>View projects</span>
          </button>
        </div>
      </div>

      <button type="button" className={s.select} onClick={enter}>
        <span className={s.cross} aria-hidden>
          ✕
        </span>
        Enter
      </button>
    </div>
  )
}
