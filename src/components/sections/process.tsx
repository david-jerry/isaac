import Image from "next/image"

import { processSteps } from "@/data/process"
import { SectionMarker } from "@/components/layout/section-marker"
import { ProcessLottie } from "@/components/sections/process-lottie"
import { Placeholder } from "@/components/ui/placeholder"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Process() {
  return (
    <section
      id="process"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20"
    >
      <SectionMarker index="04" className="mb-16" />

      <h2 className="mb-12 text-3xl font-semibold tracking-tight sm:text-4xl">
        Explore, Create, Refine<span className="text-brand">.</span>
      </h2>

      <ScrollReveal toggle>
        {processSteps.map((step) => (
          <div key={step.id} data-reveal className="pb-16">
            <p className="border-b border-border pb-3 text-sm text-muted-foreground">
              {step.label}.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="hidden md:block" />
              <div>
                {/* Lottie sits on top of the description. */}
                <div className="mb-6 flex h-28 justify-start">
                  {step.lottie ? (
                    <ProcessLottie
                      src={step.lottie}
                      label={`${step.label} illustration`}
                      className="w-44"
                    />
                  ) : (
                    <Placeholder
                      label={step.label}
                      className="aspect-[3/2] h-full rounded-md"
                    />
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </ScrollReveal>

      {/* "Cut the noise" process line */}
      <ScrollReveal className="mt-12 text-center">
        <h3 data-reveal className="text-xl font-medium tracking-tight sm:text-2xl">
          My process is simple.... <span className="font-semibold">CUT THE NOISE</span>
        </h3>

        <div data-reveal className="mx-auto mt-10 w-full max-w-3xl">
          <Image
            src="/landing_page/process/process.svg"
            alt="Process line: from a tangle of ideas to a clear, directed arrow."
            width={983}
            height={207}
            unoptimized
            className="h-auto w-full"
            priority={false}
          />
          {/* <ol className="mt-4 flex justify-between gap-2">
            {processPhases.map((phase) => (
              <li
                key={phase.title}
                className="flex flex-1 flex-col items-center text-center"
              >
                <span className="text-sm font-medium">{phase.title}</span>
                <span className="text-xs text-muted-foreground">
                  {phase.subtitle}
                </span>
              </li>
            ))}
          </ol> */}
        </div>
      </ScrollReveal>
    </section>
  )
}
