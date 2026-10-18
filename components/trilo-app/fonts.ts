import { Barlow_Condensed } from 'next/font/google'

// Trilo's display face from trilo.gg, loaded only for the concept. Its text
// face, Outfit, is already the site font (--font-site).
export const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['700', '800'], variable: '--trilo-display' })
