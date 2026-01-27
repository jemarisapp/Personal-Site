'use client'

const metrics = [
    {
        metric: 'Gallery delivery experience',
        before: 'Generic WeTransfer link',
        after: 'Branded portal at my domain',
        impact: '50+ clients served',
    },
    {
        metric: 'Image loading speed',
        before: 'Full-res files, slow load',
        after: 'Optimized variants per context',
        impact: 'Instant grid browsing',
    },
    {
        metric: 'Brand consistency',
        before: 'Third-party URLs exposed',
        after: 'clients.trispstudio.com',
        impact: '100% branded touchpoints',
    },
    {
        metric: 'Client selection workflow',
        before: '"Screenshot your favorites"',
        after: 'Named lists, direct submission',
        impact: 'Structured feedback',
    },
    {
        metric: 'Download experience',
        before: 'Navigate folders, wait for ZIP',
        after: 'Select → Download → Done',
        impact: 'Instant gratification',
    },
    {
        metric: 'Authentication friction',
        before: 'Create account, verify email',
        after: 'Enter email once, remembered',
        impact: 'Zero barriers',
    },
]

export function TRISPMetricsTable() {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Experience</th>
                            <th className="px-6 py-4 font-medium">Before</th>
                            <th className="px-6 py-4 font-medium">After</th>
                            <th className="px-6 py-4 font-medium">Outcome</th>
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
