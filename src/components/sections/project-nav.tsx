import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import type { CaseStudy } from "@/lib/case-studies"
import { cn } from "@/lib/utils"

function NavLink({
  project,
  direction,
}: {
  project: CaseStudy
  direction: "prev" | "next"
}) {
  const isNext = direction === "next"
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col gap-2",
        isNext ? "items-end text-right" : "items-start",
      )}
    >
      <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-brand">
        {!isNext ? (
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none" />
        ) : null}
        {isNext ? "Next Project" : "Previous Project"}
        {isNext ? (
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
        ) : null}
      </span>
      <span
        className={cn(
          "text-4xl font-semibold uppercase tracking-tight transition-[color,transform] duration-300 group-hover:text-brand sm:text-6xl motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
          isNext ? "group-hover:-translate-x-2" : "group-hover:translate-x-2",
        )}
      >
        {project.name}
      </span>
    </Link>
  )
}

/** Previous / next project links at the foot of a case study. */
export function ProjectNav({
  prev,
  next,
}: {
  prev: CaseStudy | null
  next: CaseStudy | null
}) {
  if (!prev && !next) return null
  return (
    <nav
      aria-label="More projects"
      className="mx-auto mt-24 w-full max-w-6xl border-t border-border px-6 py-16"
    >
      <p className="mb-8 text-xs uppercase tracking-widest text-muted-foreground">
        More Projects
      </p>
      <div className="grid gap-12 sm:grid-cols-2">
        {prev ? <NavLink project={prev} direction="prev" /> : <span />}
        {next ? <NavLink project={next} direction="next" /> : <span />}
      </div>
    </nav>
  )
}
