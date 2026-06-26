import type { MetadataRoute } from "next"

import { getAllCaseStudies } from "@/lib/case-studies"
import { siteUrl } from "@/lib/site"
import { games } from "@/data/games"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ["", "/projects", "/about", "/play", "/contact"]

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }))

  const projects: MetadataRoute.Sitemap = getAllCaseStudies().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const playables: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${siteUrl}/play/${game.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }))

  return [...pages, ...projects, ...playables]
}
