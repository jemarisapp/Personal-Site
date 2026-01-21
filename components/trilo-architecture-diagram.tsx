'use client'

import { useState } from 'react'
import {
    MessageSquare,
    Globe,
    Database,
    CreditCard,
    Bot,
    Sparkles,
    Users,
    Key,
    Server,
    Plus,
    Minus,
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
    color?: "blue" | "orange" | "black" | "gray" | "green",
    className?: string
}) {
    const colors = {
        blue: "bg-blue-500 text-white border-blue-600 shadow-blue-500/20",
        orange: "bg-orange-500 text-white border-orange-600 shadow-orange-500/20",
        green: "bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20",
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

function ArchitectureConnections() {
    return (
        <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-0">
            <defs>
                <marker id="arrowhead-trilo" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <path d="M0,0 L6,2 L0,4" fill="#9ca3af" />
                </marker>
            </defs>

            {/* User -> Website */}
            <path d="M 140 150 L 280 150" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />
            <text x="210" y="140" textAnchor="middle" className="text-[9px] fill-zinc-400">Visits</text>

            {/* Website -> Discord OAuth */}
            <path d="M 420 150 L 560 150" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />
            <text x="490" y="140" textAnchor="middle" className="text-[9px] fill-zinc-400">OAuth</text>

            {/* Website -> Stripe */}
            <path d="M 350 200 L 350 280" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />
            <text x="370" y="240" textAnchor="start" className="text-[9px] fill-zinc-400">Checkout</text>

            {/* Stripe -> Supabase */}
            <path d="M 420 320 L 560 320" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />
            <text x="490" y="310" textAnchor="middle" className="text-[9px] fill-zinc-400">Webhook</text>

            {/* Stripe -> License Key (down) */}
            <path d="M 350 370 L 350 450" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />
            <text x="370" y="410" textAnchor="start" className="text-[9px] fill-zinc-400">Generates</text>

            {/* License Key -> Discord Bot */}
            <path d="M 420 490 C 500 490, 600 490, 680 400" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />
            <text x="540" y="470" textAnchor="middle" className="text-[9px] fill-zinc-400">DM to User</text>

            {/* Discord OAuth -> Discord Bot */}
            <path d="M 630 200 L 700 280" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />

            {/* Discord Bot -> Supabase */}
            <path d="M 630 360 L 560 360" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />
            <text x="595" y="350" textAnchor="middle" className="text-[9px] fill-zinc-400">Queries</text>

            {/* Discord Bot -> OpenAI */}
            <path d="M 770 280 L 770 200" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />
            <text x="790" y="240" textAnchor="start" className="text-[9px] fill-zinc-400">Vision API</text>

            {/* Commissioner -> Discord Bot */}
            <path d="M 880 360 L 820 360" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowhead-trilo)" fill="none" className="dark:stroke-zinc-700" />
            <text x="850" y="350" textAnchor="middle" className="text-[9px] fill-zinc-400">Commands</text>

            {/* Discord Bot -> Railway */}
            <path d="M 770 410 L 770 450" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="dark:stroke-zinc-700" />
            <text x="790" y="440" textAnchor="start" className="text-[9px] fill-zinc-400">Hosted on</text>
        </svg>
    )
}

export function TriloArchitectureDiagram() {
    const [zoom, setZoom] = useState(0.75)

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5))
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4))

    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/20 group h-[500px]">

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
                    className="relative h-[600px] min-w-[1100px] mx-auto origin-top-left transition-transform duration-200 ease-out"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
                >
                    <ArchitectureConnections />

                    {/* Section Labels */}
                    <div className="absolute top-[60px] left-[280px] text-xs font-semibold text-orange-500 dark:text-orange-400 uppercase tracking-wider">Marketing Site (Vercel)</div>
                    <div className="absolute top-[230px] left-[280px] text-xs font-semibold text-green-500 dark:text-green-400 uppercase tracking-wider">Payments</div>
                    <div className="absolute top-[60px] left-[680px] text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">Discord Bot (Railway)</div>

                    {/* Row 1: User Journey Start */}
                    <div className="absolute top-[110px] left-0">
                        <Node icon={Users} label="User" subLabel="(Commissioner)" color="gray" />
                    </div>

                    <div className="absolute top-[110px] left-[280px]">
                        <Node icon={Globe} label="Trilo Website" subLabel="React + Vite" color="orange" />
                    </div>

                    <div className="absolute top-[110px] left-[560px]">
                        <Node icon={MessageSquare} label="Discord OAuth" subLabel="User Auth" color="blue" />
                    </div>

                    <div className="absolute top-[110px] left-[700px]">
                        <Node icon={Sparkles} label="OpenAI Vision" subLabel="GPT-4o-mini" color="blue" />
                    </div>

                    {/* Row 2: Core Systems */}
                    <div className="absolute top-[280px] left-[280px]">
                        <Node icon={CreditCard} label="Stripe" subLabel="Subscriptions" color="green" />
                    </div>

                    <div className="absolute top-[280px] left-[490px]">
                        <Node icon={Database} label="Supabase" subLabel="PostgreSQL" color="green" />
                    </div>

                    <div className="absolute top-[280px] left-[700px]">
                        <Node icon={Bot} label="Trilo Bot" subLabel="Python + discord.py" color="black" className="scale-110 shadow-xl ring-4 ring-zinc-100 dark:ring-zinc-800" />
                    </div>

                    <div className="absolute top-[320px] left-[920px]">
                        <Node icon={Users} label="Commissioner" subLabel="Discord User" color="gray" />
                    </div>

                    {/* Row 3: License & Hosting */}
                    <div className="absolute top-[450px] left-[280px]">
                        <Node icon={Key} label="License Key" subLabel="TRILO-XXXX-XXXX" color="orange" />
                    </div>

                    <div className="absolute top-[450px] left-[700px]">
                        <Node icon={Server} label="Railway" subLabel="Hosting" color="gray" />
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
