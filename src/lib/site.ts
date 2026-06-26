/**
 * Canonical site config used for metadata, Open Graph, sitemap, and robots.
 * Set `NEXT_PUBLIC_SITE_URL` in the environment for the production domain.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://isaacdavid.design"

export const siteName = "Isaac David"
export const siteDescription =
  "Portfolio of Isaac David, a UI/UX designer crafting clear, human-centered product experiences."
