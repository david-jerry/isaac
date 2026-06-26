import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { getAllCaseStudies } from "@/lib/case-studies"
import { SectionMarker } from "@/components/layout/section-marker"
import { ProjectCard } from "@/components/sections/project-card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function FeaturedProjects() {
  const featured = getAllCaseStudies().filter((project) => project.featured)

  return (
    <section
      id="work"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20"
    >
      <SectionMarker index="03" className="mb-16" />

      <div className="mb-10 flex items-end justify-between gap-4">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Featured Projects<span className="text-brand">.</span>
        </h2>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          See all
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      <ScrollReveal
        as="ul"
        className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {featured.map((project) => (
          <li key={project.slug} data-reveal>
            <ProjectCard project={project} />
          </li>
        ))}
      </ScrollReveal>
    </section>
  )
}
