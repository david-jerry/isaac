import type { Metadata } from "next"

import { Contact } from "@/components/sections/contact"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Isaac David for product design work.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return <Contact />
}
