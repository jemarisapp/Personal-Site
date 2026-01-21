'use client'

import { motion } from 'motion/react'

interface Skill {
  name: string
  evidence: string
}

interface SkillsDemonstratedProps {
  skills: Skill[]
}

export function SkillsDemonstrated({ skills }: SkillsDemonstratedProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
              {skill.name}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {skill.evidence}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
