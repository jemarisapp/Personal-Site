'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogClose,
    MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import { XIcon } from 'lucide-react'

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
            <div className="overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800" ref={emblaRef}>
                <div className="flex">
                    {images.map((src, index) => (
                        <div className="relative min-w-0 flex-[0_0_100%]" key={index}>
                            <MorphingDialog
                                transition={{
                                    type: 'spring',
                                    bounce: 0,
                                    duration: 0.3,
                                }}
                            >
                                <MorphingDialogTrigger className="w-full cursor-zoom-in">
                                    <Image
                                        src={src}
                                        alt={`${alt} - Image ${index + 1}`}
                                        width={1200}
                                        height={675}
                                        className="w-full h-auto"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                    />
                                </MorphingDialogTrigger>
                                <MorphingDialogContainer>
                                    <MorphingDialogContent className="relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 max-w-[90vw] md:max-w-5xl overflow-hidden">
                                        <div className="relative aspect-video w-full h-[50vh] md:h-[80vh]">
                                            <Image
                                                src={src}
                                                alt={`${alt} - Image ${index + 1}`}
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                    </MorphingDialogContent>
                                    <MorphingDialogClose
                                        className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
                                        variants={{
                                            initial: { opacity: 0 },
                                            animate: {
                                                opacity: 1,
                                                transition: { delay: 0.3, duration: 0.1 },
                                            },
                                            exit: { opacity: 0, transition: { duration: 0 } },
                                        }}
                                    >
                                        <XIcon className="h-5 w-5 text-zinc-500" />
                                    </MorphingDialogClose>
                                </MorphingDialogContainer>
                            </MorphingDialog>
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
