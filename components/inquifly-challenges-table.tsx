'use client'

import { AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react'

const challenges = [
    {
        title: 'Gmail Forwarding UX',
        problem: 'Non-technical photographers struggle with complex filter setup.',
        solution: 'Step-by-step wizard with test inquiry verification.',
        learning: 'Invest heavily in onboarding UX for complex third-party integrations.',
    },
    {
        title: 'AI Hallucination Prevention',
        problem: 'LLMs might invent prices/policies if given too much creative freedom.',
        solution: 'Strict separation of concerns. AI handles language; code handles facts.',
        learning: 'Never let AI generate business-critical numbers without deterministic guardrails.',
    },
    {
        title: 'OAuth Token Management',
        problem: 'Google tokens expire efficiently; users shouldn\'t re-authenticate constantly.',
        solution: 'Store refresh tokens securely and implement auto-refresh on expiry.',
        learning: 'Plan for long-lived integration maintenance from the start.',
    },
    {
        title: 'Race Conditions',
        problem: 'Parallel webhooks can process the same email twice.',
        solution: 'Claim threads immediately in DB *before* starting slow operations.',
        learning: 'Idempotency must check state first, not last.',
    },
]

export function InquiflyChallengesTable() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {challenges.map((challenge) => (
                <div
                    key={challenge.title}
                    className="flex flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                    <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {challenge.title}
                    </h3>

                    <div className="flex-1 space-y-4">
                        {/* Problem */}
                        <div className="flex gap-3">
                            <div className="mt-0.5 shrink-0 text-red-500 dark:text-red-400">
                                <AlertTriangle className="h-4 w-4" />
                            </div>
                            <div>
                                <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Problem</span>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">{challenge.problem}</p>
                            </div>
                        </div>

                        {/* Solution */}
                        <div className="flex gap-3">
                            <div className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                                <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Solution</span>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">{challenge.solution}</p>
                            </div>
                        </div>
                    </div>

                    {/* Learning */}
                    <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                        <div className="flex gap-2.5">
                            <div className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400">
                                <Lightbulb className="h-4 w-4" />
                            </div>
                            <div>
                                <span className="block text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-500">Key Learning</span>
                                <p className="text-sm italic text-emerald-800 dark:text-emerald-300">"{challenge.learning}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
