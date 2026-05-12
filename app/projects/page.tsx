'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeftIcon } from 'lucide-react'
import { DESIGN_PROJECTS, PROJECTS } from '../data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

function ProjectCard({
  project,
  compact = false,
}: {
  project: (typeof PROJECTS)[number]
  compact?: boolean
}) {
  return (
    <Link
      href={project.link}
      className={
        compact
          ? 'group flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900'
          : 'group block space-y-3'
      }
    >
      {compact ? (
        <>
          <div className="min-w-0 flex-1 pr-4">
            <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
              {project.name}
              <span className="ml-1 inline-block opacity-0 transition-opacity group-hover:opacity-100">
                -&gt;
              </span>
            </h3>
            <p className="line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
          </div>
          {project.image ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="64px"
              />
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-1 transition-colors group-hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:group-hover:border-zinc-700">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                width={900}
                height={506}
                className="aspect-video w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : null}
          </div>
          <div>
            <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
              {project.name}
              <span className="ml-1 inline-block opacity-0 transition-opacity group-hover:opacity-100">
                -&gt;
              </span>
            </h3>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
          </div>
        </>
      )}
    </Link>
  )
}

export default function ProjectsPage() {
  return (
    <motion.main
      className="space-y-12 pb-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Resume
        </Link>
      </motion.div>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-3"
      >
        <h1 className="text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
          Projects
        </h1>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
          A focused archive of AI systems, product builds, and design work.
        </p>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-5"
      >
        <h2 className="text-sm font-semibold uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
          Selected Work
        </h2>
        <div className="grid grid-cols-1 gap-7">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-5"
      >
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
            Visual Design
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Before I built products, I designed systems. That visual foundation
            still shapes how I ship.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {DESIGN_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
