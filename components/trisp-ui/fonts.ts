import { Fraunces, Inter } from 'next/font/google'

// The TRISP site's own type pair, loaded only where its UI is recreated.
export const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--trisp-serif' })
export const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--trisp-sans' })
