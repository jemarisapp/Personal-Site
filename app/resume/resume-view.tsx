import Link from 'next/link'
import { SiteBar } from '@/components/case/site-bar'
import { PROFILE } from '@/lib/work'
import s from './resume.module.css'

// One resume layout, two versions: design (/resume) and AI systems (/resume/ai).

export type ResumeData = {
  label: string
  pdf: string
  switchTo: { href: string; label: string }
  title: string
  summary: string
  experience: { org: string; role: string; when: string; points: string[] }[]
  projects: { name: string; note: string }[]
  skills: { group: string; items: string[] }[]
  clients?: string[]
}

export function ResumeView({ data }: { data: ResumeData }) {
  return (
    <div className={s.page} data-print="resume">
      <div className={s.chrome}>
        <SiteBar />
        <div className={s.toolbar}>
          <p>
            {data.label} · <Link href={data.switchTo.href}>{data.switchTo.label}</Link>
          </p>
          <a href={data.pdf} download className={s.download}>
            Download PDF
          </a>
        </div>
      </div>

      <article className={s.paper} aria-label="Resume">
        <header className={s.head}>
          <div>
            <h1>Jemari Sapp</h1>
            <p className={s.title}>{data.title}</p>
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

        <p className={s.summary}>{data.summary}</p>

        <div className={s.columns}>
          <div>
            <section>
              <h2>Experience</h2>
              {data.experience.map((e) => (
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
                {data.projects.map((p) => (
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

            {data.skills.map((g) => (
              <section key={g.group}>
                <h2>{g.group}</h2>
                <ul className={s.tags}>
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </section>
            ))}

            {data.clients && (
              <section>
                <h2>Clients</h2>
                <ul className={s.plain}>
                  {data.clients.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </article>
    </div>
  )
}
