'use client'

import Image, { ImageProps } from 'next/image'
import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogClose,
    MorphingDialogContainer,
    MorphingDialogImage,
} from '@/components/ui/morphing-dialog'

type ZoomableImageProps = ImageProps & {
    className?: string
}

export function ZoomableImage({
    src,
    alt,
    className,
    ...props
}: ZoomableImageProps) {
    return (
        <MorphingDialog
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
        >
            <MorphingDialogTrigger>
                <Image
                    src={src}
                    alt={alt}
                    className={className}
                    {...props}
                />
            </MorphingDialogTrigger>
            <MorphingDialogContainer>
                <MorphingDialogContent className="relative rounded-2xl bg-transparent p-0 shadow-none">
                    <MorphingDialogImage
                        src={typeof src === 'string' ? src : (src as any).src} // Handle StaticImageData
                        alt={alt}
                        className="h-auto w-full max-w-[90vw] max-h-[90vh] rounded-xl object-contain"
                    />
                    <MorphingDialogClose className="fixed bg-white/50 backdrop-blur-md rounded-full p-2 text-zinc-900 ring-1 ring-zinc-900/10 hover:bg-white top-6 right-6" />
                </MorphingDialogContent>
            </MorphingDialogContainer>
        </MorphingDialog>
    )
}
