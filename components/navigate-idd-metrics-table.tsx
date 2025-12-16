'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const metrics = [
    {
        metric: 'Content creation time',
        result: '~90% reduction',
    },
    {
        metric: 'Script generation accuracy (policy grounded)',
        result: '100% source traceable to verified policy text',
    },
    {
        metric: 'Languages supported',
        result: '5 (English, Spanish, Chinese, Korean, Vietnamese)',
    },
    {
        metric: 'Average time from topic upload to script draft',
        result: 'Under 2 minutes',
    },
    {
        metric: 'Average time from script approval to video file',
        result: 'Under 15 minutes',
    },
    {
        metric: 'Human review effort per asset',
        result: 'Under 2 minutes average',
    },
    {
        metric: 'Social media publishing prep automation',
        result: '~85% automated',
    },
    {
        metric: 'Policy reference retrieval accuracy',
        result: 'Verified source reference every output',
    },
]

export function NavigateIDDMetricsTable() {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Metric</th>
                            <th className="px-6 py-4 font-medium">Result</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {metrics.map((item) => (
                            <tr key={item.metric} className="group transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                                    {item.metric}
                                </td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                    {item.result}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
