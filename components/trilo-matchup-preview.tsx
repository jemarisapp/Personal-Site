'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'

export function TriloMatchupPreview() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const slides = [
    { id: 'command', title: 'COMMAND PREVIEW' },
    { id: 'list', title: 'CATEGORIES PREVIEW' },
    { id: 'channel', title: 'CHANNEL PREVIEW' },
  ]

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
  }

  const handleManualChange = (index: number) => {
    setCurrentSlide(index)
    startTimer()
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#313338] shadow-2xl">
      {/* Discord Header */}
      <div className="relative z-20 flex items-center justify-between border-b border-white/5 bg-[#1e1f22]/50 p-3">
        <div className="flex items-center gap-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            {slides[currentSlide].title}
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
        </div>
      </div>

      {/* Content Area with Carousel */}
      <div className="relative min-h-[420px] flex-1 overflow-visible bg-[#313338]">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div
              key="slide-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-4"
            >
              {/* Slide 1: Command Preview */}
              <div className="mb-6 flex gap-3 opacity-80 transition-opacity hover:opacity-100">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                  D
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="cursor-pointer text-[15px] font-bold text-white hover:underline">
                      (C) Ducks
                    </span>
                    <span className="text-[11px] text-zinc-400">Today at 11:55 AM</span>
                  </div>
                  <div className="text-[14px] leading-relaxed text-zinc-300">
                    <span className="opacity-80">used</span>{' '}
                    <span className="cursor-pointer rounded bg-[#5865F2]/10 px-1 font-medium text-[#5865F2] hover:underline">
                      /matchups create-from-image
                    </span>
                    <div className="mt-2 flex w-fit flex-wrap gap-2 rounded-md border-l-[3px] border-[#949BA4] bg-[#2B2D31] p-2 text-[12px] text-zinc-300">
                      <span className="rounded bg-[#1E1F22] px-1.5 py-0.5 font-mono text-[#949BA4]">
                        category_name:
                      </span>{' '}
                      Week 5
                      <span className="rounded bg-[#1E1F22] px-1.5 py-0.5 font-mono text-[#949BA4]">
                        image1:
                      </span>{' '}
                      <span className="cursor-pointer text-[#00A8FC] hover:underline">schedule.JPG</span>
                      <span className="rounded bg-[#1E1F22] px-1.5 py-0.5 font-mono text-[#949BA4]">
                        game_status:
                      </span>{' '}
                      True
                      <span className="self-center text-[10px] text-zinc-500">+2 more</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-2 flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 text-sm font-bold text-white">
                  T
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[15px] font-bold text-white">Trilo</span>
                      <span className="rounded-[3px] bg-[#5865F2] px-1.5 py-0.5 text-[10px] font-medium text-white">
                        APP
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400">Today at 11:55 AM</span>
                  </div>
                  <div className="text-zinc-300">
                    <div className="flex items-center gap-2 text-[14px]">
                      <span className="animate-pulse">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated scanning card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute left-[50px] top-[140px] z-20 h-[200px] w-[320px] rounded-lg border-l-4 border-orange-500 bg-[#2B2D31] p-3 shadow-2xl lg:left-[60px] lg:h-[220px] lg:w-[380px] lg:p-4"
              >
                <div className="group relative mb-2 h-36 w-full overflow-hidden rounded bg-zinc-900 lg:h-40">
                  <Image
                    src="/trilo/schedule.jpg"
                    alt="Schedule"
                    fill
                    className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <motion.div
                    initial={{ top: '-20%' }}
                    animate={{ top: '120%' }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 h-2 w-full bg-orange-500/50 blur-[1px] shadow-[0_0_15px_rgba(255,160,0,0.6)]"
                  />
                  <div className="absolute inset-0 bg-orange-500/5 mix-blend-overlay" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-300 lg:text-sm">
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,160,0,0.8)] lg:h-3 lg:w-3"
                    />
                    Scanning matchups...
                  </div>
                  <span className="font-mono text-[10px] text-orange-500 lg:text-xs">TRILO ACTIVATED</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src="/trilo/matchups-list.jpg"
                alt="Matchups List"
                fill
                className="object-cover opacity-90 transition-opacity hover:opacity-100"
                style={{ objectPosition: '15% 0' }}
              />
            </motion.div>
          )}

          {currentSlide === 2 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src="/trilo/game-channel.jpg"
                alt="Game Channel"
                fill
                className="object-cover opacity-90 transition-opacity hover:opacity-100"
                style={{ objectPosition: '15% 0' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Carousel Indicators - Footer */}
      <div className="relative z-30 flex justify-center gap-2 border-t border-white/5 bg-transparent p-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualChange(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-6 bg-orange-500' : 'w-2 bg-zinc-600 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
