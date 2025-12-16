'use client'

import {
    Mail,
    Zap,
    Cpu,
    Calendar,
    Sparkles,
    FileJson,
    User,
} from 'lucide-react'

// Condensed Node Component
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
    color?: "blue" | "black" | "gray",
    className?: string
}) {
    const colors = {
        blue: "bg-blue-500 text-white border-blue-600 shadow-blue-500/20",
        black: "bg-zinc-900 text-white border-zinc-950 shadow-zinc-900/20 dark:bg-black dark:border-zinc-800",
        gray: "bg-white text-zinc-900 border-zinc-200 shadow-zinc-200/50 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800"
    }

    return (
        <div className={`relative flex flex-col items-center justify-center p-4 rounded-xl border shadow-sm transition-all ${colors[color]} ${className} z-10 w-[140px]`}>
            <div className={`mb-2 p-2 rounded-full ${color === 'gray' ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-white/10'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-center leading-tight">{label}</span>
            {subLabel && <span className="text-[10px] opacity-70 mt-1 max-w-[120px] text-center leading-tight">{subLabel}</span>}
        </div>
    )
}

function SchemaConnections() {
    return (
        <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-0">
            <defs>
                <marker id="arrowhead-gray-lg" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <path d="M0,0 L6,2 L0,4" fill="#9ca3af" />
                </marker>
            </defs>

            {/* Client -> Inbox */}
            <path d="M 140 350 L 190 350" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-lg)" className="dark:stroke-zinc-700" />

            {/* Inbox -> PubSub */}
            <path d="M 330 350 L 380 350" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-lg)" className="dark:stroke-zinc-700" />

            {/* PubSub -> Vercel */}
            <path d="M 520 350 L 570 350" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-lg)" className="dark:stroke-zinc-700" />

            {/* Vercel -> Gmail API (Up) */}
            <path d="M 640 280 C 640 250, 640 180, 640 140" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-lg)" className="dark:stroke-zinc-700" />
            <rect x="590" y="190" width="100" height="20" rx="4" fill="var(--bg-card)" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="640" y="205" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">1. Check State</text>

            {/* Vercel -> Gemini Extraction (Right Up) */}
            <path d="M 710 350 C 760 350, 800 220, 840 220" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-lg)" className="dark:stroke-zinc-700" />
            <rect x="740" y="260" width="100" height="20" rx="4" fill="var(--bg-card)" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="790" y="275" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">2. Extract Data</text>

            {/* Vercel -> Calendar (Right Down) */}
            <path d="M 710 370 C 760 370, 800 480, 840 480" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-lg)" className="dark:stroke-zinc-700" />
            <rect x="740" y="420" width="100" height="20" rx="4" fill="var(--bg-card)" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="790" y="435" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">3. Check Dates</text>

            {/* Vercel -> Gemini Drafting (Down) */}
            <path d="M 640 420 C 640 450, 640 520, 640 560" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-lg)" className="dark:stroke-zinc-700" />
            <rect x="590" y="470" width="100" height="20" rx="4" fill="var(--bg-card)" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="640" y="485" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">4. Generate Reply</text>

            {/* Gemini Drafting -> Config */}
            <path d="M 640 650 L 640 690" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead-gray-lg)" className="dark:stroke-zinc-700" />

            {/* Gmail API -> Vercel (Dashed return) */}
            <path d="M 580 140 C 530 140, 580 230, 600 280" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" className="dark:stroke-zinc-700 opacity-50" />

        </svg>
    )
}

export function FlowDiagram() {
    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/20 group">
            {/* Scrollable container */}
            <div className="w-full overflow-auto p-8 cursor-grab active:cursor-grabbing hide-scrollbar">
                {/* 
                   Canvas: 1100px width for extra spacious layout
                */}
                <div className="relative h-[800px] min-w-[1100px] mx-auto">
                    <SchemaConnections />

                    {/* Nodes - EXPANDED GRID */}

                    {/* Row 1: Gmail API - Up Top */}
                    <div className="absolute top-[40px] left-[570px]">
                        <Node icon={Mail} label="Gmail API" subLabel="(Read/Write)" color="blue" />
                    </div>

                    {/* Row 2: Gemini Extraction */}
                    <div className="absolute top-[160px] left-[840px]">
                        <Node icon={Sparkles} label="Gemini AI" subLabel="(Extraction)" color="blue" />
                    </div>

                    {/* Main Row: Input Workflow - Centered Y=350ish */}
                    <div className="absolute top-[315px] left-0">
                        <Node icon={User} label="Client Email" color="gray" />
                    </div>
                    <div className="absolute top-[315px] left-[190px]">
                        <Node icon={Mail} label="Gmail Inbox" color="blue" />
                    </div>
                    <div className="absolute top-[315px] left-[380px]">
                        <Node icon={Zap} label="Google Pub/Sub" color="blue" />
                    </div>

                    {/* Center Brain */}
                    <div className="absolute top-[280px] left-[570px]">
                        <Node icon={Cpu} label="Vercel Function" subLabel="(The Brain)" color="black" className="scale-110 shadow-xl ring-4 ring-zinc-100 dark:ring-zinc-800" />
                    </div>

                    {/* Row 3: Calendar */}
                    <div className="absolute top-[440px] left-[840px]">
                        <Node icon={Calendar} label="Google Calendar" subLabel="API" color="blue" />
                    </div>

                    {/* Row 4: Gemini Drafting */}
                    <div className="absolute top-[560px] left-[570px]">
                        <Node icon={Sparkles} label="Gemini AI" subLabel="(Drafting)" color="blue" />
                    </div>

                    {/* Row 5: Config */}
                    <div className="absolute top-[700px] left-[570px]">
                        <Node icon={FileJson} label="Config Files" subLabel="(Pricing/Policies)" color="gray" />
                    </div>

                    {/* Labels for Input Flow */}
                    <div className="absolute top-[335px] left-[145px] text-[10px] text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1">Arrives</div>
                    <div className="absolute top-[335px] left-[335px] text-[10px] text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1">Push</div>
                    <div className="absolute top-[335px] left-[530px] text-[10px] text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1">Webhook</div>
                </div>
            </div>
            {/* Hint overlay */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity text-xs text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80 px-2 py-1 rounded">
                Scroll to explore →
            </div>
        </div>
    )
}
