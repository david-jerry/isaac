/** About-page content. Edit copy/lists here, not in the component. */

export const aboutParagraphs = [
  "Hello, I'm Isaac, a product designer based in Rivers, Nigeria. I turn complex ideas into clean, intuitive digital experiences across web and mobile, with a real love for the details that make things feel right.",
  "When I'm not designing, I'm gaming, playing football, or singing my heart out at karaoke.",
]

export const brands = [
  "Hoski",
  "Omacart",
  "Global Diamond Montreal",
  "Cyphershield",
  "Dormeo",
  "TSA",
  "Meadowlands Group",
  "Alev Jewelry",
  "Les Dentistes",
  "Spectrum Aesthetics",
  "Club Exec Auto",
  "M'chel",
  "Pandascrow",
  "Capsule",
  "P&A Roofing",
  "Easy Entry",
  "Redeye",
  "Diamond Traders",
  "Duck book",
  "Kinfolq",
  "Acre Cycle",
  "Octopus",
  "PeekUp",
  "Spectrum Aesthetics",
  "Acadly",
]

export interface ExperienceGroup {
  period: string
  roles: { company: string; role: string }[]
}

export const experience: ExperienceGroup[] = [
  {
    period: "2024 - Present",
    roles: [
      { company: "Cyphershield Inc.", role: "Lead Product Design" },
      { company: "Hoski Inc.", role: "Lead UIUX Design" },
    ],
  },
  {
    period: "2021 - 2024",
    roles: [
      { company: "Pandascrow Technologies", role: "Lead Product Design" },
      { company: "Bytestreams Technologie", role: "Freelance UIUX Designer" },
    ],
  },
  {
    period: "2019 - 2021",
    roles: [{ company: "Circlepanda Inc.", role: "UIUX Designer" }],
  },
]
