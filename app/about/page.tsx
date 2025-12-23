'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

const VARIANTS_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const VARIANTS_SECTION = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
    duration: 0.3,
}

export default function AboutPage() {
    return (
        <motion.main
            className="space-y-12 pb-20"
            variants={VARIANTS_CONTAINER}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
                <Link href="/" className="inline-flex items-center gap-2 text-sm">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Home
                </Link>
            </motion.div>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-6"
            >
                <h1 className="text-2xl font-medium tracking-tight">About Me</h1>
                <div className="prose prose-zinc dark:prose-invert text-zinc-600 dark:text-zinc-400">
                    <p>
                        My journey began in the visual arts, where I honed my eyes for design and storytelling as a graphic designer. Creating visuals was rewarding, but I found myself increasingly drawn to the systems and logic <i>behind</i> the creative process. This curiosity led me to pivot from static design to dynamic, intelligent systems.
                    </p>
                    <p>
                        Now, pursuing a Master of Science in Information Systems with a focus on AI for Business Innovation at Georgia State University, I operate at the intersection of creative problem-solving and technical engineering. I don't just design interfaces; I build the AI-native workflows, RAG pipelines, and automated backends that power them.
                    </p>
                    <p>
                        From founding my own design studio to leading cross-functional teams in building AI video pipelines, my goal is to create products that are not only technically robust but also intuitively designed. I am currently seeking a role where I can leverage this unique blend of product sense and technical capability to build impactful software.
                    </p>
                    <div className="pt-4">
                        <a
                            href="https://www.dropbox.com/scl/fi/ufpk6tl2l3fh995n2u0vt/Jemari-Sapp-Web-Resume-Online.pdf?rlkey=etulofdgodno67svers842xwh&st=wc2nvxs0&dl=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-600 dark:text-zinc-100 dark:decoration-zinc-700 dark:hover:decoration-zinc-400"
                        >
                            View Resume
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                            >
                                <path
                                    d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-6"
            >
                <h3 className="text-lg font-medium">Education</h3>
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <div>
                            <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Master of Science in Information Systems</h4>
                            <p className="text-zinc-500 dark:text-zinc-400">AI for Business Innovation • Georgia State University</p>
                        </div>
                        <span className="text-zinc-400 text-sm whitespace-nowrap">Expected Aug 2026</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <div>
                            <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Bachelor of Fine Arts in Graphic Design</h4>
                            <p className="text-zinc-500 dark:text-zinc-400">Georgia State University</p>
                        </div>
                        <span className="text-zinc-400 text-sm whitespace-nowrap">May 2023</span>
                    </div>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-6"
            >
                <h3 className="text-lg font-medium">Experience</h3>
                <div className="space-y-8">
                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Graduate Research Assistant</h4>
                                <p className="text-zinc-500 dark:text-zinc-400">Georgia State University, J. Mack Robinson College of Business</p>
                            </div>
                            <span className="text-zinc-400 text-sm whitespace-nowrap">Aug 2025 - Present</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Developing content strategies for graduate recruiting and producing social media content that has doubled engagement.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Creator | Product Engineer</h4>
                                <p className="text-zinc-500 dark:text-zinc-400">Trilo</p>
                            </div>
                            <span className="text-zinc-400 text-sm whitespace-nowrap">Nov 2024 - Present</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Built an OpenAI Vision pipeline reducing schedule creation time by 90% and designed an async Python backend supporting 200+ users.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Founder | Designer & Automation Engineer</h4>
                                <p className="text-zinc-500 dark:text-zinc-400">TRISP Studio</p>
                            </div>
                            <span className="text-zinc-400 text-sm whitespace-nowrap">Dec 2016 - Present</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Delivered 500+ projects for major clients (UMG, APG) and built event-driven automation systems to streamline client operations.
                        </p>
                    </div>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-6"
            >
                <h3 className="text-lg font-medium">Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">AI & ML</h4>
                        <p>OpenAI, LangChain, RAG, Pinecone, Prompt Engineering, Agentic Workflows</p>
                    </div>
                    <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Product & Technical</h4>
                        <p>Python, SQL, REST APIs, Workflow Automation, Power BI, ETL Pipelines</p>
                    </div>
                    <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Design</h4>
                        <p>Figma, Adobe Creative Suite, UI/UX Design, Motion Design</p>
                    </div>
                </div>
            </motion.section>
        </motion.main>
    )
}
