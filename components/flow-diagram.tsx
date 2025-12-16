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

            {/* Client -> Inbox (0 to 250) centers: 70 to 320. start x=140, end x=250 */}
            <path d="M 140 400 L 250 400" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" className="dark:stroke-zinc-700" />

            {/* Inbox -> PubSub (250 to 550) centers: 320 to 620. start x=390, end x=550 */}
            <path d="M 390 400 L 550 400" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" className="dark:stroke-zinc-700" />

            {/* PubSub -> Vercel (550 to 850) centers: 620 to 920. start x=690, end x=850  */}
            <path d="M 690 400 L 850 400" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" className="dark:stroke-zinc-700" />

            {/* Vercel -> Gmail API (Up). Center X = 920 */}
            <path d="M 920 320 C 920 280, 920 180, 920 140" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" className="dark:stroke-zinc-700" />
            <rect x="870" y="210" width="100" height="20" rx="4" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="920" y="225" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">1. Check State</text>

            {/* Vercel -> Gemini Extraction (Right Up). Vercel X=920, Gemini Right=1150+70=1220 */}
            <path d="M 990 400 C 1060 400, 1110 260, 1150 260" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" className="dark:stroke-zinc-700" />
            <rect x="1040" y="310" width="100" height="20" rx="4" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="1090" y="325" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">2. Extract Data</text>

            {/* Vercel -> Calendar (Right Down). Right=1150 */}
            <path d="M 990 420 C 1060 420, 1110 540, 1150 540" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" className="dark:stroke-zinc-700" />
            <rect x="1040" y="470" width="100" height="20" rx="4" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="1090" y="485" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">3. Check Dates</text>

            {/* Vercel -> Gemini Drafting (Down) */}
            <path d="M 920 480 C 920 530, 920 600, 920 650" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-gray-xl)" className="dark:stroke-zinc-700" />
            <rect x="870" y="550" width="100" height="20" rx="4" className="fill-zinc-50 dark:fill-zinc-900" />
            <text x="920" y="565" textAnchor="middle" className="text-[10px] fill-zinc-500 dark:fill-zinc-400 font-semibold">4. Generate Reply</text>

            {/* Gemini Drafting -> Config */}
            <path d="M 920 750 L 920 800" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead-gray-xl)" className="dark:stroke-zinc-700" />
            <text x="940" y="780" className="text-[10px] fill-zinc-500 dark:fill-zinc-400">Uses</text>

            {/* Gmail API -> Vercel (Dashed return) */}
            <path d="M 860 140 C 800 140, 860 260, 880 320" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" className="dark:stroke-zinc-700 opacity-50" />
            <text x="820" y="200" className="text-[10px] fill-zinc-500/70 dark:fill-zinc-400/70">5. Save Draft</text>

        </svg>
    )
}

export function FlowDiagram() {
    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/20 group">
            {/* Scrollable container */}
            <div className="w-full overflow-auto p-8 cursor-grab active:cursor-grabbing">
                {/* 
                   Canvas: 1400px width for extra wide spacing
                */}
                <div className="relative h-[900px] min-w-[1400px] mx-auto">
                    <SchemaConnections />

                    {/* Nodes - WIDE LAYOUT */}

                    {/* Row 1: Gmail API - Up Top */}
                    <div className="absolute top-[40px] left-[850px]">
                        <Node icon={Mail} label="Gmail API" subLabel="(Read/Write)" color="blue" />
                    </div>

                    {/* Row 2: Gemini Extraction */}
                    <div className="absolute top-[200px] left-[1150px]">
                        <Node icon={Sparkles} label="Gemini AI" subLabel="(Extraction)" color="blue" />
                    </div>

                    {/* Main Row: Input Workflow - Centered Y=365ish */}
                    {/* 0 -> 250 -> 550 -> 850 */}
                    <div className="absolute top-[365px] left-0">
                        <Node icon={User} label="Client Email" color="gray" />
                    </div>
                    <div className="absolute top-[365px] left-[250px]">
                        <Node icon={Mail} label="Gmail Inbox" color="blue" />
                    </div>
                    <div className="absolute top-[365px] left-[550px]">
                        <Node icon={Zap} label="Google Pub/Sub" color="blue" />
                    </div>

                    {/* Center Brain */}
                    <div className="absolute top-[320px] left-[850px]">
                        <Node icon={Cpu} label="Vercel Function" subLabel="(The Brain)" color="black" className="scale-110 shadow-xl ring-4 ring-zinc-100 dark:ring-zinc-800" />
                    </div>

                    {/* Row 3: Calendar */}
                    <div className="absolute top-[480px] left-[1150px]">
                        <Node icon={Calendar} label="Google Calendar" subLabel="API" color="blue" />
                    </div>

                    {/* Row 4: Gemini Drafting */}
                    <div className="absolute top-[650px] left-[850px]">
                        <Node icon={Sparkles} label="Gemini AI" subLabel="(Drafting)" color="blue" />
                    </div>

                    {/* Row 5: Config */}
                    <div className="absolute top-[800px] left-[850px]">
                        <Node icon={FileJson} label="Config Files" subLabel="(Pricing/Policies)" color="gray" />
                    </div>

                    {/* Labels for Input Flow */}
                    <div className="absolute top-[385px] left-[175px] text-[10px] text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1">Arrives</div>
                    <div className="absolute top-[385px] left-[440px] text-[10px] text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1">Push Notification</div>
                    <div className="absolute top-[385px] left-[730px] text-[10px] text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1">Webhook POST</div>
                </div>
            </div>
            {/* Hint overlay */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity text-xs text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80 px-2 py-1 rounded">
                Scroll to explore →
            </div>
        </div>
    )
}
