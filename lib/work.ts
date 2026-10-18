export type Shelf = 'product' | 'brand' | 'motion'

export type GalleryItem = {
  src: string
  alt: string
  caption?: string
  // Square covers sit in a grid; wide images span the full column; 'screen'
  // keeps the 16:10 shape of product screenshots. 'phone' is for phone
  // screenshots: narrow, and a pair of them sits centered in the row.
  layout?: 'wide' | 'square' | 'tall' | 'screen' | 'phone'
  // Plays with controls in place of the image; src is used as the poster.
  video?: string
  // Play the video as a silent loop with no controls, like a GIF.
  loop?: boolean
  // Show the whole image at its own shape (width / height) instead of cropping.
  aspect?: string
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
  widget?: 'moda-logos' | 'moda-monsters' | 'moda-tee' | 'ps-console' | 'fastx-singles' | 'zaire-video' | 'trilo-extract' | 'trisp-clients' | 'ai-carousels' | 'ai-render-notes' | 'ai-skills' | 'trisp-guide' | 'trisp-sitemap' | 'trisp-cover' | 'trilo-system' | 'trilo-numbers' | 'trilo-licensing' | 'trilo-data-model' | 'nidd-pipeline'
}

export type Work = {
  slug: string
  shelf: Shelf
  title: string
  summary: string
  role: string
  // Kept for reference; project years aren't shown on the site.
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
  interactive?: 'how-to-atl' | 'yellowstone' | 'atlantic' | 'sonic' | 'sweet-beijing' | 'welch' | 'trisp' | 'ai-review' | 'trisp-kit' | 'trilo-app'
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
  // Replaces the badge above the title, for work that's part real, part concept.
  badge?: string
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
    ],
  },
  {
    id: 'product',
    label: 'Product & AI',
    order: ['trisp-studio', 'trilo', 'directing-ai', 'navigate-idd', 'soundintel-bi'],
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
      'Art director and designer on more than 20 releases for one of the most-streamed artists in hip-hop over eight years: album and single covers, tracklists, logos, and motion teasers, each directed and designed end to end.',
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
    more: true,
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
      'My creative studio, and the website that runs it. TRISP covers photography for people and creative services for artists and brands, including album art for YoungBoy Never Broke Again. Its site is one design system serving both audiences, two booking flows and a full dark mode.',
    role: 'Founder, creative director & UX/UI designer',
    years: '2016–now',
    disciplines: ['Studio', 'Identity', 'UX/UI', 'Design system'],
    tint: '#f7211f',
    hero: '/work/trisp-website/home-light.webp',
    heroMode: 'framed',
    interactive: 'trisp-kit',
    body: [
      'TRISP is where my client work lives. The studio runs two lines that share one point of view: photography for people, and creative services for artists and brands, from identity and campaign rollouts to cover art, motion and websites.',
      'Those two lines bring visitors who rarely overlap. One group is booking a graduation or portrait session. The other is artists, labels and brands. The site has to send each of them through the right door quickly, then make booking and paying feel as considered as the work itself.',
      'Above is the site’s component kit, rebuilt here with its real tokens. Switch between groups and themes to see how each piece holds up in light and dark.',
    ],
    sections: [
      {
        heading: 'Who the studio works with',
        paragraphs: [
          'Labels and partners whose releases and campaigns have come through TRISP, including rollout work for YoungBoy Never Broke Again, Fast X and Zaire.',
        ],
        widget: 'trisp-clients',
      },
      {
        heading: 'Two audiences, one structure',
        paragraphs: [
          'The navigation mirrors the business: Photography, Creative Services and Studio. Each menu opens a panel where every page has a one-line description, so visitors know where a link goes before they click. Every path ends at one clear action.',
        ],
        widget: 'trisp-sitemap',
        images: [
          { src: '/work/trisp-website/nav-menu.webp', alt: 'The Creative Services menu open on trispstudio.com', caption: 'The Creative Services panel: featured work on the left, every service with a one-line description on the right', layout: 'wide', aspect: '1800 / 625' },
        ],
      },
      {
        heading: 'Style guide',
        paragraphs: [
          'Cream and ink with a single red accent, so photography and cover art can sit side by side without the interface competing with them. Fraunces carries the headlines and Inter carries everything else. Short red eyebrows label each section.',
          'Colors are defined once as tokens and mapped into the component styles. Dark mode is one attribute swap rather than a second stylesheet.',
        ],
        widget: 'trisp-guide',
      },
      {
        heading: 'Booking cover art without a call',
        paragraphs: [
          'An artist can go from browsing covers to a paid order without a call. Every tier shows its price, and every button on the pricing page opens the booking form with that package already selected. The form shows the order summary updating as options change. Try it below. It runs the same pricing rules as the live site.',
        ],
        points: [
          'Open-ended work, like a Signature cover or advanced motion, switches the button to “Send brief for a quote,” and no payment is taken.',
          'Turnaround, revisions, files, payment and usage rights are spelled out before the agreement checkbox, not hidden behind a link.',
          'The brief is saved in the browser, so leaving for checkout and coming back doesn’t erase it.',
          'Required fields are marked with a red star, and every option explains its price in plain language.',
        ],
        widget: 'trisp-cover',
        images: [
          { src: '/work/trisp-website/cover-tiers.webp', alt: 'Cover art pricing tiers on trispstudio.com', caption: 'Three tiers, each with a style reference, a price and what’s included', layout: 'tall', aspect: '1600 / 1645' },
          { src: '/work/trisp-website/cover-tiers-dark.webp', alt: 'The same pricing tiers in dark mode', caption: 'The same section in dark mode', layout: 'tall', aspect: '1600 / 1645' },
          { src: '/work/trisp-website/cover-packages.webp', alt: 'Release packages that bundle cover art and motion', caption: 'Release packages bundle the cover with motion for one price', layout: 'wide', aspect: '1600 / 714' },
        ],
      },
      {
        heading: 'Booking a photo session',
        paragraphs: [
          'Photography clients get two paths. People who know what they want can reserve right away, while people who are unsure can ask for a consultation first. The reserve path is outlined in red as the main route. Each path lists its three steps, so nobody wonders what happens after they click.',
          'Packages are grouped by session type in an accordion, with tabs inside for studio, on-location or both. The studio’s policies sit in one collapsible panel right above the packages, so they’re easy to find without getting in the way.',
        ],
        images: [
          { src: '/work/trisp-website/photo-paths.webp', alt: 'Two booking paths: reserve your session or consultation first', caption: 'Two ways in, each with its steps written out', layout: 'tall', aspect: '1600 / 1022' },
          { src: '/work/trisp-website/photo-packages.webp', alt: 'Photography packages accordion with Graduation open', caption: 'Packages by session type, with Graduation open', layout: 'tall', aspect: '1600 / 1750' },
        ],
      },
      {
        heading: 'Dark mode',
        paragraphs: [
          'Every page works in both themes. The visitor’s choice is remembered and applied before the page first paints, so a returning visitor never sees a flash of the wrong theme. Photos and cover art sit on near-black instead of cream, and the logo wall inverts so client marks stay legible.',
        ],
        images: [
          { src: '/work/trisp-website/home-light.webp', alt: 'trispstudio.com home page in light mode', caption: 'Home, light', layout: 'tall', aspect: '1800 / 1125' },
          { src: '/work/trisp-website/home-dark.webp', alt: 'trispstudio.com home page in dark mode', caption: 'Home, dark', layout: 'tall', aspect: '1800 / 1125' },
          { src: '/work/trisp-website/cover-light.webp', alt: 'Cover art page in light mode', caption: 'Cover art, light', layout: 'tall', aspect: '1800 / 1125' },
          { src: '/work/trisp-website/cover-dark.webp', alt: 'Cover art page in dark mode', caption: 'Cover art, dark', layout: 'tall', aspect: '1800 / 1125' },
        ],
      },
      {
        heading: 'On a phone',
        paragraphs: [
          'The menus collapse into one full-screen list that keeps the same groups and labels as the desktop version. The hero art steps aside for the headline, and the booking form becomes a single column with the same order of steps.',
        ],
        images: [
          { src: '/work/trisp-website/phone-home.webp', alt: 'Home page on a phone', caption: 'Home', layout: 'square', aspect: '780 / 1688' },
          { src: '/work/trisp-website/phone-menu.webp', alt: 'Full-screen menu on a phone', caption: 'Menu', layout: 'square', aspect: '780 / 1688' },
          { src: '/work/trisp-website/phone-cover.webp', alt: 'Cover art page on a phone', caption: 'Cover art', layout: 'square', aspect: '780 / 1688' },
          { src: '/work/trisp-website/phone-book.webp', alt: 'Cover art booking form on a phone', caption: 'Booking form', layout: 'square', aspect: '780 / 1688' },
          { src: '/work/trisp-website/phone-photo.webp', alt: 'Photography page on a phone', caption: 'Photography', layout: 'square', aspect: '780 / 1688' },
        ],
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
    slug: 'directing-ai',
    shelf: 'product',
    title: 'Directing AI',
    summary:
      'How I design with AI. I write the brief, AI tools build it, and I review the rendered work and art-direct the fixes until it meets my standard. Then I turn the process into a system so the next piece is faster.',
    role: 'Creative director & systems designer',
    years: '2026',
    client: 'TRISP Studio',
    disciplines: ['AI-assisted design', 'Motion', 'Social', 'Systems'],
    tint: '#f7211f',
    hero: '/work/directing-ai/hero.webp',
    heroMode: 'framed',
    interactive: 'ai-review',
    body: [
      'Above is a promo I made for my studio’s graduation sessions, shown the way I reviewed it. Each note on the right is one I gave while watching renders, and each one jumps to the moment it changed. The safe-zone and center-line toggles are the checks I ran on every frame.',
      'Claude did the production: converting footage, setting type, compositing and encoding, all written as code. The brief, the shot choices, the copy and every call on what was good enough came from me. AI made the work faster. My eye decided what shipped.',
    ],
    sections: [
      {
        heading: 'The loop I run on every project',
        ordered: true,
        points: [
          'Brief. I set the idea, the audience, the format and the look, along with the rules the work can’t break.',
          'Build with AI. Claude, ChatGPT or Codex produce the layouts, motion, code and copy.',
          'Review the render. I judge the finished frames, not the code behind them.',
          'Art-direct the fixes. I give specific visual and factual notes, and the AI revises.',
          'Ship it as a system. The result becomes a template, toolkit or skill that makes the next piece faster.',
        ],
      },
      {
        heading: 'Starting from a draft that missed the brief',
        paragraphs: [
          'An earlier cut of the promo already existed. Reviewing it against my brief, I found the problems: saturation pushed up when I’d asked for natural color, heavy dark bars behind the text, prices sitting where TikTok’s caption covers them, and montage photos flashing by in about half a second.',
          'The new cut opens on a question, pairs each behind-the-scenes clip with its final photo, and builds to pricing on photos the viewer hasn’t seen yet.',
        ],
        images: [
          { src: '/work/directing-ai/before-cut-grid.webp', alt: 'The earlier cut, one frame per second', caption: 'Before: the earlier cut, one frame per second', layout: 'wide', aspect: '1980 / 960' },
          { src: '/work/directing-ai/after-cut.webp', alt: 'The final cut, one frame per second', caption: 'After: the final cut, one frame per second', layout: 'wide', aspect: '1980 / 960' },
        ],
      },
      {
        heading: 'Choosing, checking and correcting',
        paragraphs: [
          'Claude built labeled contact sheets of every session so I could pick shots in minutes instead of scrolling through folders. The iPhone clips were HDR, so they were converted to standard color with nothing added. Every render was checked as stills, with a center line for framing.',
        ],
        images: [
          { src: '/work/directing-ai/contact-sheet.webp', alt: 'Labeled contact sheet of one session', caption: 'Contact sheets for picking shots', layout: 'wide', aspect: '1920 / 640' },
          { src: '/work/directing-ai/footage-color.webp', alt: 'Behind-the-scenes clip frames after HDR conversion', caption: 'HDR footage, converted without grading', layout: 'tall', aspect: '1200 / 1400' },
          { src: '/work/directing-ai/centering-check.webp', alt: 'Two frames checked against a center line', caption: 'Centering on the subject, checked against a guide', layout: 'tall', aspect: '1080 / 960' },
        ],
      },
      {
        heading: 'Carousels from the same system',
        paragraphs: [
          'The same pipeline made three Instagram and TikTok carousels, with every slide built as a web page in the studio’s type and color. My edits were about tone: softening the closing slide from an upsell to “Sessions start at $150,” fixing a widow, swapping a cover that was already used elsewhere, and dropping “Part 2” so the posts work in any order.',
        ],
        widget: 'ai-carousels',
      },
      {
        heading: 'An explainer written as code',
        paragraphs: [
          'An 82-second video explaining the session management system I run my photography studio on. Every scene, animation and note of the music is written as code: scenes are web pages rendered frame by frame, and the music bed is synthesized with whooshes timed to each scene change. It has no voiceover, so the type carries it.',
          'These are the notes I gave on the renders. They’re an art director’s notes, and they’re what moved it from a working draft to something I’d put my name on.',
        ],
        widget: 'ai-render-notes',
      },
      {
        heading: 'Packaged as skills',
        paragraphs: [
          'Once the workflow was repeatable, I packaged it as five Claude skills, split by what someone starts with. Two are self-contained, so a creator can run them without me. Every skill stops at an approval gate before it builds anything, because the review step is the part that can’t be skipped.',
        ],
        widget: 'ai-skills',
        images: [
          { src: '/work/directing-ai/promo-16x9.webp', alt: 'Frames from the TRISP promo, 16:9', caption: 'site-to-video: a TRISP promo built from the studio’s website, 16:9', layout: 'wide', aspect: '2000 / 750' },
          { src: '/work/directing-ai/promo-9x16.webp', alt: 'Frames from the TRISP promo, 9:16', caption: 'The same script, rendered at 9:16', layout: 'wide', aspect: '2000 / 593' },
          { src: '/work/directing-ai/softlaunch.webp', alt: 'Frames from the TRISP soft-launch video', caption: 'new-style-video: a soft-launch video in a new editorial look, made by running the packaged skill end to end', layout: 'wide', aspect: '2400 / 675' },
        ],
      },
    ],
    results: [
      'The graduation promo was posted to TikTok.',
      'Each round of notes became a small edit and a re-render of about three minutes.',
      'One script renders vertical and horizontal cuts of the same video.',
    ],
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
        heading: 'How the system works',
        paragraphs: [
          'Navigate IDD runs on seven automated workflows in n8n, about a hundred steps in all, connected through one Google Sheet that works as the control panel. Below is that system, redrawn so you can follow it. Pick a stage, press Run to watch it in order, or open the real workflow behind it.',
        ],
        widget: 'nidd-pipeline',
      },
      {
        heading: 'Every line traces back to policy',
        paragraphs: [
          'Scripts are written only from sections retrieved from the official waiver documents, and the script writer is told not to add anything from general knowledge. A policy expert approves every script before any video is made, and again before anything is published. Nothing reaches families without a person signing off.',
        ],
        images: [
          { src: '/navigate-idd/human-review-and-approval.avif', alt: 'Review dashboard where experts approve scripts', caption: 'Experts approve scripts, choose translations and release videos from one sheet.', layout: 'wide', aspect: '1920 / 1080' },
          { src: '/navigate-idd/real-time-dashboard-oversight.avif', alt: 'Script approval and publication dashboard', caption: 'Every script’s status, from draft to published.', layout: 'tall', aspect: '2048 / 1152' },
          { src: '/navigate-idd/real-time-dashboard-oversight-2.avif', alt: 'Drive monitor dashboard', caption: 'The Drive monitor that keeps the policy library current.', layout: 'tall', aspect: '2048 / 1152' },
        ],
      },
      {
        heading: 'What families see',
        paragraphs: [
          'The result is a short explainer with an avatar presenter, in the family’s own language, published with a title and description that make it easy to find.',
        ],
        images: [
          { src: '/work/navigate-idd/hero.webp', alt: 'Navigate IDD explainer video', layout: 'screen', video: '/navigate-idd/idd-video.mp4' },
          { src: '/navigate-idd/distribution-and-accessibility.avif', alt: 'A published Navigate IDD video on YouTube', caption: 'Published to YouTube with generated metadata.', layout: 'tall', aspect: '1920 / 1080' },
          { src: '/navigate-idd/distribution-and-accessibility-2.avif', alt: 'Two people watching a Navigate IDD video together', caption: 'Made for families to watch together.', layout: 'tall', aspect: '1920 / 1080' },
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
    more: true,
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
      'The sneakers were later redesigned on a new shared model. The Ideal pair is glossy red with a white strap, a gold ring buckle, and a ring at the heel. The Freak pair keeps the same shape but goes matte black, with bat wings off the heel, a bat buckle, a spiked sole, and a glowing green stripe.',
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
    more: true,
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
      'A Discord bot that runs College Football and Madden dynasty leagues for their commissioners, from turning a schedule screenshot into matchup channels to tracking results and player upgrades. Above is a concept for its mobile app, designed from the shipped product.',
    role: 'Founder & product designer',
    years: '2024–now',
    disciplines: ['Product', 'AI', 'Mobile UI', 'Data model'],
    tint: '#ff6b35',
    hero: '/work/trilo-app/hero.webp',
    heroMode: 'framed',
    badge: 'Shipped product · App concept',
    interactive: 'trilo-app',
    body: [
      'The prototype above is a concept for Trilo’s mobile app, which is on the product roadmap. Everything it does is based on how the bot already works, using a made-up league and players. Use the controls beside the phone to switch screens, preview loading, empty and error states, and sign in as a member or a commissioner.',
      'Below is the product it’s built on. I designed Trilo, made the product decisions and built it with AI coding tools.',
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'Online dynasty leagues in College Football and Madden run on volunteer commissioners. Every week they create a channel for each game, chase players for results, track who’s been simmed or forced, and manage player upgrades, usually by hand in Discord and a spreadsheet. It takes hours, and leagues fold when the commissioner burns out.',
          'Trilo does that work inside Discord, where the league already lives, so nobody has to learn another tool.',
        ],
      },
      {
        heading: 'What shipped',
        paragraphs: [
          'Entering a season’s schedule by hand was the most tedious job, so it became the headline feature. The commissioner uploads a screenshot of the schedule, Trilo reads the matchups with AI vision and shows a preview, and nothing is created until they confirm. CPU vs CPU games are skipped automatically. Try it below.',
        ],
        widget: 'trilo-extract',
        points: [
          'A status tracker in every game channel: players react to mark a game Completed, Fair Sim or Force Win, and the channel name updates so the whole week reads at a glance.',
          'An optional setting forces the win automatically when a player faces a CPU team.',
          'An attribute points system: commissioners award points, players request upgrades, and commissioners approve or deny them.',
          'Per-server settings for the league type, commissioner roles, stream announcements and more, all through slash commands.',
        ],
        images: [
          { src: '/trilo/game-channel.jpg', alt: 'A Trilo matchup channel in Discord with the game status tracker', caption: 'Results are reported by reacting in each game’s channel', layout: 'tall', aspect: '1024 / 819' },
          { src: '/trilo/matchups-list.jpg', alt: 'Trilo listing matchups it created from a screenshot', caption: 'A week of matchups created from one screenshot', layout: 'tall', aspect: '1024 / 819' },
          { src: '/trilo/commands.png', alt: 'Trilo slash commands in Discord', caption: 'Commands grouped by job', layout: 'phone', aspect: '1290 / 2796' },
          { src: '/trilo/game-status.png', alt: 'Reactions for marking a game played or simmed', caption: 'The status tracker', layout: 'phone', aspect: '1290 / 2796' },
        ],
      },
      {
        heading: 'By the numbers',
        widget: 'trilo-numbers',
      },
      {
        heading: 'Product decisions',
        paragraphs: [
          'Trilo is a paid product, so pricing and access were design problems too.',
        ],
        points: [
          'One plan with every feature, at $4.99 a month or $39 a year. A dynasty league is a long commitment, so the annual price covers a full league year, and the monthly price keeps trying it low-risk next to a $70 game.',
          'No public lifetime plan. Hosting, AI usage and support are ongoing costs, and recurring revenue keeps the incentive on improving the product.',
          'Billing through Stripe rather than Discord’s built-in app subscriptions, for control over pricing and the checkout experience.',
          'A license per Discord server, which keeps access simple to understand and simple to enforce.',
          'Positioned against the established league platform on what it doesn’t have: AI matchup creation, the attribute points system, and working entirely inside Discord.',
        ],
        widget: 'trilo-licensing',
        images: [
          { src: '/trilo/homepage.png', alt: 'Trilo homepage', caption: 'trilo.gg', layout: 'screen', aspect: '16 / 9' },
          { src: '/trilo/pricing.png', alt: 'Trilo pricing page', caption: 'Pricing', layout: 'screen', aspect: '16 / 9' },
        ],
      },
      {
        heading: 'Redesigning the data model',
        paragraphs: [
          'Trilo’s database grew one feature at a time, and it showed: duplicated tables per league, team names stored as text in two places, and billing mixed with activation. I led a v2 redesign that normalized the model with keys and constraints, so the database enforces the league’s rules instead of relying on the bot to remember them. This is where my information systems background shows up most directly.',
        ],
        widget: 'trilo-data-model',
      },
      {
        heading: 'Next: the mobile app',
        paragraphs: [
          'In Discord, the most important things, like whether your game is done and how long until the league advances, take digging through channels and commands to find. The app concept puts them first. I grouped the bot’s jobs by who does them and how often: League for what changed this week, Week for every matchup, Points for upgrades, and Commish for the tools only commissioners see.',
          'Most of the design work went into states rather than screens. A game can be pending, completed, simmed or forced, someone might be streaming it, the schedule might not be posted yet, and Discord might be unreachable. Each has a designed state. Results can be undone for a few seconds, and the points form stops a request you can’t afford before it’s sent.',
          'Screenshot import keeps a person in charge. After the AI reads the schedule, the commissioner sees every matchup it found, which games it skipped and any name it had to match, like “Ucla” to UCLA, before anything is created. The model does the tedious part, and a person approves what ships.',
        ],
      },
      {
        heading: 'Design system',
        paragraphs: [
          'The app uses Trilo’s brand from trilo.gg: Outfit and Barlow Condensed, a flame-to-gold gradient and charcoal surfaces. I added a status palette, so each game state keeps one color through every component, and a short set of rules for touch targets, contrast and motion.',
        ],
        widget: 'trilo-system',
      },
    ],
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

// A project opened from a shelf other than its own carries that shelf along,
// so its Home and Next project links lead back the way the visitor came.
export function caseHref(w: Work, via: Shelf) {
  return w.shelf === via || w.href ? workHref(w) : `${workHref(w)}?from=${via}`
}

// Every shelf a project appears on, its own shelf first.
export function shelvesFor(w: Work): Shelf[] {
  const listed = SHELVES.filter((x) => x.order.includes(w.slug)).map((x) => x.id)
  return [w.shelf, ...listed.filter((x) => x !== w.shelf)]
}

export function getWork(slug: string) {
  return WORK.find((w) => w.slug === slug)
}
