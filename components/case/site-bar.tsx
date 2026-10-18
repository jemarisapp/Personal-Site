import Link from 'next/link'
import { PROFILE, type Shelf } from '@/lib/work'
import { HomeLink } from './shelf-links'
import s from './case.module.css'

// shelves: the shelves this page belongs to, its own first.
export function SiteBar({ shelves }: { shelves?: Shelf[] }) {
  return (
    <header className={s.bar}>
      {shelves?.length ? (
        <HomeLink shelves={shelves} fallback={shelves[0]} />
      ) : (
        <Link href="/home" className={s.back}>
          <span aria-hidden className={s.backArrow}>
            ‹
          </span>
          Home
        </Link>
      )}
      <Link href="/" className={s.barName}>
        {PROFILE.name}
      </Link>
      <nav className={s.barActions} aria-label="Contact">
        <Link href={PROFILE.resume}>
          Resume
        </Link>
        <Link href={PROFILE.contact}>Contact</Link>
      </nav>
    </header>
  )
}
