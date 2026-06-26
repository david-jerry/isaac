import type { Metadata } from "next"

import { About } from "@/components/sections/about"
import { FeaturedProjects } from "@/components/sections/featured-projects"

export const metadata: Metadata = {
  title: "About",
  description:
    "Isaac David — a UI/UX designer turning complex problems into simple, accessible interfaces.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <>
      <About />
      <FeaturedProjects />
    </>
  )
}
