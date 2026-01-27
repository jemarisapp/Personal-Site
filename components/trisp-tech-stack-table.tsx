'use client'

const techStack = [
    {
        category: 'Frontend',
        item: 'React 19 + TypeScript',
        description: 'Modern React with full type safety across both apps.',
    },
    {
        category: 'Frontend',
        item: 'Vite 6',
        description: 'Fast builds and HMR for portfolio development.',
    },
    {
        category: 'Frontend',
        item: 'React Router v7',
        description: 'Client-side routing for portfolio navigation.',
    },
    {
        category: 'Frontend',
        item: 'Framer Motion',
        description: 'Smooth animations and page transitions.',
    },
    {
        category: 'Frontend',
        item: 'Tailwind CSS',
        description: 'Utility-first styling with custom brand theming.',
    },
    {
        category: 'Backend',
        item: 'Express 5',
        description: 'API server for client portal (uploads, downloads, auth).',
    },
    {
        category: 'Backend',
        item: 'Sharp',
        description: 'Image processing pipeline: EXIF rotation, 3 variant sizes.',
    },
    {
        category: 'Backend',
        item: 'Archiver',
        description: 'Streaming ZIP generation for batch downloads.',
    },
    {
        category: 'Database & Storage',
        item: 'Supabase (PostgreSQL)',
        description: 'Galleries, photos, guests, favorites, submissions.',
    },
    {
        category: 'Database & Storage',
        item: 'Supabase Storage (S3)',
        description: 'Photo storage with public/private bucket policies.',
    },
    {
        category: 'AI & Automation',
        item: 'Google Gemini API',
        description: 'AI-powered image tagging and auto-renaming scripts.',
    },
    {
        category: 'Services',
        item: 'Resend',
        description: 'Transactional emails for inquiries and download links.',
    },
    {
        category: 'Services',
        item: 'Vercel',
        description: 'Edge deployment with domain masking proxy.',
    },
    {
        category: 'Services',
        item: 'Railway',
        description: 'Backend hosting for Express server.',
    },
]

export function TRISPTechStackTable() {
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
