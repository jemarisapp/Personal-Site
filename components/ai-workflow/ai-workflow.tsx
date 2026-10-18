'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import s from './ai-workflow.module.css'

const DIR = '/work/directing-ai'

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

const clock = (t: number) => `0:${String(Math.floor(t)).padStart(2, '0')}`

/* ---- Review mode: the graduation promo with my notes as chapters -------- */

const NOTES = [
  {
    at: 0,
    label: 'Hook',
    note: 'Capitalize “Campus,” “Set” and “Shot” everywhere they appear.',
    fix: 'Updated on every title card, then re-rendered.',
  },
  {
    at: 3,
    label: 'The Set. The Shot.',
    note: 'Keep the color natural. No grading and no boosted saturation.',
    fix: 'The iPhone HDR clips were tone mapped to standard color with nothing added. Claude had assumed the clips were landscape. They were vertical, so the layout became full-screen reveals.',
  },
  {
    at: 13,
    label: 'Montage',
    note: 'Center the subjects, give each photo time on screen, and add the session with three looks.',
    fix: 'Each frame was centered on the person, not the photo’s edges, and checked against a center line.',
  },
  {
    at: 19.2,
    label: 'Photo swap',
    note: 'Use the reading-on-books portrait, and keep the headline off her.',
    fix: 'Reframed so the headline sits on the backdrop.',
  },
  {
    at: 21.2,
    label: 'Pricing',
    note: 'Show prices on photos we haven’t used yet, keep the photos visible, and stay clear of TikTok’s buttons and caption.',
    fix: 'Frosted cards made from a blurred patch of each photo, placed inside the safe area. Turn on safe zones to check.',
  },
  {
    at: 30,
    label: 'Close',
    note: 'End on “Two settings. One complete graduation story.”',
    fix: 'The last frame matches the first, so the video loops cleanly.',
  },
]

export function ReviewPlayer() {
  const video = useRef<HTMLVideoElement>(null)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(32.7)
  const [playing, setPlaying] = useState(false)
  const [zones, setZones] = useState(false)
  const [guide, setGuide] = useState(false)

  // Start muted and playing unless the visitor prefers less motion.
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.play().catch(() => {})
    }
  }, [])

  const active = NOTES.reduce((acc, n, i) => (time >= n.at - 0.05 ? i : acc), 0)

  const seek = (t: number) => {
    const v = video.current
    if (!v) return
    v.currentTime = t
    setTime(t)
    v.play().catch(() => {})
  }

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <div className={s.review}>
      <div className={s.phoneCol}>
        <div className={s.phone}>
          <video
            ref={video}
            src={`${DIR}/grad-promo.mp4`}
            poster={`${DIR}/grad-poster.webp`}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Graduation combo session promo, 9:16"
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 32.7)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onClick={toggle}
          />
          {zones && (
            <div className={s.zones} aria-hidden>
              <span className={s.zoneTop}>Tabs</span>
              <span className={s.zoneRight}>Buttons</span>
              <span className={s.zoneBottom}>Caption & sound</span>
            </div>
          )}
          {guide && <div className={s.guide} aria-hidden />}
        </div>

        <div className={s.transport}>
          <button type="button" className={s.play} onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? (
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
                <rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
                <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
                <path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" fill="currentColor" />
              </svg>
            )}
          </button>
          <div className={s.track}>
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={time}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Position in the video"
              style={{ ['--p' as string]: `${(time / duration) * 100}%` }}
            />
            {NOTES.map((n, i) => (
              <span key={n.at} className={s.tick} style={{ left: `${(n.at / duration) * 100}%` }} data-on={i === active} />
            ))}
          </div>
          <span className={s.time}>{clock(time)}</span>
        </div>

        <div className={s.toggles}>
          <button type="button" aria-pressed={zones} onClick={() => setZones((z) => !z)}>
            <span className={s.switch} aria-hidden />
            Safe zones
          </button>
          <button type="button" aria-pressed={guide} onClick={() => setGuide((g) => !g)}>
            <span className={s.switch} aria-hidden />
            Center line
          </button>
        </div>
      </div>

      <div className={s.notes}>
        <p className={s.notesHead}>
          <span className={s.dot} aria-hidden />
          My review notes
        </p>
        <ol className={s.noteList}>
          {NOTES.map((n, i) => (
            <li key={n.at}>
              <button type="button" className={s.note} data-on={i === active} onClick={() => seek(n.at)}>
                <span className={s.noteMeta}>
                  <span className={s.noteTime}>{clock(n.at)}</span>
                  {n.label}
                </span>
                <span className={s.noteText}>{n.note}</span>
                <span className={s.noteFix}>{n.fix}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/* ---- Carousels built by the same system --------------------------------- */

const DECKS = [
  { id: 'spotlight', label: 'Spotlight Series', slides: [1, 2, 3, 4, 5, 6, 7] },
  { id: 'grad-poses', label: '5 poses every grad needs', slides: [1, 2, 3, 4, 5, 6, 7] },
  // Slide 6 shows a client's name, so it's left out.
  { id: 'grad-poses-2', label: '5 grad poses to try', slides: [1, 2, 3, 4, 5, 7] },
]

export function CarouselDeck() {
  const [d, setD] = useState(0)
  const [slide, setSlide] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const deck = DECKS[d]
  const { refs, onKeyDown } = useRovingKeys(DECKS.length, d, (n) => pick(n))

  function pick(n: number) {
    setD(n)
    setSlide(0)
    track.current?.scrollTo({ left: 0 })
  }

  const go = (step: number) => {
    const el = track.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const w = card ? card.offsetWidth + 12 : el.clientWidth
    el.scrollBy({ left: step * w, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = track.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const w = card ? card.offsetWidth + 12 : el.clientWidth
    setSlide(Math.round(el.scrollLeft / w))
  }

  return (
    <div className={s.deck}>
      <div className={s.deckTabs} role="radiogroup" aria-label="Carousel" onKeyDown={onKeyDown}>
        {DECKS.map((x, j) => (
          <button
            key={x.id}
            ref={(el) => {
              refs.current[j] = el
            }}
            type="button"
            role="radio"
            aria-checked={d === j}
            tabIndex={d === j ? 0 : -1}
            onClick={() => pick(j)}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className={s.deckTrack} ref={track} onScroll={onScroll} tabIndex={0} aria-label={`${deck.label} slides`}>
        {deck.slides.map((n, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${deck.id}-${n}`}
            src={`${DIR}/${deck.id}-${n}.webp`}
            alt={`${deck.label}, slide ${i + 1}`}
            loading={i < 3 ? 'eager' : 'lazy'}
            width={1080}
            height={1350}
          />
        ))}
      </div>
      <div className={s.deckNav}>
        <button type="button" onClick={() => go(-1)} disabled={slide <= 0} aria-label="Previous slide">
          ←
        </button>
        <span>
          {Math.min(slide + 1, deck.slides.length)} / {deck.slides.length}
        </span>
        <button type="button" onClick={() => go(1)} disabled={slide >= deck.slides.length - 1} aria-label="Next slide">
          →
        </button>
      </div>
    </div>
  )
}

/* ---- The session video and the notes that shaped it --------------------- */

const RENDER_NOTES = [
  'The “BUILT BY ME” label overflowed its card. Make it fit.',
  'Connector lines have to touch the boxes they connect.',
  'Two services aren’t part of the session system. Take them out.',
  'ChatGPT doesn’t book the session. It makes the portal from my calendar.',
  'Lose the hard-edged shadow under the phone.',
  'Fix the broken characters in the on-screen text.',
]

export function RenderNotes() {
  return (
    <div className={s.render}>
      <div className={s.renderVideo}>
        <video
          src={`${DIR}/session-video.mp4`}
          poster={`${DIR}/session-poster.webp`}
          controls
          preload="none"
          playsInline
          aria-label="Session management system explainer video, 82 seconds"
        />
      </div>
      <div className={s.renderNotes}>
        <p className={s.notesHead}>
          <span className={s.dot} aria-hidden />
          My notes on the render
        </p>
        <ul>
          {RENDER_NOTES.map((n) => (
            <li key={n}>
              <span className={s.check} aria-hidden>
                ✓
              </span>
              {n}
            </li>
          ))}
        </ul>
        <p className={s.renderFoot}>Every note was fixed and re-rendered from the same script.</p>
      </div>
    </div>
  )
}

/* ---- The workflow packaged as skills ------------------------------------ */

const SKILLS = [
  {
    id: 'video-recut',
    group: 'Studio',
    from: 'An existing video, or photos and a voiceover',
    makes: 'A new edit in a look taken from a reference',
  },
  {
    id: 'script-to-video',
    group: 'Studio',
    from: 'A script and images, with the voiceover recorded later',
    makes: 'A timed draft now that re-syncs to the real voiceover',
  },
  {
    id: 'site-to-video',
    group: 'Studio',
    from: 'A website’s code, brand and pages',
    makes: 'A promo in 9:16 and 16:9 from one script',
  },
  {
    id: 'new-style-video',
    group: 'Shareable',
    from: 'A reference link, video or screenshots, plus the creator’s material',
    makes: 'The video, plus a style pack so the look can be reused',
  },
  {
    id: 'repeat-style-video',
    group: 'Shareable',
    from: 'A saved style pack and new material',
    makes: 'A new video in a look that already exists',
  },
]

const STEPS = [
  { title: 'Ask', text: 'One short batch of questions, only for what’s missing, each with a default.' },
  { title: 'Study', text: 'Download the reference and look at a frame every half second.' },
  { title: 'Approve', text: 'Show a style guide and shot list, then wait for a yes.', gate: true },
  { title: 'Build', text: 'Write the video as code, check stills, render and deliver.' },
]

export function SkillPicker() {
  const [i, setI] = useState(0)
  const { refs, onKeyDown } = useRovingKeys(SKILLS.length, i, setI)
  const skill = SKILLS[i]
  return (
    <div className={s.skills}>
      <div className={s.skillList} role="radiogroup" aria-label="Skill" onKeyDown={onKeyDown}>
        {SKILLS.map((x, j) => (
          <button
            key={x.id}
            ref={(el) => {
              refs.current[j] = el
            }}
            type="button"
            role="radio"
            aria-checked={i === j}
            tabIndex={i === j ? 0 : -1}
            onClick={() => setI(j)}
          >
            <span className={s.skillGroup}>{x.group}</span>
            <code>{x.id}</code>
          </button>
        ))}
      </div>
      <div className={s.skillCard}>
        <dl>
          <div>
            <dt>Starts from</dt>
            <dd>{skill.from}</dd>
          </div>
          <div>
            <dt>Hands back</dt>
            <dd>{skill.makes}</dd>
          </div>
        </dl>
        <ol className={s.skillSteps}>
          {STEPS.map((st, n) => (
            <li key={st.title} data-gate={st.gate ?? false}>
              <span className={s.stepNum}>{n + 1}</span>
              <strong>{st.title}</strong>
              <span>{st.text}</span>
            </li>
          ))}
        </ol>
        <p className={s.skillFoot}>
          {skill.group === 'Shareable'
            ? 'Self-contained, so a creator can upload it and run it without me.'
            : 'Runs from my studio folder and follows each client’s saved profile.'}
        </p>
      </div>
    </div>
  )
}
