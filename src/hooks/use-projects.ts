"use client"

import { useQuery } from "@tanstack/react-query"

import { projects } from "@/data/projects"
import type { Project } from "@/types/portfolio"

/** Centralized query keys — keep all keys here for cache invalidation safety. */
export const queryKeys = {
  projects: ["projects"] as const,
}

/**
 * Returns portfolio projects via TanStack Query.
 *
 * Today the queryFn resolves local static data; swap the body for a real
 * `fetch`/API call later and every consumer keeps working unchanged.
 */
async function fetchProjects(): Promise<Project[]> {
  return projects
}

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: fetchProjects,
  })
}
