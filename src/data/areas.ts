import type { AreaOfWork } from "@/types/portfolio"

/**
 * Industries the work spans. Each `image` is a `.jpg` thumbnail under
 * `/public/landing_page/area_of_works/`, named after its label.
 */
export const areasOfWork: AreaOfWork[] = [
  { label: "Cyber Security", image: "/landing_page/area_of_works/cybersecurity.jpg" },
  { label: "HealthCare", image: "/landing_page/area_of_works/healthcare.jpg" },
  { label: "Fitness", image: "/landing_page/area_of_works/fitness.jpg" },
  { label: "Marketing", image: "/landing_page/area_of_works/marketing.jpg" },
  { label: "Education", image: "/landing_page/area_of_works/education.jpg" },
  { label: "Fintech", image: "/landing_page/area_of_works/fintech.jpg" },
  { label: "DataVisualization", image: "/landing_page/area_of_works/datavisualization.jpg" },
  { label: "Science", image: "/landing_page/area_of_works/science.jpg" },
  { label: "Web3/NFT", image: "/landing_page/area_of_works/web3nft.jpg" },
]
