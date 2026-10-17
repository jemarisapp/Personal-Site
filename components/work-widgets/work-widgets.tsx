'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import s from './work-widgets.module.css'

const yt = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`

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

/* ---- Fast X single release system -------------------------------------- */

const SINGLES = [
  { title: 'Gasolina', cover: '/work/fast-x/gasolina.webp', video: 'ge4LwqkpzNc' },
  { title: 'Angel', cover: '/fast-x/angel.avif', video: 'V3UVnMBKnpI' },
  { title: 'Won’t Back Down', cover: '/fast-x/wbd.avif', video: 'EqOUInoLiw4' },
  { title: 'Toretto', cover: '/fast-x/toretto.avif', video: 'IszYmtCaCJc' },
]

export function FastXSingles() {
  const [i, setI] = useState(0)
  const { refs, onKeyDown } = useRovingKeys(SINGLES.length, i, setI)
  const single = SINGLES[i]
  return (
    <div className={s.singles}>
      <div className={s.singlePair}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={single.cover} alt={`${single.title} single cover`} className={s.singleCover} key={single.cover} />
        <div className={s.singleMotion}>
          <iframe
            key={single.video}
            src={yt(single.video)}
            title={`${single.title} motion visual`}
            allow="autoplay; encrypted-media"
            loading="lazy"
          />
        </div>
      </div>
      <div className={s.picker} role="radiogroup" aria-label="Single" onKeyDown={onKeyDown}>
        {SINGLES.map((x, j) => (
          <button
            key={x.title}
            ref={(el) => {
              refs.current[j] = el
            }}
            type="button"
            role="radio"
            aria-checked={i === j}
            tabIndex={i === j ? 0 : -1}
            className={s.pick}
            onClick={() => setI(j)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={x.cover} alt="" />
            <span>{x.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---- Sonic: Ideal / Freak ---------------------------------------------- */

const SONIC_SCREENS = ['launch', 'home', 'training', 'calendar', 'menu'] as const
const SONIC_LABELS: Record<(typeof SONIC_SCREENS)[number], string> = {
  launch: 'Launch',
  home: 'Home',
  training: 'Training',
  calendar: 'Calendar',
  menu: 'Menu',
}

export function SonicSwitch() {
  const [freak, setFreak] = useState(false)
  const [screen, setScreen] = useState<(typeof SONIC_SCREENS)[number]>('home')
  const reduceMotion = useReducedMotion()
  const side = freak ? 'freak' : 'ideal'
  const fade = {
    initial: { opacity: 0, scale: reduceMotion ? 1 : 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.35 },
  }

  return (
    <div className={s.sonic} data-side={side}>
      <div className={s.sonicSwitch} role="radiogroup" aria-label="Version">
        <button type="button" role="radio" aria-checked={!freak} onClick={() => setFreak(false)}>
          Ideal
        </button>
        <button type="button" role="radio" aria-checked={freak} onClick={() => setFreak(true)}>
          Freak
        </button>
      </div>

      <div className={s.sonicStage}>
        <div className={s.sonicPoster}>
          <AnimatePresence mode="popLayout" initial={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img key={side} src={`/work/sonic/${side}-poster.webp`} alt={`${side} poster`} {...fade} />
          </AnimatePresence>
        </div>
        <div className={s.sonicShoe}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.video
              key={side}
              src={`/work/sonic/${side}-shoe-v2.mp4`}
              poster={`/work/sonic/${side}-shoe-v2.webp`}
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              aria-label={`${side} sneaker turning on a pedestal`}
              {...fade}
            />
          </AnimatePresence>
        </div>
        <div className={s.sonicPhone}>
          <AnimatePresence mode="popLayout" initial={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={`${side}-${screen}`}
              src={`/work/sonic/${side}-${screen}.webp`}
              alt={`${side} app, ${SONIC_LABELS[screen]} screen`}
              {...fade}
            />
          </AnimatePresence>
          <div className={s.sonicTabs} role="tablist" aria-label="App screen">
            {SONIC_SCREENS.map((sc) => (
              <button key={sc} type="button" role="tab" aria-selected={sc === screen} onClick={() => setScreen(sc)}>
                {SONIC_LABELS[sc]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Sweet Beijing app prototype ---------------------------------------- */

const SB_SCREENS = [
  { id: 'login', label: 'Sign in', note: 'Sign in with an account, or with Google, Apple, or Facebook.' },
  { id: 'home', label: 'Home', note: 'Featured bakeries, pastries for each season, and featured pastries.' },
  { id: 'choices', label: 'Your choices', note: 'Saved favorites and lists open over the home screen.' },
  { id: 'profile', label: 'Profile', note: 'The profile menu slides in from the side.' },
  { id: 'storefront', label: 'Storefront', note: 'Each bakery has its hours, ratings, and the story behind it.' },
  { id: 'festivals', label: 'Festivals', note: 'Pastries tied to Beijing’s seasonal festivals, with their history.' },
  { id: 'pastries', label: 'Seasonal pastries', note: 'Every pastry for the season, rated by visitors.' },
  { id: 'pastry', label: 'Pastry', note: 'What a pastry is and where it comes from.' },
  { id: 'recipe', label: 'Recipe', note: 'Ingredients up front, then the cooking method step by step.' },
  { id: 'search', label: 'Search', note: 'Search by pastry, like mooncakes.' },
  { id: 'notifications', label: 'Notifications', note: 'Updates from bakeries and friends.' },
  { id: 'community', label: 'Community', note: 'Visitors share photos and reviews.' },
]

export function SweetBeijingApp() {
  const [i, setI] = useState(1)
  const [dir, setDir] = useState(1)
  const reduceMotion = useReducedMotion()
  const go = (n: number) => {
    const next = (n + SB_SCREENS.length) % SB_SCREENS.length
    setDir(next > i ? 1 : -1)
    setI(next)
  }
  const { refs, onKeyDown } = useRovingKeys(SB_SCREENS.length, i, go)
  const sc = SB_SCREENS[i]

  return (
    <div className={s.sb}>
      <button type="button" className={s.sbPhone} onClick={() => go(i + 1)} aria-label={`${sc.label} screen. Tap for the next screen.`}>
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={sc.id}
            src={`/work/sweet-beijing/screen-${sc.id}.webp`}
            alt=""
            custom={dir}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.3, ease: [0.3, 0.7, 0.2, 1] }}
          />
        </AnimatePresence>
      </button>

      <div className={s.sbSide}>
        <p className={s.sbNote} aria-live="polite">
          <strong>{sc.label}.</strong> {sc.note}
        </p>
        <ol className={s.sbList} role="radiogroup" aria-label="App screens" onKeyDown={onKeyDown}>
          {SB_SCREENS.map((x, j) => (
            <li key={x.id}>
              <button
                ref={(el) => {
                  refs.current[j] = el
                }}
                type="button"
                role="radio"
                aria-checked={i === j}
                tabIndex={i === j ? 0 : -1}
                onClick={() => go(j)}
              >
                {x.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function VideoPhone({ youtube, title }: { youtube: string; title: string }) {
  return (
    <div className={s.phoneVideo} style={{ '--ratio': 9 / 16 } as CSSProperties}>
      <iframe src={yt(youtube)} title={title} allow="autoplay; encrypted-media" loading="lazy" />
    </div>
  )
}

/* ---- Trilo: screenshot to matchups --------------------------------------- */

export function TriloExtract() {
  const [state, setState] = useState<'idle' | 'scanning' | 'done'>('idle')
  const reduceMotion = useReducedMotion()
  const run = () => {
    setState('scanning')
    window.setTimeout(() => setState('done'), reduceMotion ? 0 : 1600)
  }
  return (
    <div className={s.trilo}>
      <figure className={s.triloShot} data-state={state}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/trilo/schedule.jpg" alt="Screenshot of a season schedule from the game" />
        <span className={s.scan} aria-hidden />
        <figcaption>Schedule screenshot</figcaption>
      </figure>
      <div className={s.triloArrow} aria-hidden>
        →
      </div>
      <figure className={s.triloResult} data-state={state}>
        {state === 'done' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/trilo/matchups-list.jpg" alt="Matchups Trilo created in Discord from the screenshot" />
        ) : (
          <div className={s.triloEmpty}>{state === 'scanning' ? 'Reading the schedule…' : 'Matchups appear here'}</div>
        )}
        <figcaption>Matchups in Discord</figcaption>
      </figure>
      <div className={s.triloActions}>
        {state === 'done' ? (
          <button type="button" onClick={() => setState('idle')}>
            Reset
          </button>
        ) : (
          <button type="button" onClick={run} disabled={state === 'scanning'}>
            Extract matchups
          </button>
        )}
      </div>
    </div>
  )
}

/* ---- TRISP Studio: site tour and clients --------------------------------- */

const TRISP_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'studio', label: 'The studio' },
  { id: 'creative', label: 'Creative services' },
  { id: 'cover-art', label: 'Cover art' },
  { id: 'portraits', label: 'Photography' },
  { id: 'direction', label: 'Creative direction' },
]

export function TrispTour() {
  const [i, setI] = useState(0)
  const [phone, setPhone] = useState(false)
  const { refs, onKeyDown } = useRovingKeys(TRISP_SECTIONS.length, i, (n) => {
    setPhone(false)
    setI(n)
  })
  const sec = TRISP_SECTIONS[i]
  return (
    <div className={s.trisp}>
      <div className={s.trispTabs} role="radiogroup" aria-label="Site section" onKeyDown={onKeyDown}>
        {TRISP_SECTIONS.map((x, j) => (
          <button
            key={x.id}
            ref={(el) => {
              refs.current[j] = el
            }}
            type="button"
            role="radio"
            aria-checked={!phone && i === j}
            tabIndex={i === j ? 0 : -1}
            onClick={() => {
              setPhone(false)
              setI(j)
            }}
          >
            {x.label}
          </button>
        ))}
        <button type="button" role="radio" aria-checked={phone} onClick={() => setPhone(true)}>
          On a phone
        </button>
      </div>

      {phone ? (
        <div className={s.trispPhone}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/trisp-studio/site-phone.webp" alt="trispstudio.com on a phone" />
        </div>
      ) : (
        <div className={s.browser}>
          <div className={s.browserBar} aria-hidden>
            <span />
            <span />
            <span />
            <em>trispstudio.com</em>
          </div>
          <div className={s.browserView}>
            {TRISP_SECTIONS.map((x) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={x.id}
                src={`/work/trisp-studio/site-${x.id}.webp`}
                alt={x.id === sec.id ? `trispstudio.com, ${x.label} section` : ''}
                data-on={x.id === sec.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const TRISP_CLIENTS = ['apg', 'ar', 'cap', 'motown', 'umg', 'sony', 'int', 'emp', 'dj', 'cin', 'cm', 'ff', 'sniipes']

export function TrispClients() {
  return (
    <ul className={s.logoWall} aria-label="Clients and labels TRISP has worked with">
      {TRISP_CLIENTS.map((c) => (
        <li key={c}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/work/trisp-studio/logos/${c}.webp`} alt="" />
        </li>
      ))}
    </ul>
  )
}
