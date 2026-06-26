import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getAdjacentCaseStudies,
  getAllCaseStudies,
  getCaseStudy,
} from "@/lib/case-studies"
import { CaseStudyView } from "@/components/sections/case-study"
import { ProjectNav } from "@/components/sections/project-nav"

export function generateStaticParams() {
  return getAllCaseStudies().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getCaseStudy(slug)
  if (!project) return { robots: { index: false } }
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.summary,
      images: project.heroImage
        ? [{ url: project.heroImage, alt: project.imageAlt ?? project.name }]
        : undefined,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getCaseStudy(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentCaseStudies(slug)

  return (
    <>
      <CaseStudyView project={project} />
      <ProjectNav prev={prev} next={next} />
    </>
  )
}
