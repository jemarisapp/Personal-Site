'use client'

import { useState } from 'react'
import {
    Mail,
    Webhook,
    Sparkles,
    Calendar,
    Database,
    CreditCard,
    User,
    FileText,
    Send,
    Plus,
    Minus,
    Globe,
} from 'lucide-react'

function Node({
    icon: Icon,
    label,
    subLabel,
    color = "blue",
    className = ""
}: {
    icon: any,
    label: string,
    subLabel?: string,
    color?: "blue" | "purple" | "black" | "gray" | "green" | "orange",
    className?: string
}) {
    const colors = {
        blue: "bg-blue-500 text-white border-blue-600 shadow-blue-500/20",
        purple: "bg-purple-500 text-white border-purple-600 shadow-purple-500/20",
        orange: "bg-orange-500 text-white border-orange-600 shadow-orange-500/20",
        green: "bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20",
        black: "bg-zinc-900 text-white border-zinc-950 shadow-zinc-900/20 dark:bg-black dark:border-zinc-800",
        gray: "bg-white text-zinc-900 border-zinc-200 shadow-zinc-200/50 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800"
    }

    return (
        <div className={`relative flex flex-col items-center justify-center p-4 rounded-xl border shadow-sm transition-all ${colors[color]} ${className} z-10 w-[130px]`}>
            <div className={`mb-2 p-2 rounded-full ${color === 'gray' ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-white/10'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-center leading-tight">{label}</span>
            {subLabel && <span className="text-[9px] opacity-70 mt-1 max-w-[110px] text-center leading-tight">{subLabel}</span>}
        </div>
    )
}

function ArchitectureConnections() {
    return (
        <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-0">
            <defs>
                <marker id="arrowhead-inquifly" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <path d="M0,0 L6,2 L0,4" fill="#9ca3af" />
                </marker>
            </defs>

            {/* Client -> Gmail */}
            <path d="M 130 200 L 250 200" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-inquifly)" fill="none" className="dark:stroke-zinc-700" />
            <text x="190" y="190" textAnchor="middle" className="text-[9px] fill-zinc-400">Sends inquiry</text>

            {/* Gmail -> Postmark */}
            <path d="M 380 200 L 500 200" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-inquifly)" fill="none" className="dark:stroke-zinc-700" />
            <text x="440" y="190" textAnchor="middle" className="text-[9px] fill-zinc-400">Forwards</text>

            {/* Postmark -> Next.js */}
            <path d="M 630 200 L 750 200" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-inquifly)" fill="none" className="dark:stroke-zinc-700" />
            <text x="690" y="190" textAnchor="middle" className="text-[9px] fill-zinc-400">Webhook</text>

            {/* Next.js -> Gemini (up) */}
            <path d="M 815 150 L 815 90" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-inquifly)" fill="none" className="dark:stroke-zinc-700" />
            <text x="835" y="120" textAnchor="start" className="text-[9px] fill-zinc-400">AI</text>

            {/* Next.js -> Calendar (down-right) */}
            <path d="M 880 200 C 950 200, 980 280, 980 320" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-inquifly)" fill="none" className="dark:stroke-zinc-700" />
            <text x="940" y="260" textAnchor="middle" className="text-[9px] fill-zinc-400">Check</text>

            {/* Next.js -> Supabase (down) */}
            <path d="M 815 250 L 815 320" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-inquifly)" fill="none" className="dark:stroke-zinc-700" />
            <text x="835" y="290" textAnchor="start" className="text-[9px] fill-zinc-400">Store</text>

            {/* Supabase -> Draft */}
            <path d="M 750 370 L 630 370" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-inquifly)" fill="none" className="dark:stroke-zinc-700" />
            <text x="690" y="360" textAnchor="middle" className="text-[9px] fill-zinc-400">Save draft</text>

            {/* Draft -> Photographer */}
            <path d="M 500 370 L 380 370" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-inquifly)" fill="none" className="dark:stroke-zinc-700" />
            <text x="440" y="360" textAnchor="middle" className="text-[9px] fill-zinc-400">Review</text>

            {/* Photographer -> Send */}
            <path d="M 250 370 L 130 370" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-inquifly)" fill="none" className="dark:stroke-zinc-700" />
            <text x="190" y="360" textAnchor="middle" className="text-[9px] fill-zinc-400">Send</text>

            {/* Stripe (separate) */}
            <path d="M 815 250 C 700 280, 650 280, 630 280" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="dark:stroke-zinc-700" />
        </svg>
    )
}

export function InquiflyArchitectureDiagram() {
    const [zoom, setZoom] = useState(0.7)

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5))
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4))

    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/20 group h-[480px]">

            {/* Zoom Controls */}
            <div className="absolute bottom-4 left-4 z-50 flex flex-col gap-2 p-1 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <button onClick={handleZoomIn} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" aria-label="Zoom In">
                    <Plus className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                </button>
                <button onClick={handleZoomOut} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" aria-label="Zoom Out">
                    <Minus className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                </button>
            </div>

            {/* Scrollable container */}
            <div className="w-full h-full overflow-auto cursor-grab active:cursor-grabbing p-8">
                <div
                    className="relative h-[500px] min-w-[1100px] mx-auto origin-top-left transition-transform duration-200 ease-out"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
                >
                    <ArchitectureConnections />

                    {/* Section Labels */}
                    <div className="absolute top-[120px] left-[0px] text-xs font-semibold text-zinc-400 uppercase tracking-wider">Input</div>
                    <div className="absolute top-[120px] left-[500px] text-xs font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wider">Processing</div>
                    <div className="absolute top-[290px] left-[0px] text-xs font-semibold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider">Output</div>

                    {/* Row 1: Input Flow */}
                    <div className="absolute top-[150px] left-0">
                        <Node icon={User} label="Client" subLabel="Sends inquiry" color="gray" />
                    </div>

                    <div className="absolute top-[150px] left-[250px]">
                        <Node icon={Mail} label="Gmail" subLabel="Filter forwards" color="blue" />
                    </div>

                    <div className="absolute top-[150px] left-[500px]">
                        <Node icon={Webhook} label="Postmark" subLabel="Webhook" color="purple" />
                    </div>

                    <div className="absolute top-[150px] left-[750px]">
                        <Node icon={Globe} label="Next.js API" subLabel="Orchestrator" color="black" className="scale-110 shadow-xl ring-4 ring-zinc-100 dark:ring-zinc-800" />
                    </div>

                    {/* Row 0: AI */}
                    <div className="absolute top-[20px] left-[750px]">
                        <Node icon={Sparkles} label="Gemini AI" subLabel="Extract + Draft" color="purple" />
                    </div>

                    {/* Row 2: Data Layer */}
                    <div className="absolute top-[320px] left-[750px]">
                        <Node icon={Database} label="Supabase" subLabel="PostgreSQL" color="green" />
                    </div>

                    <div className="absolute top-[320px] left-[920px]">
                        <Node icon={Calendar} label="Google Cal" subLabel="Availability" color="blue" />
                    </div>

                    <div className="absolute top-[230px] left-[500px]">
                        <Node icon={CreditCard} label="Stripe" subLabel="Subscriptions" color="green" />
                    </div>

                    {/* Row 3: Output Flow */}
                    <div className="absolute top-[320px] left-[500px]">
                        <Node icon={FileText} label="Draft" subLabel="Ready for review" color="orange" />
                    </div>

                    <div className="absolute top-[320px] left-[250px]">
                        <Node icon={User} label="Photographer" subLabel="Reviews draft" color="gray" />
                    </div>

                    <div className="absolute top-[320px] left-[0px]">
                        <Node icon={Send} label="Send" subLabel="To client" color="green" />
                    </div>
                </div>
            </div>

            {/* Hint overlay */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity text-xs text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80 px-2 py-1 rounded">
                Scroll to explore
            </div>
        </div>
    )
}
