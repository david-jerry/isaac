import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import AlienInvaders from "@/components/games/alien-invaders"

export const metadata: Metadata = {
  title: "Alien Invaders",
  description: "A quick arcade shooter — clear five waves of incoming drones.",
  alternates: { canonical: "/play/alien-invaders" },
}

export default function AlienInvadersPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="sr-only">Alien Invaders</h1>
      <Link
        href="/play"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All games
      </Link>
      <AlienInvaders />
    </section>
  )
}
