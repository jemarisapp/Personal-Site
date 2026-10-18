'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { RELEASES, type Release } from '@/lib/youngboy'
import s from './release-browser.module.css'

type Filter = 'all' | 'Project' | 'Single' | 'Label project' | 'motion'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Project', label: 'Projects' },
  { id: 'Single', label: 'Singles' },
  { id: 'Label project', label: 'Label projects' },
  { id: 'motion', label: 'With motion' },
]

const hasMotion = (r: Release) => r.items.some((x) => x.type === 'video')
const matches = (r: Release, f: Filter) => (f === 'all' ? true : f === 'motion' ? hasMotion(r) : r.type === f)

// Sentence case for asset labels ("Back Cover & Tracklist" -> "Back cover &
// tracklist"), keeping acronyms like NBA and SFSS and the first word as is.
const sentence = (t: string) =>
  t
    .split(' ')
    .map((w, i) => (i === 0 || (w.length > 1 && w === w.toUpperCase()) ? w : w.toLowerCase()))
    .join(' ')

export function ReleaseBrowser() {
  const [filter, setFilter] = useState<Filter>('all')
  const [id, setId] = useState('colors')
  const [item, setItem] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const list = RELEASES.filter((r) => matches(r, filter))
  const release = RELEASES.find((r) => r.id === id)!
  const current = release.items[Math.min(item, release.items.length - 1)]
  const count = (f: Filter) => RELEASES.filter((r) => matches(r, f)).length

  // When the filter hides the open release, open the first one it shows.
  useEffect(() => {
    if (!list.some((r) => r.id === id) && list[0]) {
      setId(list[0].id)
      setItem(0)
    }
  }, [filter, id, list])

  const open = (next: string) => {
    setId(next)
    setItem(0)
    // On narrow screens the viewer sits above the wall; bring it into view.
    if (window.matchMedia('(max-width: 899px)').matches) stage.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const step = (dir: number) => {
    const i = list.findIndex((r) => r.id === id)
    const next = list[(i + dir + list.length) % list.length]
    if (next) {
      setId(next.id)
      setItem(0)
    }
  }

  const onWallKeys = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    step(e.key === 'ArrowRight' ? 1 : -1)
  }

  return (
    <div className={s.browser} style={{ '--rc': release.color } as CSSProperties}>
      <div className={s.filters} role="radiogroup" aria-label="Filter releases">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" role="radio" aria-checked={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
            <span>{count(f.id)}</span>
          </button>
        ))}
      </div>

      <div className={s.layout}>
        <div className={s.stage} ref={stage}>
          <div className={s.viewer}>
            <div className={s.glow} aria-hidden />
            {current.type === 'video' ? (
              <video
                key={current.src}
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                preload="none"
                className={s.media}
                aria-label={`${release.title}, ${current.label}`}
              />
            ) : (
              <Image
                key={current.src}
                src={current.src}
                alt={`${release.title}, ${current.label}`}
                width={current.w}
                height={current.h}
                sizes="(min-width: 900px) 46vw, 92vw"
                className={s.media}
                priority={id === 'colors'}
              />
            )}
          </div>

          {release.items.length > 1 && (
            <ul className={s.items} aria-label={`${release.title} assets`}>
              {release.items.map((x, i) => (
                <li key={x.src}>
                  <button type="button" aria-pressed={i === item} onClick={() => setItem(i)}>
                    <span className={s.thumb}>
                      <Image src={x.type === 'video' ? x.poster! : x.src} alt="" fill sizes="96px" />
                      {x.type === 'video' && (
                        <span className={s.play} aria-hidden>
                          ▶
                        </span>
                      )}
                    </span>
                    <span className={s.itemLabel}>{sentence(x.label)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={s.info}>
          <p className={s.type}>
            <i aria-hidden />
            {release.type}
            {hasMotion(release) && <span className={s.motionTag}>Motion</span>}
          </p>
          <h3>{release.title}</h3>
          <p className={s.desc}>{release.description}</p>
          <p className={s.made}>
            {release.items.length} {release.items.length === 1 ? 'piece' : 'pieces'}: {release.items.map((x) => sentence(x.label)).join(', ')}
          </p>
          <div className={s.nav}>
            <button type="button" onClick={() => step(-1)} aria-label="Previous release">
              ←
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next release">
              →
            </button>
            <span>
              {list.findIndex((r) => r.id === id) + 1} of {list.length}
            </span>
          </div>

          <ul className={s.wall} aria-label="Releases" onKeyDown={onWallKeys}>
            {list.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  aria-pressed={r.id === id}
                  aria-label={r.title}
                  onClick={() => open(r.id)}
                  style={{ '--c': r.color } as CSSProperties}
                >
                  <Image src={r.items[0].src} alt="" fill sizes="(min-width: 900px) 6vw, 22vw" />
                  {hasMotion(r) && (
                    <span className={s.dot} aria-hidden>
                      ▶
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// A wall of motion teasers that play while they're on screen.
const REEL = ['colors', 'green-flag-activity', 'nightmare-on-38th-st', 'decided-2', 'the-last-slimeto', 'richest-opp']

export function MotionReel() {
  const clips = REEL.map((rid) => {
    const r = RELEASES.find((x) => x.id === rid)!
    const v = r.items.find((x) => x.type === 'video')!
    return { r, v }
  })
  return (
    <ul className={s.reel}>
      {clips.map(({ r, v }) => (
        <li key={v.src} style={{ '--c': r.color } as CSSProperties}>
          <ReelClip src={v.src} poster={v.poster!} label={`${r.title} motion teaser`} />
          <span>{r.title}</span>
        </li>
      ))}
    </ul>
  )
}

function ReelClip({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.4 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} className={s.clip} />
}
