type Project = {
  name: string
  description: string
  link: string
  video?: string
  image?: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  id: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Inquifly',
    description:
      'Multi-tenant SaaS evolved from an internal tool, using a two-stage AI pipeline to cut response times by 97%.',
    link: '/project/inquifly',
    image: '/inquifly.png',
    id: 'project1',
  },
  {
    name: 'Trilo',
    description:
      'Full-stack SaaS automating fantasy football with AI schedule extraction, Stripe billing, and Discord integration.',
    link: '/project/trilo',
    image: '/trilo.avif',
    id: 'project2',
  },
  {
    name: 'Navigate IDD',
    description:
      'AI-assisted Medicaid waiver system converting complex policy documents into accessible multilingual videos.',
    link: '/project/navigate-idd',
    image: '/navigate-idd.jpg',
    id: 'project3',
  },
  {
    name: 'Music Industry Analytics',
    description:
      'Data analytics system for tracking and visualizing real-time Billboard Hot 100 chart performance.',
    link: '/project/music-industry-analytics',
    image: '/music-analytics.avif',
    id: 'project4',
  },
]

export const DESIGN_PROJECTS: Project[] = [
  {
    name: 'Fast X Soundtrack',
    description:
      'Visuals for Spotify Canvas, Apple Music, YouTube, and social media, balancing cinematic energy with platform-specific adaptability.',
    link: '/project/fast-x-soundtrack',
    image: '/fast-x/gif.webp',
    id: 'design1',
  },
  {
    name: 'Camp MODA',
    description:
      'A flexible identity system for the Museum of Design Atlanta\'s summer program, designed to energize kids and teens.',
    link: '/project/camp-moda',
    image: '/camp-moda/gif.webp',
    id: 'design2',
  },
  {
    name: "Zaire's Valentine",
    description: "Short-form animation delivering a personal, cinematic message while teasing an unreleased track.",
    link: '/project/zaire-valentine',
    image: '/zaire-valentine/gif.webp',
    id: 'design3',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Georgia State University',
    title: 'Graduate Assistant',
    start: 'Aug 2025',
    end: 'Present',
    id: 'work4',
  },
  {
    company: 'Trilo',
    title: 'Founder & Developer',
    start: 'Nov 2024',
    end: 'Present',
    id: 'work1',
  },
  {
    company: 'Tomorrow Pictures Inc',
    title: 'Brand & Motion Design Intern',
    start: 'Dec 2022',
    end: 'Apr 2023',
    id: 'work2',
  },
  {
    company: 'TRISP Studio',
    title: 'Founder & Designer',
    start: 'Dec 2016',
    end: 'Present',
    id: 'work5',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/jemarisapp',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/jemari-sapp-b3984821b/',
  },
]

export const EMAIL = 'jsapp9@student.gsu.edu'
