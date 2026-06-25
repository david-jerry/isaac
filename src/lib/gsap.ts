"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/**
 * Single configured GSAP entrypoint for the app.
 *
 * Performance/Sustainability (WAF): plugins are registered once, guarded for
 * SSR. Prefer the `useGSAP()` hook in components — it scopes selectors and
 * auto-reverts (kills tweens/ScrollTriggers) on unmount, preventing leaks.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

export { gsap, ScrollTrigger, useGSAP }
