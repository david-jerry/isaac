"use client"

import Image from "next/image"
import { useRef } from "react"

import { useProjects } from "@/hooks/use-projects"
import { gsap, useGSAP } from "@/lib/gsap"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Projects() {
  const { data: projects, isPending } = useProjects()
  const scope = useRef<HTMLDivElement>(null)

  // GSAP ScrollTrigger: cards fade/slide in as they enter the viewport.
  // useGSAP auto-reverts on unmount and re-runs when `projects` arrives.
  useGSAP(
    () => {
      if (!projects?.length) return
      gsap.from(".project-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 75%",
        },
      })
    },
    { scope, dependencies: [projects] },
  )

  return (
    <section id="work" className="mx-auto w-full max-w-5xl px-6 py-20">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Selected Work
      </p>
      <h2 className="mb-10 text-3xl font-semibold tracking-tight">
        Case studies
      </h2>

      <div ref={scope} className="grid gap-6 sm:grid-cols-2">
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-xl bg-muted"
                aria-hidden
              />
            ))
          : projects?.map((project) => (
              <Card
                key={project.id}
                className={project.image ? "project-card pt-0" : "project-card"}
              >
                {project.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? `${project.title} cover image`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </section>
  )
}
