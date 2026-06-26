import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import AlienInvaders from "@/components/games/alien-invaders"

export const metadata: Metadata = {
  title: "Alien Invaders — Play — Isaac David",
  description: "A quick arcade shooter — clear five waves of incoming drones.",
}

export default function AlienInvadersPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <Link
        href="/play"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All games
      </Link>
      <AlienInvaders />
    </section>
  )
}
