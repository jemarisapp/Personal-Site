'use client'

const decisions = [
    {
        goal: 'Fast gallery browsing',
        implementation: 'Built a 3-variant image pipeline. Thumbnails load instantly in the grid, while full resolution loads only when needed.',
    },
    {
        goal: 'Premium brand feel',
        implementation: 'Domain masking via proxy routes hides all infrastructure URLs from clients',
    },
    {
        goal: 'Client empowerment',
        implementation: 'Engineered a submission workflow for favorites that allows clients to curate lists and send structured data back to me.',
    },
    {
        goal: 'Instant gratification',
        implementation: 'Implemented streaming ZIP generation so downloads start immediately without waiting for server processing.',
    },
    {
        goal: 'Zero friction authentication',
        implementation: 'Developed an email-only guest system to verify identity without forcing account creation.',
    },
]

export function TRISPDesignDecisionsTable() {
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Design Goal</th>
                            <th className="px-6 py-4 font-medium">How I Built It</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {decisions.map((item) => (
                            <tr key={item.goal} className="group transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                                    {item.goal}
                                </td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                    {item.implementation}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
