'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProjectCarouselProps {
    images: string[]
    alt: string
    className?: string
}

export function ProjectCarousel({
    images,
    alt,
    className,
}: ProjectCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback((api: any) => {
        setSelectedIndex(api.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('select', onSelect)

        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <div className={cn("relative", className)}>
            {/* Carousel container */}
            <div className="overflow-hidden rounded-xl bg-zinc-100 dark:bg-black ring-1 ring-zinc-200 dark:ring-zinc-800" ref={emblaRef}>
                <div className="flex">
                    {images.map((src, index) => (
                        <div className="relative min-w-0 flex-[0_0_100%]" key={index}>
                            <Image
                                src={src}
                                alt={`${alt} - Image ${index + 1}`}
                                width={1200}
                                height={675}
                                className="w-full h-auto"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation arrows - always visible */}
            <button
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-zinc-700 shadow-md transition-all hover:bg-white hover:scale-105 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:bg-zinc-800"
                aria-label="Previous image"
            >
                <ArrowLeft className="h-5 w-5" />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-zinc-700 shadow-md transition-all hover:bg-white hover:scale-105 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:bg-zinc-800"
                aria-label="Next image"
            >
                <ArrowRight className="h-5 w-5" />
            </button>

            {/* Dots - below the image */}
            <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "h-2 rounded-full transition-all",
                            index === selectedIndex
                                ? "w-6 bg-zinc-800 dark:bg-zinc-200"
                                : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
                        )}
                        onClick={() => emblaApi?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
