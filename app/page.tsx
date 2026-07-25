'use client'

import { motion } from 'motion/react'
import {
  ArrowUpRightIcon,
  MailIcon,
} from 'lucide-react'
import { EMAIL, SOCIAL_LINKS } from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

const RESUME_LINKS = [
  {
    label: 'View Projects',
    href: '/projects',
    icon: ArrowUpRightIcon,
    variant: 'primary',
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    icon: MailIcon,
  },
  ...SOCIAL_LINKS.map((link) => ({
    label: link.label,
    href: link.link,
    icon: ArrowUpRightIcon,
    variant: 'secondary',
  })),
]

const EDUCATION = [
  {
    degree: 'Master of Science in Information Systems',
    school: 'Georgia State University, J. Mack Robinson College of Business',
    focus: 'AI for Business Innovation',
    date: 'Expected Aug 2026',
  },
  {
    degree: 'Bachelor of Fine Arts in Graphic Design',
    school: 'Georgia State University',
    focus: 'Graphic Design',
    date: 'May 2023',
  },
]

const EXPERIENCE = [
  {
    title: 'AI Product Engineer Intern',
    company: 'LK Taylor and Associates',
    location: 'Atlanta, GA',
    date: 'May 2026 - Present',
    bullets: [
      'Built an AI-powered contract drafting platform that guides attorneys through producer agreement creation, review, approval, and signature workflows.',
      'Designed guided single and batch drafting experiences with template selection, validation, preflight checks, and CSV import for high-volume agreement generation.',
      'Developed an attorney approval workflow that enabled AI-generated drafts to be reviewed, edited, versioned, and approved before distribution.',
      'Implemented a structured PDF generation system that separated AI-generated legal content from document formatting to produce agreements matching firm standards.',
    ],
  },
  {
    title: 'AI Engineering Intern',
    company: 'Kampgrounds of America, Inc.',
    location: 'Atlanta, GA',
    date: 'Mar 2026 - Apr 2026',
    bullets: [
      'Built and deployed a multi-agent AI workflow that automated group sales qualification, availability checks, lead scoring, and CRM preparation.',
      'Reduced a manual sales workflow from hours to under 10 minutes, enabling significantly faster lead processing.',
      'Designed a relational database supporting lead tracking, workflow state management, and human review.',
      'Developed a React operations dashboard for monitoring AI workflow execution and reviewing generated outputs.',
    ],
  },
  {
    title: 'Graduate Assistant',
    company: 'Georgia State University, J. Mack Robinson College of Business',
    location: 'Atlanta, GA',
    date: 'Aug 2025 - July 2026',
    bullets: [
      'Supported graduate recruitment through webinars, outreach campaigns, and prospective student engagement initiatives.',
      'Coordinated communications and event logistics supporting more than 200 prospective graduate students.',
      'Analyzed content performance and engagement trends that contributed to a 2× increase in program engagement.',
      'Served as a primary point of contact for graduate program inquiries and admissions support.',
    ],
  },
  {
    title: 'Founder & Product Engineer',
    company: 'Trilo',
    location: 'Atlanta, GA',
    date: 'Nov 2024 - Present',
    bullets: [
      'Built and launched a multi-tenant sports league management platform serving more than 100 active users across online gaming communities.',
      'Reduced league administration by approximately 60% through automation of more than 30 commissioner workflows.',
      'Designed and maintained a PostgreSQL database supporting user accounts, subscriptions, analytics, and audit logging.',
      'Built AI-powered OCR workflows that automated game result ingestion and league operations.',
      'Redesigned core data models into a normalized relational architecture to improve data integrity and scalability.',
    ],
  },
  {
    title: 'Founder & Creative Technologist',
    company: 'TRISP Studio',
    location: 'Atlanta, GA',
    date: 'Dec 2016 - Present',
    bullets: [
      'Built AI-powered lead intake agents, workflow automations, and communication systems that automated client onboarding and booking operations.',
      'Developed an AI-assisted booking workflow integrating knowledge retrieval, Google Calendar scheduling, and automated email communication.',
      'Delivered creative campaigns distributed through national record labels including Atlantic Records and Motown.',
    ],
  },
]

function Section({
  title,
  children,
  id,
}: {
  title: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <motion.section
      id={id}
      variants={VARIANTS_SECTION}
      transition={TRANSITION_SECTION}
      className="space-y-5"
    >
      <h2 className="text-sm font-semibold uppercase tracking-normal text-zinc-500 dark:text-zinc-400">
        {title}
      </h2>
      {children}
    </motion.section>
  )
}

export default function ResumePage() {
  return (
    <motion.main
      className="space-y-12 pb-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-6"
      >
        <div className="space-y-3">
          <h1 className="text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
            Designing intelligent systems that improve business operations.
          </h1>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
            I am an MS Information Systems candidate focused on AI for Business
            Innovation. I design and build AI-powered systems, from multi-agent
            workflows and retrieval pipelines to enterprise automation and
            analytics platforms, with a focus on solving real operational
            problems.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {RESUME_LINKS.map((link) => {
            const Icon = link.icon
            const isPrimary = link.variant === 'primary'
            const shouldPairOnMobile =
              link.label === 'View Projects' ||
              link.label === 'Email' ||
              link.label === 'Github' ||
              link.label === 'LinkedIn'

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className={
                  isPrimary
                    ? `inline-flex h-9 items-center justify-center gap-2 rounded-md border border-zinc-950 bg-zinc-950 px-3 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-800 hover:bg-zinc-800 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:border-zinc-200 dark:hover:bg-zinc-200 ${
                        shouldPairOnMobile
                          ? 'basis-[calc(50%-0.25rem)] sm:basis-auto'
                          : ''
                      }`
                    : `inline-flex h-9 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 ${
                        shouldPairOnMobile
                          ? 'basis-[calc(50%-0.25rem)] sm:basis-auto'
                          : ''
                      }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            )
          })}
        </div>
      </motion.section>

      <Section title="Education">
        <div className="space-y-5">
          {EDUCATION.map((item) => (
            <div
              key={item.degree}
              className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
                  {item.degree}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.focus} - {item.school}
                </p>
              </div>
              <p className="shrink-0 text-sm text-zinc-500 dark:text-zinc-500">
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Experience">
        <div className="space-y-8">
          {EXPERIENCE.map((item) => (
            <article key={`${item.title}-${item.company}`} className="space-y-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.company}
                    {item.location ? ` - ${item.location}` : ''}
                  </p>
                </div>
                <p className="shrink-0 text-sm text-zinc-500 dark:text-zinc-500">
                  {item.date}
                </p>
              </div>
              <ul className="space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

    </motion.main>
  )
}
