import { Hero } from "@/components/sections/hero"
import { IntroMetrics } from "@/components/sections/intro-metrics"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { Process } from "@/components/sections/process"
import { AreasOfWork } from "@/components/sections/areas-of-work"
import { Services } from "@/components/sections/services"

export default function Home() {
  return (
    <>
      <Hero />
      <IntroMetrics />
      <FeaturedProjects />
      <Process />
      <AreasOfWork />
      <Services />
    </>
  )
}
