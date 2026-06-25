import Image from "next/image"

import { areasOfWork } from "@/data/areas"
import { SectionMarker } from "@/components/layout/section-marker"
import { Placeholder } from "@/components/ui/placeholder"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function AreasOfWork() {
  return (
    <section
      id="areas"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20"
    >
      <SectionMarker index="05" className="mb-12" />

      <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Areas of Work
      </h2>

      <ScrollReveal
        as="ul"
        className="flex flex-wrap items-center gap-x-4 gap-y-4"
      >
        {areasOfWork.map((area) => (
          <li key={area.label} data-reveal className="flex items-center gap-4">
            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {area.label}
            </span>
            <span className="relative h-9 w-16 shrink-0 overflow-hidden rounded-md bg-muted sm:h-10 sm:w-20">
              {area.image ? (
                <Image
                  src={area.image}
                  alt={`${area.label} work sample`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <Placeholder className="h-full w-full" />
              )}
            </span>
          </li>
        ))}
      </ScrollReveal>
    </section>
  )
}
