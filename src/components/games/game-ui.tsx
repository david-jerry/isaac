import * as React from "react"

/**
 * Self-contained UI helpers shared by the games so each game depends only on
 * React + lucide-react + Tailwind (no project-specific imports) — making them
 * easy to drop into another platform. Theming is driven entirely by CSS design
 * tokens (`--brand`, `--brand-foreground`, `--border`, `--muted`, ...), so a
 * host adopts its own brand just by defining `--brand`. See README.md.
 */

/** Minimal className joiner (no tailwind-merge needed for static class sets). */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ")
}

type Variant = "solid" | "outline" | "ghost"
type Size = "sm" | "default" | "lg" | "icon"

const VARIANTS: Record<Variant, string> = {
  solid: "bg-brand text-brand-foreground hover:opacity-90",
  outline: "border border-border bg-transparent hover:bg-muted",
  ghost: "bg-transparent hover:bg-muted",
}
const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  default: "h-10 px-5 text-sm",
  lg: "h-11 px-6 text-sm",
  icon: "size-9",
}

export function GameButton({
  variant = "solid",
  size = "default",
  className,
  ...props
}: React.ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cx(
        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  )
}
