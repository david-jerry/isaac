import type { Metadata } from "next"

import { Projects } from "@/components/sections/projects"

export const metadata: Metadata = {
  title: "Projects — Isaac David",
  description: "Selected case studies and product design work by Isaac David.",
}

export default function ProjectsPage() {
  return <Projects />
}
