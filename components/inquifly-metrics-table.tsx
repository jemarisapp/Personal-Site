'use client'

const metrics = [
    {
        metric: 'Inquiry response time',
        before: '20+ minutes',
        after: '30 seconds',
        impact: '97% faster',
    },
    {
        metric: 'Calendar checking',
        before: 'Manual lookup',
        after: 'Real-time API',
        impact: 'Zero double-bookings',
    },
    {
        metric: 'Brand voice consistency',
        before: 'Varies by mood/time',
        after: 'Knowledge base driven',
        impact: '100% on-brand',
    },
    {
        metric: 'Time saved per month',
        before: '0 hours',
        after: '~10 hours (30 inquiries)',
        impact: 'Reclaimed creative time',
    },
    {
        metric: 'Inquiry-to-draft automation',
        before: 'Fully manual',
        after: 'One-click review',
        impact: '95% automated',
    },
    {
        metric: 'Alternative date suggestions',
        before: 'None (lost booking)',
        after: '3-day window scan',
        impact: 'Recovered revenue',
    },
]

export function InquiflyMetricsTable() {
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
