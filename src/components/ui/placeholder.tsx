import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A neutral stand-in for an image asset that hasn't been added yet. Renders a
 * muted, labelled box so layouts read correctly before the real `/public` asset
 * is dropped in — Operational Excellence (WAF): the UI is never visibly broken.
 */
function Placeholder({
  label,
  className,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      data-slot="placeholder"
      role="img"
      aria-label={label ? `${label} (placeholder image)` : "Placeholder image"}
      className={cn(
        "flex items-center justify-center gap-2 bg-muted text-muted-foreground/60",
        className,
      )}
      {...props}
    >
      <ImageIcon className="size-4 shrink-0" aria-hidden />
      {label ? (
        <span className="truncate text-xs font-medium">{label}</span>
      ) : null}
    </div>
  )
}

export { Placeholder }
