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
    title: 'Agentic AI Developer Intern',
    company: 'LK Taylor and Associates',
    location: 'Atlanta, GA',
    date: 'May 2026 - Present',
    bullets: [
      'Automated case law retrieval across Georgia state, federal, and Supreme Court jurisdictions by building a RAG-based legal research platform with vector search.',
      'Reduced legal research effort by developing agentic AI workflows for document retrieval, analysis, and summarization.',
      'Accelerated legal drafting by creating an AI contract generation system that transforms client intake data into jurisdiction-specific contracts.',
      'Streamlined legal research workflows by integrating LLM-powered document analysis and public court record APIs.',
    ],
  },
  {
    title: 'AI Engineering Intern',
    company: 'Kampgrounds of America, Inc.',
    location: 'Atlanta, GA',
    date: 'Mar 2026 - Apr 2026',
    bullets: [
      'Automated group sales workflows by building and deploying a multi-agent AI pipeline for qualification, availability checks, scoring, and outreach.',
      'Reduced a manual process from hours to under 10 minutes, enabling scalable lead handling.',
      'Improved lead tracking and human review processes by designing a 5-table database architecture.',
      'Enabled real-time pipeline monitoring by developing a React dashboard for operator interaction and workflow oversight.',
    ],
  },
  {
    title: 'Graduate Assistant',
    company: 'Georgia State University, J. Mack Robinson College of Business',
    location: 'Atlanta, GA',
    date: 'Aug 2025 - Present',
    bullets: [
      'Supported graduate recruitment efforts by managing webinar and outreach initiatives for prospective students.',
      'Improved prospective student engagement by coordinating outreach and event logistics for 200+ students.',
      'Increased program engagement by identifying content performance trends that contributed to 2× growth.',
      'Enhanced student support operations by serving as a primary point of contact for graduate program inquiries.',
    ],
  },
  {
    title: 'Founder & Product Lead',
    company: 'Trilo',
    location: 'Atlanta, GA',
    date: 'Nov 2024 - Present',
    bullets: [
      'Built and launched a multi-tenant sports league management platform serving 100+ active users, automating league operations across multiple online gaming communities.',
      'Reduced commissioner workload by approximately 60% through the automation of 30+ league admin workflows.',
      'Enabled scalable league operations by designing and maintaining a PostgreSQL database supporting user management, subscriptions, analytics, and audit logging.',
      'Reduced manual admin tasks by building AI-powered OCR workflows for automated ingestion and league operations.',
      'Eliminated data anomalies by redesigning core data models into a normalized relational architecture.',
    ],
  },
  {
    title: 'Founder & Creative Technologist',
    company: 'TRISP Studio',
    location: 'Atlanta, GA',
    date: 'Dec 2016 - Present',
    bullets: [
      'Improved business operations by designing and deploying AI-powered lead intake agents, workflow automation tools, and automated communication systems.',
      'Increased booking efficiency and response speed by building an AI lead intake system with retrieval-based responses, Google Calendar integration, and automated email workflows.',
      'Delivered creative campaigns distributed through national record labels including Atlantic and Motown.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'ML Research: Deepfake Detection',
    stack: 'TensorFlow, Scikit-learn, Python',
    bullets: [
      'Developed a neural network model using RL-based active learning to detect AI-generated media, improving model adaptability to new data patterns during training.',
      'Engineered features and evaluated model performance using scikit-learn and TensorFlow/Keras, enabling systematic comparison of model accuracy and generalization.',
      'Documented model design, experimentation process, and results in a structured research report, supporting reproducibility.',
    ],
  },
  {
    name: 'RAG-Based AI System for Medicaid Policy Video Generation',
    stack: 'Python, Pinecone, LangChain, n8n',
    bullets: [
      'Built a retrieval-based system using Pinecone and LangChain to ensure factual consistency in policy explanations.',
      'Designed a pipeline that converts complex Medicaid policies into multilingual video content for families with IDD.',
      'Orchestrated 5+ APIs using n8n to automate end-to-end generation in less than 15 minutes.',
      'Implemented human-in-the-loop review layers for compliance, accuracy, and safety.',
    ],
  },
  {
    name: 'AI-Powered Sports League Management Platform',
    stack: 'Python, PostgreSQL, APIs, Computer Vision',
    bullets: [
      'Built and deployed a Discord-based platform supporting 300+ users across multiple leagues.',
      'Automated administrative workflows to support scaling across concurrent leagues.',
      'Developed an image-to-structured-data pipeline that reduced manual data entry by 80%.',
      'Designed a Python and PostgreSQL backend for scheduling, matchups, and league operations.',
    ],
  },
]

const SKILLS = [
  {
    label: 'AI Systems',
    skills:
      'RAG, Agentic AI, Multi-Agent Systems, Prompt Engineering, Structured Outputs, Tool Calling, Human-in-the-Loop Systems, Workflow Automation',
  },
  {
    label: 'Engineering',
    skills:
      'Python, TypeScript, SQL, PostgreSQL, Supabase, Database Design, Data Modeling, Relational Databases, Vector Databases, REST APIs, Webhooks, API Orchestration',
  },
  {
    label: 'Data & Infrastructure',
    skills:
      'React, Next.js, Vercel, Pandas, NumPy',
  },
  {
    label: 'Product & Design',
    skills:
      'AI Product Management, Product Strategy, Workflow Design, Process Automation, User Research, Figma, AI Product Design, UX Design, Adobe Creative Suite',
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
      className="space-y-12 pb-12s"
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
          AI engineering for automated product systems.
          </h1>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
            I am an MS Information Systems candidate focused on AI for Business
            Innovation, building multi-agent workflows, RAG systems, dashboards,
            and automation tools for real business operations.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {RESUME_LINKS.map((link) => {
            const Icon = link.icon
            const isPrimary = link.variant === 'primary'

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
                    ? 'inline-flex h-9 items-center gap-2 rounded-md border border-zinc-950 bg-zinc-950 px-3 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-800 hover:bg-zinc-800 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:border-zinc-200 dark:hover:bg-zinc-200'
                    : 'inline-flex h-9 items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900'
                }
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            )
          })}
        </div>
      </motion.section>

      <Section title="Summary">
        <p className="text-zinc-600 dark:text-zinc-400">
          My current work centers on AI systems that move operational workflows
          from manual effort into reliable, reviewable software. I bring a
          design-led product perspective to engineering work across multi-agent
          automation, retrieval systems, data pipelines, and user-facing tools.
        </p>
      </Section>

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

      <Section title="Projects" id="projects">
        <div className="space-y-8">
          {PROJECTS.map((project) => (
            <article key={project.name} className="space-y-3">
              <div>
                <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
                  {project.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  {project.stack}
                </p>
              </div>
              <ul className="space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {project.bullets.map((bullet) => (
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

      <Section title="Skills">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SKILLS.map((group) => (
            <div
              key={group.label}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <h3 className="mb-2 text-sm font-medium text-zinc-950 dark:text-zinc-50">
                {group.label}
              </h3>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {group.skills}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </motion.main>
  )
}
