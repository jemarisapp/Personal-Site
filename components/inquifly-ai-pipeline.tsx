'use client'

import { Mail, Sparkles, FileJson, Calendar, FileText, ArrowRight } from 'lucide-react'

function PipelineStage({
    icon: Icon,
    title,
    description,
    output,
    color,
}: {
    icon: any
    title: string
    description: string
    output: string
    color: 'purple' | 'blue' | 'orange'
}) {
    const colors = {
        purple: 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
        blue: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
        orange: 'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800',
    }
    const iconColors = {
        purple: 'text-purple-600 dark:text-purple-400',
        blue: 'text-blue-600 dark:text-blue-400',
        orange: 'text-orange-600 dark:text-orange-400',
    }

    return (
        <div className={`flex-1 rounded-xl border p-5 ${colors[color]}`}>
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-white dark:bg-zinc-900 ${iconColors[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h4>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{description}</p>
            <div className="text-xs font-mono bg-white/50 dark:bg-zinc-900/50 rounded-lg p-3 text-zinc-700 dark:text-zinc-300">
                <span className="text-zinc-400 dark:text-zinc-500">Output: </span>
                {output}
            </div>
        </div>
    )
}

export function InquiflyAIPipeline() {
    return (
        <div className="space-y-6">
            {/* Stage 1 */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
                <div className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Raw Email</h4>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 italic">
                        "Hi! I'm looking for a graduation photographer for May 15th at Georgia State. Do you have any availability? Thanks, Sarah"
                    </p>
                </div>

                <div className="flex items-center justify-center lg:px-2">
                    <ArrowRight className="w-5 h-5 text-zinc-400 rotate-90 lg:rotate-0" />
                </div>

                <PipelineStage
                    icon={Sparkles}
                    title="Stage 1: Extraction"
                    description="Gemini parses email into structured data"
                    output='{ name: "Sarah", session_type: "graduation", date: "2025-05-15", location: "Georgia State" }'
                    color="purple"
                />
            </div>

            {/* Stage 2 */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
                <div className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            <FileJson className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Context Gathered</h4>
                    </div>
                    <ul className="text-sm text-zinc-500 dark:text-zinc-500 space-y-1">
                        <li>• Extracted inquiry data</li>
                        <li>• Graduation packages ($299-$599)</li>
                        <li>• Photographer's tone settings</li>
                        <li>• Business policies (50% deposit)</li>
                    </ul>
                </div>

                <div className="flex items-center justify-center lg:px-2">
                    <ArrowRight className="w-5 h-5 text-zinc-400 rotate-90 lg:rotate-0" />
                </div>

                <PipelineStage
                    icon={Calendar}
                    title="Calendar Check"
                    description="Google Calendar API checks availability"
                    output='{ available: false, alternatives: ["May 14 2pm", "May 16 11am", "May 17 9am"] }'
                    color="blue"
                />
            </div>

            {/* Stage 3 */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
                <div className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Stage 2: Draft Generation</h4>
                    </div>
                    <ul className="text-sm text-zinc-500 dark:text-zinc-500 space-y-1">
                        <li>• Inquiry + packages + policies + tone</li>
                        <li>• Calendar status (unavailable + alternatives)</li>
                        <li>• Sample responses for style</li>
                    </ul>
                </div>

                <div className="flex items-center justify-center lg:px-2">
                    <ArrowRight className="w-5 h-5 text-zinc-400 rotate-90 lg:rotate-0" />
                </div>

                <PipelineStage
                    icon={FileText}
                    title="Draft Ready"
                    description="Personalized response with alternatives"
                    output={`"Hi Sarah! Thanks for reaching out. I'm booked on May 15th, but I have availability on May 14th at 2pm or May 16th at 11am. My graduation packages start at $299..."`}
                    color="orange"
                />
            </div>
        </div>
    )
}
