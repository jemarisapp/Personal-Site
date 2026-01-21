'use client'

import Image from 'next/image'

interface PhoneMockupProps {
  src?: string
  alt?: string
  children?: React.ReactNode
  className?: string
}

export function PhoneMockup({ src, alt = 'Phone screenshot', children, className = '' }: PhoneMockupProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative">
        {/* Phone frame */}
        <div className="relative w-[280px] sm:w-[320px] rounded-[3rem] bg-gradient-to-b from-zinc-800 to-zinc-900 p-2 shadow-2xl shadow-black/40 ring-1 ring-white/10">
          {/* Inner bezel */}
          <div className="rounded-[2.5rem] bg-gradient-to-b from-zinc-900 to-black p-1">
            {/* Screen bezel */}
            <div className="relative overflow-hidden rounded-[2.25rem] bg-black">
              {/* Dynamic Island / Notch */}
              <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full bg-black px-4 py-1.5">
                  <div className="h-2 w-2 rounded-full bg-zinc-800 ring-1 ring-zinc-700" />
                  <div className="h-1.5 w-12 rounded-full bg-zinc-800" />
                </div>
              </div>
              
              {/* Screen content */}
              <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-[#36393f]">
                {src ? (
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover object-top"
                  />
                ) : children ? (
                  <div className="h-full w-full">
                    {children}
                  </div>
                ) : (
                  /* Placeholder content - Discord style */
                  <div className="flex h-full flex-col">
                    {/* Discord header bar */}
                    <div className="flex items-center gap-3 bg-[#2f3136] px-4 py-3">
                      <div className="h-6 w-6 rounded-full bg-[#5865f2]" />
                      <div className="h-3 w-24 rounded bg-zinc-600" />
                    </div>
                    
                    {/* Channel content area */}
                    <div className="flex-1 space-y-4 p-4">
                      {/* Slash command suggestions */}
                      <div className="rounded-lg bg-[#2f3136] p-3 shadow-lg">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-4 w-4 rounded bg-[#5865f2]" />
                          <span className="text-xs font-medium text-zinc-300">/teams</span>
                        </div>
                        <div className="space-y-2 pl-6">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-zinc-500" />
                            <span className="text-[10px] text-zinc-400">list-all</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-zinc-500" />
                            <span className="text-[10px] text-zinc-400">assign</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-[#2f3136] p-3 shadow-lg">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-4 w-4 rounded bg-[#5865f2]" />
                          <span className="text-xs font-medium text-zinc-300">/matchups</span>
                        </div>
                        <div className="space-y-2 pl-6">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-zinc-500" />
                            <span className="text-[10px] text-zinc-400">create</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-[#2f3136] p-3 shadow-lg">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-4 w-4 rounded bg-[#5865f2]" />
                          <span className="text-xs font-medium text-zinc-300">/attributes</span>
                        </div>
                        <div className="space-y-2 pl-6">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-zinc-500" />
                            <span className="text-[10px] text-zinc-400">give</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Input bar */}
                    <div className="bg-[#40444b] mx-4 mb-4 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#5865f2]">/</span>
                        <div className="h-3 w-16 rounded bg-zinc-500" />
                        <div className="ml-auto h-2 w-2 rounded-full bg-zinc-500" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Side buttons - Volume */}
        <div className="absolute -left-[3px] top-24 h-8 w-1 rounded-l-sm bg-zinc-700" />
        <div className="absolute -left-[3px] top-36 h-12 w-1 rounded-l-sm bg-zinc-700" />
        <div className="absolute -left-[3px] top-52 h-12 w-1 rounded-l-sm bg-zinc-700" />
        
        {/* Side button - Power */}
        <div className="absolute -right-[3px] top-36 h-16 w-1 rounded-r-sm bg-zinc-700" />
        
        {/* Reflection overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
      </div>
    </div>
  )
}
