import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteBar } from '@/components/case/site-bar'
import { PROFILE } from '@/lib/work'
import s from './about.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Jemari Sapp is an Atlanta designer: art director and designer for YoungBoy Never Broke Again releases since 2018, founder of TRISP Studio, and a builder of AI products.',
}

const PRACTICE = [
  {
    title: 'Brand & Visual',
    shelf: 'brand',
    text: 'Album art and rollouts, identity systems, campaigns, and print. Most of my client work lives here.',
  },
  {
    title: 'Motion',
    shelf: 'motion',
    text: 'Motion visuals for streaming and social, title sequences, and kinetic type.',
  },
  {
    title: 'Product & AI',
    shelf: 'product',
    text: 'Products I design and build myself, from AI content pipelines to a Discord bot that runs leagues.',
  },
]

const BACKGROUND = [
  { what: 'TRISP Studio', detail: 'Founder', when: '2016–now' },
  { what: 'YoungBoy Never Broke Again', detail: 'Art director & designer', when: '2018–2026' },
  { what: 'Kampgrounds of America', detail: 'AI engineering intern', when: '2026' },
  { what: 'Georgia State University', detail: 'MS Information Systems, AI for Business Innovation', when: '2026' },
  { what: 'Georgia State University', detail: 'BFA Graphic Design', when: '2023' },
]

export default function About() {
  return (
    <div className={s.page}>
      <SiteBar />
      <main className={s.main}>
        <section className={s.intro}>
          <Image src="/jemari.webp" alt="Jemari Sapp" width={800} height={800} priority className={s.photo} />
          <div>
            <h1 className={s.title}>Jemari Sapp</h1>
            <p className={s.lede}>
              I’m a designer in Atlanta. Since 2018 I’ve art directed and designed releases for YoungBoy Never Broke
              Again, and I run TRISP Studio, where my campaign work has been released through labels
              including Atlantic Records and Motown.
            </p>
            <p className={s.body}>
              I studied graphic design, then went back for a master’s in information systems, so I design
              with an understanding of how things get built. Most of my work is brand, album art, and motion
              for music and entertainment. I also design and build products, especially AI tools that people
              need to trust.
            </p>
            <div className={s.actions}>
              <Link href={PROFILE.contact} className={s.primary}>
                Get in touch
              </Link>
              <Link href={PROFILE.resume} className={s.secondary}>
                Resume
              </Link>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={s.secondary}>
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="practice">
          <h2 id="practice" className={s.heading}>
            What I do
          </h2>
          <ul className={s.practice}>
            {PRACTICE.map((p) => (
              <li key={p.title}>
                <Link href={`/home?shelf=${p.shelf}`}>
                  <span className={s.practiceTitle}>{p.title}</span>
                  <span className={s.practiceText}>{p.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="background">
          <h2 id="background" className={s.heading}>
            Background
          </h2>
          <dl className={s.background}>
            {BACKGROUND.map((b) => (
              <div key={b.what + b.detail}>
                <dt>
                  {b.what}
                  <span>{b.detail}</span>
                </dt>
                <dd>{b.when}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  )
}
