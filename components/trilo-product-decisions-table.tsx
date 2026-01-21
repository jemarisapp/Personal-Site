'use client'

const decisions = [
    {
        category: 'AI & Automation',
        decision: 'GPT-4o-mini for Vision',
        context: 'Needed to extract matchups from schedule screenshots',
        alternatives: 'GPT-4 Vision, Claude Vision, manual parsing',
        rationale: '95% accuracy at ~10x lower cost than GPT-4. Acceptable error rate for human review.',
    },
    {
        category: 'AI & Automation',
        decision: 'Structured prompt engineering',
        context: 'AI outputs needed to be reliably parseable',
        alternatives: 'Free-form generation, fine-tuning',
        rationale: 'Strict JSON schema enforcement eliminates parsing failures without fine-tuning costs.',
    },
    {
        category: 'Database Architecture',
        decision: 'Dual-mode abstraction layer',
        context: 'Need simple local dev but production-grade scaling',
        alternatives: 'PostgreSQL-only, SQLite-only, Docker Compose',
        rationale: 'SQLite for frictionless local dev; PostgreSQL for production. Abstraction auto-converts query syntax.',
    },
    {
        category: 'Database Architecture',
        decision: 'Connection pooling (2-10)',
        context: 'Discord bot serves multiple concurrent servers',
        alternatives: 'Single connection, unlimited pool, PgBouncer',
        rationale: 'Balanced pool prevents connection exhaustion while staying within Supabase free tier.',
    },
    {
        category: 'Monetization',
        decision: 'Flat $69.99/year for 3 servers',
        context: 'Commissioners typically manage 2-3 leagues',
        alternatives: 'Per-server pricing, freemium, per-feature tiers',
        rationale: 'Competitive moat vs NeonSportz ($14.99-$34.99/league). Simpler mental model for users.',
    },
    {
        category: 'Monetization',
        decision: 'License keys via Discord DM',
        context: 'Users already authenticated via Discord OAuth',
        alternatives: 'Email delivery, dashboard retrieval, in-bot generation',
        rationale: 'Zero friction: key arrives where users will activate it. No email verification needed.',
    },
    {
        category: 'User Experience',
        decision: 'Discord-native (no external dashboard)',
        context: 'Target users live in Discord',
        alternatives: 'Web dashboard, mobile app, hybrid approach',
        rationale: 'Commissioners don\'t want another tool. Everything happens where the community already is.',
    },
    {
        category: 'User Experience',
        decision: 'Emoji reactions for game status',
        context: 'Need quick way to mark games as complete/simmed',
        alternatives: 'Slash commands, buttons, dropdown menus',
        rationale: 'Single-tap interaction. Visual status at a glance. Familiar Discord pattern.',
    },
    {
        category: 'Infrastructure',
        decision: 'Railway for bot, Vercel for site',
        context: 'Bot needs persistent process; site needs serverless',
        alternatives: 'Single platform, AWS, self-hosted',
        rationale: 'Right tool for each job. Railway handles long-running Python; Vercel handles serverless API routes.',
    },
    {
        category: 'Infrastructure',
        decision: 'Stripe webhooks for fulfillment',
        context: 'Need reliable subscription lifecycle handling',
        alternatives: 'Polling, manual activation, third-party billing',
        rationale: 'Event-driven ensures no missed payments. Automatic license key generation on successful charge.',
    },
]

export function TriloProductDecisionsTable() {
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
