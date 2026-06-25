import type { Profile } from "@/types/portfolio"

/** Placeholder profile — copy/links translated from the Figma design. */
export const profile: Profile = {
  name: "Isaac David",
  role: "UI/UX Designer",
  tagline:
    "I design clear, human-centered product experiences — from first sketch to polished interface.",
  heroPhrases: [
    "I am Isaac",
    "A UI/UX Designer",
    "I work remotely",
    "Let's Collaborate",
  ],
  bio: "I'm a UI/UX designer focused on turning complex problems into simple, accessible interfaces. I work across research, interaction design, and design systems, partnering closely with engineering to ship work that feels effortless to use.",
  intro:
    "I turn complex ideas into clean, intuitive digital experiences that look good, feel right, and actually drive real business growth.",
  location: "Remote · Worldwide",
  email: "isaaceffiongdavid@gmail.com",
  available: true,
  since: "2019",
  current: {
    role: "Lead Product Designer",
    company: "CypherShield Inc.",
    href: "https://cyphershield.io",
  },
  metrics: [
    { value: "+27", label: "Total Projects" },
    { value: "+7", label: "Years of Experience" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/isaac-effiong-david" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
}
