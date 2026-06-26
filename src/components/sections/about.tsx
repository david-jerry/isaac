import Image from "next/image"

import { aboutParagraphs, brands, experience } from "@/data/about"
import { SectionMarker } from "@/components/layout/section-marker"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionMarker index="01" className="mb-12" />

      <h1 className="max-w-2xl text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
        Having Fun While Impacting The World
        <span className="text-brand">.</span>
      </h1>

      {/* Intro: gradient panel with Isaac (cutout PNG) seated in the middle. */}
      <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-xl bg-[radial-gradient(ellipse_70%_95%_at_50%_22%,#2b2b2b_0%,#191919_48%,#0f0f0f_100%)] sm:aspect-[16/8] md:aspect-[16/6]">
        <Image
          src="/about/isaac.png"
          alt="Isaac David"
          fill
          priority
          sizes="(min-width: 1152px) 1100px, 100vw"
          className="object-contain object-bottom"
        />
      </div>

      {/* Bio + team photo: side-by-side on desktop, stacked on mobile. */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg font-semibold">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted md:order-last">
          <Image
            src="/about/hello-image.jpg"
            alt="Isaac collaborating with his team"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Brands — wrapping name list with brand-square separators, right column. */}
      <div className="mt-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Brands I&apos;ve Worked With<span className="text-brand">.</span>
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="hidden md:block" />
          <ScrollReveal
            as="ul"
            stagger={0.04}
            className="flex flex-wrap items-center gap-x-3 gap-y-2.5 border-t border-border pt-8 text-lg sm:text-xl"
          >
            {brands.map((brand, i) => (
              <li
                key={`${brand}-${i}`}
                data-reveal
                className="flex items-center gap-3"
              >
                <span>{brand}</span>
                {i < brands.length - 1 ? (
                  <span aria-hidden="true" className="size-1.5 bg-brand" />
                ) : null}
              </li>
            ))}
          </ScrollReveal>
        </div>
      </div>

      {/* Work Experience — period label + full-width divider, roles in right column. */}
      <div className="mt-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Work Experience<span className="text-brand">.</span>
        </h2>
        <div className="mt-12 space-y-14">
          {experience.map((group) => (
            <div key={group.period}>
              <p className="border-b border-border pb-3 text-base font-medium sm:text-lg">
                {group.period}
                <span className="text-brand">.</span>
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="hidden md:block" />
                <ScrollReveal stagger={0.1}>
                  {group.roles.map((entry) => (
                    <div
                      key={entry.company}
                      data-reveal
                      className="border-b border-border py-5 first:pt-0"
                    >
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {entry.company}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {entry.role}
                      </p>
                    </div>
                  ))}
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
