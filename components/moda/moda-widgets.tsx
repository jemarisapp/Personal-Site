'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import s from './moda.module.css'

const asset = (name: string) => `/work/camp-moda/${name}`

/* ---- Logo versions ------------------------------------------------------ */

// The six approved lockups from the identity guide, grouped by the
// background each one was made for.
const BACKGROUNDS = [
  {
    id: 'black',
    label: 'Black',
    swatch: '#000',
    versions: [
      { label: 'White', src: asset('logo-00.webp') },
      { label: 'Full color', src: asset('logo-02.webp') },
    ],
  },
  {
    id: 'red',
    label: 'Red',
    swatch: '#e8002d',
    versions: [{ label: 'White', src: asset('logo-01.webp') }],
  },
  {
    id: 'white',
    label: 'White',
    swatch: '#fff',
    versions: [
      { label: 'Black', src: asset('logo-10.webp') },
      { label: 'Red', src: asset('logo-11.webp') },
      { label: 'Full color', src: asset('logo-12.webp') },
    ],
  },
]

export function ModaLogos() {
  const [bg, setBg] = useState(0)
  const [version, setVersion] = useState(0)
  const reduceMotion = useReducedMotion()
  const current = BACKGROUNDS[bg]
  const v = current.versions[Math.min(version, current.versions.length - 1)]

  return (
    <div className={s.logos}>
      <div className={s.logoStage}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={v.src}
            src={v.src}
            alt={`Camp MODA logo, ${v.label.toLowerCase()} on ${current.label.toLowerCase()}`}
            className={s.logoTile}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
      </div>

      <div className={s.logoControls}>
        <fieldset>
          <legend>Background</legend>
          <div className={s.swatches}>
            {BACKGROUNDS.map((b, i) => (
              <button
                key={b.id}
                type="button"
                className={s.swatch}
                style={{ '--swatch': b.swatch } as CSSProperties}
                aria-pressed={bg === i}
                onClick={() => {
                  setBg(i)
                  setVersion(0)
                }}
              >
                <span className={s.swatchChip} aria-hidden />
                {b.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Logo</legend>
          <div className={s.chips}>
            {current.versions.map((x, i) => (
              <button key={x.label} type="button" className={s.chip} aria-pressed={v === x} onClick={() => setVersion(i)}>
                {x.label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className={s.note}>
          {current.versions.length === 1
            ? `There is one version made for ${current.label.toLowerCase()}.`
            : `${current.versions.length} versions are made for ${current.label.toLowerCase()}.`}
        </p>
      </div>
    </div>
  )
}

/* ---- Monster select ----------------------------------------------------- */

const MONSTERS = [
  { name: 'Red', color: '#ff3b4f', src: asset('monster-red.webp') },
  { name: 'Orange', color: '#ff7a45', src: asset('monster-orange.webp') },
  { name: 'Purple', color: '#8a6bff', src: asset('monster-purple.webp'), video: asset('monster-walk.mp4') },
  { name: 'Yellow', color: '#ffc23d', src: asset('monster-yellow.webp') },
]

export function ModaMonsters() {
  const [i, setI] = useState(2)
  const reduceMotion = useReducedMotion()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const m = MONSTERS[i]

  const onKeyDown = (e: KeyboardEvent) => {
    const next =
      e.key === 'ArrowRight' ? (i + 1) % MONSTERS.length : e.key === 'ArrowLeft' ? (i - 1 + MONSTERS.length) % MONSTERS.length : null
    if (next === null) return
    e.preventDefault()
    setI(next)
    refs.current[next]?.focus()
  }

  return (
    <div className={s.arena} style={{ '--monster': m.color } as CSSProperties}>
      <div className={s.spotlight} aria-hidden />
      <div className={s.hero} aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={m.name}
            className={s.heroMonster}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.9 }}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 18 }}
          >
            {m.video && !reduceMotion ? (
              <video src={m.video} poster={m.src} autoPlay muted loop playsInline aria-label={`${m.name} monster walking`} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.src} alt={`${m.name} MODA monster`} data-bob={!reduceMotion} />
            )}
          </motion.div>
        </AnimatePresence>
        <p className={s.monsterName}>{m.name}</p>
      </div>

      <div className={s.roster} role="radiogroup" aria-label="Choose a monster" onKeyDown={onKeyDown}>
        {MONSTERS.map((x, j) => (
          <button
            key={x.name}
            ref={(el) => {
              refs.current[j] = el
            }}
            type="button"
            role="radio"
            aria-checked={i === j}
            aria-label={x.name}
            tabIndex={i === j ? 0 : -1}
            className={s.slot}
            style={{ '--monster': x.color } as CSSProperties}
            onClick={() => setI(j)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={x.src} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---- Tee viewer --------------------------------------------------------- */

// Shirt shape and fabric shading come from the original mockup file and are
// shared by every tee on the site.
const SHIRT = {
  front: { ratio: 2419 / 2153 },
  back: { ratio: 2498 / 2170 },
} as const

export type Garment = { name: string; color: string; ink: 'dark' | 'light' }
type Placement = { left: number; top: number; width: number }
export type TeeConfig = {
  label: string
  garments: Garment[]
  // Print artwork per side; {ink} is replaced with the garment's ink.
  prints: { front: string; back: string }
  placement: { front: Placement; back: Placement }
}

function Tee({ side, garment, config }: { side: 'front' | 'back'; garment: Garment; config: TeeConfig }) {
  const d = config.placement[side]
  const shape = asset(`tee-${side}-shape.webp`)
  return (
    <div
      className={s.tee}
      style={{ aspectRatio: SHIRT[side].ratio, '--garment': garment.color, '--shape': `url(${shape})` } as CSSProperties}
    >
      <div className={s.teeBase} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={s.teePrint}
        src={config.prints[side].replace('{ink}', garment.ink)}
        alt=""
        data-ink={garment.ink}
        style={{ left: `${d.left * 100}%`, top: `${d.top * 100}%`, width: `${d.width * 100}%` }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.teeShadows} src={asset(`tee-${side}-shadows.webp`)} alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.teeHighlights} src={asset(`tee-${side}-highlights.webp`)} alt="" />
    </div>
  )
}

export function TeeViewer({ config }: { config: TeeConfig }) {
  const [g, setG] = useState(0)
  const [back, setBack] = useState(true)
  const garment = config.garments[g]

  return (
    <div className={s.merch} data-light={garment.ink === 'light'}>
      <button
        type="button"
        className={s.teeStage}
        onClick={() => setBack((b) => !b)}
        aria-label={`${config.label}, ${garment.name}, ${back ? 'back' : 'front'}. Turn it around.`}
      >
        <div className={s.teeCard} data-back={back}>
          <div className={s.teeFace}>
            <Tee side="front" garment={garment} config={config} />
          </div>
          <div className={s.teeFace} data-side="back">
            <Tee side="back" garment={garment} config={config} />
          </div>
        </div>
      </button>

      <div className={s.teeControls}>
        <div className={s.swatches} role="radiogroup" aria-label="Shirt color">
          {config.garments.map((x, i) => (
            <button
              key={x.name}
              type="button"
              role="radio"
              aria-checked={g === i}
              className={s.swatch}
              style={{ '--swatch': x.color } as CSSProperties}
              onClick={() => setG(i)}
            >
              <span className={s.swatchChip} aria-hidden />
              {x.name}
            </button>
          ))}
        </div>
        <button type="button" className={s.chip} onClick={() => setBack((b) => !b)}>
          {back ? 'Show the front' : 'Show the back'}
        </button>
      </div>
    </div>
  )
}

const MODA_TEE: TeeConfig = {
  label: 'Camp MODA tee',
  garments: [
    { name: 'Black', color: '#141414', ink: 'dark' },
    { name: 'Navy', color: '#1d2742', ink: 'dark' },
    { name: 'Heather', color: '#cfcfcc', ink: 'light' },
    { name: 'White', color: '#f3f3f1', ink: 'light' },
  ],
  prints: { front: asset('shirt-front-{ink}.webp'), back: asset('shirt-back-{ink}.webp') },
  placement: {
    front: { left: 0.5378, top: 0.248, width: 0.1711 },
    back: { left: 0.2616, top: 0.173, width: 0.477 },
  },
}

export function ModaTee() {
  return <TeeViewer config={MODA_TEE} />
}

const WELCH_TEE: TeeConfig = {
  label: 'Welch School tee',
  // The blue and black print only reads on light fabric.
  garments: [
    { name: 'White', color: '#f3f3f1', ink: 'light' },
    { name: 'Heather', color: '#cfcfcc', ink: 'light' },
    { name: 'Sky', color: '#c4d6ee', ink: 'light' },
  ],
  prints: { front: '/work/welch-tee/print-front.webp', back: '/work/welch-tee/print-back.webp' },
  placement: {
    front: { left: 0.535, top: 0.24, width: 0.2 },
    back: { left: 0.27, top: 0.14, width: 0.46 },
  },
}

export function WelchTee() {
  return <TeeViewer config={WELCH_TEE} />
}
