"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { ArrowDown, ArrowUpRight } from "lucide-react"

import { profile } from "@/data/profile"
import { gsap, useGSAP } from "@/lib/gsap"

// Three.js is heavy + client-only: code-split it so it never touches SSR/the
// initial bundle (Performance Efficiency — WAF).
const HeroBackground = dynamic(() => import("./hero-background"), {
  ssr: false,
})

export function Hero() {
  const reduce = useReducedMotion()
  const scope = useRef<HTMLElement>(null)
  const phraseRef = useRef<HTMLSpanElement>(null)

  // Sustainability/Accessibility (WAF): honor prefers-reduced-motion.
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 },
    },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  // GSAP typewriter: cycle the second line through `profile.heroPhrases`,
  // typing each in, holding, then deleting before the next. The visible text is
  // updated imperatively (no per-character React re-render); the accessible
  // heading is the stable `sr-only` text below, so this stays purely decorative.
  useGSAP(
    () => {
      const el = phraseRef.current
      if (!el) return

      const phrases = profile.heroPhrases

      const render = (phrase: string, count: number) => {
        el.textContent = phrase.slice(0, Math.round(count))
      }

      const tl = gsap.timeline({ repeat: -1 })
      phrases.forEach((phrase) => {
        const cursor = { count: 0 }
        tl.to(cursor, {
          count: phrase.length,
          duration: phrase.length * 0.08,
          ease: "none",
          onUpdate: () => render(phrase, cursor.count),
        })
        tl.to(cursor, { count: phrase.length, duration: 1.4 }) // hold
        tl.to(cursor, {
          count: 0,
          duration: phrase.length * 0.04,
          ease: "none",
          onUpdate: () => render(phrase, cursor.count),
        })
        tl.to(cursor, { count: 0, duration: 0.25 }) // pause before next
      })
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col items-center justify-center overflow-hidden px-6"
    >
      <HeroBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.h1
          variants={item}
          className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-4xl font-bold leading-[0.95] tracking-tight text-transparent sm:text-6xl md:text-8xl"
        >
          <span className="sr-only">
            Hi there, I am {profile.name.split(" ")[0]} — {profile.role}.
          </span>
          <span aria-hidden="true">
            Hi there
            <br />
            <span className="inline-flex items-center justify-center whitespace-nowrap">
              <span ref={phraseRef} />
              <span className="ml-1.5 inline-block h-[0.78em] w-2 shrink-0 animate-caret bg-brand sm:ml-2 sm:w-3" />
            </span>
          </span>
        </motion.h1>
      </motion.div>

      {/* Scroll cue pinned to the bottom of the hero, so it never shifts as the
          typewriter text changes width/height mid-animation. */}
      <div className="animate-bounce pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <motion.a
          variants={item}
          initial="hidden"
          animate="show"
          href="#intro"
          aria-label="Scroll to content"
          className="pointer-events-auto grid size-12 place-items-center rounded-full border border-border bg-background/40 text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-color ease-in-out duration-300"
        >
          <motion.span
            animate={reduce ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-5" />
          </motion.span>
        </motion.a>
      </div>

      <motion.p
        variants={item}
        initial="hidden"
        animate="show"
        className="absolute top-6 md:top-auto md:bottom-6 right-6 z-10 max-w-[15rem] text-right text-sm leading-relaxed text-muted-foreground"
      >
        Designing stuff since{" "}
        <span className="text-foreground">{profile.since}</span>. Currently,{" "}
        <span className="text-foreground">{profile.current.role}</span> at{" "}
        {profile.current.href ? (
          <a
            href={profile.current.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            {profile.current.company}
            <ArrowUpRight className="size-3.5" />
          </a>
        ) : (
          <span className="text-foreground">{profile.current.company}</span>
        )}
      </motion.p>
    </section>
  )
}
