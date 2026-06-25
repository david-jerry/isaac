"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

/**
 * Route-level enter/exit transitions (Operational Excellence — WAF). Keying an
 * `AnimatePresence` on the pathname lets the outgoing page animate out before
 * the incoming one animates in (`mode="wait"`), so navigations — e.g. leaving
 * the contact page — feel intentional rather than abrupt.
 *
 * `initial={false}` skips the very first paint so per-page entrance animations
 * (hero, contact) aren't doubled on first load. Honors `prefers-reduced-motion`.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
