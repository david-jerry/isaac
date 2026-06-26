import fs from "node:fs"
import path from "node:path"

import { load } from "js-yaml"

/**
 * Markdown-backed project store. Each project is one file in `content/projects/`
 * (`<slug>.md`); editing that file's frontmatter is all that's needed to update
 * a case study — the loader, list, detail page, and prev/next nav all read from
 * here (single source of truth). Read at build time in Server Components only.
 */

const DIR = path.join(process.cwd(), "content", "projects")

/** Parse the leading `---` YAML frontmatter block; ignores the markdown body. */
function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = /^---\s*\n([\s\S]*?)\n---/.exec(raw)
  if (!match) return {}
  const data = load(match[1])
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {}
}

export interface CaseStudySection {
  /** Small left-column label, e.g. "Discovery" or "Strategy /". */
  kicker?: string
  /** Italic accent word/phrase rendered after the kicker, e.g. "& Research". */
  accent?: string
  /** Right-column heading. */
  heading?: string
  /** Body paragraphs. */
  body?: string[]
  /** Optional pill tags. */
  tags?: string[]
  /** Optional emphasised note paragraph. */
  note?: string
  /** Optional image path under `/public`. */
  image?: string
}

export interface ImpactCard {
  icon: string
  title: string
  body: string
}

export interface CaseStudy {
  slug: string
  name: string
  order: number
  category: string
  year: string
  url?: string
  featured?: boolean
  tags: string[]
  summary: string
  heroImage?: string
  imageAlt?: string
  /** Split title, e.g. lead "Revolutionizing" / accent "Escrow" / tail "As A Service". */
  headline?: { lead?: string; accent?: string; tail?: string }
  meta?: { role?: string; team?: string; impact?: string[] }
  contribution?: string
  problem?: CaseStudySection
  process?: CaseStudySection[]
  keyDecision?: string
  strategy?: CaseStudySection
  gallery?: { old?: string[]; new?: string[] }
  navigation?: CaseStudySection
  systems?: CaseStudySection
  audiences?: { label: string; image?: string }[]
  impact?: CaseStudySection & { cards?: ImpactCard[] }
  closing?: {
    quote?: string
    body?: string
    lead?: string
    accent?: string
    tail?: string
    linkLabel?: string
    url?: string
  }
}

export function getAllCaseStudies(): CaseStudy[] {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const raw = fs.readFileSync(path.join(DIR, file), "utf8")
      const data = parseFrontmatter(raw)
      return { slug, ...(data as Omit<CaseStudy, "slug">) }
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getCaseStudy(slug: string): CaseStudy | null {
  return getAllCaseStudies().find((c) => c.slug === slug) ?? null
}

/** Previous/next by `order`, wrapping the list so navigation is always available. */
export function getAdjacentCaseStudies(slug: string) {
  const all = getAllCaseStudies()
  const index = all.findIndex((c) => c.slug === slug)
  if (index === -1) return { prev: null, next: null }
  const prev = index > 0 ? all[index - 1] : null
  const next = index < all.length - 1 ? all[index + 1] : null
  return { prev, next }
}
