import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { projects } from "@/data/projects"
import { SectionMarker } from "@/components/layout/section-marker"
import { Placeholder } from "@/components/ui/placeholder"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const featured = projects.filter((project) => project.featured)

export function FeaturedProjects() {
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
          <li key={project.id} data-reveal>
            <Link href="/projects" className="group block">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? `${project.title} cover image`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                ) : (
                  <Placeholder label={project.title} className="h-full w-full" />
                )}

                {/* Hover reveal: write-up + tags on the right over a dimming
                    gradient that keeps the text legible. */}
                <div className="absolute inset-0 flex items-center justify-end bg-gradient-to-l from-black/85 via-black/45 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none">
                  <div className="max-w-[70%] text-right">
                    <p className="text-sm leading-relaxed text-white/90">
                      {project.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap justify-end gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/25 px-2 py-0.5 text-[11px] text-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <h3 className="font-medium transition-colors group-hover:text-brand">
                  {project.title}
                </h3>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {project.category}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ScrollReveal>
    </section>
  )
}
