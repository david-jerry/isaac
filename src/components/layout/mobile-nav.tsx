"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { gsap } from "@/lib/gsap"
import { navLinks } from "@/data/nav"
import { profile } from "@/data/profile"
import { useActiveNav } from "@/hooks/use-active-nav"

const CLOSED_CLIP = "inset(0% 0% 100% 0%)"
const OPEN_CLIP = "inset(0% 0% 0% 0%)"

const emptySubscribe = () => () => {}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const active = useActiveNav()

  // `false` during SSR + hydration, `true` once on the client — gates the portal
  // without a setState-in-effect and avoids a hydration mismatch.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  const overlayRef = useRef<HTMLDivElement>(null)

  // Animate the overlay open/closed whenever `open` changes (and re-run once the
  // portal mounts or the motion preference changes). A fresh timeline per toggle
  // — driven imperatively with explicit `fromTo`s — avoids the first-tap desync
  // the persistent paused-timeline + play/reverse approach suffered from (the
  // timeline got reverted by portal-mount / reduced-motion re-renders).
  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    const d = reduce ? 0 : 1
    const lines = el.querySelectorAll<HTMLElement>(".nav-line")
    const meta = el.querySelectorAll<HTMLElement>(".nav-meta")

    const tl = gsap.timeline()
    if (open) {
      tl.to(el, {
        clipPath: OPEN_CLIP,
        duration: 0.6 * d,
        ease: "power4.inOut",
      })
        .fromTo(
          lines,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6 * d,
            stagger: reduce ? 0 : 0.08,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          meta,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5 * d,
            stagger: reduce ? 0 : 0.06,
            ease: "power2.out",
          },
          "-=0.35",
        )
    } else {
      tl.to(el, {
        clipPath: CLOSED_CLIP,
        duration: 0.5 * d,
        ease: "power4.inOut",
      })
    }

    return () => {
      tl.kill()
    }
  }, [open, mounted, reduce])

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const barTransition = { duration: reduce ? 0 : 0.3, ease: "easeInOut" } as const

  const overlay = (
    <div
      ref={overlayRef}
      id="mobile-nav"
      inert={!open}
      aria-hidden={!open}
      style={{ clipPath: CLOSED_CLIP }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      <div className="flex flex-1 flex-col justify-center px-8">
        <nav aria-label="Mobile">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href} className="overflow-hidden py-1">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "nav-line block text-5xl font-semibold uppercase tracking-tight transition-colors sm:text-6xl",
                      isActive
                        ? "text-brand line-through decoration-2"
                        : "text-foreground hover:text-brand",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Email + social links (from the footer, Image #2). */}
      <div className="border-t border-border/60 px-8 py-8">
        <a
          href={`mailto:${profile.email}`}
          className="nav-meta mb-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-brand">
            Send a message
          </span>
          {profile.email}
        </a>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {profile.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-meta group inline-flex items-center gap-1 text-base text-foreground transition-colors hover:text-brand"
              >
                <ArrowUpRight className="size-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-[60] inline-flex size-10 items-center justify-center rounded-md text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Two bars that morph between hamburger and X (continuous, no swap). */}
        <span className="relative flex h-6 w-6 flex-col items-center justify-center gap-[5px]">
          <motion.span
            className="block h-[1.5px] w-5 rounded-full bg-current"
            initial={false}
            animate={open ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
            transition={barTransition}
          />
          <motion.span
            className="block h-[1.5px] w-5 rounded-full bg-current"
            initial={false}
            animate={open ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
            transition={barTransition}
          />
        </span>
      </button>

      {mounted && createPortal(overlay, document.body)}
    </div>
  )
}
