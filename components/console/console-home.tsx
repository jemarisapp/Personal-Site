'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import {
  PROFILE,
  SHELVES,
  shelfWork,
  workHref,
  type Shelf,
  type Work,
} from '@/lib/work'
import s from './console.module.css'

// The last tile on every shelf points to the archive instead of a project.
type Tile = { kind: 'work'; work: Work } | { kind: 'more' }

const MORE_TINT = '#c9d3ea'

function tileKey(t: Tile) {
  return t.kind === 'work' ? t.work.slug : 'more'
}

export function ConsoleHome() {
  const router = useRouter()
  const reduceMotion = useReducedMotion()

  const [shelf, setShelf] = useState<Shelf>('brand')
  // Each shelf remembers its own selection, like switching console tabs.
  const [selectedByShelf, setSelectedByShelf] = useState<Record<Shelf, number>>({
    product: 0,
    brand: 0,
    motion: 0,
  })

  const tiles: Tile[] = useMemo(
    () => [
      ...shelfWork(shelf).map(
        (work) => ({ kind: 'work', work }) as Tile,
      ),
      { kind: 'more' },
    ],
    [shelf],
  )
  const index = Math.min(selectedByShelf[shelf], tiles.length - 1)
  const selected = tiles[index]
  const tint = selected.kind === 'work' ? selected.work.tint : MORE_TINT

  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const lastPointer = useRef<string>('mouse')
  const hoverTimer = useRef<number | undefined>(undefined)

  // Shelf can be deep-linked with ?shelf=product so a link to the site can
  // open on the side a recruiter cares about.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('shelf')
    if (SHELVES.some((x) => x.id === param)) setShelf(param as Shelf)
  }, [])

  const select = useCallback(
    (i: number) => {
      setSelectedByShelf((prev) =>
        prev[shelf] === i ? prev : { ...prev, [shelf]: i },
      )
    },
    [shelf],
  )

  const switchShelf = (next: Shelf) => {
    if (next === shelf) return
    setShelf(next)
    const url = new URL(window.location.href)
    url.searchParams.set('shelf', next)
    window.history.replaceState(null, '', url)
  }

  useEffect(() => {
    tileRefs.current[index]?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [index, shelf, reduceMotion])

  const onRowKeyDown = (e: KeyboardEvent) => {
    const last = tiles.length - 1
    const target =
      e.key === 'ArrowRight'
        ? Math.min(index + 1, last)
        : e.key === 'ArrowLeft'
          ? Math.max(index - 1, 0)
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null
    if (target === null) return
    e.preventDefault()
    select(target)
    tileRefs.current[target]?.focus({ preventScroll: true })
  }

  const onTabKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const i = SHELVES.findIndex((x) => x.id === shelf)
    const next = SHELVES[(i + (e.key === 'ArrowRight' ? 1 : -1) + SHELVES.length) % SHELVES.length]
    switchShelf(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  const neighbors = [tiles[index - 1], tiles[index + 1]].filter(
    (t): t is Tile => !!t && t.kind === 'work',
  )

  return (
    <main className={s.console} style={{ '--tint': tint } as CSSProperties}>
      <Backdrop tile={selected} neighbors={neighbors} reduceMotion={!!reduceMotion} />

      <header className={s.topbar}>
        <Link href="/" className={s.identity} aria-label="Jemari Sapp, back to the welcome screen">
          <span className={s.name}>{PROFILE.name}</span>
        </Link>

        <div role="tablist" aria-label="Work" className={s.tabs} onKeyDown={onTabKeyDown}>
          {SHELVES.map((x) => (
            <button
              key={x.id}
              id={`tab-${x.id}`}
              role="tab"
              type="button"
              aria-selected={shelf === x.id}
              aria-controls="shelf-panel"
              tabIndex={shelf === x.id ? 0 : -1}
              className={s.tab}
              onClick={() => switchShelf(x.id)}
            >
              {x.label}
            </button>
          ))}
        </div>

        <nav className={s.actions} aria-label="About and contact">
          <Link href="/about" className={s.action}>
            About
          </Link>
          <Link href={PROFILE.resume} className={s.action}>
            Résumé
          </Link>
          <Link href={PROFILE.contact} className={s.action}>
            Contact
          </Link>
        </nav>
      </header>

      <section
        id="shelf-panel"
        role="tabpanel"
        aria-labelledby={`tab-${shelf}`}
        className={s.panel}
      >
        <div
          className={s.row}
          role="list"
          aria-label={`${SHELVES.find((x) => x.id === shelf)!.label} projects`}
          onKeyDown={onRowKeyDown}
          onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
        >
          {tiles.map((t, i) => {
            const isSelected = i === index
            const href = t.kind === 'work' ? workHref(t.work) : '/work'
            const label = t.kind === 'work' ? t.work.title : 'All work'
            return (
              <div role="listitem" key={`${shelf}-${tileKey(t)}`} className={s.slot}>
                <motion.a
                  layout={!reduceMotion}
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  ref={(el: HTMLAnchorElement | null) => {
                    tileRefs.current[i] = el
                  }}
                  href={href}
                  tabIndex={isSelected ? 0 : -1}
                  aria-label={label}
                  aria-current={isSelected ? 'true' : undefined}
                  className={s.tile}
                  data-selected={isSelected}
                  onFocus={() => select(i)}
                  onPointerDown={(e) => {
                    lastPointer.current = e.pointerType
                  }}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== 'mouse') return
                    window.clearTimeout(hoverTimer.current)
                    // A short delay so sweeping across the row doesn't flash
                    // every backdrop on the way.
                    hoverTimer.current = window.setTimeout(() => select(i), 90)
                  }}
                  onClick={(e) => {
                    // Let modified clicks open a new tab as usual.
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                    e.preventDefault()
                    // On touch a tap only selects, like moving focus with a
                    // controller; the project opens from "View case study".
                    if (lastPointer.current === 'touch' || lastPointer.current === 'pen') {
                      select(i)
                      return
                    }
                    router.push(href)
                  }}
                >
                  {t.kind === 'work' ? (
                    <Image
                      src={t.work.hero}
                      alt=""
                      fill
                      sizes="160px"
                      className={s.tileImage}
                      style={{ objectPosition: t.work.heroMode === 'framed' ? 'left top' : t.work.focus }}
                    />
                  ) : (
                    <span className={s.moreGlyph} aria-hidden>
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </motion.a>
                {isSelected && (
                  <motion.span
                    className={s.tileLabel}
                    initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.08 }}
                    aria-hidden
                  >
                    {label}
                  </motion.span>
                )}
              </div>
            )
          })}
        </div>

        <FramedMedia tile={selected} reduceMotion={!!reduceMotion} />

        <Detail tile={selected} reduceMotion={!!reduceMotion} />
      </section>
    </main>
  )
}

function Backdrop({
  tile,
  neighbors,
  reduceMotion,
}: {
  tile: Tile
  neighbors: Tile[]
  reduceMotion: boolean
}) {
  return (
    <div className={s.backdrop} aria-hidden>
      <AnimatePresence initial={false}>
        <motion.div
          key={tileKey(tile)}
          className={s.layer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: 'easeOut' }}
        >
          {tile.kind === 'work' ? (
            <Image
              src={tile.work.hero}
              alt=""
              fill
              priority
              sizes="100vw"
              className={s.layerImage}
              data-mode={tile.work.heroMode}
              data-drift={!reduceMotion}
              style={{ objectPosition: tile.work.focus }}
            />
          ) : (
            <div className={s.moreBackdrop} />
          )}
        </motion.div>
      </AnimatePresence>
      {/* Warm the cache for the tiles on either side so arrowing feels instant. */}
      <div className={s.prefetch}>
        {neighbors.map((t) =>
          t.kind === 'work' ? (
            <Image key={t.work.slug} src={t.work.hero} alt="" fill sizes="100vw" loading="eager" />
          ) : null,
        )}
      </div>
      <div className={s.scrim} />
    </div>
  )
}

function FramedMedia({ tile, reduceMotion }: { tile: Tile; reduceMotion: boolean }) {
  const framed = tile.kind === 'work' && tile.work.heroMode === 'framed' ? tile.work : null
  return (
    <div className={s.frameSlot} aria-hidden>
      <AnimatePresence mode="popLayout" initial={false}>
        {framed && (
          <motion.div
            key={framed.slug}
            className={s.frame}
            data-aspect={framed.frameAspect ?? 'wide'}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {framed.mosaic ? (
              <div className={s.mosaic}>
                {framed.mosaic.map((src, i) => (
                  <motion.div
                    key={src}
                    className={s.mosaicCell}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    // Covers land in reading order, one beat each.
                    transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.05 * i }}
                  >
                    <Image src={src} alt="" fill sizes="(min-width: 768px) 16vw, 30vw" />
                  </motion.div>
                ))}
              </div>
            ) : framed.video && !reduceMotion ? (
              <video
                className={s.frameMedia}
                src={framed.video}
                poster={framed.hero}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                src={framed.hero}
                alt=""
                fill
                sizes="(min-width: 768px) 46vw, 92vw"
                className={s.frameMedia}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Detail({ tile, reduceMotion }: { tile: Tile; reduceMotion: boolean }) {
  const enter = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
  return (
    <div className={s.detailSlot}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tileKey(tile)}
          className={s.detail}
          initial={enter}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          aria-live="polite"
        >
          {tile.kind === 'work' ? (
            <>
              {tile.work.concept && <p className={s.badge}>Concept project</p>}
              <h1 className={s.title}>{tile.work.title}</h1>
              <p className={s.summary}>{tile.work.summary}</p>
              <dl className={s.meta}>
                <div>
                  <dt>Role</dt>
                  <dd>{tile.work.role}</dd>
                </div>
                {tile.work.client && (
                  <div>
                    <dt>Client</dt>
                    <dd>{tile.work.client}</dd>
                  </div>
                )}
              </dl>
              <Link href={workHref(tile.work)} className={s.open}>
                View case study
              </Link>
            </>
          ) : (
            <>
              <h1 className={s.title}>All work</h1>
              <p className={s.summary}>
                Every project in one place, across product, brand, and motion, with the smaller pieces too.
              </p>
              <Link href="/work" className={s.open}>
                Browse all work
              </Link>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
