type Project = {
  name: string
  description: string
  link: string
  video?: string
  image?: string
  images?: string[]
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
    name: 'SoundIntel BI',
    description:
      'Interactive music chart analytics platform with AI-powered data exploration',
    link: '/project/soundintel-bi',
    image: '/soundintel-bi/dash-2.png',
    id: 'project4',
  },
  // {
  //   name: 'Deepfake Detection',
  //   description:
  //     'Multimodal AI system using RL-based active learning and EfficientNetB0 to optimize high-uncertainty sample selection for content integrity.',
  //   link: '/project/deepfake-detection',
  //   image: '/deepfake-detection.png',
  //   id: 'project5',
  // },
  {
    name: 'Inquifly',
    description:
      'Using Gemini and structured prompting to automate inquiry management',
    link: '/project/inquifly',
    image: '/inquifly/home-preview-2.png',
    id: 'project1',
  },
  {
    name: 'Trilo',
    description:
      'Multi-tenant SaaS with an OpenAI Vision pipeline for AI schedule extraction',
    link: '/project/trilo',
    image: '/trilo.avif',
    id: 'project2',
  },
  {
    name: 'Navigate IDD',
    description:
      'Multilingual AI pipeline transforming complex Medicaid policies into videos.',
    link: '/project/navigate-idd',
    image: '/navigate-idd.jpg',
    id: 'project3',
  },
  {
    name: 'TRISP Studio',
    description:
      'A client experience for portfolio discovery and gallery portal delivery.',
    link: '/project/trisp-studio',
    image: '/trisp/cover_v2.png',
    id: 'project0',
  },
]

export const DESIGN_PROJECTS: Project[] = [
  {
    name: 'Fast X Soundtrack',
    description:
      "Developed brand systems for the Fast X Soundtrack in collaboration with the SVP of APG, ensuring alignment with the franchise's cinematic legacy.",
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
    title: 'Founder & Product Engineer',
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
