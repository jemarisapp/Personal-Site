'use client'

import { useReducedMotion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'
import s from './flipbook.module.css'

// A leaf is one sheet of paper: a front (right-hand page) and a back (the
// left-hand page once it is turned). A leaf can carry a gatefold flap hinged
// on its outer edge that folds in over its front.
export type Leaf = {
  front: string
  back: string
  flap?: {
    // Seen while folded shut over the page.
    closed: string
    // Seen once unfolded, extending the spread to three pages.
    open: string
  }
}

type Step = { turned: number; flap: boolean }

type Drag = {
  target: 'leaf' | 'flap'
  leaf: number
  base: number
  angle: number
  startX: number
  moved: boolean
}

const TURN_MS = 850
const FLAP_MS = 650

export function Flipbook({
  leaves,
  ratio,
  label,
  stepLabel,
}: {
  leaves: Leaf[]
  // Page width divided by page height.
  ratio: number
  label: string
  // Describes what is visible at a step, for the caption and screen readers.
  stepLabel: (step: Step) => string
}) {
  const reduceMotion = useReducedMotion()
  const n = leaves.length
  const flapLeaf = leaves.findIndex((l) => l.flap)

  // Every reachable view in reading order. Unfolding the flap is its own step.
  const steps = useMemo(() => {
    const out: Step[] = []
    for (let t = 0; t <= n; t++) {
      out.push({ turned: t, flap: false })
      if (t === flapLeaf) out.push({ turned: t, flap: true })
    }
    return out
  }, [n, flapLeaf])

  const [turned, setTurned] = useState(0)
  const [flapOpen, setFlapOpen] = useState(false)
  const [animating, setAnimating] = useState<number | null>(null)
  const [drag, setDrag] = useState<Drag | null>(null)
  const [peek, setPeek] = useState<'left' | 'right' | null>(null)
  const [size, setSize] = useState({ page: 0, scale: 1 })

  const stageRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  const stepIndex = steps.findIndex((x) => x.turned === turned && x.flap === flapOpen)
  const current = steps[stepIndex]

  // Size pages to the available box. The unfolded flap needs three pages of
  // width, so the whole book scales down while it is open if space is short.
  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const maxH = Math.min(window.innerHeight * 0.74, 860)
      const page = Math.floor(Math.min(w / 2, maxH * ratio))
      setSize((prev) => ({ ...prev, page }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [ratio])

  const width = stageRef.current?.clientWidth ?? 0
  const scale = flapOpen && size.page * 3 > width && width > 0 ? width / (size.page * 3) : 1
  const pageH = size.page / ratio

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, reduceMotion ? 0 : ms))
  }

  const turnTo = useCallback(
    (t: number) => {
      const moving = t > turned ? turned : t
      setAnimating(moving)
      setTurned(t)
      later(() => setAnimating((a) => (a === moving ? null : a)), TURN_MS)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turned, reduceMotion],
  )

  const goTo = useCallback(
    (i: number) => {
      const target = steps[Math.max(0, Math.min(steps.length - 1, i))]
      if (!target || (target.turned === turned && target.flap === flapOpen)) return
      if (target.turned === turned) {
        setFlapOpen(target.flap)
        return
      }
      // A page can't turn with the flap hanging out: fold it first, then turn.
      if (flapOpen) {
        setFlapOpen(false)
        later(() => turnTo(target.turned), FLAP_MS * 0.7)
        if (target.flap) later(() => setFlapOpen(true), FLAP_MS * 0.7 + TURN_MS)
        return
      }
      turnTo(target.turned)
      if (target.flap) later(() => setFlapOpen(true), TURN_MS)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [steps, turned, flapOpen, turnTo, reduceMotion],
  )

  const next = () => goTo(stepIndex + 1)
  const prev = () => goTo(stepIndex - 1)

  // Horizontal offset that keeps whatever is visible centered: a closed book
  // shows one page, an unfolded gatefold shows three.
  const offset =
    turned === 0 ? -size.page / 2 : turned === n ? size.page / 2 : flapOpen ? -size.page / 2 : 0

  const sideOf = (clientX: number) => {
    const rect = stageRef.current!.getBoundingClientRect()
    const spine = rect.left + rect.width / 2 + offset * scale
    return clientX >= spine ? 'right' : 'left'
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || animating !== null) return
    const side = sideOf(e.clientX)
    let d: Drag | null = null
    if (side === 'right') {
      if (turned === flapLeaf && !flapOpen) d = { target: 'flap', leaf: turned, base: -180, angle: -180, startX: e.clientX, moved: false }
      else if (turned === flapLeaf && flapOpen) d = { target: 'flap', leaf: turned, base: 0, angle: 0, startX: e.clientX, moved: false }
      else if (turned < n) d = { target: 'leaf', leaf: turned, base: 0, angle: 0, startX: e.clientX, moved: false }
    } else if (turned > 0 && !flapOpen) {
      d = { target: 'leaf', leaf: turned - 1, base: -180, angle: -180, startX: e.clientX, moved: false }
    }
    if (!d) {
      // Nothing to drag here, but a press still counts as a click.
      if (side === 'left') prev()
      return
    }
    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag(d)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag) {
      if (e.pointerType === 'mouse' && animating === null) setPeek(sideOf(e.clientX))
      return
    }
    const dx = e.clientX - drag.startX
    const span = size.page * scale
    const angle = Math.max(-180, Math.min(0, drag.base + (dx / span) * 190))
    setDrag({ ...drag, angle, moved: drag.moved || Math.abs(dx) > 6 })
  }

  const onPointerUp = () => {
    if (!drag) return
    const d = drag
    setDrag(null)
    if (!d.moved) {
      // A tap: right side moves forward, left side back.
      if (d.base === -180 && d.target === 'leaf') prev()
      else if (d.target === 'flap' && d.base === 0) next()
      else next()
      return
    }
    if (Math.abs(d.angle - d.base) < 45) return
    if (d.target === 'flap') {
      setFlapOpen(d.base === -180)
    } else if (d.base === 0) {
      turnTo(turned + 1)
    } else {
      turnTo(turned - 1)
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') next()
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev()
    else if (e.key === 'Home') goTo(0)
    else if (e.key === 'End') goTo(steps.length - 1)
    else return
    e.preventDefault()
  }

  const leafAngle = (i: number) => {
    if (drag?.target === 'leaf' && drag.leaf === i) return drag.angle
    const base = i < turned ? -180 : 0
    // A small lift on the page under the cursor, like a corner about to turn.
    if (!drag && animating === null) {
      if (peek === 'right' && i === turned && !(i === flapLeaf) && i < n) return -10
      if (peek === 'left' && i === turned - 1 && !flapOpen) return -170
    }
    return base
  }

  const flapAngle = () => {
    if (drag?.target === 'flap') return drag.angle
    if (flapOpen) return 0
    if (!drag && peek === 'right' && turned === flapLeaf && animating === null) return -164
    return -180
  }

  const leafZ = (i: number) => {
    if (drag?.target === 'leaf' && drag.leaf === i) return n + 2
    if (animating === i) return n + 1
    return i < turned ? i : n - i
  }

  const ready = size.page > 0

  return (
    <div className={s.root}>
      <div
        ref={stageRef}
        className={s.stage}
        style={{ height: ready ? pageH + 48 : undefined }}
        tabIndex={0}
        role="group"
        aria-roledescription="flipbook"
        aria-label={label}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setDrag(null)}
        onPointerLeave={() => setPeek(null)}
        data-dragging={!!drag}
      >
        {ready && (
          <div
            className={s.book}
            data-motion={!reduceMotion}
            style={{
              width: size.page * 2,
              height: pageH,
              transform: `translateX(${offset * scale}px) scale(${scale})`,
            }}
          >
            <div className={s.shadow} data-state={turned === 0 ? 'front' : turned === n ? 'back' : flapOpen ? 'gatefold' : 'open'} />
            {leaves.map((leaf, i) => (
              <div
                key={leaf.front}
                className={s.leaf}
                data-live={drag?.target === 'leaf' && drag.leaf === i}
                style={{
                  width: size.page,
                  height: pageH,
                  zIndex: leafZ(i),
                  transform: `rotateY(${leafAngle(i)}deg)`,
                }}
              >
                <div className={s.face} data-side="front">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={leaf.front} alt="" draggable={false} loading={i < 2 ? 'eager' : 'lazy'} />
                </div>
                <div className={s.face} data-side="back">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={leaf.back} alt="" draggable={false} loading="lazy" />
                </div>
                {leaf.flap && (
                  <div
                    className={s.flap}
                    data-live={drag?.target === 'flap'}
                    style={{ width: size.page, height: pageH, transform: `translateZ(1px) rotateY(${flapAngle()}deg)` }}
                  >
                    <div className={s.face} data-side="front">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={leaf.flap.open} alt="" draggable={false} loading="lazy" />
                    </div>
                    <div className={s.face} data-side="back" data-flap>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={leaf.flap.closed} alt="" draggable={false} loading="lazy" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {turned === flapLeaf && !flapOpen && !drag && (
              <span className={s.hint} aria-hidden>
                Unfold
              </span>
            )}
          </div>
        )}
      </div>

      <div className={s.controls}>
        <button type="button" onClick={prev} disabled={stepIndex === 0} aria-label="Previous page">
          ‹
        </button>
        <p className={s.caption} aria-live="polite">
          {stepLabel(current)}
        </p>
        <button type="button" onClick={next} disabled={stepIndex === steps.length - 1} aria-label="Next page">
          ›
        </button>
      </div>
      <p className={s.help}>Drag or tap a page to turn it. Arrow keys work too.</p>
    </div>
  )
}
