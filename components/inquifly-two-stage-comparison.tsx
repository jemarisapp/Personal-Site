'use client'

import { X, AlertTriangle, Check } from 'lucide-react'

const approaches = [
  {
    name: 'Single Prompt',
    problem: "Can't validate extraction before drafting; can't inject calendar data",
    status: 'bad',
  },
  {
    name: 'Fine-tuned Model',
    problem: "Expensive; can't update packages without retraining",
    status: 'warning',
  },
  {
    name: 'Two-stage Pipeline',
    problem: 'Extract → validate → enrich with calendar → generate',
    status: 'good',
  },
]

export function InquiflyTwoStageComparison() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {approaches.map((approach) => {
        const isGood = approach.status === 'good'
        const isWarning = approach.status === 'warning'
        const isBad = approach.status === 'bad'

        return (
          <div
            key={approach.name}
            className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
              isGood
                ? 'border-emerald-500/50 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-950/20'
                : isWarning
                  ? 'border-amber-500/30 bg-amber-50/50 dark:border-amber-500/20 dark:bg-amber-950/10'
                  : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50'
            }`}
          >
            <div className="mb-3 flex items-center gap-2">
              {isBad && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <X className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                </div>
              )}
              {isWarning && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 dark:bg-amber-900/50">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                </div>
              )}
              {isGood && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 dark:bg-emerald-900/50">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
              )}
              <span
                className={`text-sm font-semibold ${
                  isGood
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : isWarning
                      ? 'text-amber-700 dark:text-amber-300'
                      : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {approach.name}
              </span>
            </div>
            <p
              className={`text-sm leading-relaxed ${
                isGood
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {approach.problem}
            </p>
            {isGood && (
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-500/10" />
            )}
          </div>
        )
      })}
    </div>
  )
}
