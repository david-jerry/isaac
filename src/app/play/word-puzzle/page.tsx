import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import WordPuzzle from "@/components/games/word-puzzle"

export const metadata: Metadata = {
  title: "Word Builder",
  description:
    "Spell as many words as you can from the letters before the timer runs out.",
  alternates: { canonical: "/play/word-puzzle" },
}

export default function WordPuzzlePage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="sr-only">Word Builder</h1>
      <Link
        href="/play"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All games
      </Link>
      <WordPuzzle />
    </section>
  )
}
