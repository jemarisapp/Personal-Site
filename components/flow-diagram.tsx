'use client'

import { useState } from 'react'
import {
    Mail,
    Zap,
    Cpu,
    Calendar,
    Sparkles,
    FileJson,
    User,
    Plus,
    Minus,
} from 'lucide-react'

// Node Component
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
                <marker id="arrowhead-gray-xl" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <path d="M0,0 L6,2 L0,4" fill="#9ca3af" />
                </marker>
            </defs>

            {/* Brain Center approximately X=920, Y=320 (calculated from top-280 + 40 offset) 
                Let's use Brain Top at 250px. Center Y ~ 290px.
            */}

            {/* Client -> Inbox (0 to 250) centers. Y=320 approx */}
            <path d="M 140 320 L 250 320" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" fill="none" className="dark:stroke-zinc-700" />

            {/* Inbox -> PubSub (250 to 550) */}
            <path d="M 390 320 L 550 320" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" fill="none" className="dark:stroke-zinc-700" />

            {/* PubSub -> Vercel (550 to 850) */}
            <path d="M 690 320 L 850 320" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" fill="none" className="dark:stroke-zinc-700" />

            {/* Vercel -> Gmail API (Up). Brain Y=290 (top 250). Gmail API Top=50, Center~90. */}
            <path d="M 920 250 C 920 200, 920 150, 920 130" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" fill="none" className="dark:stroke-zinc-700" />
            <rect x="860" y="175" width="120" height="20" rx="4" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="920" y="190" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">1. Idempotency Check</text>

            {/* Vercel -> Gemini Extraction (Right Up). Brain Y=290. Gemini Top=150. Center~190. X=1150+70=1220 */}
            <path d="M 990 290 C 1060 290, 1100 190, 1150 190" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" fill="none" className="dark:stroke-zinc-700" />
            <rect x="1030" y="210" width="120" height="20" rx="4" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="1090" y="225" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">2. LLM Intent Extraction</text>

            {/* Vercel -> Calendar (Right Down). Brain Y=290. Calendar Top=350. Center~390. */}
            <path d="M 990 320 C 1060 320, 1100 420, 1150 420" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" fill="none" className="dark:stroke-zinc-700" />
            <rect x="1040" y="370" width="100" height="20" rx="4" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="1090" y="385" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">3. Calendar API Query</text>

            {/* Vercel -> Gemini Drafting (Down). Brain Bottom~330. Draft Top=480. Center~520. */}
            <path d="M 920 370 C 920 420, 920 450, 920 480" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" fill="none" className="dark:stroke-zinc-700" />
            <rect x="850" y="415" width="140" height="20" rx="4" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="920" y="430" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">4. Context-Aware Draft Generation</text>

            {/* Gemini Drafting -> Config. Draft Bottom~560. Config Top=680. (Moved down) */}
            <path d="M 920 570 L 920 680" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead-gray-xl)" fill="none" className="dark:stroke-zinc-700" />
            <rect x="895" y="615" width="50" height="20" rx="4" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="920" y="630" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400">Uses</text>

        </svg>
    )
}

export function FlowDiagram() {
    const [zoom, setZoom] = useState(0.8)

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5))
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4))

    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/20 group h-[600px]">

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
                {/* 
                   Canvas: 1400px width. Height 700px.
                   Applied Zoom transform
                */}
                <div
                    className="relative h-[800px] min-w-[1400px] mx-auto origin-top-left transition-transform duration-200 ease-out"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
                >
                    <SchemaConnections />

                    {/* Nodes - COMPACTED Y GRID */}

                    {/* Row 1: Gmail API - Up Top. Y=50 */}
                    <div className="absolute top-[50px] left-[850px]">
                        <Node icon={Mail} label="Gmail API" subLabel="(Read/Write)" color="blue" />
                    </div>

                    {/* Row 2: Gemini Extraction. Y=150 */}
                    <div className="absolute top-[150px] left-[1150px]">
                        <Node icon={Sparkles} label="Gemini AI" subLabel="(Extraction)" color="blue" />
                    </div>

                    {/* Main Row: Input Workflow - Centered Y=280 approx */}
                    {/* 0 -> 250 -> 550 -> 850 */}
                    <div className="absolute top-[280px] left-0">
                        <Node icon={User} label="Client Email" color="gray" />
                    </div>
                    <div className="absolute top-[280px] left-[250px]">
                        <Node icon={Mail} label="Gmail Inbox" color="blue" />
                    </div>
                    <div className="absolute top-[280px] left-[550px]">
                        <Node icon={Zap} label="Google Pub/Sub" color="blue" />
                    </div>

                    {/* Center Brain. Y=250 */}
                    <div className="absolute top-[250px] left-[850px]">
                        <Node icon={Cpu} label="Vercel Function" subLabel="(The Brain)" color="black" className="scale-110 shadow-xl ring-4 ring-zinc-100 dark:ring-zinc-800" />
                    </div>

                    {/* Row 3: Calendar. Y=350 */}
                    <div className="absolute top-[350px] left-[1150px]">
                        <Node icon={Calendar} label="Google Calendar" subLabel="API" color="blue" />
                    </div>

                    {/* Row 4: Gemini Drafting. Y=480 */}
                    <div className="absolute top-[480px] left-[850px]">
                        <Node icon={Sparkles} label="Gemini AI" subLabel="(Drafting)" color="blue" />
                    </div>

                    {/* Row 5: Config. Y=680 */}
                    <div className="absolute top-[680px] left-[850px]">
                        <Node icon={FileJson} label="Config Files" subLabel="(Pricing/Policies)" color="gray" />
                    </div>

                    {/* Labels for Input Flow. Y=300 (Input top+20) */}
                    <div className="absolute top-[300px] left-[175px] text-[10px] text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1">Arrives</div>
                    <div className="absolute top-[300px] left-[440px] text-[10px] text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1">Push Notification</div>
                    <div className="absolute top-[300px] left-[730px] text-[10px] text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1">Webhook POST</div>
                </div>
            </div>
            {/* Hint overlay */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity text-xs text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80 px-2 py-1 rounded">
                Scroll to explore →
            </div>
        </div>
    )
}
