import Link from "next/link"
import { Bot } from "lucide-react"

/**
 * Persistent floating launcher to the games hub — a playful "bored? play"
 * affordance that sits just above the scroll-to-top control. Brand-coloured with
 * a pulsing halo to draw the eye. It's a real link with an explicit accessible
 * name + visually-hidden label, so screen readers and keyboard users get a
 * clear, focusable target. The pulse is dropped under reduced motion.
 */
export function GameLauncher() {
  return (
    <Link
      href="/play"
      aria-label="Play a game — take a break"
      title="Play a game"
      className="group fixed bottom-24 right-6 z-50 grid size-14 place-items-center rounded-full transition-transform duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Attention halo */}
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-brand/40 motion-reduce:hidden"
      />
      {/* Button face */}
      <span className="relative grid size-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/30 ring-1 ring-brand/60">
        <Bot
          className="size-6 transition-transform duration-300 group-hover:rotate-6 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </span>
      <span className="sr-only">Play a game</span>
    </Link>
  )
}
