'use client'

import { Check, X, Minus } from 'lucide-react'

const competitors = [
  { name: 'Trilo', highlight: true },
  { name: 'NeonSportz', highlight: false },
  { name: 'Manual', subtitle: 'Sheets + Discord', highlight: false },
]

const factors = [
  {
    name: 'Pricing',
    values: ['$69.99/year (3 servers)', '$14.99-34.99/league', 'Free (time cost)'],
    winner: 0,
  },
  {
    name: 'AI Features',
    values: ['Vision API', 'None', 'None'],
    icons: [true, false, false],
    winner: 0,
  },
  {
    name: 'Discord-Native',
    values: ['100%', 'Partial (web dashboard)', 'N/A'],
    icons: [true, 'partial', null],
    winner: 0,
  },
  {
    name: 'Setup Time',
    values: ['< 5 minutes', '15-30 minutes', 'Hours'],
    winner: 0,
  },
  {
    name: 'Multi-League Cost',
    values: ['Same price', 'Multiplied', 'Same'],
    winner: 0,
  },
]

export function TriloCompetitiveAnalysis() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="grid grid-cols-4 border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="p-4">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Factor</span>
        </div>
        {competitors.map((comp) => (
          <div
            key={comp.name}
            className={`p-4 text-center ${comp.highlight ? 'bg-emerald-50 dark:bg-emerald-950/30' : ''}`}
          >
            <span
              className={`text-sm font-semibold ${comp.highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-700 dark:text-zinc-300'}`}
            >
              {comp.name}
            </span>
            {comp.subtitle && (
              <span className="block text-xs text-zinc-400 dark:text-zinc-500">{comp.subtitle}</span>
            )}
          </div>
        ))}
      </div>

      {/* Rows */}
      {factors.map((factor, idx) => (
        <div
          key={factor.name}
          className={`grid grid-cols-4 ${idx !== factors.length - 1 ? 'border-b border-zinc-200 dark:border-zinc-800' : ''}`}
        >
          <div className="flex items-center p-4">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{factor.name}</span>
          </div>
          {factor.values.map((value, i) => {
            const isWinner = factor.winner === i
            const isHighlightColumn = competitors[i].highlight
            return (
              <div
                key={i}
                className={`flex items-center justify-center p-4 text-center ${isHighlightColumn ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : ''}`}
              >
                {factor.icons ? (
                  <div className="flex flex-col items-center gap-1">
                    {factor.icons[i] === true && (
                      <Check className="h-5 w-5 text-emerald-500" />
                    )}
                    {factor.icons[i] === false && (
                      <X className="h-5 w-5 text-zinc-300 dark:text-zinc-600" />
                    )}
                    {factor.icons[i] === 'partial' && (
                      <Minus className="h-5 w-5 text-amber-500" />
                    )}
                    {factor.icons[i] === null && (
                      <Minus className="h-5 w-5 text-zinc-300 dark:text-zinc-600" />
                    )}
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{value}</span>
                  </div>
                ) : (
                  <span
                    className={`text-sm ${isWinner && isHighlightColumn ? 'font-semibold text-emerald-600 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-400'}`}
                  >
                    {value}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
