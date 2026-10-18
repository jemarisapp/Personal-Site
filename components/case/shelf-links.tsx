'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import type { Shelf } from '@/lib/work'
import s from './case.module.css'

// A project can sit on more than one shelf. Links that depend on the shelf
// (Home, Next project) follow the one the visitor came from, passed as
// ?from=<shelf>, and fall back to the project's own shelf.

type NextByShelf = Partial<Record<Shelf, { href: string; title: string }>>

function useShelf(allowed: Shelf[], fallback: Shelf) {
  const from = useSearchParams().get('from') as Shelf | null
  return from && allowed.includes(from) ? from : fallback
}

function HomeLinkInner({ shelves, fallback }: { shelves: Shelf[]; fallback: Shelf }) {
  return <HomeLinkView shelf={useShelf(shelves, fallback)} />
}

function HomeLinkView({ shelf }: { shelf: Shelf }) {
  return (
    <Link href={`/home?shelf=${shelf}`} className={s.back}>
      <span aria-hidden className={s.backArrow}>
        ‹
      </span>
      Home
    </Link>
  )
}

export function HomeLink({ shelves, fallback }: { shelves: Shelf[]; fallback: Shelf }) {
  return (
    <Suspense fallback={<HomeLinkView shelf={fallback} />}>
      <HomeLinkInner shelves={shelves} fallback={fallback} />
    </Suspense>
  )
}

function NextView({ next }: { next?: { href: string; title: string } }) {
  if (!next) return null
  return (
    <Link href={next.href} className={s.next}>
      <span className={s.nextLabel}>Next project</span>
      <span className={s.nextTitle}>{next.title}</span>
    </Link>
  )
}

function NextInner({ options, fallback }: { options: NextByShelf; fallback: Shelf }) {
  const shelf = useShelf(Object.keys(options) as Shelf[], fallback)
  return <NextView next={options[shelf]} />
}

export function NextProject({ options, fallback }: { options: NextByShelf; fallback: Shelf }) {
  return (
    <Suspense fallback={<NextView next={options[fallback]} />}>
      <NextInner options={options} fallback={fallback} />
    </Suspense>
  )
}
