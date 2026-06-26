import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { games } from "@/data/games"
import { SectionMarker } from "@/components/layout/section-marker"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Play",
  description: "Bored of reading? A couple of small games to play in the margins.",
  alternates: { canonical: "/play" },
}

export default function PlayPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionMarker index="01" className="mb-12" />

      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
        Bored of reading? Play<span className="text-brand">.</span>
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        A couple of quick games for when you need a break between case studies.
      </p>

      <ScrollReveal as="ul" className="mt-12 grid gap-6 sm:grid-cols-2">
        {games.map((game) => (
          <li key={game.slug} data-reveal>
            <Link
              href={`/play/${game.slug}`}
              className="group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/50"
            >
              <div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {game.category}
                </span>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-brand">
                  {game.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {game.tagline}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Play
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </Link>
          </li>
        ))}
      </ScrollReveal>
    </section>
  )
}
