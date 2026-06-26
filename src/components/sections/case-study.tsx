import Image from "next/image"
import {
  Boxes,
  Brain,
  Gauge,
  Users,
  type LucideIcon,
} from "lucide-react"

import type { CaseStudy, CaseStudySection } from "@/lib/case-studies"
import { cn } from "@/lib/utils"
import { Placeholder } from "@/components/ui/placeholder"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const ICONS: Record<string, LucideIcon> = { Brain, Gauge, Users, Boxes }

function Pills({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function SectionLabel({
  kicker,
  accent,
  big = false,
}: {
  kicker?: string
  accent?: string
  big?: boolean
}) {
  return (
    <div>
      {kicker ? (
        <span
          className={cn(
            big
              ? "block text-3xl font-semibold tracking-tight sm:text-4xl"
              : "block text-sm text-muted-foreground",
          )}
        >
          {kicker}
        </span>
      ) : null}
      {accent ? (
        <span className="block text-3xl font-semibold italic tracking-tight sm:text-4xl">
          {accent}
          <span className="text-brand">.</span>
        </span>
      ) : null}
    </div>
  )
}

function Body({ body, note }: { body?: string[]; note?: string }) {
  return (
    <>
      {body?.map((p, i) => (
        <p
          key={i}
          className="mt-4 text-sm leading-relaxed text-muted-foreground first:mt-0"
        >
          {p}
        </p>
      ))}
      {note ? (
        <p className="mt-5 text-sm italic leading-relaxed text-muted-foreground/80">
          {note}
        </p>
      ) : null}
    </>
  )
}

function Media({
  src,
  alt,
  label,
  className,
  priority,
}: {
  src?: string
  alt?: string
  label?: string
  className?: string
  priority?: boolean
}) {
  // Only render local `/public` paths — never an unvalidated stored value.
  const safeSrc = src && /^\/[\w\-./]*$/.test(src) ? src : undefined
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-muted",
        className,
      )}
    >
      {safeSrc ? (
        <Image
          src={safeSrc}
          alt={alt ?? ""}
          fill
          priority={priority}
          sizes="(min-width: 1152px) 1100px, 100vw"
          className="object-cover"
        />
      ) : (
        <Placeholder label={label} className="h-full w-full" />
      )}
    </div>
  )
}

/** Two-column "label | heading + body" block used across the case study. */
function SplitSection({
  section,
  big,
}: {
  section: CaseStudySection
  big?: boolean
}) {
  return (
    <ScrollReveal className="grid gap-8 md:grid-cols-2 md:gap-12">
      <div data-reveal>
        <SectionLabel kicker={section.kicker} accent={section.accent} big={big} />
        <div className="mt-6">
          <Pills tags={section.tags} />
        </div>
      </div>
      <div data-reveal>
        {section.heading ? (
          <h3 className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            {section.heading}
          </h3>
        ) : null}
        <div className="mt-5">
          <Body body={section.body} note={section.note} />
        </div>
      </div>
    </ScrollReveal>
  )
}

export function CaseStudyView({ project }: { project: CaseStudy }) {
  const marquee = `Meet ${project.name}`

  return (
    <article className="w-full pb-24">
      {/* Hero */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted sm:aspect-[16/8] md:aspect-[2/1]">
          <Media
            src={project.heroImage}
            alt={project.imageAlt ?? project.name}
            label={project.name}
            priority
            className="h-full rounded-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-6 overflow-hidden"
          >
            <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
              {[0, 1].map((k) => (
                <span
                  key={k}
                  className="px-6 text-4xl font-bold uppercase tracking-tight text-white/20 sm:text-6xl"
                >
                  {marquee} ·&nbsp;{marquee} ·&nbsp;
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Title + meta */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6">
        <ScrollReveal>
          <div data-reveal>
            <Pills tags={project.tags} />
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
            <h1
              data-reveal
              className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
            >
              {project.headline?.lead}
              {project.headline?.accent ? (
                <>
                  <br />
                  <span className="italic">{project.headline.accent}</span>
                </>
              ) : null}
              {project.headline?.tail ? (
                <>
                  <br />
                  {project.headline.tail}
                </>
              ) : null}
              <span className="text-brand">.</span>
            </h1>
            <div data-reveal>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              {project.meta ? (
                <dl className="mt-8 space-y-1.5 text-sm">
                  {project.meta.role ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Role —</dt>
                      <dd>{project.meta.role}</dd>
                    </div>
                  ) : null}
                  {project.meta.team ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Team —</dt>
                      <dd>{project.meta.team}</dd>
                    </div>
                  ) : null}
                  {project.meta.impact?.length ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Impact —</dt>
                      <dd>{project.meta.impact.join(" · ")}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
            </div>
          </div>
        </ScrollReveal>

        {project.contribution ? (
          <ScrollReveal className="mt-16 border-t border-border pt-6">
            <p data-reveal className="text-sm text-muted-foreground">
              My contribution.
            </p>
            <p
              data-reveal
              className="mt-6 max-w-3xl text-lg italic leading-relaxed text-muted-foreground"
            >
              {project.contribution}
            </p>
          </ScrollReveal>
        ) : null}
      </section>

      {/* Problem */}
      {project.problem ? (
        <section className="mx-auto mt-20 w-full max-w-6xl px-6">
          <Media label="Laptop" className="mb-16 aspect-[16/9]" />
          <SplitSection section={project.problem} />
        </section>
      ) : null}

      {/* Process */}
      {project.process?.length ? (
        <section className="mx-auto mt-24 w-full max-w-6xl space-y-20 px-6">
          <Media label="Dashboard overview" className="aspect-[16/9]" />
          {project.process.map((step, i) => (
            <ScrollReveal
              key={i}
              className="grid gap-8 md:grid-cols-2 md:gap-12"
            >
              <div data-reveal>
                <SectionLabel kicker={step.kicker} accent={step.accent} big />
                <Image
                  src="/landing_page/process/process.svg"
                  alt=""
                  width={983}
                  height={207}
                  unoptimized
                  className="mt-6 h-auto w-44 opacity-70"
                />
                <div className="mt-5">
                  <Pills tags={step.tags} />
                </div>
              </div>
              <div data-reveal>
                <h3 className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                  {step.heading}
                </h3>
                <div className="mt-5">
                  <Body body={step.body} note={step.note} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>
      ) : null}

      {/* Key decision */}
      {project.keyDecision ? (
        <section className="mx-auto mt-20 w-full max-w-6xl border-t border-border px-6 pt-6">
          <p className="text-sm text-muted-foreground">Key decision.</p>
          <p className="mt-6 max-w-4xl text-xl italic leading-relaxed text-muted-foreground sm:text-2xl">
            &ldquo;{project.keyDecision}&rdquo;
          </p>
        </section>
      ) : null}

      {/* Strategy */}
      {project.strategy ? (
        <section className="mx-auto mt-20 w-full max-w-6xl px-6">
          <SplitSection section={project.strategy} />
        </section>
      ) : null}

      {/* Gallery: old vs new */}
      {project.gallery ? (
        <section className="mx-auto mt-20 w-full max-w-6xl space-y-12 px-6">
          {(["old", "new"] as const).map((key) => {
            const items = project.gallery?.[key]?.length
              ? project.gallery[key]!
              : [undefined, undefined]
            return (
              <ScrollReveal key={key}>
                <p
                  data-reveal
                  className="mb-6 text-center text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {key === "old" ? "Old Design" : "New Design"}
                </p>
                <div data-reveal className="grid gap-6 sm:grid-cols-2">
                  {items.map((src, i) => (
                    <Media
                      key={i}
                      src={src}
                      label={`${key === "old" ? "Old" : "New"} design`}
                      className="aspect-[4/3]"
                    />
                  ))}
                </div>
              </ScrollReveal>
            )
          })}
        </section>
      ) : null}

      {/* Navigation system */}
      {project.navigation ? (
        <section className="mx-auto mt-24 w-full max-w-6xl px-6">
          <SplitSection section={project.navigation} />
          <ScrollReveal className="mt-12">
            <div data-reveal>
              <Media label="Navigation header" className="aspect-[16/7]" />
            </div>
          </ScrollReveal>
        </section>
      ) : null}

      {/* Systems */}
      {project.systems ? (
        <section className="mx-auto mt-24 w-full max-w-6xl px-6">
          <SplitSection section={project.systems} />
          <ScrollReveal className="mt-12">
            <div data-reveal>
              <Media label="Component / Today widget" className="aspect-[16/7]" />
            </div>
          </ScrollReveal>
        </section>
      ) : null}

      {/* Audiences */}
      {project.audiences?.length ? (
        <section className="mx-auto mt-24 w-full max-w-6xl px-6">
          <ScrollReveal as="ul" className="border-t border-border">
            {project.audiences.map((audience, i) => (
              <li
                key={audience.label}
                data-reveal
                className={cn(
                  "flex items-center gap-6 border-b border-border py-6",
                  i % 2 === 1 && "flex-row-reverse",
                )}
              >
                <Media
                  src={audience.image}
                  label={audience.label}
                  className="aspect-video w-32 shrink-0 sm:w-44"
                />
                <span className="text-4xl font-medium tracking-tight sm:text-6xl">
                  {audience.label}
                  <span className="text-brand">.</span>
                </span>
              </li>
            ))}
          </ScrollReveal>
        </section>
      ) : null}

      {/* Impact */}
      {project.impact ? (
        <section className="mx-auto mt-24 w-full max-w-6xl px-6">
          <SplitSection section={project.impact} />
          {project.impact.cards?.length ? (
            <ScrollReveal className="mt-12 grid gap-6 sm:grid-cols-2">
              {project.impact.cards.map((card) => {
                const Icon = ICONS[card.icon] ?? Boxes
                return (
                  <div
                    key={card.title}
                    data-reveal
                    className="rounded-xl border border-border p-6"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                      <h4 className="text-base font-medium italic text-foreground">
                        {card.title}
                      </h4>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                  </div>
                )
              })}
            </ScrollReveal>
          ) : null}
          <ScrollReveal className="mt-12">
            <div data-reveal>
              <Media label="Final dashboard" className="aspect-[16/10]" />
            </div>
          </ScrollReveal>
        </section>
      ) : null}

      {/* Closing */}
      {project.closing ? (
        <section className="mx-auto mt-20 w-full max-w-6xl px-6">
          <ScrollReveal>
            {project.closing.quote ? (
              <p
                data-reveal
                className="mx-auto max-w-3xl text-center text-xl italic leading-relaxed text-muted-foreground sm:text-2xl"
              >
                &ldquo;{project.closing.quote}&rdquo;
              </p>
            ) : null}
            {project.closing.body ? (
              <p
                data-reveal
                className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground/80"
              >
                {project.closing.body}
              </p>
            ) : null}
            <h2
              data-reveal
              className="mt-16 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
            >
              {project.closing.lead}{" "}
              {project.closing.accent ? (
                <span className="italic">{project.closing.accent}</span>
              ) : null}{" "}
              {project.closing.tail}
              <span className="text-brand">.</span>
            </h2>
            {project.closing.url ? (
              <a
                data-reveal
                href={project.closing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-brand"
              >
                {project.closing.linkLabel ?? "Visit site"}
                <span aria-hidden className="text-brand">↗</span>
              </a>
            ) : null}
          </ScrollReveal>
        </section>
      ) : null}
    </article>
  )
}
