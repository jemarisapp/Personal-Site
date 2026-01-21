'use client'

const techStack = [
    {
        category: 'Discord Bot',
        item: 'Python 3.11 + discord.py',
        description: 'Async-first bot framework with slash command support.',
    },
    {
        category: 'Discord Bot',
        item: 'OpenAI Vision API (GPT-4o-mini)',
        description: 'AI-powered schedule screenshot extraction.',
    },
    {
        category: 'Discord Bot',
        item: 'PostgreSQL (Supabase)',
        description: 'Production database with connection pooling.',
    },
    {
        category: 'Discord Bot',
        item: 'SQLite (aiosqlite)',
        description: 'Local development database.',
    },
    {
        category: 'Discord Bot',
        item: 'Railway',
        description: 'Hosting with auto-deploy from main branch.',
    },
    {
        category: 'Marketing Site',
        item: 'React 19 + TypeScript',
        description: 'Type-safe frontend with latest React features.',
    },
    {
        category: 'Marketing Site',
        item: 'Vite',
        description: 'Fast build tooling and HMR.',
    },
    {
        category: 'Marketing Site',
        item: 'Tailwind CSS + Framer Motion',
        description: 'Styling and animations.',
    },
    {
        category: 'Marketing Site',
        item: 'Vercel Serverless Functions',
        description: 'API endpoints for OAuth and webhooks.',
    },
    {
        category: 'Payments & Auth',
        item: 'Stripe',
        description: 'Subscription billing and checkout sessions.',
    },
    {
        category: 'Payments & Auth',
        item: 'Discord OAuth2',
        description: 'User authentication and license key delivery via DM.',
    },
    {
        category: 'Payments & Auth',
        item: 'License Key System',
        description: 'Custom TRILO-XXXX-XXXX-XXXX format with 3-server activation.',
    },
]

export function TriloTechStackTable() {
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
