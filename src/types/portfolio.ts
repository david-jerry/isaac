/** Domain types for the Isaac portfolio. Replace data sources, not these shapes. */

export interface Project {
  id: string
  title: string
  /** e.g. "Product Design", "Design System", "Mobile App" */
  category: string
  year: string
  summary: string
  /** Discipline / tool tags rendered as badges. */
  tags: string[]
  /** Cover image under `/public` (e.g. "/featured_projects/project_01.png"). */
  image?: string
  /** Accessible alt text for the cover image. */
  imageAlt?: string
  /** Surface this project in the landing page "Featured Projects" grid. */
  featured?: boolean
  /** Optional live case-study or external link. */
  href?: string
}

export interface SocialLink {
  label: string
  href: string
}

/** Headline stat shown in the intro/metrics section (e.g. "+27" · "Total Projects"). */
export interface Metric {
  value: string
  label: string
}

/**
 * A phase in the "Explore, Create, Refine" workflow. `icon` names a Lucide icon
 * used as a line-art stand-in; drop a real SVG at `image` to override it.
 */
export interface ProcessStep {
  id: string
  label: string
  description: string
  /** Lucide icon name used as the line-art stand-in. */
  icon: string
  /** Optional illustration under `/public` that replaces the icon stand-in. */
  image?: string
  /** dotLottie animation under `/public` shown above the step description. */
  lottie?: string
}

/** A node in the "Cut the noise" process line (e.g. "Discover" · "the Problem"). */
export interface ProcessPhase {
  title: string
  subtitle: string
}

/** An industry/domain shown in the "Areas of Work" marquee, with a thumbnail. */
export interface AreaOfWork {
  label: string
  /** Thumbnail under `/public` (e.g. "/areas/cyber-security.jpg"); optional. */
  image?: string
}

/** A capability shown in the services accordion. */
export interface Service {
  id: string
  title: string
  description: string
  /** Sub-disciplines listed under the expanded panel. */
  items: string[]
}

export interface Profile {
  name: string
  role: string
  /** One-line hero tagline. */
  tagline: string
  /** Phrases that cycle on the hero's second line (after "Hi there"). */
  heroPhrases: string[]
  /** Short bio paragraph for the About section. */
  bio: string
  /** Larger statement-of-intent shown in the landing intro section. */
  intro: string
  location: string
  email: string
  /** WhatsApp number in international format (e.g. "+2348012345678"). */
  whatsapp: string
  available: boolean
  /** Year the designer started working — shown in the hero note. */
  since: string
  /** Current role/company, shown in the hero note. */
  current: { role: string; company: string; href?: string }
  /** Headline stats for the metrics row. */
  metrics: Metric[]
  socials: SocialLink[]
}
