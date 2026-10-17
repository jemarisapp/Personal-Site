'use client'

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import s from './yellowstone.module.css'

const img = (name: string) => `/work/yellowstone/${name}.webp`

type PieceId = 'sheet' | 'checklist' | 'places' | 'historic'

const PIECES: { id: PieceId; name: string; src: string; ratio: number }[] = [
  { id: 'sheet', name: 'Park sheet', src: img('sheet-front'), ratio: 2 / 3 },
  { id: 'checklist', name: 'Checklist', src: img('checklist'), ratio: 900 / 1977 },
  { id: 'places', name: 'Places to visit', src: img('places'), ratio: 1800 / 1273 },
  { id: 'historic', name: 'Historic destinations', src: img('historic'), ratio: 1800 / 1273 },
]

export function YellowstonePacket() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<PieceId | null>(null)
  const reduceMotion = !!useReducedMotion()
  const piece = PIECES.find((p) => p.id === active)

  // Escape puts the piece back in its pocket.
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <LayoutGroup>
      <div className={s.root} data-motion={!reduceMotion}>
        <div className={s.stage}>
          <AnimatePresence mode="popLayout" initial={false}>
            {piece ? (
              <Viewer key={piece.id} piece={piece} onClose={() => setActive(null)} reduceMotion={reduceMotion} />
            ) : (
              <motion.div
                key="folder"
                className={s.folder}
                data-open={open}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Panel side="left" visible={open}>
                  <Pocket pieces={['sheet', 'checklist']} onPick={setActive} visible={open} />
                </Panel>
                <Panel side="right" visible>
                  <Pocket pieces={['places', 'historic']} onPick={setActive} visible={open} />
                </Panel>

                {/* The cover swings open on its spine like the real folder. */}
                <button
                  type="button"
                  className={s.cover}
                  data-open={open}
                  onClick={() => setOpen((o) => !o)}
                  aria-label={open ? 'Close the packet' : 'Open the packet'}
                  aria-expanded={open}
                >
                  <span className={s.coverFront}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img('label')} alt="" className={s.label} />
                    <span className={s.openTag}>Open the packet</span>
                  </span>
                  <span className={s.coverBack} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className={s.help} aria-live="polite">
          {piece
            ? 'Press Escape or Back to packet to put it away.'
            : open
              ? 'Pull a piece out of its pocket to look closer.'
              : 'Tap the folder to open it.'}
        </p>
      </div>
    </LayoutGroup>
  )
}

function Panel({ side, visible, children }: { side: 'left' | 'right'; visible: boolean; children: ReactNode }) {
  return (
    <div className={s.panel} data-side={side} data-visible={visible}>
      {children}
    </div>
  )
}

function Pocket({
  pieces,
  onPick,
  visible,
}: {
  pieces: PieceId[]
  onPick: (id: PieceId) => void
  visible: boolean
}) {
  return (
    <div className={s.pocketArea} data-visible={visible}>
      {pieces.map((id, i) => {
        const p = PIECES.find((x) => x.id === id)!
        return (
          <motion.button
            key={id}
            layoutId={`piece-${id}`}
            type="button"
            className={s.tuck}
            data-piece={id}
            data-index={i}
            onClick={() => onPick(id)}
            tabIndex={visible ? 0 : -1}
            aria-label={`Pull out the ${p.name.toLowerCase()}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt="" draggable={false} />
            <span className={s.tuckName}>{p.name}</span>
          </motion.button>
        )
      })}
      <div className={s.pocket} aria-hidden />
    </div>
  )
}

function Viewer({
  piece,
  onClose,
  reduceMotion,
}: {
  piece: (typeof PIECES)[number]
  onClose: () => void
  reduceMotion: boolean
}) {
  return (
    <motion.div
      className={s.viewer}
      initial={{ opacity: reduceMotion ? 0 : 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className={s.back} onClick={onClose}>
        <span aria-hidden>‹</span> Back to packet
      </button>
      {piece.id === 'sheet' && <SheetPiece />}
      {piece.id === 'checklist' && <ChecklistPiece />}
      {piece.id === 'places' && <PlacesPiece />}
      {piece.id === 'historic' && <HistoricPiece />}
    </motion.div>
  )
}

function Frame({ id, ratio, children }: { id: PieceId; ratio: number; children: ReactNode }) {
  return (
    <motion.div
      layoutId={`piece-${id}`}
      className={s.frame}
      style={{ '--ratio': ratio } as CSSProperties}
      transition={{ type: 'spring', stiffness: 260, damping: 32 }}
    >
      {children}
    </motion.div>
  )
}

function Actions({ children }: { children: ReactNode }) {
  return <div className={s.actions}>{children}</div>
}

/* ---- Accordion fold ---------------------------------------------------- */

// Panels are nested so each hinges on the edge of the one before it, which is
// what makes a zigzag fold collapse and spread like paper.
function Fold({
  src,
  panels,
  axis,
  open,
}: {
  src: string
  panels: number
  axis: 'x' | 'y'
  open: boolean
}) {
  const panel = (k: number): ReactNode => {
    if (k >= panels) return null
    const folded = k === 0 ? 0 : k % 2 ? 172 : -172
    const angle = open ? 0 : folded
    const pos = panels === 1 ? 0 : (k / (panels - 1)) * 100
    return (
      <div
        className={s.foldPanel}
        data-axis={axis}
        data-first={k === 0}
        style={{
          transform: axis === 'x' ? `rotateY(${angle}deg)` : `rotateX(${-angle}deg)`,
          transitionDelay: `${(open ? k : panels - k) * 70}ms`,
          ...(k === 0
            ? axis === 'x'
              ? { width: `${100 / panels}%`, height: '100%' }
              : { width: '100%', height: `${100 / panels}%` }
            : {}),
        }}
      >
        <div
          className={s.foldFace}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: axis === 'x' ? `${panels * 100}% 100%` : `100% ${panels * 100}%`,
            backgroundPosition: axis === 'x' ? `${pos}% 0` : `0 ${pos}%`,
          }}
        />
        <div className={s.foldBack} />
        {panel(k + 1)}
      </div>
    )
  }
  return (
    <div
      className={s.fold}
      data-axis={axis}
      style={{
        // Keep the folded stack centered in the frame.
        transform: open
          ? 'none'
          : axis === 'x'
            ? `translateX(${((panels - 1) / panels / 2) * 100}%)`
            : `translateY(${((panels - 1) / panels / 2) * 100}%)`,
      }}
    >
      {panel(0)}
    </div>
  )
}

/* ---- Pieces ------------------------------------------------------------- */

function SheetPiece() {
  const [state, setState] = useState<'folded' | 'open' | 'map'>('folded')
  const advance = () => setState((st) => (st === 'folded' ? 'open' : st === 'open' ? 'map' : 'open'))
  return (
    <>
      <Frame id="sheet" ratio={2 / 3}>
        <button type="button" className={s.hit} onClick={advance} aria-label="Unfold or flip the park sheet">
          <div className={s.flipCard} data-flipped={state === 'map'}>
            <div className={s.flipFace}>
              {/* Once flat, a plain image stands in so the folds can't show
                  through while the sheet turns over. */}
              {state === 'map' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img('sheet-front')} alt="" />
              ) : (
                <Fold src={img('sheet-front')} panels={3} axis="y" open={state !== 'folded'} />
              )}
            </div>
            <div className={s.flipFace} data-side="back">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img('sheet-back')} alt="" />
            </div>
          </div>
        </button>
      </Frame>
      <Actions>
        {state === 'folded' && <button type="button" onClick={() => setState('open')}>Unfold the sheet</button>}
        {state === 'open' && <button type="button" onClick={() => setState('map')}>Turn over for the map</button>}
        {state === 'map' && <button type="button" onClick={() => setState('open')}>Turn back to the front</button>}
        {state !== 'folded' && (
          <button type="button" data-quiet onClick={() => setState('folded')}>
            Fold it up
          </button>
        )}
      </Actions>
    </>
  )
}

function PlacesPiece() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Frame id="places" ratio={1800 / 1273}>
        <button type="button" className={s.hit} onClick={() => setOpen((o) => !o)} aria-label={open ? 'Fold the places to visit card' : 'Unfold the places to visit card'}>
          <Fold src={img('places')} panels={3} axis="x" open={open} />
        </button>
      </Frame>
      <Actions>
        <button type="button" onClick={() => setOpen((o) => !o)}>
          {open ? 'Fold it up' : 'Unfold the card'}
        </button>
      </Actions>
    </>
  )
}

// Four flaps over the landmark photos, measured from the printed piece as
// fractions of its width and height.
const FLAPS = [
  { name: 'Lake Hotel', x: 0.02, y: 0.045, w: 0.48, h: 0.57, hinge: 'left' },
  { name: 'Lamar Buffalo Ranch', x: 0.5, y: 0.045, w: 0.485, h: 0.57, hinge: 'right' },
  { name: 'Fort Yellowstone', x: 0.02, y: 0.615, w: 0.48, h: 0.38, hinge: 'left' },
  { name: 'Northeast Entrance', x: 0.5, y: 0.615, w: 0.485, h: 0.38, hinge: 'right' },
] as const

function region(src: string, r: { x: number; y: number; w: number; h: number }): CSSProperties {
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: `${100 / r.w}% ${100 / r.h}%`,
    backgroundPosition: `${r.w >= 1 ? 0 : (r.x / (1 - r.w)) * 100}% ${r.h >= 1 ? 0 : (r.y / (1 - r.h)) * 100}%`,
  }
}

function HistoricPiece() {
  const [lifted, setLifted] = useState<boolean[]>([false, false, false, false])
  const all = lifted.every(Boolean)
  return (
    <>
      <Frame id="historic" ratio={1800 / 1273}>
        <div className={s.historic}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img('historic-under')} alt="" className={s.under} />
          <div className={s.header} style={{ ...region(img('historic'), { x: 0, y: 0, w: 1, h: 0.045 }), height: '4.5%' }} />
          {FLAPS.map((f, i) => (
            <button
              key={f.name}
              type="button"
              className={s.flap}
              data-hinge={f.hinge}
              data-lifted={lifted[i]}
              style={{ left: `${f.x * 100}%`, top: `${f.y * 100}%`, width: `${f.w * 100}%`, height: `${f.h * 100}%` }}
              onClick={() => setLifted((l) => l.map((v, j) => (j === i ? !v : v)))}
              aria-pressed={lifted[i]}
              aria-label={`${lifted[i] ? 'Close' : 'Lift'} the ${f.name} flap`}
            >
              <span className={s.flapFace} style={region(img('historic'), f)} />
              <span className={s.flapBack} style={region(img('historic-back'), f)} />
            </button>
          ))}
        </div>
      </Frame>
      <Actions>
        <button type="button" onClick={() => setLifted([!all, !all, !all, !all])}>
          {all ? 'Close all flaps' : 'Lift all flaps'}
        </button>
      </Actions>
    </>
  )
}

// Checkbox positions detected from the printed checklist, as fractions.
const CHECKS = [
  { name: 'Pebble Creek', x: 0.11, y: 0.564, w: 0.29 },
  { name: 'Indian Creek', x: 0.4544, y: 0.564, w: 0.29 },
  { name: 'Slough Creek', x: 0.11, y: 0.6019, w: 0.3 },
  { name: 'Grant Village', x: 0.11, y: 0.7456, w: 0.31 },
  { name: 'Bridge Bay Marina', x: 0.11, y: 0.7835, w: 0.55 },
  { name: 'Lake Yellowstone', x: 0.11, y: 0.9262, w: 0.4 },
  { name: 'Lewis Lake', x: 0.5356, y: 0.9262, w: 0.27 },
  { name: 'Heart Lake', x: 0.11, y: 0.9641, w: 0.26 },
]
const STORE = 'yellowstone-checklist'

function ChecklistPiece() {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState<string[]>([])

  // The ticks are a per-visitor nicety, so a blocked store just means they
  // don't persist.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) ?? '[]')
      if (Array.isArray(saved)) setDone(saved)
    } catch {}
  }, [])

  const toggle = (name: string) => {
    setDone((d) => {
      const nextDone = d.includes(name) ? d.filter((x) => x !== name) : [...d, name]
      try {
        localStorage.setItem(STORE, JSON.stringify(nextDone))
      } catch {}
      return nextDone
    })
  }

  return (
    <>
      <Frame id="checklist" ratio={900 / 1977}>
        <div className={s.checklist}>
          <Fold src={img('checklist')} panels={4} axis="y" open={open} />
          {!open && (
            <button type="button" className={s.hit} onClick={() => setOpen(true)} aria-label="Unfold the checklist" />
          )}
          {open &&
            CHECKS.map((c) => {
              const on = done.includes(c.name)
              return (
                <button
                  key={c.name}
                  type="button"
                  className={s.check}
                  style={
                    {
                      left: `${(c.x - 0.012) * 100}%`,
                      top: `${(c.y - 0.006) * 100}%`,
                      width: `${c.w * 100}%`,
                      // Where the printed box sits inside the hit area.
                      '--box-left': `${(0.012 / c.w) * 100}%`,
                      '--box': `${(0.0378 / c.w) * 100}%`,
                    } as CSSProperties
                  }
                  onClick={() => toggle(c.name)}
                  role="checkbox"
                  aria-checked={on}
                  aria-label={c.name}
                >
                  <svg viewBox="0 0 24 24" className={s.tick} data-on={on} aria-hidden>
                    <path d="M4 13 L10 19 L21 5" />
                  </svg>
                </button>
              )
            })}
        </div>
      </Frame>
      <Actions>
        {open ? (
          <>
            <p className={s.count}>
              {done.length} of {CHECKS.length} found
            </p>
            <button type="button" data-quiet onClick={() => setOpen(false)}>
              Fold it up
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setOpen(true)}>
            Unfold the checklist
          </button>
        )}
      </Actions>
    </>
  )
}
