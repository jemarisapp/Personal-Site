'use client'

import { motion } from 'motion/react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const metrics = [
    {
        metric: 'Response Time',
        before: '~4 Hours',
        mvp: '~15 Minutes',
        final: '< 20 Seconds',
    },
    {
        metric: 'OpEx Cost',
        before: '$0 (Time = $$)',
        mvp: '~$50/mo',
        final: '~$0.05/mo',
    },
    {
        metric: 'Maintenance',
        before: 'High (Context Switching)',
        mvp: 'Med (Visual Debugging)',
        final: 'Low (Git Versioned)',
    },
]

export function ResultsTable() {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Metric</th>
                            <th className="px-6 py-4 font-medium">Before (Manual)</th>
                            <th className="px-6 py-4 font-medium">MVP (N8N)</th>
                            <th className="px-6 py-4 font-medium">Final (Serverless)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {metrics.map((item) => (
                            <tr key={item.metric} className="group transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                                    {item.metric}
                                </td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                    {item.before}
                                </td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                    {item.mvp}
                                </td>
                                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                                    {item.final}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
