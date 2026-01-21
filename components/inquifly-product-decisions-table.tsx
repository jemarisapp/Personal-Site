'use client'

const decisions = [
    {
        category: 'AI Architecture',
        decision: 'Two-stage AI pipeline',
        alternatives: 'Single prompt, fine-tuned model',
        rationale: 'Extraction → Draft separation allows validation between steps; structured output enables calendar lookup before drafting.',
    },
    {
        category: 'AI Architecture',
        decision: 'Knowledge base over fine-tuning',
        alternatives: 'Fine-tuned model, RAG with embeddings',
        rationale: 'Photographers can update packages/policies instantly without retraining. Lower cost, higher flexibility.',
    },
    {
        category: 'AI Architecture',
        decision: 'Strict prompt constraints',
        alternatives: 'Free-form generation, post-processing',
        rationale: 'AI cannot invent prices or policies—grounded in knowledge base. Prevents hallucination in business-critical content.',
    },
    {
        category: 'Email Processing',
        decision: 'Postmark webhooks',
        alternatives: 'Gmail API push, polling, direct IMAP',
        rationale: 'Simpler webhook model; no Gmail API quota concerns; reliable delivery with signature verification.',
    },
    {
        category: 'Email Processing',
        decision: 'Unique inbound addresses per user',
        alternatives: 'Shared inbox with parsing, subject line tokens',
        rationale: 'Clean routing without parsing complexity. Each photographer gets `username@mail.inquifly.com`.',
    },
    {
        category: 'Calendar Integration',
        decision: '3-day alternative window',
        alternatives: 'Single day only, full month scan',
        rationale: 'Most rescheduling happens within 3 days. Balances relevance with not overwhelming clients.',
    },
    {
        category: 'Calendar Integration',
        decision: 'Freebusy API over full event access',
        alternatives: 'Full calendar read access',
        rationale: 'Minimal permission scope—only checks busy/free, never reads event details. Better privacy.',
    },
    {
        category: 'Monetization',
        decision: 'Freemium with usage limits',
        alternatives: 'Flat subscription, pay-per-inquiry',
        rationale: 'Lets photographers prove ROI before paying. Usage limits create natural upgrade pressure.',
    },
    {
        category: 'Monetization',
        decision: 'Founder tier (20 spots)',
        alternatives: 'Standard launch pricing, lifetime deal',
        rationale: 'Creates urgency and exclusivity. Early adopters become advocates and provide feedback.',
    },
    {
        category: 'User Experience',
        decision: 'Draft review before send',
        alternatives: 'Fully automated sending, approval queue',
        rationale: 'Photographers maintain control and trust. One-click send after 30-second review.',
    },
]

export function InquiflyProductDecisionsTable() {
    const groupedDecisions = decisions.reduce((acc, curr) => {
        const found = acc.find(a => a.category === curr.category);
        if (found) {
            found.items.push(curr);
        } else {
            acc.push({ category: curr.category, items: [curr] });
        }
        return acc;
    }, [] as { category: string, items: typeof decisions }[]);

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <tr>
                            <th className="px-4 py-4 font-medium">Area</th>
                            <th className="px-4 py-4 font-medium">Decision</th>
                            <th className="px-4 py-4 font-medium hidden lg:table-cell">Alternatives Considered</th>
                            <th className="px-4 py-4 font-medium">Rationale</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {groupedDecisions.map((group) => (
                            group.items.map((row, index) => (
                                <tr key={row.decision} className="group transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                                    {index === 0 && (
                                        <td
                                            className="px-4 py-4 font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap align-top bg-zinc-50/50 dark:bg-zinc-900/50"
                                            rowSpan={group.items.length}
                                        >
                                            {group.category}
                                        </td>
                                    )}
                                    <td className="px-4 py-4 font-medium text-zinc-700 dark:text-zinc-300 border-l border-zinc-100 dark:border-zinc-800/50 min-w-[140px]">
                                        {row.decision}
                                    </td>
                                    <td className="px-4 py-4 text-zinc-500 dark:text-zinc-500 hidden lg:table-cell text-xs">
                                        {row.alternatives}
                                    </td>
                                    <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400">
                                        {row.rationale}
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
