"use client"

import { useRef } from "react"

import { gsap, useGSAP } from "@/lib/gsap"

/**
 * Animated metric figure. Counts up from zero when it scrolls into view and
 * counts back down to zero when it leaves (both scroll directions), via a GSAP
 * ScrollTrigger toggle. The visible digits are updated imperatively (no
 * per-tick React re-render); the true value is exposed once via `sr-only`, and
 * the animated span is `aria-hidden`. Static under `prefers-reduced-motion`.
 */
export function MetricCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  // Split "+27" → prefix "+", number 27, suffix "".
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/)
  const prefix = match?.[1] ?? ""
  const numeric = match?.[2] ?? "0"
  const suffix = match?.[3] ?? ""
  const target = parseFloat(numeric)
  const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0

  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = value
        return
      }

      const counter = { n: 0 }
      el.textContent = format(0)
      gsap.to(counter, {
        n: target,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(counter.n)
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      })
    },
    { scope: ref },
  )

  return (
    <span>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {format(0)}
      </span>
    </span>
  )
}
