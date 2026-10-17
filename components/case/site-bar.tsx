import Link from 'next/link'
import { PROFILE, type Shelf } from '@/lib/work'
import s from './case.module.css'

export function SiteBar({ shelf }: { shelf?: Shelf }) {
  return (
    <header className={s.bar}>
      <Link href={shelf ? `/?shelf=${shelf}` : '/'} className={s.back}>
        <span aria-hidden className={s.backArrow}>
          ‹
        </span>
        Home
      </Link>
      <Link href="/" className={s.barName}>
        {PROFILE.name}
      </Link>
      <nav className={s.barActions} aria-label="Contact">
        <Link href={PROFILE.resume}>
          Résumé
        </Link>
        <Link href={PROFILE.contact}>Contact</Link>
      </nav>
    </header>
  )
}
