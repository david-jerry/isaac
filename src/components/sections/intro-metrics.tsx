import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { profile } from "@/data/profile"
import { SectionMarker } from "@/components/layout/section-marker"
import { MetricCounter } from "@/components/sections/metric-counter"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function IntroMetrics() {
  return (
    <section
      id="intro"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20"
    >
      <SectionMarker index="02" className="mb-16" />

      <ScrollReveal>
        <div data-reveal className="max-w-3xl">
          <p className="text-pretty text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            {profile.intro}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Learn more
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <dl className="mt-20 grid gap-12 sm:grid-cols-2 sm:gap-8">
          {profile.metrics.map((metric) => (
            <div key={metric.label} data-reveal>
              <dt className="sr-only">{metric.label}</dt>
              <dd className="text-5xl font-medium tracking-tight sm:text-6xl">
                <MetricCounter value={metric.value} />
              </dd>
              <p
                aria-hidden
                className="mt-3 text-xs uppercase tracking-widest text-muted-foreground"
              >
                {metric.label}
              </p>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </section>
  )
}
