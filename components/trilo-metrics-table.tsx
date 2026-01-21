'use client'

const metrics = [
    {
        metric: 'Weekly admin time reduction',
        before: '3+ hours',
        after: '< 5 minutes',
        impact: '95% reduction',
    },
    {
        metric: 'Matchup channel creation',
        before: '45-60 minutes',
        after: '< 1 minute',
        impact: '98% faster',
    },
    {
        metric: 'AI schedule extraction accuracy',
        before: 'N/A (manual)',
        after: '95%',
        impact: 'Enabled automation',
    },
    {
        metric: 'Discord response latency',
        before: 'N/A',
        after: '< 3 seconds',
        impact: 'Meets Discord API requirement',
    },
    {
        metric: 'Servers per license',
        before: 'Industry: 1',
        after: '3 servers',
        impact: 'Competitive advantage',
    },
    {
        metric: 'Annual pricing vs competitor',
        before: '$14.99-34.99/league',
        after: '$69.99 flat',
        impact: '~60% savings for multi-league users',
    },
]

export function TriloMetricsTable() {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Metric</th>
                            <th className="px-6 py-4 font-medium">Before</th>
                            <th className="px-6 py-4 font-medium">After</th>
                            <th className="px-6 py-4 font-medium">Impact</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {metrics.map((item) => (
                            <tr key={item.metric} className="group transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                                    {item.metric}
                                </td>
                                <td className="px-6 py-4 text-zinc-500 dark:text-zinc-500">
                                    {item.before}
                                </td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 font-medium">
                                    {item.after}
                                </td>
                                <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                                    {item.impact}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
