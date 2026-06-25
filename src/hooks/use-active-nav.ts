"use client"

import { usePathname } from "next/navigation"

import { navLinks } from "@/data/nav"

/**
 * Returns the href of the nav link matching the current route (e.g. `"/about"`),
 * or `null` when no nav item owns the current path (e.g. the home page). Matches
 * the route exactly or any nested path under it (`/projects/slug` → `/projects`).
 * Client-only (reads `usePathname`).
 */
export function useActiveNav(): string | null {
  const pathname = usePathname()

  const match = navLinks.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  )

  return match?.href ?? null
}
