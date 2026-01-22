import { cn } from "@/lib/utils"

interface ProjectHeaderProps {
    role: string
    timeline?: string
    stack: string[]
    className?: string
}

export function ProjectHeader({ role, timeline, stack, className }: ProjectHeaderProps) {
    return (
        <div className={cn("not-prose mb-8 space-y-4 pb-8", className)}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
                {/* Role */}
                <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                        Role
                    </span>
                    <span className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                        {role}
                    </span>
                </div>


            </div>

            {/* Tech Stack Pills */}
            <div>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                    Core Stack
                </span>
                <div className="flex flex-wrap gap-2">
                    {stack.map((tech) => (
                        <span
                            key={tech}
                            className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
