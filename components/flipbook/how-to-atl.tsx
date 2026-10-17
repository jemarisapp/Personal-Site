'use client'

import { Flipbook, type Leaf } from './flipbook'

const page = (name: string) => `/work/how-to-atl/${name}.webp`

// Leaf order follows the printed booklet. The After-Class Essentials map
// carries a gatefold: shut, it shows the red pin; open, the spot guide.
const LEAVES: Leaf[] = [
  { front: page('cover'), back: page('toc-left') },
  { front: page('toc-right'), back: page('p2') },
  { front: page('p3'), back: page('p4-title') },
  {
    front: page('p5-map'),
    back: page('p8'),
    flap: { closed: page('flap-front'), open: page('flap-inside') },
  },
  { front: page('p9'), back: page('back-cover') },
]

const LABELS: Record<string, string> = {
  '0': 'Front cover',
  '1': 'Contents',
  '2': 'Choose a wing spot in ATL',
  '3': 'After-class essentials: unfold the flap',
  '3f': 'After-class essentials, a three-page map of wing spots near campus',
  '4': 'How to finish a chicken wing',
  '5': 'Back cover',
}

export function HowToAtlBook() {
  return (
    <Flipbook
      leaves={LEAVES}
      ratio={968 / 1500}
      label="How-To ATL: Wing Spots, an interactive booklet"
      stepLabel={(st) => LABELS[`${st.turned}${st.flap ? 'f' : ''}`]}
    />
  )
}
