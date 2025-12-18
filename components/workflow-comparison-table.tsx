'use client'

import { motion } from 'motion/react'

const comparisonData = [
    {
        metric: 'Workflow',
        manual: 'Read PDF -> Check Cal -> Write Email',
        aiApp: 'Copy Text -> Prompt Chatbot -> Paste -> Edit',
        system: 'Zero Touch (Fully Automated)',
    },
    {
        metric: 'Time per Inquiry',
        manual: '15-20 Minutes',
        aiApp: '5-10 Minutes',
        system: '< 30 Seconds',
    },
    {
        metric: 'Context Switching',
        manual: 'High (Interrupts Deep Work)',
        aiApp: 'Medium (Still requires active task)',
        system: 'None (Runs in background)',
    },
    {
        metric: 'Reliability',
        manual: 'Prone to human error / fatigue',
        aiApp: 'Prone to hallucinations if unchecked',
        system: 'Deterministic Guardrails',
    },
    {
        metric: 'Availability Check',
        manual: 'Manual Calendar Lookup',
        aiApp: 'Manual Calendar Lookup',
        system: 'Real-time API Check',
    },
]

export function WorkflowComparisonTable() {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Metric</th>
                            <th className="px-6 py-4 font-medium">1. Manual Process</th>
                            <th className="px-6 py-4 font-medium">2. AI Web Apps</th>
                            <th className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">3. This System</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {comparisonData.map((row) => (
                            <tr key={row.metric} className="group transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                                    {row.metric}
                                </td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                    {row.manual}
                                </td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                    {row.aiApp}
                                </td>
                                <td className="px-6 py-4 font-medium text-emerald-600 dark:text-emerald-400">
                                    {row.system}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
