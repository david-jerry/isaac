import type { Metadata } from "next"

import { getAllCaseStudies } from "@/lib/case-studies"
import { SectionMarker } from "@/components/layout/section-marker"
import { ProjectCard } from "@/components/sections/project-card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Projects — Isaac David",
  description: "Selected case studies and product design work by Isaac David.",
}

export default function ProjectsPage() {
  const projects = getAllCaseStudies()

  return (
    <section className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionMarker index="01" className="mb-12" />

      <h1 className="mb-10 text-3xl font-semibold tracking-tight sm:text-5xl">
        Selected Work<span className="text-brand">.</span>
      </h1>

      <ScrollReveal
        as="ul"
        className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <li key={project.slug} data-reveal>
            <ProjectCard project={project} />
          </li>
        ))}
      </ScrollReveal>
    </section>
  )
}
