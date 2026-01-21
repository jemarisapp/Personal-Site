'use client'

const techStack = [
    {
        category: 'Frontend',
        item: 'Next.js 15 (App Router)',
        description: 'Server components + API routes in one framework.',
    },
    {
        category: 'Frontend',
        item: 'React 19 + TypeScript',
        description: 'Type-safe UI with latest React features.',
    },
    {
        category: 'Frontend',
        item: 'Tailwind CSS v4',
        description: 'Utility-first styling with dark mode support.',
    },
    {
        category: 'Frontend',
        item: 'Recharts',
        description: 'Usage analytics and time-saved visualizations.',
    },
    {
        category: 'Backend & Database',
        item: 'Supabase (PostgreSQL)',
        description: 'User data, drafts, settings, processing logs.',
    },
    {
        category: 'Backend & Database',
        item: 'Supabase Auth',
        description: 'Email authentication with session management.',
    },
    {
        category: 'Backend & Database',
        item: 'Zod',
        description: 'Runtime validation for API inputs.',
    },
    {
        category: 'AI & Processing',
        item: 'Google Gemini API',
        description: 'Two-stage AI: inquiry extraction + draft generation.',
    },
    {
        category: 'AI & Processing',
        item: 'Postmark Webhooks',
        description: 'Inbound email processing pipeline.',
    },
    {
        category: 'Integrations',
        item: 'Google Calendar API',
        description: 'Real-time availability checking with freebusy.',
    },
    {
        category: 'Integrations',
        item: 'Google OAuth 2.0',
        description: 'Calendar and Gmail access tokens.',
    },
    {
        category: 'Integrations',
        item: 'Stripe',
        description: 'Subscription billing with usage-based limits.',
    },
]

export function InquiflyTechStackTable() {
    const groupedStack = techStack.reduce((acc, curr) => {
        const found = acc.find(a => a.category === curr.category);
        if (found) {
            found.items.push(curr);
        } else {
            acc.push({ category: curr.category, items: [curr] });
        }
        return acc;
    }, [] as { category: string, items: typeof techStack }[]);

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Layer</th>
                            <th className="px-6 py-4 font-medium">Technology</th>
                            <th className="px-6 py-4 font-medium">Purpose</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {groupedStack.map((group) => (
                            group.items.map((row, index) => (
                                <tr key={row.item} className="group transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                                    {index === 0 && (
                                        <td
                                            className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap align-top bg-zinc-50/50 dark:bg-zinc-900/50"
                                            rowSpan={group.items.length}
                                        >
                                            {group.category}
                                        </td>
                                    )}
                                    <td className="px-6 py-4 font-medium text-zinc-700 dark:text-zinc-300 border-l border-zinc-100 dark:border-zinc-800/50">
                                        {row.item}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                        {row.description}
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
