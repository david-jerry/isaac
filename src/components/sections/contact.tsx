"use client"

import { useRef } from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { Phone } from "lucide-react"

import { profile } from "@/data/profile"
import { contactReasons } from "@/data/contact"
import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Contact() {
  const reduce = useReducedMotion()
  const scope = useRef<HTMLElement>(null)

  // Sustainability/Accessibility (WAF): honor prefers-reduced-motion.
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.05 },
    },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  // GSAP per-character cascade on the email — fires after the heading/list
  // settle so the reader's eye lands on the address last. The full address is
  // exposed once via `sr-only`; the animated glyphs are decorative/aria-hidden.
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const chars = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-char]"),
      )
      if (!chars.length) return

      // Under reduced motion, keep the staggered fade but drop the vertical
      // travel + overshoot so the email still animates in without movement.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      gsap
        .timeline({ delay: 0.6 })
        .fromTo(
          chars,
          { opacity: 0, yPercent: reduce ? 0 : 90 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.5,
            ease: reduce ? "power1.out" : "back.out(2)",
            stagger: 0.03,
          },
        )
    },
    { scope },
  )

  const chars = [...profile.email]
  const dotIndex = profile.email.lastIndexOf(".")
  const whatsappLink = `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`

  return (
    <motion.section
      ref={scope}
      id="contact"
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col justify-center gap-12 px-6 py-20 sm:gap-16"
    >
      <div>
        <motion.h1
          variants={item}
          className="text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Let&apos;s Create
          <br />
          Magic Together
          <span
            aria-hidden="true"
            className="ml-1 inline-block size-2.5 bg-brand align-baseline sm:size-3"
          />
        </motion.h1>

        <motion.ul
          variants={item}
          className="mt-8 space-y-1.5 text-muted-foreground sm:text-lg"
        >
          {contactReasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </motion.ul>
      </div>

      <a
        href={`mailto:${profile.email}`}
        aria-label={`Email ${profile.email}`}
        className="email-attention block text-center text-[clamp(1.5rem,6vw,4.5rem)] font-medium tracking-tight transition-colors hover:text-brand"
      >
        <span className="sr-only">{profile.email}</span>
        <span
          aria-hidden="true"
          className="inline-flex flex-wrap justify-center"
        >
          {chars.map((ch, i) => (
            <span
              key={i}
              data-char
              className={cn("inline-block", i === dotIndex && "text-brand")}
            >
              {ch}
            </span>
          ))}
        </span>
      </a>

      <motion.div variants={item} className="flex justify-center">
        <Button asChild size="lg" variant="outline">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Phone className="size-4" />
            Call on WhatsApp
          </a>
        </Button>
      </motion.div>
    </motion.section>
  )
}
