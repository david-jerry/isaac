import type { Service } from "@/types/portfolio"

/** Capabilities shown in the services accordion (last section before the footer). */
export const servicesIntro =
  "From discovery to final launch, my goal is simple, help businesses build experiences people genuinely enjoy using. UI/UX design is my core, but I bring more to the table, from visual identity to motion and everything that shapes a product into something cohesive, functional, and memorable."

export const services: Service[] = [
  {
    id: "branding",
    title: "Branding",
    description: servicesIntro,
    items: [
      "Brand Identity",
      "Brand Positioning",
      "Naming",
      "Brand Strategy",
      "Style Guides",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Research-driven interface and interaction design — from low-fidelity flows to a polished, accessible, production-ready system.",
    items: [
      "User Research",
      "Wireframing",
      "Interaction Design",
      "Design Systems",
      "Prototyping",
    ],
  },
  {
    id: "strategy",
    title: "Strategy",
    description:
      "Aligning product decisions with business goals so design ships outcomes, not just screens.",
    items: [
      "Product Strategy",
      "Roadmapping",
      "Workshops",
      "Competitive Analysis",
    ],
  },
  {
    id: "interaction",
    title: "Interaction",
    description:
      "Motion and micro-interactions that guide users naturally and make the whole experience feel intentional.",
    items: ["Motion Design", "Micro-interactions", "Prototyped Flows"],
  },
]
