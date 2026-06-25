import type { Metadata } from "next"

import { Contact } from "@/components/sections/contact"

export const metadata: Metadata = {
  title: "Contact — Isaac David",
  description: "Get in touch with Isaac David for product design work.",
}

export default function ContactPage() {
  return <Contact />
}
