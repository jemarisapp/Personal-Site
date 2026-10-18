import { Barlow_Condensed, Outfit } from 'next/font/google'

// Trilo's own type pair from trilo.gg, loaded only for the concept.
export const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--trilo-sans' })
export const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['700', '800'], variable: '--trilo-display' })
