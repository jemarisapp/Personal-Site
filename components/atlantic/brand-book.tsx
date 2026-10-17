'use client'

import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import s from './brand-book.module.css'

const TOTAL = 44
const page = (n: number) => `/work/atlantic-records/guide/${String(n).padStart(2, '0')}.webp`

// Chapters of the printed guide, by first page, colored from its own palette.
const CHAPTERS = [
  { label: 'Brand', start: 1, color: '#223368', ink: '#fff' },
  { label: 'Color', start: 3, color: '#f5d092', ink: '#223368' },
  { label: 'Logo', start: 5, color: '#4661ad', ink: '#fff' },
  { label: 'Type', start: 17, color: '#eba226', ink: '#1a1a1a' },
  { label: 'Stationery', start: 23, color: '#c03f5f', ink: '#fff' },
  { label: 'Ads', start: 30, color: '#223368', ink: '#fff' },
  { label: 'App', start: 34, color: '#f5d092', ink: '#223368' },
  { label: 'Collateral', start: 38, color: '#4661ad', ink: '#fff' },
]

// Swatches on the two color pages, measured as fractions of the page.
const SWATCHES: Record<number, { name: string; hex: string; x: number; y: number; w: number; h: number; dark: boolean }[]> = {
  3: [
    { name: 'Indigo Blue', hex: '#223368', x: 0.06, y: 0.225, w: 0.433, h: 0.285, dark: true },
    { name: 'Chardonnay', hex: '#F5D092', x: 0.51, y: 0.225, w: 0.45, h: 0.285, dark: false },
    { name: 'White', hex: '#FFFFFF', x: 0.06, y: 0.54, w: 0.433, h: 0.28, dark: false },
    { name: 'Black', hex: '#080808', x: 0.51, y: 0.54, w: 0.45, h: 0.28, dark: true },
  ],
  4: [
    { name: 'Liberty Blue', hex: '#4661AD', x: 0.13, y: 0.237, w: 0.353, h: 0.273, dark: true },
    { name: 'Marigold', hex: '#EBA226', x: 0.507, y: 0.237, w: 0.353, h: 0.273, dark: false },
    { name: 'Brick Red', hex: '#C03F5F', x: 0.323, y: 0.545, w: 0.354, h: 0.285, dark: true },
  ],
}

function chapterOf(n: number) {
  let c = CHAPTERS[0]
  for (const ch of CHAPTERS) if (n >= ch.start) c = ch
  return c
}

export function BrandBook() {
  // Page numbers are 1-based, matching the printed guide.
  const [current, setCurrent] = useState(1)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([1, 2, 3]))
  const [toast, setToast] = useState<string | null>(null)
  const from = useRef(1)
  const reduceMotion = useReducedMotion()
  const toastTimer = useRef<number | undefined>(undefined)

  // Keep a few pages ahead loaded, and anything already seen stays.
  useEffect(() => {
    setLoaded((prev) => {
      const next = new Set(prev)
      for (let n = current - 1; n <= current + 2; n++) if (n >= 1 && n <= TOTAL) next.add(n)
      return next.size === prev.size ? prev : next
    })
  }, [current])

  const go = (n: number) => {
    const target = Math.max(1, Math.min(TOTAL, n))
    if (target === current) return
    from.current = current
    // A jump loads every page it riffles past so none flash blank.
    setLoaded((prev) => {
      const next = new Set(prev)
      const [a, b] = target > current ? [current, target] : [target, current]
      for (let i = a; i <= Math.min(b + 2, TOTAL); i++) next.add(i)
      return next
    })
    setCurrent(target)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') go(current + 1)
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') go(current - 1)
    else if (e.key === 'Home') go(1)
    else if (e.key === 'End') go(TOTAL)
    else return
    e.preventDefault()
  }

  const copy = async (name: string, hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      setToast(`Copied ${name} ${hex}`)
    } catch {
      setToast(`${name} is ${hex}`)
    }
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }

  const chapter = chapterOf(current)
  const distance = Math.abs(current - from.current)

  return (
    <div className={s.root}>
      <div className={s.desk}>
        <div
          className={s.book}
          tabIndex={0}
          role="group"
          aria-roledescription="brand book"
          aria-label={`Atlantic Records brand guidelines, page ${current} of ${TOTAL}`}
          onKeyDown={onKeyDown}
          data-motion={!reduceMotion}
        >
          <div className={s.spiral} aria-hidden />
          <div className={s.pages}>
            <div className={s.thickness} aria-hidden />
            {Array.from({ length: TOTAL }, (_, i) => {
              const n = i + 1
              const state = n < current ? 'flipped' : n === current ? 'open' : 'under'
              // When jumping, pages riffle in order instead of all at once.
              const order = current > from.current ? n - from.current : from.current - n
              const delay = distance > 1 && order >= 0 && order < distance ? (order / distance) * 420 : 0
              const swatches = SWATCHES[n]
              return (
                <div
                  key={n}
                  className={s.page}
                  data-state={state}
                  style={{ zIndex: TOTAL - n, transitionDelay: `${delay}ms` } as CSSProperties}
                  aria-hidden={state !== 'open'}
                >
                  {loaded.has(n) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={page(n)} alt="" draggable={false} />
                  )}
                  {state === 'open' && (
                    <button
                      type="button"
                      className={s.turn}
                      onClick={() => go(current + 1)}
                      aria-label="Turn to the next page"
                      disabled={current === TOTAL}
                    />
                  )}
                  {state === 'open' &&
                    swatches?.map((sw) => (
                      <button
                        key={sw.hex}
                        type="button"
                        className={s.swatch}
                        data-dark={sw.dark}
                        style={{ left: `${sw.x * 100}%`, top: `${sw.y * 100}%`, width: `${sw.w * 100}%`, height: `${sw.h * 100}%` }}
                        onClick={() => copy(sw.name, sw.hex)}
                        aria-label={`Copy ${sw.name}, ${sw.hex}`}
                      >
                        <span>Copy {sw.hex}</span>
                      </button>
                    ))}
                </div>
              )
            })}
          </div>

          <nav className={s.tabs} aria-label="Chapters">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.label}
                type="button"
                className={s.tab}
                style={{ '--tab': ch.color, '--tab-ink': ch.ink } as CSSProperties}
                aria-current={ch === chapter ? 'true' : undefined}
                onClick={() => go(ch.start)}
              >
                {ch.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className={s.controls}>
        <button type="button" onClick={() => go(current - 1)} disabled={current === 1} aria-label="Previous page">
          ‹
        </button>
        <p className={s.counter} aria-live="polite">
          {chapter.label} <span>
            {current} / {TOTAL}
          </span>
        </p>
        <button type="button" onClick={() => go(current + 1)} disabled={current === TOTAL} aria-label="Next page">
          ›
        </button>
      </div>
      <p className={s.help}>
        {SWATCHES[current] ? 'Click a color to copy its hex code.' : 'Tap the page to flip it, or jump with the tabs.'}
      </p>
      <div className={s.toast} data-show={!!toast} role="status">
        {toast}
      </div>
    </div>
  )
}
