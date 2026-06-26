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
  if (!project) return {}
  return {
    title: `${project.name} — Isaac David`,
    description: project.summary,
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
