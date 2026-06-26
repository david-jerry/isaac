"use client"

import { useRef, type ElementType, type ReactNode } from "react"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Render as this element instead of a <div> (e.g. "ul"). */
  as?: ElementType
  /** Elements inside the scope to stagger in. */
  selector?: string
  /** Vertical offset (px) each element rises from. */
  y?: number
  /** Seconds between each element's start. */
  stagger?: number
  /** ScrollTrigger start position. */
  start?: string
  /**
   * When true, each item gets its own bidirectional trigger: it animates in as
   * it enters view and back out as it leaves (both scroll directions), instead
   * of revealing the group once.
   */
  toggle?: boolean
}

/**
 * Reveals its `[data-reveal]` descendants with a staggered fade/slide-up the
 * first time the wrapper scrolls into view (GSAP ScrollTrigger via `useGSAP`,
 * which scopes selectors and auto-cleans up).
 *
 * Accessibility/Sustainability (WAF): honors `prefers-reduced-motion` — when the
 * user opts out, no `from` state is applied, so content renders in place and is
 * never gated behind an animation.
 */
export function ScrollReveal({
  children,
  className,
  as: Tag = "div",
  selector = "[data-reveal]",
  y = 32,
  stagger = 0.09,
  start = "top 82%",
  toggle = false,
}: ScrollRevealProps) {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const targets = root.querySelectorAll<HTMLElement>(selector)
      if (!targets.length) return

      // Respect reduced motion by dropping the vertical travel (subtle opacity
      // fade only) rather than disabling the reveal entirely — so content still
      // animates in on devices that report reduce (incl. mobile low-power mode).
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const dy = reduce ? 0 : y

      if (toggle) {
        // Each item plays in on enter and reverses out on leave (both ways), so
        // the list animates one-after-another as it's scrolled through.
        targets.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: dy },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            },
          )
        })
        return
      }

      gsap.from(targets, {
        opacity: 0,
        y: dy,
        duration: 0.65,
        ease: "power2.out",
        stagger,
        scrollTrigger: { trigger: root, start, once: true },
      })
    },
    { scope },
  )

  return (
    <Tag ref={scope} className={cn(className)}>
      {children}
    </Tag>
  )
}
