'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const techStack = [
    {
        category: 'Core Technologies',
        item: 'n8n',
        description: 'Workflow orchestration and automation.',
    },
    {
        category: 'Core Technologies',
        item: 'OpenAI GPT-4 & Claude Sonnet 4.5',
        description: 'AI script generation and translation.',
    },
    {
        category: 'Core Technologies',
        item: 'Pinecone',
        description: 'Vector database for RAG implementation.',
    },
    {
        category: 'Core Technologies',
        item: 'Synthesia',
        description: 'AI video generation platform.',
    },
    {
        category: 'Integrations',
        item: 'Google Workspace',
        description: 'Drive, Docs, Sheets for document management.',
    },
    {
        category: 'Integrations',
        item: 'YouTube API',
        description: 'Video upload and metadata management.',
    },
    {
        category: 'Integrations',
        item: 'Social Media APIs',
        description: 'Multi-platform distribution.',
    },
    {
        category: 'Integrations',
        item: 'Webhook System',
        description: 'Real-time approval and status updates.',
    },
]

export function NavigateIDDTechStackTable() {
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
                            <th className="px-6 py-4 font-medium">Category</th>
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
