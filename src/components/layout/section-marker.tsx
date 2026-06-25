import { cn } from "@/lib/utils"

/** Total number of indexed sections on the landing page (shown as "NN / 06"). */
const TOTAL = "06"

/**
 * Running index label that brackets each landing-page section (e.g. "02 … 06"),
 * mirroring the Figma design's corner markers.
 */
export function SectionMarker({
  index,
  total = TOTAL,
  className,
}: {
  index: string
  total?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between font-mono text-xs text-muted-foreground",
        className,
      )}
    >
      <span>{index}</span>
      <span>{total}</span>
    </div>
  )
}
