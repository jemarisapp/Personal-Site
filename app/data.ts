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
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Trilo',
    description:
      'Full-stack SaaS automating fantasy football league management with AI-powered schedule extraction, Stripe subscriptions, and Discord-native operations.',
    link: '/project/trilo',
    image: '/trilo.avif',
    id: 'project1',
  },
  {
    name: 'Inquifly',
    description:
      'AI-powered inquiry management for photographers. Turns 20-minute email responses into 30-second reviews with calendar-aware, brand-aligned drafts.',
    link: '/project/inquifly',
    image: '/inquifly.png',
    id: 'project2',
  },
  {
    name: 'Navigate IDD',
    description:
      'AI-assisted Medicaid waiver education system converting policy into multilingual videos.',
    link: '/project/navigate-idd',
    image: '/navigate-idd.jpg',
    id: 'project3',
  },
  {
    name: 'Music Industry Analytics',
    description:
      'A comprehensive data analytics system for tracking and visualizing Billboard Hot 100 chart performance.',
    link: '/project/music-industry-analytics',
    image: '/music-analytics.avif',
    id: 'project4',
  },
]

export const DESIGN_PROJECTS: Project[] = [
  // Hidden for now
  // {
  //   name: 'Fast X Soundtrack',
  //   description:
  //     'Visuals for Spotify Canvas, Apple Music, YouTube, and social media, balancing cinematic energy with platform-specific adaptability.',
  //   link: '/project/fast-x-soundtrack',
  //   image: '/fast-x/gif.webp',
  //   id: 'design1',
  // },
  // {
  //   name: 'Camp MODA',
  //   description:
  //     'A flexible identity system for the Museum of Design Atlanta's summer program, designed to energize kids and teens.',
  //   link: '/project/camp-moda',
  //   image: '/camp-moda/gif.webp',
  //   id: 'design2',
  // },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Georgia State University',
    title: 'Graduate Assistant',
    start: 'Aug 2025',
    end: 'Present',
    link: 'https://www.dropbox.com/scl/fi/ufpk6tl2l3fh995n2u0vt/Jemari_Sapp_Web_Resume_2025-LINKED.pdf?rlkey=etulofdgodno67svers842xwh&st=76jtf0gv&dl=0',
    id: 'work4',
  },
  {
    company: 'Trilo',
    title: 'Founder & Developer',
    start: 'Nov 2024',
    end: 'Present',
    link: '/project/trilo',
    id: 'work1',
  },
  {
    company: 'TRISP Studio',
    title: 'Founder & Designer',
    start: 'Dec 2016',
    end: 'Present',
    link: '/project/autonomous-booking-system',
    id: 'work5',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
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
