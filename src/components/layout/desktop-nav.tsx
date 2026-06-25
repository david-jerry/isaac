"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { navLinks } from "@/data/nav"
import { useActiveNav } from "@/hooks/use-active-nav"

/** Desktop nav links — animated strikethrough on hover/focus, held open when
 *  the link's route is active (Image #1). */
export function DesktopNav() {
  const active = useActiveNav()

  return (
    <ul className="hidden items-center gap-10 md:flex">
      {navLinks.map((link) => {
        const isActive = active === link.href
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative inline-flex py-1 text-xs font-medium uppercase tracking-[0.2em] outline-none transition-colors hover:text-foreground focus-visible:text-foreground",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {link.label}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute left-0 top-1/2 h-px w-full origin-left -translate-y-1/2 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
