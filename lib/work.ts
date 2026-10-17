export type Shelf = 'product' | 'brand' | 'motion'

export type GalleryItem = {
  src: string
  alt: string
  caption?: string
  // Square covers sit in a grid; wide images span the full column; 'screen'
  // keeps the 16:10 shape of product screenshots.
  layout?: 'wide' | 'square' | 'tall' | 'screen'
  // Plays with controls in place of the image; src is used as the poster.
  video?: string
  // Play the video as a silent loop with no controls, like a GIF.
  loop?: boolean
}

// A headed chapter of a case study, for work that needs more structure than
// a few paragraphs and a gallery.
export type Section = {
  heading: string
  paragraphs?: string[]
  points?: string[]
  // Render points as a numbered sequence (only for real step-by-step flows).
  ordered?: boolean
  images?: GalleryItem[]
  // A hand-built interactive module shown after the text.
  widget?: 'moda-logos' | 'moda-monsters' | 'moda-tee' | 'ps-console' | 'fastx-singles' | 'zaire-video' | 'trilo-extract' | 'trisp-clients'
}

export type Work = {
  slug: string
  shelf: Shelf
  title: string
  summary: string
  role: string
  years: string
  client?: string
  disciplines: string[]
  // Accent borrowed from the project's own art for rings and glows.
  tint: string
  hero: string
  // 'full' bleeds wide art edge to edge; 'framed' blurs it behind a crisp panel
  // (for screenshots and square covers that would crop badly).
  heroMode: 'full' | 'framed'
  frameAspect?: 'square' | 'wide' | 'tall'
  // A hand-built interactive piece that replaces the hero on the case study.
  interactive?: 'how-to-atl' | 'yellowstone' | 'atlantic' | 'sonic' | 'sweet-beijing' | 'welch' | 'trisp'
  // Where the subject sits in full-bleed art, as CSS object-position.
  focus?: string
  video?: string
  // The hero video is the work itself: show controls and keep the sound.
  film?: boolean
  // A wall of images shown in the frame instead of the hero, for catalogs.
  mosaic?: string[]
  // Existing MDX case study, if there is one. Otherwise /work/[slug] renders it.
  href?: string
  concept?: boolean
  // Smaller pieces live in the archive instead of on the home shelves.
  more?: boolean
  body?: string[]
  sections?: Section[]
  results?: string[]
  gallery?: GalleryItem[]
  links?: { label: string; href: string }[]
}

export const SHELVES: { id: Shelf; label: string; order: string[] }[] = [
  {
    id: 'product',
    label: 'Product & AI',
    order: ['navigate-idd', 'soundintel-bi', 'trilo'],
  },
  {
    id: 'brand',
    label: 'Brand & Visual',
    order: [
      'youngboy',
      'trisp-studio',
      'playstation',
      'atlantic-records',
      'sweet-beijing',
      'camp-moda',
      'how-to-atl',
      'yellowstone',
      'sonic',
      'welch-tee',
    ],
  },
  {
    id: 'motion',
    label: 'Motion',
    order: ['fast-x', 'cold-december', 'boondocks', 'zaire-valentine', 'atlanta-science-festival'],
  },
]

// Projects on a shelf, in the shelf's chosen order.
export function shelfWork(shelf: Shelf) {
  const ids = SHELVES.find((x) => x.id === shelf)!.order
  return ids.map((id) => WORK.find((w) => w.slug === id)!).filter(Boolean)
}

const yb = (name: string) => `/work/youngboy/${name}.webp`

export const WORK: Work[] = [
  // Brand & Visual
  {
    slug: 'youngboy',
    shelf: 'brand',
    title: 'YoungBoy Never Broke Again',
    summary:
      'Art director and designer on more than 20 releases for one of the most-streamed artists in hip-hop since 2018: album and single covers, tracklists, logos, and motion teasers, each directed and designed end to end.',
    role: 'Art director & designer',
    years: '2018–2026',
    client: 'Never Broke Again LLC',
    disciplines: ['Album art', 'Typography', 'Motion'],
    tint: '#5dff7a',
    hero: yb('hero'),
    heroMode: 'framed',
    frameAspect: 'square',
    video: '/work/youngboy/green-flag-motion.mp4',
    mosaic: ['colors', 'nightmare', 'green-dot', 'richest-opp', 'sfss', '3800-degrees', 'ten-talk', 'how-i-been', 'what-da-what'].map(yb),
    body: [
      'YoungBoy Never Broke Again releases music faster than almost anyone in the industry, often several projects a year with little notice. Each one needs a cover, a back cover and tracklist, streaming canvases, and rollout graphics, usually on a turnaround of days.',
      'On every release I took on, I handled the work myself, from art direction through final files. The job is to give each release its own identity while keeping the catalog recognizable as his: raw portraiture, hand-built type, and a darker palette that shifts with the mood of each project.',
    ],
    results: [
      'Richest Opp debuted in the Billboard top 10 within days of its surprise announcement.',
      'The Last Slimeto rollout extended to a building-scale billboard.',
      'The catalog these covers sit on has passed billions of streams.',
    ],
    gallery: [
      { src: yb('colors'), alt: 'Colors album cover', caption: 'Colors', layout: 'square' },
      { src: yb('nightmare'), alt: 'Nightmare on 38th St compilation cover', caption: 'Nightmare on 38th St', layout: 'square' },
      { src: yb('green-flag-activity'), alt: 'Green Flag Activity compilation cover', caption: 'Green Flag Activity', layout: 'square' },
      { src: yb('last-slimeto-billboard'), alt: 'The Last Slimeto billboard on a downtown building', caption: 'The Last Slimeto, billboard', layout: 'square' },
      { src: yb('richest-opp'), alt: 'Richest Opp mixtape cover', caption: 'Richest Opp', layout: 'square' },
      { src: yb('sfss'), alt: 'Still Flexin, Still Steppin mixtape cover', caption: 'Still Flexin, Still Steppin', layout: 'square' },
      { src: yb('green-dot'), alt: 'Green Dot single cover', caption: 'Green Dot', layout: 'square' },
      { src: yb('3800-degrees'), alt: '3800 Degrees cover', caption: '3800 Degrees', layout: 'square' },
      { src: yb('last-slimeto-title'), alt: 'The Last Slimeto title typography', caption: 'The Last Slimeto, title type', layout: 'square' },
      { src: yb('last-slimeto-tracklist'), alt: 'The Last Slimeto tracklist', caption: 'The Last Slimeto, tracklist', layout: 'square' },
      { src: yb('ten-talk'), alt: 'Ten Talk single cover', caption: 'Ten Talk', layout: 'square' },
      { src: yb('how-i-been'), alt: 'How I Been single cover', caption: 'How I Been', layout: 'square' },
      { src: yb('what-da-what'), alt: 'What Da What single cover', caption: 'What Da What', layout: 'square' },
      { src: yb('shoulders'), alt: 'I Just Got a Lot on My Shoulders album cover', caption: 'I Just Got a Lot on My Shoulders', layout: 'square' },
      { src: yb('realer'), alt: 'Realer cover', caption: 'Realer', layout: 'square' },
      { src: yb('dont-try-this-at-home'), alt: "Don't Try This at Home album cover", caption: "Don't Try This at Home", layout: 'square' },
    ],
  },
  {
    slug: 'playstation',
    shelf: 'brand',
    title: 'Mordecai & Rigby × PlayStation',
    summary:
      'A pop-culture collaboration campaign built around the Regular Show duo: custom DualSense controllers, a game case, a console welcome screen, and a billboard.',
    role: 'Designer',
    years: '2022',
    disciplines: ['Campaign', 'Packaging', '3D'],
    tint: '#8fc3ff',
    hero: '/work/playstation/hero.webp',
    heroMode: 'full',
    focus: '50% 40%',
    video: '/work/playstation/billboard-motion.mp4',
    concept: true,
    body: [
      'The brief was to pair an existing pop-culture property with a brand and build a campaign across print, product, and screen. Mordecai and Rigby spend most of Regular Show avoiding work by playing video games, so PlayStation was the obvious partner.',
      'Each controller takes on one character: Mordecai in blue, Rigby in brown, with lines from the show running along the grips. The same pairing carries through the game case, the console profile screen, and the billboard.',
    ],
    sections: [
      {
        heading: 'Try the console',
        paragraphs: [
          'The campaign includes a PlayStation 5 interface where each character is a player profile with its own theme. This is the flow I designed, rebuilt from the original prototype so you can click through it.',
        ],
        widget: 'ps-console',
      },
    ],
    gallery: [
      { src: '/work/playstation/case-spread.webp', alt: 'Front and back of the Not So Regular Game case', layout: 'wide' },
      { src: '/work/playstation/characters.webp', alt: '3D fur renders of Mordecai and Rigby', layout: 'square' },
      { src: '/work/playstation/game-case.webp', alt: 'Game case front cover', layout: 'square' },
    ],
  },
  {
    slug: 'atlantic-records',
    shelf: 'brand',
    title: 'Atlantic Records',
    summary:
      'A concept rebrand for a 75-year-old label: a new monogram, a color and type system with usage rules, stationery, and gold out-of-home ads.',
    role: 'Brand designer',
    years: '2022',
    disciplines: ['Identity', 'Brand guidelines', 'Out-of-home'],
    tint: '#f5d092',
    hero: '/work/atlantic-records/hero.webp',
    heroMode: 'full',
    focus: '55% 45%',
    concept: true,
    interactive: 'atlantic',
    body: [
      'The rebrand leans into the label’s soul and R&B roots with a script monogram, a navy and chardonnay palette, and a gold “Home of Gold” campaign.',
      'The guidelines cover logo usage on every approved background, primary and secondary colors with print and screen values, a type hierarchy, and stationery.',
    ],
    gallery: [
      { src: '/work/atlantic-records/bus-shelter.webp', alt: 'Bus shelter ad mockup', layout: 'wide' },
      { src: '/work/atlantic-records/gold-render.webp', alt: '3D gold record render used in the campaign', layout: 'tall' },
    ],
  },
  {
    slug: 'how-to-atl',
    shelf: 'brand',
    title: 'How-To ATL: Wing Spots',
    summary:
      'A pocket guide to wings for Georgia State students, with a rating-and-price chart, a fold-out campus map, and a step-by-step on finishing a wing properly.',
    role: 'Designer',
    years: '2023',
    disciplines: ['Editorial', 'Information design', 'Maps'],
    tint: '#ff4a3d',
    hero: '/work/information-design/hero.webp',
    heroMode: 'full',
    focus: '50% 50%',
    interactive: 'how-to-atl',
    body: [
      'How-To ATL is a series of guides for people new to Atlanta. This issue answers the first question most students have: where to get wings near campus.',
      'Each spread handles one kind of information. The opening chart compares a dozen spots by rating and price at a glance. The After-Class Essentials section folds out into three pages, so the full route map from the student center sits next to the description of every stop. The last spread is a how-to, ending on a joke.',
    ],
  },
  {
    slug: 'yellowstone',
    shelf: 'brand',
    title: 'Yellowstone Visitor Packet',
    summary:
      'A fold-out packet handed to visitors at the park gate: history and weather on one side, a full park map on the other, and flaps and a checklist to use on the trip.',
    role: 'Designer',
    years: '2023',
    disciplines: ['Information design', 'Print', 'Maps'],
    tint: '#ffc94a',
    hero: '/work/information-design/yellowstone-front.webp',
    heroMode: 'framed',
    frameAspect: 'tall',
    interactive: 'yellowstone',
    body: [
      'Visitors arrive at Yellowstone with a lot to take in and little time to plan. The packet gives them everything in one pocket-sized folder that opens up as they need it.',
      'The main sheet unfolds to 12 by 18 inches, with the park’s history and weather on the front and the map on the back. Separate pieces cover places to visit, historic landmarks behind lift-up flaps, and a folded checklist of sights that points back to the map.',
    ],
  },
  {
    slug: 'camp-moda',
    shelf: 'brand',
    title: 'Camp MODA',
    summary:
      'A concept identity for the Museum of Design Atlanta’s summer camp, built from 3D blocks so one system works for a six-year-old and a teenager.',
    role: 'Visual designer',
    years: '2023',
    disciplines: ['Identity', '3D', 'Motion'],
    tint: '#9b7bff',
    hero: '/work/camp-moda/hero-full.webp',
    heroMode: 'full',
    focus: '50% 45%',
    video: '/work/camp-moda/logo-motion.mp4',
    concept: true,
    body: [
      'Camp MODA serves kids from 6 to 18. Its branding felt too young for teens and too generic for kids, and it had to work on screens, signage, and t-shirts.',
      'The camp is about building things with design and technology, so the identity is built too. Everything starts from one grid of blocks, closer to Minecraft and retro games than to a children’s museum.',
    ],
    sections: [
      {
        heading: 'One grid, every letter',
        paragraphs: [
          'Every letter in the custom alphabet is made from the same block grid, so any new headline looks like it belongs. The logo comes in a set of approved versions for different backgrounds. Pick a background to see the ones made for it.',
        ],
        widget: 'moda-logos',
      },
      {
        heading: 'Meet the MODA Monsters',
        paragraphs: [
          'The same blocks build a family of mascots. They carry the personality the type can’t: they show up on social posts, guide kids around signage, and give each camp week its own color.',
        ],
        widget: 'moda-monsters',
      },
      {
        heading: 'Built to move',
        paragraphs: [
          'Blocks are easy to animate. The logo assembles and glows, and the monsters walk, so motion feels native to the system instead of added on.',
        ],
        images: [
          { src: '/work/camp-moda/wordmark-3d.webp', alt: 'Camp MODA logo animation', layout: 'wide', video: '/work/camp-moda/logo-motion.mp4', loop: true },
        ],
      },
      {
        heading: 'On everything',
        paragraphs: ['Because the rules live in the grid, new pieces come together quickly, from the camp website to posters and shirts.'],
        images: [
          { src: '/work/camp-moda/web-banner.webp', alt: 'Camp MODA website on a laptop', layout: 'wide' },
          { src: '/work/camp-moda/poster.webp', alt: 'Camp MODA event poster', layout: 'tall' },
          { src: '/work/camp-moda/monsters-row.webp', alt: 'The four MODA Monsters lined up', layout: 'tall' },
        ],
      },
      {
        heading: 'Camp shirts',
        paragraphs: [
          'The camp tee carries the logo small on the chest and MODA large on the back, with the block extrusions picked out in the four monster colors. Turn it around and try it on different colors.',
        ],
        widget: 'moda-tee',
      },
    ],
  },

  // Product & AI
  {
    slug: 'trisp-studio',
    shelf: 'brand',
    title: 'TRISP Studio',
    summary:
      'My creative studio: photography, identity, campaign and motion work, and websites for artists and brands, including the album art for YoungBoy Never Broke Again.',
    role: 'Founder & creative director',
    years: '2016–now',
    disciplines: ['Studio', 'Identity', 'Web'],
    tint: '#e8382f',
    hero: '/work/trisp-studio/site-home.webp',
    heroMode: 'framed',
    interactive: 'trisp',
    body: [
      'TRISP is where my client work lives. The studio runs two lines that share one point of view: photography for people, and creative services for artists and brands, from identity and campaign rollouts to motion and websites.',
      'The site is built around that split. It opens with the promise, “creative work with strategic backbone,” then lets visitors choose the side they came for. Every section uses the same restrained cream-and-ink system with a single red accent, so photography and cover art sit comfortably side by side.',
    ],
    sections: [
      {
        heading: 'Who the studio works with',
        paragraphs: [
          'Labels and partners whose releases and campaigns have come through TRISP, including the rollout work on this site for YoungBoy Never Broke Again, Fast X, and Zaire.',
        ],
        widget: 'trisp-clients',
      },
    ],
    links: [{ label: 'trispstudio.com', href: 'https://trispstudio.com' }],
  },
  {
    slug: 'soundintel-bi',
    shelf: 'product',
    title: 'SoundIntel BI',
    summary:
      'A music chart analytics dashboard where you can ask questions of the data in plain language and get a chart back.',
    role: 'Product designer & engineer',
    years: '2025–now',
    disciplines: ['Data visualization', 'Dashboard', 'AI'],
    tint: '#59d4c3',
    hero: '/work/soundintel-bi/hero.webp',
    heroMode: 'framed',
    body: [
      'A song’s chart position comes from three things: streams, radio airplay, and sales. Most tools show that as static tables, so answering a simple question, like why a song jumped this week, means cross-referencing several reports.',
      'SoundIntel started as a Power BI dashboard. I moved it to the web to get full control over layout and interaction, and to add a way to ask the data questions directly.',
    ],
    sections: [
      {
        heading: 'Built for scanning',
        points: [
          'The dashboard separates chart position, what drove it, and how songs compare, so each question has one place to look.',
          'Streams, airplay, and sales are broken out visually, so you can see what is carrying a song without reading numbers.',
          'The hardest part was density. Chart data is detailed, and every view had to balance showing enough against staying readable.',
        ],
        images: [
          { src: '/work/soundintel-bi/hero.webp', alt: 'SoundIntel dashboard with chart rankings and performance drivers', layout: 'screen' },
        ],
      },
      {
        heading: 'Ask the Data',
        paragraphs: [
          'You can type a question and get an answer with a chart. I designed the AI as an analyst rather than an advisor: it explains what is happening, why, and how it compares over time, but it does not tell you what to do. Keeping it to explanation is what makes the answers trustworthy.',
        ],
        images: [
          { src: '/soundintel-bi/askdata-2.png', alt: 'Ask the Data conversation with a generated chart', layout: 'screen' },
        ],
      },
      {
        heading: 'What I would do next',
        points: [
          'Longer historical comparisons.',
          'Separate views for executives and analysts.',
          'Clearer limits on what the AI will answer, shown in the interface.',
        ],
      },
    ],
    results: [
      'Reading the chart went from minutes of reading to seconds of scanning.',
      'Questions that used to need a custom report can be asked directly.',
    ],
    links: [{ label: 'Live demo', href: 'https://soundintel-bi.vercel.app/' }],
  },
  {
    slug: 'navigate-idd',
    shelf: 'product',
    title: 'Navigate IDD',
    summary:
      'Turns Medicaid waiver policy into short, multilingual explainer videos, so families of people with disabilities can understand what they qualify for.',
    role: 'Led AI systems design',
    years: '2025',
    client: 'Team project with policy and production experts',
    disciplines: ['Accessibility', 'Content design', 'AI'],
    tint: '#ffb347',
    hero: '/work/navigate-idd/hero.webp',
    heroMode: 'framed',
    body: [
      'Families looking for disability services have to work through dense waiver regulations, often only available in English. Video explainers help, but they are slow and expensive to make and go out of date when the policy changes.',
      'AI could make the videos faster, but in healthcare policy a wrong answer is worse than no answer. The design problem was speed without losing accuracy.',
    ],
    sections: [
      {
        heading: 'Every line traces back to policy',
        paragraphs: [
          'Scripts are written only from retrieved sections of the official waiver documents, and a policy expert approves every script before any video is made. Nothing reaches families without a person signing off.',
        ],
        images: [
          { src: '/navigate-idd/human-review-and-approval.avif', alt: 'Review dashboard where experts approve scripts', caption: 'Experts review and approve each script before production.', layout: 'screen' },
        ],
      },
      {
        heading: 'How a video gets made',
        ordered: true,
        points: [
          'Official waiver documents are added to a searchable policy library.',
          'A script is drafted from the relevant policy sections.',
          'A policy expert reviews and approves it.',
          'The approved script is translated and produced as a video in five languages.',
          'The video is published with titles and descriptions ready to go.',
        ],
        images: [
          { src: '/work/navigate-idd/hero.webp', alt: 'Navigate IDD explainer video', layout: 'screen', video: '/navigate-idd/idd-video.mp4' },
        ],
      },
    ],
    results: [
      'Content creation time cut by about 90%, from weeks to minutes.',
      'Videos in five languages: English, Spanish, Chinese, Korean, and Vietnamese.',
      'Under 2 minutes from topic to draft script, and under 15 minutes from approval to finished video.',
      'Every script traceable to verified policy text.',
    ],
  },
  // Brand & Visual: Sweet Beijing earns a spot on the main shelf.
  {
    slug: 'sweet-beijing',
    shelf: 'brand',
    title: 'Sweet Beijing',
    summary:
      'A campaign and app that introduce visitors to Beijing through the pastries made for its seasonal festivals, designed with a team of students in Beijing.',
    role: 'Designer, international student team',
    years: '2022, refined 2025',
    disciplines: ['Identity', 'App design', 'Advertising'],
    tint: '#ffc645',
    hero: '/work/sweet-beijing/hero.webp',
    heroMode: 'full',
    focus: '50% 50%',
    concept: true,
    interactive: 'sweet-beijing',
    body: [
      'Sweet Beijing was an international collaboration with college design students in Beijing. As a team we researched and surveyed people about what they would want from a visit to Beijing.',
      'The research pointed us toward food, and specifically the pastries made for Beijing’s seasonal festivals. Each one carries a story about the holiday it belongs to. The campaign uses them as a way into the city’s culture: a logo, static and motion ads, and an app where visitors find bakeries, learn each pastry’s history, and try the recipe themselves.',
    ],
    sections: [
      {
        heading: 'The identity',
        paragraphs: [
          'The mark pairs a flowing script with a traditional Chinese border, so it reads as both a bakery and a guide. A deep red and a pastry gold lead the palette, with a secondary set drawn from the pastries themselves. Three typefaces split the work: a script for the logo, a condensed display face for headlines, and a wide sans for body text.',
        ],
        images: [
          { src: '/work/sweet-beijing/logo.webp', alt: 'Sweet Beijing logo on red', layout: 'wide' },
          { src: '/work/sweet-beijing/palette.webp', alt: 'Primary and secondary color palette', layout: 'wide' },
          { src: '/work/sweet-beijing/type-fatheya.webp', alt: 'Fatheya script typeface specimen', layout: 'wide' },
          { src: '/work/sweet-beijing/type-themadi.webp', alt: 'Themadi display typeface specimen', layout: 'wide' },
          { src: '/work/sweet-beijing/type-widy.webp', alt: 'Widy body typeface specimen', layout: 'wide' },
        ],
      },
      {
        heading: 'Advertising',
        paragraphs: ['The ads lead with the pastries themselves, cropped close and set against the brand red.'],
        images: [
          { src: '/work/sweet-beijing/ad.webp', alt: 'Sweet Beijing print ad', layout: 'wide' },
          { src: '/work/sweet-beijing/story-ad.webp', alt: 'Instagram story ad on a phone', layout: 'wide' },
          { src: '/work/sweet-beijing/app-icon.webp', alt: 'Sweet Beijing app icon', layout: 'wide' },
        ],
      },
    ],
  },
  {
    slug: 'fast-x',
    shelf: 'motion',
    title: 'Fast X Soundtrack',
    summary:
      'A visual system for the Fast X soundtrack rollout: single covers and motion visuals for Spotify, Apple Music, YouTube, and social.',
    role: 'Art director',
    years: '2023',
    client: 'APG',
    disciplines: ['Art direction', 'Motion', 'Cover art'],
    tint: '#ff7a1a',
    hero: '/work/fast-x/gasolina.webp',
    heroMode: 'framed',
    frameAspect: 'square',
    body: [
      'The soundtrack had a diverse artist lineup and a franchise with a big visual legacy. Every asset had to work as a square cover, a 16:9 promo, and a vertical social clip.',
      'Working with the SVP of Marketing at APG, I built a single-release system instead of one-off covers: one grid where the artist imagery and type change while the Fast X look holds. Each single got a static cover and a motion version for streaming and social. Pick a single to see the pair.',
    ],
    sections: [
      {
        heading: 'One system, every single',
        widget: 'fastx-singles',
      },
      {
        heading: 'More from the rollout',
        images: [
          { src: '/fast-x/letsride1.avif', alt: 'Let’s Ride cover exploration', layout: 'square' },
          { src: '/fast-x/letsride2.avif', alt: 'Let’s Ride cover, alternate', layout: 'square' },
          { src: '/fast-x/mycity.avif', alt: 'My City cover', layout: 'square' },
        ],
      },
    ],
    results: ['The soundtrack passed 500 million streams.', 'New singles could ship in days because the system was already set.'],
  },
  {
    slug: 'zaire-valentine',
    shelf: 'motion',
    title: 'Zaire’s Valentine',
    summary: 'A short Valentine’s Day animation for the artist Zaire that delivered a personal message and teased an unreleased song.',
    role: 'Motion designer',
    years: '2024',
    client: 'Zaire',
    disciplines: ['Motion', 'Social'],
    tint: '#ff5d8f',
    hero: '/work/zaire-valentine/hero.webp',
    heroMode: 'framed',
    frameAspect: 'square',
    body: [
      'For Valentine’s Day, Zaire wanted to share something personal with fans and give them a first listen of a new song, without it feeling like an ad.',
      'The animation leans on mood over spectacle. The motion stays slow and quiet so the unreleased audio carries the moment, and the vertical format was made for stories and reels.',
    ],
    sections: [{ heading: 'The animation', widget: 'zaire-video' }],
  },
  {
    slug: 'sonic',
    shelf: 'brand',
    title: 'Sonic: Ideal & Freak',
    summary:
      'A pop culture campaign that shows Sonic as his ideal self, then subverts him into an unexpected one, across posters, a sneaker, and an app.',
    role: 'Designer',
    years: '2022, sneakers redesigned 2026',
    disciplines: ['Campaign', '3D', 'App design'],
    tint: '#2f5bff',
    hero: '/work/sonic/hero.webp',
    heroMode: 'full',
    focus: '50% 50%',
    concept: true,
    interactive: 'sonic',
    body: [
      'The brief was to take an existing pop culture icon and show them in their ideal, favored image, then subvert them into a freak, unexpected version.',
      'Ideal Sonic is the hero on the front page, golden rings and all. Freak Sonic is the villain on a wanted poster, trading rings for bat wings and blue for acid green. Every piece exists in both versions: the poster, a 3D sneaker, and a training app. Flip the switch above to compare them.',
      'The sneakers were redesigned in 2026 on a new shared model. The Ideal pair is glossy red with a white strap, a gold ring buckle, and a ring at the heel. The Freak pair keeps the same shape but goes matte black, with bat wings off the heel, a bat buckle, a spiked sole, and a glowing green stripe.',
    ],
  },
  {
    slug: 'boondocks',
    shelf: 'motion',
    title: 'The Boondocks Title Sequence',
    summary: 'A title sequence concept that presents the show as a comic book, a nod to its start as a daily syndicated strip.',
    role: 'Motion designer',
    years: '2021',
    disciplines: ['Title design', 'Motion'],
    tint: '#c8a76a',
    hero: '/work/boondocks/hero.webp',
    heroMode: 'full',
    focus: '50% 50%',
    concept: true,
    film: true,
    video: '/work/boondocks/title-sequence.mp4',
    body: [
      'A title sequence sets the tone for what viewers are about to watch and credits the people who made it. The Boondocks started as a newspaper comic, so the sequence is built from comic panels: halftone textures, speech-bubble credits, and characters revealed panel by panel.',
    ],
  },
  {
    slug: 'cold-december',
    shelf: 'motion',
    title: 'Cold December',
    summary: 'A kinetic type lyric video for Rod Wave’s “Cold December,” using motion and color to carry both the love and the sadness in the song.',
    role: 'Motion designer',
    years: '2021',
    disciplines: ['Kinetic type', 'Motion'],
    tint: '#5ad1ff',
    hero: '/work/cold-december/hero.webp',
    heroMode: 'full',
    focus: '50% 50%',
    concept: true,
    film: true,
    video: '/work/cold-december/lyric-video.mp4',
    body: [
      'The type does the storytelling. Each line gets its own treatment, from icy glowing letters to handwritten notes and lines that crack apart, so the words feel the way they sound. The palette moves between cold blues and hot reds to match the song’s swings between love and loss.',
    ],
  },
  {
    slug: 'atlanta-science-festival',
    shelf: 'motion',
    title: 'Atlanta Science Festival',
    summary: 'A short social animation promoting the festival with a math fact, built to stop a scroll.',
    role: 'Motion designer',
    years: '2021',
    disciplines: ['Motion', 'Social'],
    tint: '#ff3b30',
    hero: '/work/atlanta-science-festival/hero.webp',
    heroMode: 'full',
    focus: '50% 50%',
    concept: true,
    film: true,
    video: '/work/atlanta-science-festival/animation.mp4',
    body: [
      'The Atlanta Science Festival celebrates STEM learning and careers across metro Atlanta. To promote it, the animation teaches one quick math fact with bold type and a magnifying glass that moves from clue to clue.',
    ],
  },
  {
    slug: 'welch-tee',
    shelf: 'brand',
    title: 'Welch School Tee',
    summary: 'A shirt for Georgia State’s Ernest G. Welch School of Art & Design: a seal ringed with the school’s disciplines, and a portrait on the back.',
    role: 'Designer',
    years: '2023',
    disciplines: ['Apparel', 'Illustration'],
    tint: '#1f4fd6',
    hero: '/work/welch-tee/hero.webp',
    heroMode: 'full',
    focus: '50% 30%',
    concept: true,
    interactive: 'welch',
    body: [
      'The front carries a seal for the school, with every discipline it teaches set around the ring. The back pairs the seal with a high-contrast portrait in the school blue. Turn the shirt around and try it in different colors.',
    ],
  },
  {
    slug: 'trilo',
    shelf: 'product',
    title: 'Trilo',
    summary:
      'A Discord bot that runs fantasy football leagues for their commissioners, including turning a screenshot of the schedule into matchups automatically.',
    role: 'Founder & product designer',
    years: '2024–now',
    disciplines: ['Product', 'AI', 'Bots'],
    tint: '#5865f2',
    hero: '/trilo/homepage.png',
    heroMode: 'framed',
    body: [
      'Dynasty fantasy leagues on Discord run on volunteer commissioners, who spend hours each week creating matchup channels, tracking records, and managing rosters. Many leagues fold because the person running them burns out.',
      'Trilo does that work inside Discord, where the league already lives, so nobody has to learn another tool.',
    ],
    sections: [
      {
        heading: 'From screenshot to schedule',
        paragraphs: [
          'Entering a season’s schedule by hand was the most tedious job, so it became the headline feature. The commissioner uploads a screenshot of the schedule and Trilo reads the matchups out of it. Try it below.',
        ],
        widget: 'trilo-extract',
      },
      {
        heading: 'Built for Discord',
        points: [
          'Everything runs through slash commands grouped by job: teams, matchups, attributes, and settings.',
          'Marking a game finished is a single reaction on its channel, not a form.',
          'The website handles sign-up, subscriptions, and sends the license key straight to Discord.',
        ],
        images: [
          { src: '/trilo/commands.png', alt: 'Trilo slash commands in Discord', layout: 'tall' },
          { src: '/trilo/game-status.png', alt: 'Reactions for marking a game played or simmed', layout: 'tall' },
          { src: '/trilo/homepage.png', alt: 'Trilo homepage', layout: 'screen' },
          { src: '/trilo/pricing.png', alt: 'Trilo pricing page', layout: 'screen' },
        ],
      },
    ],
    results: ['Weekly league admin went from hours to minutes for commissioners using Trilo.'],
    links: [{ label: 'trilo.gg', href: 'https://trilo.gg' }],
  },
]

// Smaller pieces: full pages, but kept off the home shelves.
export const MORE_WORK = WORK.filter((w) => w.more)

export const PROFILE = {
  name: 'Jemari Sapp',
  line: 'Designer for music, brands & AI products',
  email: 'jemari@jemarisapp.com',
  resume: '/resume',
  resumePdf: '/jemari-sapp-resume.pdf',
  contact: '/contact',
  location: 'Atlanta, GA',
  linkedin: 'https://www.linkedin.com/in/jemari-sapp-b3984821b/',
  github: 'https://github.com/jemarisapp',
}

export function workHref(w: Work) {
  return w.href ?? `/work/${w.slug}`
}

export function getWork(slug: string) {
  return WORK.find((w) => w.slug === slug)
}
