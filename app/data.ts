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
    name: 'Navigate IDD',
    description:
      'AI-assisted Medicaid waiver education system converting policy into multilingual videos.',
    link: '/project/navigate-idd',
    image: '/navigate-idd.jpg',
    id: 'project1',
  },
  {
    name: 'The Serverless Booking Agent',
    description:
      'Architecting an event-driven, serverless pipeline that combines Generative AI with deterministic logic to handle real-time bookings.',
    link: '/project/serverless-booking-agent',
    image: '/automating email.png',
    id: 'project3',
  },
  {
    name: 'Music Industry Analytics Dashboard',
    description:
      'A comprehensive data analytics system for tracking and visualizing Billboard Hot 100 chart performance.',
    link: '/project/music-industry-analytics',
    image: '/music-analytics.avif',
    id: 'project4',
  },
  {
    name: 'Trilo - Discord Sports League Platform',
    description:
      'An intelligent Discord bot that quietly handles every administrative task, so commissioners can stop managing spreadsheets and start enjoying their leagues.',
    link: '/project/trilo',
    image: '/trilo.avif',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Trilo - AI-Powered Sports League Automation Platform (Independent Project)',
    title: 'Product Owner',
    start: 'Nov 2024',
    end: 'Present',
    link: 'https://www.dropbox.com/scl/fi/ufpk6tl2l3fh995n2u0vt/Jemari_Sapp_Web_Resume_2025-LINKED.pdf?rlkey=etulofdgodno67svers842xwh&st=76jtf0gv&dl=0',
    id: 'work1',
  },
  {
    company: 'Medicaid Waiver Education System (Team Project)',
    title: 'AI Systems Product Designer',
    start: 'Sep 2025',
    end: 'Oct 2025',
    link: 'https://www.dropbox.com/scl/fi/ufpk6tl2l3fh995n2u0vt/Jemari_Sapp_Web_Resume_2025-LINKED.pdf?rlkey=etulofdgodno67svers842xwh&st=76jtf0gv&dl=0',
    id: 'work2',
  },
  {
    company: 'Music Industry Analytics Dashboard (Independent Project)',
    title: 'Business Intelligence & Data Analyst',
    start: 'July 2025',
    end: 'Aug 2025',
    link: 'https://www.dropbox.com/scl/fi/ufpk6tl2l3fh995n2u0vt/Jemari_Sapp_Web_Resume_2025-LINKED.pdf?rlkey=etulofdgodno67svers842xwh&st=76jtf0gv&dl=0',
    id: 'work3',
  },
  {
    company: 'Georgia State University, J. Mack Robinson College of Business',
    title: 'Graduate Research Assistant',
    start: 'Aug 2025',
    end: 'Present',
    link: 'https://www.dropbox.com/scl/fi/ufpk6tl2l3fh995n2u0vt/Jemari_Sapp_Web_Resume_2025-LINKED.pdf?rlkey=etulofdgodno67svers842xwh&st=76jtf0gv&dl=0',
    id: 'work4',
  },
  {
    company: 'TRISP Studio',
    title: 'Founder & Visual Designer',
    start: 'Dec 2016',
    end: 'Present',
    link: 'https://www.dropbox.com/scl/fi/ufpk6tl2l3fh995n2u0vt/Jemari_Sapp_Web_Resume_2025-LINKED.pdf?rlkey=etulofdgodno67svers842xwh&st=76jtf0gv&dl=0',
    id: 'work5',
  },
  {
    company: 'Tomorrow Pictures',
    title: 'Brand & Motion Design Intern',
    start: 'Dec 2022',
    end: 'Apr 2023',
    link: 'https://www.dropbox.com/scl/fi/ufpk6tl2l3fh995n2u0vt/Jemari_Sapp_Web_Resume_2025-LINKED.pdf?rlkey=etulofdgodno67svers842xwh&st=76jtf0gv&dl=0',
    id: 'work6',
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
