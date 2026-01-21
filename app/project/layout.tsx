'use client'
import { TextMorph } from '@/components/ui/text-morph'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { PROJECTS, DESIGN_PROJECTS } from '../data'

const ALL_PROJECTS = [...PROJECTS, ...DESIGN_PROJECTS]

function CopyButton() {
  const [text, setText] = useState('Copy')
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    setTimeout(() => {
      setText('Copy')
    }, 2000)
  }, [text])

  return (
    <button
      onClick={() => {
        setText('Copied')
        navigator.clipboard.writeText(currentUrl)
      }}
      className="font-base flex items-center gap-1 text-center text-sm text-zinc-500 transition-colors dark:text-zinc-400"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>URL</span>
    </button>
  )
}

export default function LayoutProject({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const currentIndex = ALL_PROJECTS.findIndex((project) => project.link === pathname)
  const prevProject = ALL_PROJECTS[currentIndex - 1]
  const nextProject = ALL_PROJECTS[currentIndex + 1]

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />

      <main className="prose prose-gray mt-24 pb-20 prose-h4:prose-base dark:prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium">
        <div className="not-prose mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <CopyButton />
        </div>
        {children}

        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-gray-200 pt-8 dark:border-zinc-800">
          <div>
            {prevProject && (
              <Link
                href={prevProject.link}
                className="group flex flex-col gap-1 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <div className="flex items-center gap-1 text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Previous</span>
                </div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                  {prevProject.name}
                </div>
              </Link>
            )}
          </div>
          <div className="flex justify-end">
            {nextProject && (
              <Link
                href={nextProject.link}
                className="group flex flex-col items-end gap-1 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <div className="flex items-center gap-1 text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                  {nextProject.name}
                </div>
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

