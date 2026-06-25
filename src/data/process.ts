import type { ProcessPhase, ProcessStep } from "@/types/portfolio"

/** "Explore, Create, Refine" — how a project moves from research to handoff. */
export const processSteps: ProcessStep[] = [
  {
    id: "analytics",
    label: "Analytics",
    icon: "Cloud",
    lottie: "/landing_page/process/analytics.lottie",
    description:
      "I start every project by digging into the why behind it. Once I understand the goals and real user needs, I build a clear visual direction, from moodboards to typography, layout, motion, and color. Everything is intentional. It has to work beautifully and feel effortless to use.",
  },
  {
    id: "design",
    label: "Design",
    icon: "PenTool",
    lottie: "/landing_page/process/design.lottie",
    description:
      "Once the research is solid, I shift into design mode. That's where I explore fast and wide, testing ideas, shaping strong concepts, building out the brand identity, and making sure everything stays consistent and scalable from day one.",
  },
  {
    id: "creation",
    label: "Creation",
    icon: "Amphora",
    lottie: "/landing_page/process/creation.lottie",
    description:
      "As the design starts to take shape, I move into build and refine mode. Feedback comes in, ideas get sharper, and the product starts to breathe. I layer in motion and thoughtful interactions that aren't just for show, but guide users naturally and make the whole experience feel intentional and memorable.",
  },
  {
    id: "creative-development",
    label: "Creative Development",
    icon: "Wand2",
    lottie: "/landing_page/process/creative-development.lottie",
    description:
      "After the creation phase, it's time for the handoff. Experience the magic of this stage as I add the final touches to the project, meticulously creating essential documentation. I maintain close contact with creative developers to bring the idealized interaction and experience to life with precision and dedication, just like pulling a rabbit out of a hat, turning the ordinary into the extraordinary.",
  },
]

/** The "Cut the noise" line — the four beats of the working method. */
export const processPhases: ProcessPhase[] = [
  { title: "Discover", subtitle: "the Problem" },
  { title: "Define", subtitle: "the Opportunity" },
  { title: "Design", subtitle: "the Solution" },
  { title: "Deliver", subtitle: "& Refine" },
]
