// YoungBoy Never Broke Again releases Jemari art directed and designed,
// newest first, with every asset made for each one. Generated from the
// TRISP Studio case study.

export type ReleaseItem = {
  type: 'image' | 'video'
  src: string
  poster?: string
  w: number
  h: number
  label: string
}

export type Release = {
  id: string
  title: string
  type: 'Project' | 'Single' | 'Label project'
  // Accent sampled from the cover.
  color: string
  description: string
  items: ReleaseItem[]
}

export const RELEASES: Release[] = [
  {
    id: 'what-da-what',
    title: 'What Da What',
    type: 'Single',
    color: '#c67439',
    description: 'A summer single, and the start of the next phase of the visual direction.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/what-da-what/cover.webp', w: 1400, h: 1400, label: 'Cover' },
    ],
  },
  {
    id: 'i-just-got-a-lot-on-my-shoulders',
    title: 'I Just Got a Lot on My Shoulders',
    type: 'Project',
    color: '#f51f2d',
    description: 'A personal winter project about vulnerability and resilience: cover, back cover and three motion teasers.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/i-just-got-a-lot-on-my-shoulders/cover.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/i-just-got-a-lot-on-my-shoulders/back-cover.webp', w: 1400, h: 1400, label: 'Back Cover & Tracklist' },
      { type: 'video', src: '/work/youngboy/releases/i-just-got-a-lot-on-my-shoulders/motion-graphic-1.mp4', poster: '/work/youngboy/releases/i-just-got-a-lot-on-my-shoulders/motion-graphic-1-poster.webp', w: 720, h: 720, label: 'Motion Teaser 1' },
      { type: 'video', src: '/work/youngboy/releases/i-just-got-a-lot-on-my-shoulders/motion-graphic-2.mp4', poster: '/work/youngboy/releases/i-just-got-a-lot-on-my-shoulders/motion-graphic-2-poster.webp', w: 720, h: 720, label: 'Motion Teaser 2' },
      { type: 'video', src: '/work/youngboy/releases/i-just-got-a-lot-on-my-shoulders/motion-graphic-3.mp4', poster: '/work/youngboy/releases/i-just-got-a-lot-on-my-shoulders/motion-graphic-3-poster.webp', w: 720, h: 720, label: 'Motion Teaser 3' },
    ],
  },
  {
    id: 'decided-2',
    title: 'Decided 2',
    type: 'Project',
    color: '#69a4d3',
    description: 'A sequel built on raw portraiture, atmospheric light and hand-made type, with light and dark versions of the logo and back cover.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/decided-2/decided2.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/decided-2/back-cover-light.webp', w: 1400, h: 1400, label: 'Back Cover & Tracklist' },
      { type: 'image', src: '/work/youngboy/releases/decided-2/back-cover-dark.webp', w: 1400, h: 1400, label: 'Dark Back Cover & Tracklist' },
      { type: 'image', src: '/work/youngboy/releases/decided-2/logo-light.webp', w: 1400, h: 1400, label: 'Logo Artwork - Light' },
      { type: 'image', src: '/work/youngboy/releases/decided-2/logo-dark.webp', w: 1400, h: 1400, label: 'Logo Artwork - Dark' },
      { type: 'video', src: '/work/youngboy/releases/decided-2/motion-graphic.mp4', poster: '/work/youngboy/releases/decided-2/motion-graphic-poster.webp', w: 720, h: 720, label: 'Album Motion Rollout' },
    ],
  },
  {
    id: 'richest-opp',
    title: 'Richest Opp',
    type: 'Project',
    color: '#c6a039',
    description: 'A surprise mixtape that debuted in the Billboard top 10 within days of its announcement.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/richest-opp/cover.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/richest-opp/back-cover.webp', w: 1400, h: 1400, label: 'Back Cover & Tracklist' },
      { type: 'video', src: '/work/youngboy/releases/richest-opp/motion-graphic.mp4', poster: '/work/youngboy/releases/richest-opp/motion-graphic-poster.webp', w: 720, h: 720, label: 'Motion Teaser & Animated Loop' },
    ],
  },
  {
    id: 'dont-try-this-at-home',
    title: 'Don’t Try This At Home',
    type: 'Project',
    color: '#d3c469',
    description: 'A 33-track studio album with cinematic cover graphics and a motion teaser.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/dont-try-this-at-home/cover.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/dont-try-this-at-home/back-cover.webp', w: 1400, h: 1400, label: 'Back Cover & Tracklist' },
      { type: 'video', src: '/work/youngboy/releases/dont-try-this-at-home/motion-graphic.mp4', poster: '/work/youngboy/releases/dont-try-this-at-home/motion-graphic-poster.webp', w: 720, h: 720, label: 'Motion Teaser & Animated Loop' },
    ],
  },
  {
    id: 'i-rest-my-case',
    title: 'I Rest My Case',
    type: 'Project',
    color: '#c63939',
    description: 'Alternate graphic and motion explorations for a high-contrast visual world.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/i-rest-my-case/alternate-graphic.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'video', src: '/work/youngboy/releases/i-rest-my-case/alternate-motion-graphic.mp4', poster: '/work/youngboy/releases/i-rest-my-case/alternate-motion-graphic-poster.webp', w: 720, h: 720, label: 'Alternate Motion Graphic' },
    ],
  },
  {
    id: 'nightmare-on-38th-st',
    title: 'Nightmare on 38th St',
    type: 'Label project',
    color: '#39c66b',
    description: 'A Halloween compilation for Never Broke Again with horror-themed branding: cover, key art, logo and two motion teasers.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/nightmare-on-38th-st/cover.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/nightmare-on-38th-st/key-art.webp', w: 1400, h: 1400, label: 'Key Art' },
      { type: 'image', src: '/work/youngboy/releases/nightmare-on-38th-st/logo-art.webp', w: 1400, h: 1400, label: 'Logo Artwork' },
      { type: 'video', src: '/work/youngboy/releases/nightmare-on-38th-st/motion-graphic-1.mp4', poster: '/work/youngboy/releases/nightmare-on-38th-st/motion-graphic-1-poster.webp', w: 720, h: 720, label: 'Motion Teaser 1' },
      { type: 'video', src: '/work/youngboy/releases/nightmare-on-38th-st/motion-graphic-2.mp4', poster: '/work/youngboy/releases/nightmare-on-38th-st/motion-graphic-2-poster.webp', w: 720, h: 720, label: 'Motion Teaser 2' },
    ],
  },
  {
    id: 'ma-i-got-a-family',
    title: 'Ma’ I Got A Family',
    type: 'Project',
    color: '#c68b39',
    description: 'The tracklist design for a mixtape hosted by DJ Drama.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/ma-i-got-a-family/tracklist.webp', w: 1400, h: 1400, label: 'Cover' },
    ],
  },
  {
    id: '3800-degrees',
    title: '3800 Degrees',
    type: 'Project',
    color: '#ca5d35',
    description: 'A tribute to classic Baton Rouge and New Orleans hip-hop visuals.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/3800-degrees/cover.webp', w: 1400, h: 1400, label: 'Cover' },
    ],
  },
  {
    id: 'the-last-slimeto',
    title: 'The Last Slimeto',
    type: 'Project',
    color: '#c63939',
    description: 'Title type, tracklist, motion and YouTube thumbnails for a 30-track album, plus a building-scale billboard.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/the-last-slimeto/tracklist-typography.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/the-last-slimeto/title-typography.webp', w: 1400, h: 1400, label: 'Title Typography' },
      { type: 'video', src: '/work/youngboy/releases/the-last-slimeto/motion-graphic.mp4', poster: '/work/youngboy/releases/the-last-slimeto/motion-graphic-poster.webp', w: 720, h: 720, label: 'Official Motion Graphic' },
      { type: 'image', src: '/work/youngboy/releases/the-last-slimeto/youtube-thumbnail-rollout.webp', w: 1284, h: 1284, label: 'Audio Thumbnail Rollout' },
      { type: 'image', src: '/work/youngboy/releases/the-last-slimeto/billboard-placement.webp', w: 1400, h: 1400, label: 'Billboard Typography Placement' },
    ],
  },
  {
    id: 'green-flag-activity',
    title: 'Green Flag Activity',
    type: 'Label project',
    color: '#6dc639',
    description: 'A compilation for the Never Broke Again roster: key art, two portraits, logo, texture and motion.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/green-flag-activity/compilation-key-art.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'video', src: '/work/youngboy/releases/green-flag-activity/motion-graphic.mp4', poster: '/work/youngboy/releases/green-flag-activity/motion-graphic-poster.webp', w: 720, h: 720, label: 'Motion Graphic' },
      { type: 'image', src: '/work/youngboy/releases/green-flag-activity/cover.webp', w: 1400, h: 1400, label: 'Solo Bandana Portrait' },
      { type: 'image', src: '/work/youngboy/releases/green-flag-activity/alternate-cover.webp', w: 1400, h: 1400, label: 'Side Profile Bandana Portrait' },
      { type: 'image', src: '/work/youngboy/releases/green-flag-activity/logo-art.webp', w: 1400, h: 1400, label: 'Logo Artwork' },
      { type: 'image', src: '/work/youngboy/releases/green-flag-activity/texture-art.webp', w: 1400, h: 1400, label: 'Texture Detail Art' },
    ],
  },
  {
    id: 'dont-rate-me',
    title: 'Don’t Rate Me',
    type: 'Single',
    color: '#d3b569',
    description: 'Single art for a collaboration, made for a fast digital rollout.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/dont-rate-me/cover.webp', w: 640, h: 640, label: 'Cover' },
    ],
  },
  {
    id: 'colors',
    title: 'Colors',
    type: 'Project',
    color: '#c63945',
    description: 'The front portrait, a 20-track back cover and a motion teaser.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/colors/cover.webp', w: 1024, h: 1024, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/colors/back-cover.webp', w: 1024, h: 1024, label: '20-Track Back Cover & Tracklist' },
      { type: 'video', src: '/work/youngboy/releases/colors/motion-graphic.mp4', poster: '/work/youngboy/releases/colors/motion-graphic-poster.webp', w: 720, h: 720, label: 'Colors Motion Teaser & Animated Loop' },
    ],
  },
  {
    id: 'how-i-been',
    title: 'How I Been',
    type: 'Single',
    color: '#a4d369',
    description: 'Single art reflecting on fame, loyalty and growth.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/how-i-been/cover.webp', w: 1400, h: 1400, label: 'Cover' },
    ],
  },
  {
    id: 'green-dot',
    title: 'Green Dot',
    type: 'Single',
    color: '#32cd59',
    description: 'A cinematic single cover and an alternate, for a surprise winter drop.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/green-dot/cover.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/green-dot/alternate-cover.webp', w: 1400, h: 1400, label: 'Alternate Cover' },
    ],
  },
  {
    id: 'ten-talk',
    title: 'Ten Talk',
    type: 'Single',
    color: '#90c639',
    description: 'A single cover and an alternate, made to hit hard on social.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/ten-talk/cover.webp', w: 1400, h: 1400, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/ten-talk/alternate-cover.webp', w: 1400, h: 1400, label: 'Alternate Cover' },
    ],
  },
  {
    id: 'sfss',
    title: 'Still Flexin, Still Steppin',
    type: 'Project',
    color: '#c67839',
    description: 'Still Flexin, Still Steppin: cover, back cover and a motion teaser.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/sfss/cover.webp', w: 960, h: 960, label: 'Cover' },
      { type: 'image', src: '/work/youngboy/releases/sfss/back-cover.webp', w: 1400, h: 1400, label: 'Back Cover & Tracklist' },
      { type: 'video', src: '/work/youngboy/releases/sfss/motion-graphic.mp4', poster: '/work/youngboy/releases/sfss/motion-graphic-poster.webp', w: 720, h: 720, label: 'SFSS Motion Teaser & Animated Loop' },
    ],
  },
  {
    id: 'realer',
    title: 'Realer',
    type: 'Project',
    color: '#c63939',
    description: 'Mixtape cover and motion teaser.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/realer/cover.webp', w: 1080, h: 1080, label: 'Cover' },
      { type: 'video', src: '/work/youngboy/releases/realer/motion-graphic.mp4', poster: '/work/youngboy/releases/realer/motion-graphic-poster.webp', w: 640, h: 640, label: 'Realer Motion Teaser & Animated Loop' },
    ],
  },
  {
    id: 'location',
    title: 'Location',
    type: 'Single',
    color: '#c68639',
    description: 'Atmospheric early single art.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/location/cover.webp', w: 1080, h: 1080, label: 'Cover' },
    ],
  },
  {
    id: 'nicki-minaj',
    title: 'Nicki Minaj',
    type: 'Single',
    color: '#0849f7',
    description: 'Single art for a widely discussed collaboration.',
    items: [
      { type: 'image', src: '/work/youngboy/releases/nicki-minaj/cover.webp', w: 720, h: 720, label: 'Cover' },
    ],
  },
]
