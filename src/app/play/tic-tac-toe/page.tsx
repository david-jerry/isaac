import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import TicTacToe from "@/components/games/tic-tac-toe"

export const metadata: Metadata = {
  title: "Tic-Tac-Toe — Play — Isaac David",
  description: "Classic X and O against the machine.",
}

export default function TicTacToePage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <Link
        href="/play"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All games
      </Link>
      <TicTacToe />
    </section>
  )
}
