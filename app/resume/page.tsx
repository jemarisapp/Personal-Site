import type { Metadata } from 'next'
import { PROFILE } from '@/lib/work'
import { ResumeView, type ResumeData } from './resume-view'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Jemari Sapp, designer for music, brands, and AI products.',
}

const DESIGN: ResumeData = {
  label: 'Designer resume',
  pdf: PROFILE.resumePdf,
  switchTo: { href: '/resume/ai', label: 'AI systems version' },
  title: 'Designer for music, brands & AI products',
  summary:
    'Designer and art director with eight years of releases for YoungBoy Never Broke Again and a studio practice serving national record labels. I lead with brand, album art, and motion, and I design and build the products behind them, including AI tools.',
  experience: [
    {
      org: 'TRISP Studio',
      role: 'Founder & Creative Director',
      when: '2016 – Present',
      points: [
        'Run a creative studio for artists and brands covering identity, album art, campaign rollouts, motion, websites, and photography.',
        'Led creative direction for campaigns released through national labels including Atlantic Records and Motown.',
        'Art directed the Fast X soundtrack rollout with APG: a single-release system of covers and motion visuals for streaming and social. The soundtrack passed 500 million streams.',
        'Designed and built the studio’s identity and website.',
      ],
    },
    {
      org: 'YoungBoy Never Broke Again',
      role: 'Art Director & Designer, through TRISP Studio',
      when: '2018 – 2026',
      points: [
        'Art directed and designed 20+ releases for one of hip-hop’s most-streamed artists, handling each one end to end: album and single covers, back covers and tracklists, logos, and motion teasers.',
        'Gave each release its own identity on fast turnarounds while keeping the catalog recognizable.',
        'Work included a Billboard top-10 mixtape and a building-scale billboard for The Last Slimeto.',
      ],
    },
    {
      org: 'Kampgrounds of America',
      role: 'AI Engineering Intern',
      when: 'Mar – May 2026',
      points: [
        'Designed and built a React dashboard where operators watch and step into a live multi-agent sales pipeline.',
        'Automated a manual group sales workflow from hours to under 10 minutes.',
      ],
    },
  ],
  projects: [
    { name: 'Navigate IDD', note: 'Led AI systems design for multilingual Medicaid explainer videos, cutting production time by about 90%.' },
    { name: 'Trilo', note: 'Founded and designed a Discord product that runs College Football and Madden dynasty leagues, now used by 11 leagues.' },
    { name: 'Sweet Beijing', note: 'Identity, ads, and app with an international student team in Beijing.' },
    { name: 'Atlantic Records', note: 'Concept rebrand with a full brand guidelines book.' },
  ],
  skills: [
    {
      group: 'Design',
      items: ['Art direction', 'Brand identity', 'Album art & packaging', 'Typography', 'Motion', 'App & web design', 'Prototyping'],
    },
    { group: 'Tools', items: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Premiere Pro', 'Cinema 4D', 'Figma'] },
    { group: 'Build', items: ['React & Next.js', 'TypeScript', 'Python', 'AI systems (RAG, agents)'] },
  ],
  clients: ['Never Broke Again', 'Atlantic Records', 'Motown', 'APG'],
}

export default function Resume() {
  return <ResumeView data={DESIGN} />
}
