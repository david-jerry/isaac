import type { Project } from "@/types/portfolio"

/** Placeholder case studies — swap for real work (or an API) via useProjects(). */
export const projects: Project[] = [
  {
    id: "pandascrow",
    title: "Pandascrow",
    category: "Product Design",
    year: "2025",
    summary:
      "An escrow dashboard that makes holding and releasing funds feel safe, with a clearer information hierarchy that lifted task-completion by 38%.",
    tags: ["Research", "Web App", "Design System"],
    image: "/featured_projects/project_01.png",
    imageAlt: "Pandascrow escrow dashboard shown on a tablet.",
    featured: true,
  },
  {
    id: "octopus",
    title: "Octopus",
    category: "Mobile App",
    year: "2024",
    summary:
      "A mobile wallet reimagined around progressive disclosure and plain-language copy for first-time users.",
    tags: ["iOS", "Interaction", "Usability"],
    image: "/featured_projects/project_02.png",
    imageAlt: "Octopus mobile app shown on a phone.",
    featured: true,
  },
  {
    id: "duckbook",
    title: "Duckbook",
    category: "Web App",
    year: "2024",
    summary:
      "A bookkeeping tool with an editor-first layout and keyboard-driven flows for power users.",
    tags: ["Interaction", "Web", "Prototyping"],
    image: "/featured_projects/project_03.png",
    imageAlt: "Duckbook web app shown on a laptop.",
    featured: true,
  },
  {
    id: "lumen-health",
    title: "Lumen Health",
    category: "Mobile App",
    year: "2023",
    summary:
      "Patient onboarding reimagined around progressive disclosure and plain-language copy.",
    tags: ["UX Writing", "Android", "Usability"],
  },
]
