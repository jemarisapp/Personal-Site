'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const features = [
    {
        category: 'Accessibility',
        feature: 'Plain Language',
        description: '6th grade reading level for maximum comprehension.',
    },
    {
        category: 'Accessibility',
        feature: 'Multilingual Support',
        description: 'English, Spanish, Chinese, Korean, Vietnamese.',
    },
    {
        category: 'Accessibility',
        feature: 'Caption Support',
        description: 'Automatic caption generation for hearing accessibility.',
    },
    {
        category: 'Accessibility',
        feature: 'Cultural Sensitivity',
        description: 'Adapted content for diverse communities.',
    },
    {
        category: 'Accuracy & Governance',
        feature: 'Human Approval Gates',
        description: 'Multiple review points for accuracy.',
    },
    {
        category: 'Accuracy & Governance',
        feature: 'Source Verification',
        description: 'RAG system ensures information accuracy.',
    },
    {
        category: 'Accuracy & Governance',
        feature: 'Expert Review',
        description: 'Subject matter expert validation before publication.',
    },
    {
        category: 'Accuracy & Governance',
        feature: 'Feedback Loop',
        description: 'User comments routed back for content improvement.',
    },
    {
        category: 'Scalability & Automation',
        feature: 'Automated Workflow',
        description: 'Minimal manual intervention required.',
    },
    {
        category: 'Scalability & Automation',
        feature: 'Multi-platform Distribution',
        description: 'Simultaneous posting across social platforms.',
    },
    {
        category: 'Scalability & Automation',
        feature: 'Template System',
        description: 'Reusable components for different content types.',
    },
    {
        category: 'Scalability & Automation',
        feature: 'Monitoring Dashboard',
        description: 'Real-time status tracking and analytics.',
    },
]

export function NavigateIDDFeaturesTable() {
    const groupedFeatures = features.reduce((acc, curr) => {
        const found = acc.find(a => a.category === curr.category);
        if (found) {
            found.items.push(curr);
        } else {
            acc.push({ category: curr.category, items: [curr] });
        }
        return acc;
    }, [] as { category: string, items: typeof features }[]);

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Feature</th>
                            <th className="px-6 py-4 font-medium">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {groupedFeatures.map((group) => (
                            group.items.map((row, index) => (
                                <tr key={row.feature} className="group transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                                    {index === 0 && (
                                        <td
                                            className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap align-top bg-zinc-50/50 dark:bg-zinc-900/50"
                                            rowSpan={group.items.length}
                                        >
                                            {group.category}
                                        </td>
                                    )}
                                    <td className="px-6 py-4 font-medium text-zinc-700 dark:text-zinc-300 border-l border-zinc-100 dark:border-zinc-800/50">
                                        {row.feature}
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
