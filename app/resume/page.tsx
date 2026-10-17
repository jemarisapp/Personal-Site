import type { Metadata } from 'next'
import { SiteBar } from '@/components/case/site-bar'
import { PROFILE } from '@/lib/work'
import s from './resume.module.css'

export const metadata: Metadata = {
  title: 'Résumé',
  description: 'Résumé of Jemari Sapp, designer for music, brands, and AI products.',
}

const EXPERIENCE = [
  {
    org: 'TRISP Studio',
    role: 'Founder & Creative Director',
    when: '2016 – Present',
    points: [
      'Run a creative studio for artists and brands covering identity, album art, campaign rollouts, motion, websites, and photography.',
      'Led creative direction for campaigns released through national labels including Atlantic Records and Motown.',
      'Art directed the Fast X soundtrack rollout with APG: a single-release system of covers and motion visuals for streaming and social. The soundtrack passed 500 million streams.',
      'Designed and built the studio’s identity and website.',
    ],
  },
  {
    org: 'YoungBoy Never Broke Again',
    role: 'Art Director & Designer, through TRISP Studio',
    when: '2018 – 2026',
    points: [
      'Art directed and designed 20+ releases for one of hip-hop’s most-streamed artists, handling each one end to end: album and single covers, back covers and tracklists, logos, and motion teasers.',
      'Gave each release its own identity on fast turnarounds while keeping the catalog recognizable.',
      'Work included a Billboard top-10 mixtape and a building-scale billboard for The Last Slimeto.',
    ],
  },
  {
    org: 'Kampgrounds of America',
    role: 'AI Engineering Intern',
    when: 'Mar – May 2026',
    points: [
      'Designed and built a React dashboard where operators watch and step into a live multi-agent sales pipeline.',
      'Automated a manual group sales workflow from hours to under 10 minutes.',
    ],
  },
]

const PROJECTS = [
  { name: 'Navigate IDD', note: 'Led AI systems design for multilingual Medicaid explainer videos, cutting production time by about 90%.' },
  { name: 'Trilo', note: 'Founded and designed a Discord product that runs fantasy leagues for 300+ users.' },
  { name: 'Sweet Beijing', note: 'Identity, ads, and app with an international student team in Beijing.' },
  { name: 'Atlantic Records', note: 'Concept rebrand with a full brand guidelines book.' },
]

const SKILLS = [
  {
    group: 'Design',
    items: ['Art direction', 'Brand identity', 'Album art & packaging', 'Typography', 'Motion', 'App & web design', 'Prototyping'],
  },
  { group: 'Tools', items: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Premiere Pro', 'Cinema 4D', 'Figma'] },
  { group: 'Build', items: ['React & Next.js', 'TypeScript', 'Python', 'AI systems (RAG, agents)'] },
]

const CLIENTS = ['Never Broke Again', 'Atlantic Records', 'Motown', 'APG']

export default function Resume() {
  return (
    <div className={s.page} data-print="resume">
      <div className={s.chrome}>
        <SiteBar />
        <div className={s.toolbar}>
          <p>Designer résumé</p>
          <a href={PROFILE.resumePdf} download className={s.download}>
            Download PDF
          </a>
        </div>
      </div>

      <article className={s.paper} aria-label="Résumé">
        <header className={s.head}>
          <div>
            <h1>Jemari Sapp</h1>
            <p className={s.title}>Designer for music, brands &amp; AI products</p>
          </div>
          <ul className={s.contact}>
            <li>{PROFILE.location}</li>
            <li>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </li>
            <li>
              <a href="https://www.jemarisapp.com">jemarisapp.com</a>
            </li>
            <li>
              <a href={PROFILE.linkedin}>LinkedIn</a>
            </li>
          </ul>
        </header>

        <p className={s.summary}>
          Designer and art director with eight years of releases for YoungBoy Never Broke Again and a studio practice serving
          national record labels. I lead with brand, album art, and motion, and I design and build the products behind
          them, including AI tools.
        </p>

        <div className={s.columns}>
          <div>
            <section>
              <h2>Experience</h2>
              {EXPERIENCE.map((e) => (
                <div key={e.org} className={s.job}>
                  <div className={s.jobHead}>
                    <h3>
                      {e.org}
                      <span>{e.role}</span>
                    </h3>
                    <p>{e.when}</p>
                  </div>
                  <ul>
                    {e.points.map((p) => (
                      <li key={p.slice(0, 30)}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <h2>Selected projects</h2>
              <dl className={s.projects}>
                {PROJECTS.map((p) => (
                  <div key={p.name}>
                    <dt>{p.name}</dt>
                    <dd>{p.note}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside>
            <section>
              <h2>Education</h2>
              <div className={s.edu}>
                <h3>MS Information Systems</h3>
                <p>AI for Business Innovation</p>
                <p>Georgia State University, 2026</p>
              </div>
              <div className={s.edu}>
                <h3>BFA Graphic Design</h3>
                <p>Georgia State University, 2023</p>
              </div>
            </section>

            {SKILLS.map((g) => (
              <section key={g.group}>
                <h2>{g.group}</h2>
                <ul className={s.tags}>
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </section>
            ))}

            <section>
              <h2>Clients</h2>
              <ul className={s.plain}>
                {CLIENTS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </div>
  )
}
