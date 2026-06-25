import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { profile } from "@/data/profile"

interface LogoProps extends Omit<React.ComponentProps<typeof Link>, "href"> {
  /** Destination — defaults to home. */
  href?: React.ComponentProps<typeof Link>["href"]
  /** Rendered height in px; width scales from the 512×272 intrinsic ratio. */
  height?: number
  /** Prioritize loading (use for the above-the-fold navbar mark). */
  priority?: boolean
}

const RATIO = 512 / 272

/** The white "Isaac D." wordmark with its coral dot — links home. */
export function Logo({
  height = 28,
  priority = false,
  className,
  href = "/",
  ...props
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${profile.name} — home`}
      className={cn(
        "inline-flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    >
      <Image
        src="/logo.png"
        alt={`${profile.name} logo`}
        width={Math.round(height * RATIO)}
        height={height}
        priority={priority}
        className="h-auto w-auto"
        style={{ height }}
      />
    </Link>
  )
}
