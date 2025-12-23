'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },

]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Jemari Sapp
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          MS Information Systems Candidate
        </TextEffect>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          AI For Business Innovation
        </TextEffect>
      </div>
      {mounted && (
        <div className="flex items-center gap-1">
          <AnimatedBackground
            className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800"
            defaultValue={theme}
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
            enableHover={false}
            onValueChange={(id) => {
              setTheme(id as string)
            }}
          >
            {THEMES_OPTIONS.map((t) => (
              <button
                key={t.id}
                className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
                type="button"
                aria-label={`Switch to ${t.label} theme`}
                data-id={t.id}
              >
                {t.icon}
              </button>
            ))}
          </AnimatedBackground>
        </div>
      )}
    </header>
  )
}
