import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { SiteBar } from '@/components/case/site-bar'
import { NextProject } from '@/components/case/shelf-links'
import { HowToAtlBook } from '@/components/flipbook/how-to-atl'
import { YellowstonePacket } from '@/components/yellowstone/yellowstone-packet'
import { ModaLogos, ModaMonsters, ModaTee, WelchTee } from '@/components/moda/moda-widgets'
import {
  FastXSingles,
  SonicSwitch,
  SweetBeijingApp,
  TriloExtract,
  TrispClients,
  TrispTour,
  VideoPhone,
} from '@/components/work-widgets/work-widgets'
import { ConsolePrototype } from '@/components/playstation/console-prototype'
import { BrandBook } from '@/components/atlantic/brand-book'
import { TriloApp, TriloDataModel, TriloLicensing, TriloNumbers, TriloSystem } from '@/components/trilo-app/trilo-app'
import { NiddPipeline } from '@/components/nidd/pipeline'
import { CoverBuilder, TrispKit, TrispSitemap, TrispStyleGuide } from '@/components/trisp-ui/trisp-ui'
import { CarouselDeck, RenderNotes, ReviewPlayer, SkillPicker } from '@/components/ai-workflow/ai-workflow'
import { WORK, caseHref, getWork, shelfWork, shelvesFor, type GalleryItem, type Section, type Shelf, type Work } from '@/lib/work'
import s from '@/components/case/case.module.css'

export function generateStaticParams() {
  return WORK.filter((w) => !w.href).map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const work = getWork((await params).slug)
  if (!work) return {}
  return {
    title: work.title,
    description: work.summary,
    openGraph: { images: [{ url: work.hero }] },
  }
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const work = getWork((await params).slug)
  if (!work) notFound()
  // Projects with a written MDX case study live at their own route.
  if (work.href) redirect(work.href)

  // Next project stays within the same group: each shelf the project is on
  // (the visitor's shelf is picked in the browser), or the archive.
  const shelves = shelvesFor(work)
  const nextBy: Partial<Record<Shelf, { href: string; title: string }>> = {}
  for (const id of shelves) {
    const list = work.more ? WORK.filter((w) => w.more) : shelfWork(id)
    const next = list[(list.indexOf(work) + 1) % list.length]
    if (next && next.slug !== work.slug) nextBy[id] = { href: caseHref(next, id), title: next.title }
  }

  return (
    <div className={s.page} style={{ '--tint': work.tint } as CSSProperties}>
      <SiteBar shelves={shelves} />

      <main>
        <section className={s.hero}>
          {/* Title first, so a visitor arriving from a shared link knows what
              they're looking at before the interactive piece. */}
          <div className={s.heroText}>
            {(work.badge || work.concept) && <p className={s.badge}>{work.badge ?? 'Concept project'}</p>}
            <h1 className={s.title}>{work.title}</h1>
            <p className={s.lede}>{work.summary}</p>
            <dl className={s.meta}>
              <div>
                <dt>Role</dt>
                <dd>{work.role}</dd>
              </div>
              {work.client && (
                <div>
                  <dt>Client</dt>
                  <dd>{work.client}</dd>
                </div>
              )}
              <div>
                <dt>Work</dt>
                <dd>{work.disciplines.join(', ')}</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroStage}>
            {work.interactive ? (
              <Interactive kind={work.interactive} />
            ) : (
              <div
                className={s.heroArt}
                data-shape={
                  work.heroMode === 'full'
                    ? 'cinema'
                    : work.frameAspect === 'square' || work.frameAspect === 'tall'
                      ? work.frameAspect
                      : 'screen'
                }
              >
                {work.video && work.film ? (
                  <video src={work.video} poster={work.hero} controls preload="none" playsInline className={s.heroMedia} />
                ) : work.video ? (
                  <video src={work.video} poster={work.hero} autoPlay muted loop playsInline className={s.heroMedia} />
                ) : (
                  <Image
                    src={work.hero}
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className={s.heroMedia}
                    style={{ objectPosition: work.heroMode === 'framed' ? 'left top' : work.focus }}
                  />
                )}
              </div>
            )}
          </div>
        </section>

        {work.body && (
          <section className={s.prose}>
            {work.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </section>
        )}

        {work.sections?.map((sec) => (
          <section key={sec.heading} className={s.chapter}>
            <div className={s.chapterText}>
              <h2>{sec.heading}</h2>
              {sec.paragraphs?.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {sec.points &&
                (sec.ordered ? (
                  <ol className={s.steps}>
                    {sec.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ol>
                ) : (
                  <ul className={s.points}>
                    {sec.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                ))}
            </div>
            {sec.widget && (
              <div className={s.widget}>
                <Widget kind={sec.widget} />
              </div>
            )}
            {sec.images && (
              <div className={s.gallery}>
                {sec.images.map((g) => (
                  <Figure key={g.src} item={g} />
                ))}
              </div>
            )}
          </section>
        ))}

        {work.results && (
          <section className={s.results} aria-labelledby="results">
            <h2 id="results">Results</h2>
            <ul>
              {work.results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        {work.gallery && (
          <section className={s.gallery} aria-label="Project images">
            {work.gallery.map((g) => (
              <Figure key={g.src} item={g} />
            ))}
          </section>
        )}

        {work.links && (
          <section className={s.links} aria-label="Live links">
            {work.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                Visit {l.label}
              </a>
            ))}
          </section>
        )}

        <NextProject options={nextBy} fallback={work.shelf} />
      </main>
    </div>
  )
}

function Figure({ item }: { item: GalleryItem }) {
  const layout = item.layout ?? 'wide'
  return (
    <figure className={s.figure} data-layout={layout}>
      <div className={s.figureMedia} data-fit={item.aspect ? 'contain' : undefined} style={item.aspect ? { aspectRatio: item.aspect } : undefined}>
        {item.video && item.loop ? (
          <video src={item.video} poster={item.src} autoPlay muted loop playsInline aria-label={item.alt} />
        ) : item.video ? (
          <video src={item.video} poster={item.src} controls preload="none" playsInline aria-label={item.alt} />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={
              layout === 'square' || layout === 'phone'
                ? '(min-width: 900px) 30vw, 50vw'
                : layout === 'tall'
                  ? '(min-width: 900px) 45vw, 100vw'
                  : '(min-width: 1200px) 1100px, 100vw'
            }
          />
        )}
      </div>
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>
  )
}

function Interactive({ kind }: { kind: NonNullable<Work['interactive']> }) {
  switch (kind) {
    case 'how-to-atl':
      return <HowToAtlBook />
    case 'yellowstone':
      return <YellowstonePacket />
    case 'atlantic':
      return <BrandBook />
    case 'sonic':
      return <SonicSwitch />
    case 'sweet-beijing':
      return <SweetBeijingApp />
    case 'welch':
      return <WelchTee />
    case 'trisp':
      return <TrispTour />
    case 'ai-review':
      return <ReviewPlayer />
    case 'trisp-kit':
      return <TrispKit />
    case 'trilo-app':
      return <TriloApp />
  }
}

function Widget({ kind }: { kind: NonNullable<Section['widget']> }) {
  switch (kind) {
    case 'moda-logos':
      return <ModaLogos />
    case 'moda-monsters':
      return <ModaMonsters />
    case 'moda-tee':
      return <ModaTee />
    case 'ps-console':
      return <ConsolePrototype />
    case 'fastx-singles':
      return <FastXSingles />
    case 'zaire-video':
      return <VideoPhone youtube="MAjceSVZnFU" title="Zaire’s Valentine animation" />
    case 'trilo-extract':
      return <TriloExtract />
    case 'trisp-clients':
      return <TrispClients />
    case 'ai-carousels':
      return <CarouselDeck />
    case 'ai-render-notes':
      return <RenderNotes />
    case 'ai-skills':
      return <SkillPicker />
    case 'trisp-guide':
      return <TrispStyleGuide />
    case 'trisp-sitemap':
      return <TrispSitemap />
    case 'trisp-cover':
      return <CoverBuilder />
    case 'trilo-system':
      return <TriloSystem />
    case 'trilo-numbers':
      return <TriloNumbers />
    case 'trilo-licensing':
      return <TriloLicensing />
    case 'trilo-data-model':
      return <TriloDataModel />
    case 'nidd-pipeline':
      return <NiddPipeline />
  }
}
