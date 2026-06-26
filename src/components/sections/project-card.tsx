import Image from "next/image"
import Link from "next/link"

import type { CaseStudy } from "@/lib/case-studies"
import { Placeholder } from "@/components/ui/placeholder"

/** Project tile used on the landing, About, and Projects pages. */
export function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted">
        {project.heroImage ? (
          <Image
            src={project.heroImage}
            alt={project.imageAlt ?? `${project.name} cover image`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <Placeholder label={project.name} className="h-full w-full" />
        )}

        {/* Hover reveal: write-up + tags slide up from the bottom over a
            dimming gradient that keeps the text legible. */}
        <div className="absolute inset-x-0 bottom-0 translate-y-4 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-5 pt-14 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <p className="text-sm leading-relaxed text-white/90">
            {project.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
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
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="font-medium transition-colors group-hover:text-brand">
          {project.name}
        </h3>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          {project.category}
        </span>
      </div>
    </Link>
  )
}
