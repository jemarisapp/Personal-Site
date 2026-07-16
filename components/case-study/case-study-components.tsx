import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import type { CaseStudy } from '@/lib/case-studies'
import { ZoomableImage } from '@/components/ui/zoomable-image'

export function CaseStudyHeader({ study }: { study: CaseStudy }) {
  return (
    <header className="space-y-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-zinc-100"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Projects
      </Link>

      <div className="space-y-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {study.eyebrow ?? 'Case Study'}
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          {study.title}
        </h1>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {study.summary}
        </p>
      </div>

      <OutcomeBlock outcome={study.outcome} />
    </header>
  )
}

export function ProjectMetadata({ items }: { items: CaseStudy['metadata'] }) {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <dt className="mb-1 text-xs font-medium uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
            {item.label}
          </dt>
          <dd className="text-sm leading-6 text-zinc-800 dark:text-zinc-200">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function CaseStudySection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function WorkflowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
      <ol className="flex flex-col gap-3">
        {steps.map((step, index) => (
          <li key={step} className="flex flex-col gap-3">
            <div className="flex min-w-0 items-center gap-3 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {index + 1}
              </span>
              <span>{step}</span>
            </div>
            {index < steps.length - 1 ? (
              <span className="flex justify-center text-zinc-400" aria-hidden="true">
                ↓
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function TechnologyList({ technologies }: { technologies: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {technologies.map((technology) => (
        <div
          key={technology}
          className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300"
        >
          {technology}
        </div>
      ))}
    </div>
  )
}

export function OutcomeBlock({
  outcome,
  outcomes,
}: {
  outcome?: string
  outcomes?: string[]
}) {
  if (!outcome && !outcomes?.length) {
    return null
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
        Outcome
      </h2>
      {outcome ? (
        <p className="text-sm leading-6 text-zinc-800 dark:text-zinc-200">
          {outcome}
        </p>
      ) : null}
      {outcomes?.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          {outcomes.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function ConfidentialityNotice({ children }: { children: React.ReactNode }) {
  return (
    <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
      <strong className="font-medium text-zinc-900 dark:text-zinc-100">
        Confidentiality Notice:
      </strong>{' '}
      {children}
    </aside>
  )
}

export function RelatedProjects({
  previous,
  next,
}: {
  previous?: CaseStudy
  next?: CaseStudy
}) {
  if (!previous && !next) {
    return null
  }

  return (
    <nav className="grid grid-cols-1 gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/projects/${previous.slug}`}
          className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <span className="mb-1 block text-xs uppercase text-zinc-500 dark:text-zinc-400">
            Previous
          </span>
          <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 sm:text-right"
        >
          <span className="mb-1 block text-xs uppercase text-zinc-500 dark:text-zinc-400">
            Next
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-zinc-50">
            {next.title}
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      ) : null}
    </nav>
  )
}

export function CaseStudyImage({ image }: { image: NonNullable<CaseStudy['heroImage']> }) {
  return (
    <figure className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900/50">
        <ZoomableImage
          src={image.src}
          alt={image.alt}
          width={1200}
          height={675}
          className="w-full cursor-zoom-in rounded-md object-cover"
          priority
        />
      </div>
      {image.caption ? (
        <figcaption className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export function CaseStudyMediaGallery({ media }: { media: NonNullable<CaseStudy['media']> }) {
  return (
    <div className="space-y-5">
      {media.map((item) => (
        <figure key={item.src} className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900/50">
            {item.type === 'video' ? (
              <video
                src={item.src}
                controls
                className="w-full rounded-md"
                aria-label={item.alt}
              />
            ) : (
              <ZoomableImage
                src={item.src}
                alt={item.alt}
                width={1200}
                height={675}
                className="w-full cursor-zoom-in rounded-md object-cover"
              />
            )}
          </div>
          {item.caption ? (
            <figcaption className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              {item.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  )
}

export function ProjectCaseStudyCard({
  project,
}: {
  project: CaseStudy | (Omit<CaseStudy, 'metadata' | 'sections'> & { href?: string })
}) {
  const href = 'href' in project && project.href ? project.href : `/projects/${project.slug}`
  const isExternalCaseStudy = href.startsWith('/project/')

  return (
    <Link
      href={href}
      className={`group block rounded-lg border bg-zinc-50/70 p-5 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 ${
        project.featured
          ? 'border-zinc-300 dark:border-zinc-700'
          : 'border-zinc-200 dark:border-zinc-800'
      } dark:bg-zinc-900/50`}
    >
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
            {project.featured ? 'Featured Case Study' : 'Project'}
          </p>
          <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
            {project.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm leading-6">
          <p className="text-zinc-700 dark:text-zinc-300">
            <span className="font-medium text-zinc-950 dark:text-zinc-50">
              Problem:
            </span>{' '}
            {project.problem}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <span className="font-medium text-zinc-950 dark:text-zinc-50">
              Solution:
            </span>{' '}
            {project.solution}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <span className="font-medium text-zinc-950 dark:text-zinc-50">
              Role:
            </span>{' '}
            {project.role}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <span className="font-medium text-zinc-950 dark:text-zinc-50">
              Outcome:
            </span>{' '}
            {project.outcome}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            {project.technologies.slice(0, 5).join(' / ')}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-zinc-50">
            {isExternalCaseStudy ? 'View Project' : 'View Case Study'}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
