'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowLeftIcon, XIcon } from 'lucide-react'
import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogClose,
    MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'

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
                <div className="flex items-start gap-6">
                    {/* Circular Image with Lightbox */}
                    <MorphingDialog
                        transition={{
                            type: 'spring',
                            bounce: 0,
                            duration: 0.3,
                        }}
                    >
                        <MorphingDialogTrigger>
                            <div className="h-24 w-24 shrink-0 cursor-zoom-in overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                                <img
                                    src="/headshot-2.jpg"
                                    alt="Jemari Sapp"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </MorphingDialogTrigger>
                        <MorphingDialogContainer>
                            <MorphingDialogContent className="relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
                                <img
                                    src="/headshot-2.jpg"
                                    alt="Jemari Sapp"
                                    className="h-[50vh] w-auto rounded-xl object-cover md:h-[70vh]"
                                />
                            </MorphingDialogContent>
                            <MorphingDialogClose
                                className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
                                variants={{
                                    initial: { opacity: 0 },
                                    animate: {
                                        opacity: 1,
                                        transition: { delay: 0.3, duration: 0.1 },
                                    },
                                    exit: { opacity: 0, transition: { duration: 0 } },
                                }}
                            >
                                <XIcon className="h-5 w-5 text-zinc-500" />
                            </MorphingDialogClose>
                        </MorphingDialogContainer>
                    </MorphingDialog>
                    <h1 className="text-2xl font-medium tracking-tight pt-6">About Me</h1>
                </div>
                <div className="prose prose-zinc dark:prose-invert text-zinc-600 dark:text-zinc-400">
                    <p>
                        My journey began in the visual arts, where I honed my eye for design and storytelling as a graphic designer. Creating visuals was rewarding, but I found myself increasingly drawn to the systems and logic <i>behind</i> the creative process. This curiosity led me to pivot from static design to dynamic, intelligent systems.
                    </p>
                    <p>
                        Now, pursuing a Master of Science in Information Systems with a focus on AI for Business Innovation at Georgia State University, I operate at the intersection of creative problem-solving and technical engineering. I don't just design interfaces; I build the AI-native workflows, RAG pipelines, and automated backends that power them.
                    </p>
                    <p>
                        From founding my own design studio to building AI inquiry management platforms and leading cross-functional teams creating multilingual AI video pipelines, my goal is to create products that are not only technically robust but also intuitively designed. I am currently seeking a role where I can leverage this unique blend of product sense and technical capability to build impactful software.
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
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Graduate Assistant</h4>
                                <p className="text-zinc-500 dark:text-zinc-400">Georgia State University, J. Mack Robinson College of Business</p>
                            </div>
                            <span className="text-zinc-400 text-sm whitespace-nowrap">Aug 2025 - Present</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Produced 3+ weekly video posts and blog content for LinkedIn and Instagram, contributing to 2x engagement growth. Advised prospective students via Unibuddy platform and coordinated student events with admissions teams.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Founder & Developer</h4>
                                <p className="text-zinc-500 dark:text-zinc-400">Trilo | <a href="https://trilo.gg" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">trilo.gg</a></p>
                            </div>
                            <span className="text-zinc-400 text-sm whitespace-nowrap">Nov 2024 - Present</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Built an OpenAI Vision pipeline that automated schedule creation, reducing setup time from 2 hours to under 10 minutes. Designed multi-tenant async Python backend with PostgreSQL supporting 200+ concurrent users. Conducted 100+ user evaluations to shape pricing model and feature roadmap.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Founder & Designer</h4>
                                <p className="text-zinc-500 dark:text-zinc-400">TRISP Studio | <a href="https://trispstudio.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">trispstudio.com</a></p>
                            </div>
                            <span className="text-zinc-400 text-sm whitespace-nowrap">Dec 2016 - Present</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Managed a rolling portfolio of clientele, delivering 1000+ design & photography projects across diverse industries. Led full creative cycles from client brief to final execution, operating in fast-paced, deadline-critical workflows.
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
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Product</h4>
                        <p>Product Management, User Research, Pricing Strategy, Roadmap Planning, Go-to-Market Strategy</p>
                    </div>
                    <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">AI/ML</h4>
                        <p>OpenAI Vision, Gemini, Prompt Engineering, RAG, Structured Output Design, Model Evaluation</p>
                    </div>
                    <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Technical</h4>
                        <p>Python, TypeScript, React/Next.js, PostgreSQL, REST APIs, Webhooks, Git, System Architecture</p>
                    </div>
                    <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Integrations & Data</h4>
                        <p>Stripe, Supabase, Discord API, Google Calendar API, Postmark, SQL, Pandas, NumPy</p>
                    </div>
                    <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Design</h4>
                        <p>Figma, Adobe Creative Suite, UI/UX Design</p>
                    </div>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-6"
            >
                <h3 className="text-lg font-medium">Connect</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Feel free to contact me at{' '}
                    <a
                        className="underline dark:text-zinc-300"
                        href="mailto:jsapp9@student.gsu.edu"
                    >
                        jsapp9@student.gsu.edu
                    </a>
                </p>
                <div className="flex items-center justify-start space-x-3">
                    <a
                        href="https://github.com/jemarisapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                    >
                        Github
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                        >
                            <path
                                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jemari-sapp-b3984821b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                    >
                        LinkedIn
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                        >
                            <path
                                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </motion.section>
        </motion.main>
    )
}
