'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mail, Send, Sparkles, Terminal, Cpu, Clock, Reply } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TextEffect } from '@/components/ui/text-effect'

type Tab = 'inquiry' | 'processing' | 'draft'

export function BookingAgentDemo({
    autoPlay = false,
    onComplete,
    compact = false
}: {
    autoPlay?: boolean
    onComplete?: () => void
    compact?: boolean
}) {
    const [activeTab, setActiveTab] = useState<Tab>('inquiry')
    const [draftStep, setDraftStep] = useState(0)

    useEffect(() => {
        if (!autoPlay) return

        const sequence = async () => {
            setActiveTab('inquiry')
            await new Promise(r => setTimeout(r, 2000)) // Read email

            setActiveTab('processing')
            await new Promise(r => setTimeout(r, 2500)) // Process

            setActiveTab('draft')
            // Draft animation handled by TextEffect. We wait for it.
            // TextEffect total duration approx: 1.5s * 4 steps + delays. Let's guess 8s.
            await new Promise(r => setTimeout(r, 8000))

            onComplete?.()
        }

        sequence()
    }, [autoPlay, onComplete])

    useEffect(() => {
        if (activeTab === 'draft') {
            setDraftStep(0)
        }
    }, [activeTab])

    return (
        <div className="group relative my-8 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">

            {/* Decorative background gradients */}
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />

            {/* Header / Tabs */}
            <div className="relative z-10 flex border-b border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-950/50">
                <TabButton
                    active={activeTab === 'inquiry'}
                    onClick={() => setActiveTab('inquiry')}
                    icon={<Mail className="h-3.5 w-3.5" />}
                    label="1. Inquiry"
                    colorClass="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                />
                <TabButton
                    active={activeTab === 'processing'}
                    onClick={() => setActiveTab('processing')}
                    icon={<Cpu className="h-3.5 w-3.5" />}
                    label="2. Processing"
                    colorClass="bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                />
                <TabButton
                    active={activeTab === 'draft'}
                    onClick={() => setActiveTab('draft')}
                    icon={<Sparkles className="h-3.5 w-3.5" />}
                    label="3. Response"
                    colorClass="bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                />
            </div>

            {/* Content Area */}
            <div className="relative min-h-[400px] w-full bg-zinc-50/50 p-4 dark:bg-zinc-900/50 sm:p-8">
                <AnimatePresence mode="wait">
                    {activeTab === 'inquiry' && (
                        <motion.div
                            key="inquiry"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="mx-auto max-w-2xl"
                        >
                            <EmailCard
                                variant="default"
                                sender="Jada Anderson"
                                subject="Inquiry: Graduation Shoot - Studio & Campus"
                                email="jada.anderson@grad.edu"
                                timestamp="Today at 9:42 AM"
                                avatarColor="bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
                            >
                                <p className="text-zinc-600 dark:text-zinc-300">
                                    Hi,
                                </p>
                                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                                    I wanted to do a couple of shots in a studio and on campus. Ideal locations on campus are my college building, legacy gazebo, and the KSU sign.
                                </p>
                                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                                    For the studio shots I would like maybe a yellow or white backdrop. I am graduating with a psychology degree so maybe something that can correlate with that.
                                </p>
                                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                                    Are you available on <span className="rounded bg-blue-100 px-1 py-0.5 font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">November 12th</span> around 2pm?
                                </p>
                                <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                                    Thanks,<br />Jada
                                </p>
                            </EmailCard>
                        </motion.div>
                    )}

                    {activeTab === 'processing' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            className="mx-auto h-full max-w-2xl"
                        >
                            <TerminalView />
                        </motion.div>
                    )}

                    {activeTab === 'draft' && (
                        <motion.div
                            key="draft"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="relative mx-auto max-w-2xl"
                        >
                            <EmailCard
                                variant="reply"
                                email="jada.anderson@grad.edu"
                                timestamp="Today at 9:42 AM (20s later)"
                                isDraft
                            >
                                <div className="text-zinc-700 dark:text-zinc-300">
                                    <TextEffect
                                        per="line"
                                        preset="fade"
                                        speedReveal={1.5}
                                        className="whitespace-pre-wrap"
                                    >
                                        {compact ? `Hi Jada,

Congratulations on your upcoming graduation! Your vision sounds amazing.

✓ November 12, 2025 at 2:00 PM is available.

I've attached package options for studio + on-campus sessions starting at $450.

Looking forward to working with you!` : `Hi Jada,

Thank you so much for reaching out, and congratulations on your upcoming graduation!

Your vision sounds amazing. I love the idea of combining on-campus locations like your college building, the legacy gazebo, and the KSU sign with a studio session using a yellow or white backdrop. We can also add a creative touch that reflects your psychology degree.

Your preferred date and time, November 12, 2025 at 2:00 PM, is currently available.

Here are a few package options that combine both studio and on-campus sessions:

Package 1: Studio + Mini On-Campus
• 1-hour studio session
• 30-minute on-campus session
• $450 total
• (Includes 6 edited images from studio, 3 from campus)

Package 2: Studio + Full On-Campus
• 1-hour studio session
• 1-hour on-campus session
• $600 total
• (Includes 6 edited images from studio, 6 from campus)

Package 3: Extended Studio + Full On-Campus
• 2-hour studio session
• 1-hour on-campus session
• $700 total
• (Includes 10 edited images from studio, 6 from campus)

Let me know if you have any questions or if you’d like to move forward with one of the packages. I’m looking forward to working with you!`}
                                    </TextEffect>
                                </div>
                            </EmailCard>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5 }}
                                className="mt-6 flex justify-end gap-3"
                            >
                                <button className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200">
                                    Discard
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-zinc-100/10 dark:hover:bg-zinc-200">
                                    <Send className="h-4 w-4" />
                                    Approve & Send
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

function TabButton({ active, onClick, icon, label, colorClass }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, colorClass: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'group flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-300',
                active
                    ? 'text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200'
            )}
        >
            <div className={cn("flex h-6 w-6 items-center justify-center rounded-md transition-colors", active ? colorClass : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700")}>
                {icon}
            </div>
            <span className="hidden sm:inline">{label}</span>
            {active && (
                <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-zinc-100"
                />
            )}
        </button>
    )
}

function EmailCard({
    children,
    sender,
    subject,
    email,
    timestamp,
    isDraft,
    avatarColor,
    variant = 'default'
}: {
    children: React.ReactNode
    sender?: string
    subject?: string
    email?: string
    timestamp: string
    isDraft?: boolean
    avatarColor?: string
    variant?: 'default' | 'reply'
}) {
    return (
        <div className={cn(
            "relative overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow dark:bg-zinc-950",
            isDraft ? "border-purple-200 shadow-purple-500/5 dark:border-purple-500/20" : "border-zinc-200 dark:border-zinc-800"
        )}>
            {variant === 'default' ? (
                <>
                    {/* Window Controls */}
                    <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800/50 dark:bg-zinc-900/50">
                        <div className="flex gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-400/20" />
                            <div className="h-2.5 w-2.5 rounded-full bg-amber-400/20" />
                            <div className="h-2.5 w-2.5 rounded-full bg-green-400/20" />
                        </div>
                    </div>

                    {/* Email Header */}
                    <div className="px-6 py-5">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{subject}</h3>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold", avatarColor)}>
                                    {sender?.[0]}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{sender}</div>
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">to me</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                                <Clock className="h-3.5 w-3.5" />
                                {timestamp}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                /* Minimal Reply Header */
                <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-zinc-800/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                            <Reply className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{email}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {isDraft && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                                <Sparkles className="h-3 w-3" />
                                AI Draft
                            </span>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                            <Clock className="h-3.5 w-3.5" />
                            {timestamp}
                        </div>
                    </div>
                </div>
            )}

            {/* Body */}
            <div className="px-6 pb-8 pt-2 text-sm leading-relaxed">
                {children}
            </div>
        </div>
    )
}

function TerminalView() {
    return (
        <div className="h-full min-h-[300px] overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0c0c] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-2">
                <Terminal className="h-3 w-3 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-400">serverless-function: invoke</span>
            </div>
            <div className="font-mono p-4 text-sm">
                <div className="max-w-xl space-y-1">
                    <LogLine delay={0} content="> [webhook] Triggered by messageId: 191e8a..." color="text-zinc-500" />
                    <LogLine delay={0.4} content="> [processInquiries] Processing message..." color="text-zinc-300" />
                    <LogLine delay={0.8} content="> [markEmailProcessed] Claiming thread to prevent race conditions" color="text-zinc-500" />

                    <LogLine delay={1.4} content="> [extractInquiry] Intent detected: 'Graduation - Studio+Campus'" color="text-blue-400" />
                    <LogLine delay={2.2} content='> [extractInquiry] Extracting: { date: "2025-11-12", time: "14:00" }' color="text-emerald-400" />

                    <LogLine delay={2.8} content="> [checkAvailability] Querying calendar.freebusy..." color="text-blue-400" />
                    <LogLine delay={3.4} content="> [checkAvailability] Slot 2025-11-12 14:00 is AVAILABLE" color="text-emerald-400" />

                    <LogLine delay={4.0} content='> [draftReply] Filtering PACKAGES for "graduation_combo"...' color="text-amber-400" />
                    <LogLine delay={4.4} content="> [draftReply] Found: [Studio+Mini, Studio+Full, Extended]" color="text-purple-400" />

                    <LogLine delay={5.2} content="> [createDraftReply] Draft created successfully (204ms)" color="text-zinc-300" />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 5.5 }}
                        className="pt-2"
                    >
                        <span className="animate-pulse text-zinc-500">_</span>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

function LogLine({ content, color, delay }: { content: string, color: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.2 }}
            className={color}
        >
            {content}
        </motion.div>
    )
}


