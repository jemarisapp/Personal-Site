import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import { ARCHIVE_PROJECTS } from '@/lib/case-studies'
import { ProjectCaseStudyCard } from '@/components/case-study/case-study-components'

export const metadata = {
  title: 'AI Systems & Case Studies',
  description:
    'A focused collection of AI systems, workflow automation projects, and product builds centered on practical business impact.',
}

export default function ProjectsPage() {
  return (
    <main className="space-y-12 pb-12">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-zinc-100"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Resume
        </Link>
      </div>

      <section className="space-y-3">
        <h1 className="text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          AI Systems & Case Studies
        </h1>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
          A focused collection of AI systems, workflow automation projects, and
          product builds centered on practical business impact.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
          Archive
        </h2>
        <div className="grid grid-cols-1 gap-5">
          {ARCHIVE_PROJECTS.map((project) => (
            <ProjectCaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  )
}
