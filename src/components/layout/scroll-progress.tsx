"use client"

import { useCallback, useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

/** Scroll past this many pixels before the control docks in. */
const REVEAL_AFTER = 320
const RADIUS = 22
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Floating scroll control (Operational Excellence / Accessibility — WAF).
 *
 * Lives in the root layout, so it appears on every page. It stays hidden at the
 * top of the page; once the reader scrolls down it docks to the bottom-right as
 * a circular progress ring that fills as they near the end of the page. Clicking
 * scrolls smoothly back to the top (honoring `prefers-reduced-motion`).
 *
 * On the landing page this is the destination of the hero's scroll cue — the cue
 * fades out and this control fades in, so the affordance reads as relocating.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const y = window.scrollY
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0)
      setVisible(y > REVEAL_AFTER)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }, [])

  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={`Back to top — ${Math.round(progress * 100)}% of the page read`}
      data-visible={visible}
      className={cn(
        "group fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full",
        "bg-background/80 text-foreground shadow-lg ring-1 ring-border backdrop-blur-sm",
        "transition-[opacity,transform] duration-500 ease-out",
        "hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg
        className="absolute inset-0 size-full -rotate-90"
        viewBox="0 0 56 56"
        aria-hidden
      >
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          className="fill-none stroke-border"
          strokeWidth="2"
        />
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          className="fill-none stroke-brand transition-[stroke-dashoffset] duration-150 ease-linear"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  )
}
