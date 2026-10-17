import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteBar } from '@/components/case/site-bar'
import { MORE_WORK, SHELVES, shelfWork, workHref, type Work } from '@/lib/work'
import s from '@/components/case/case.module.css'

export const metadata: Metadata = {
  title: 'All work',
  description: 'Every project by Jemari Sapp, from album art to AI products.',
}

export default function AllWork() {
  return (
    <div className={s.page}>
      <SiteBar />
      <main className={s.archive}>
        <h1 className={s.title}>All work</h1>

        {SHELVES.map((shelf) => (
          <Shelf
            key={shelf.id}
            id={`shelf-${shelf.id}`}
            heading={shelf.label}
            items={shelfWork(shelf.id)}
          />
        ))}
        {MORE_WORK.length > 0 && <Shelf id="shelf-more" heading="More work" items={MORE_WORK} />}
      </main>
    </div>
  )
}

function Shelf({ id, heading, items }: { id: string; heading: string; items: Work[] }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className={s.archiveHeading}>
        {heading}
      </h2>
      <ul className={s.archiveGrid}>
        {items.map((w) => (
          <li key={w.slug}>
            <Link href={workHref(w)} className={s.card}>
              <span className={s.cardMedia}>
                <Image
                  src={w.hero}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 33vw, 100vw"
                  style={{ objectPosition: w.heroMode === 'framed' ? 'left top' : w.focus }}
                />
              </span>
              <span className={s.cardTitle}>{w.title}</span>
              <span className={s.cardNote}>{w.role}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
