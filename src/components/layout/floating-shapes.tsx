import type { CSSProperties } from "react"

/**
 * Ambient, low-contrast geometric shapes drifting behind every page
 * (Sustainability — WAF). Zero client JS: a Server Component renders a fixed,
 * pointer-events-none layer of deterministically-seeded shapes animated purely
 * with CSS. Seeding (not Math.random at render) keeps SSR + client markup
 * identical, so there's no hydration mismatch. Each shape floats in its own
 * direction; opacity is kept very low so focus stays on the page content.
 * Animation is disabled under `prefers-reduced-motion` (see globals.css).
 */

/** Deterministic PRNG (mulberry32) so shapes render identically on server + client. */
function makeRng(seed: number) {
  let s = seed
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type ShapeType = "square" | "rectangle" | "circle" | "triangle" | "trapezium"
const TYPES: ShapeType[] = [
  "square",
  "rectangle",
  "circle",
  "triangle",
  "trapezium",
]
const CLIPPED: Record<string, string> = {
  triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
  trapezium: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
}

const COUNT = 18
const rng = makeRng(20260623)

const shapes = Array.from({ length: COUNT }, () => {
  const type = TYPES[Math.floor(rng() * TYPES.length)]
  const size = 28 + Math.round(rng() * 112) // 28–140px
  const brandish = rng() < 0.28
  const color = brandish ? "var(--brand)" : "var(--foreground)"
  const clip = CLIPPED[type]

  const style: CSSProperties = {
    position: "absolute",
    top: `${(rng() * 108 - 4).toFixed(2)}%`,
    left: `${(rng() * 108 - 4).toFixed(2)}%`,
    width: `${size}px`,
    height: `${type === "rectangle" ? Math.round(size * 0.6) : size}px`,
    opacity: (0.012 + rng() * 0.028).toFixed(3), // 0.012–0.04
    animationDuration: `${(18 + rng() * 22).toFixed(1)}s`,
    animationDelay: `${(-rng() * 32).toFixed(1)}s`,
    "--dx": `${Math.round(rng() * 180 - 90)}px`,
    "--dy": `${Math.round(rng() * 180 - 90)}px`,
    "--rot-start": `${Math.round(rng() * 90 - 45)}deg`,
    "--rot-end": `${Math.round(rng() * 90 - 45)}deg`,
  } as CSSProperties

  if (clip) {
    style.clipPath = clip
    style.backgroundColor = color
  } else {
    style.borderWidth = "1.5px"
    style.borderStyle = "solid"
    style.borderColor = color
    style.borderRadius = type === "circle" ? "9999px" : "2px"
  }

  return style
})

export function FloatingShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {shapes.map((style, i) => (
        <span key={i} className="floating-shape block" style={style} />
      ))}
    </div>
  )
}
