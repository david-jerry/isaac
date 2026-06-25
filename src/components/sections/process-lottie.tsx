"use client"

import dynamic from "next/dynamic"

import { cn } from "@/lib/utils"

// The dotLottie player ships a wasm renderer — lazy-load it client-side only so
// it stays out of SSR and the initial bundle (Performance Efficiency — WAF).
const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
)

/** Autoplaying dotLottie illustration for a process step. */
export function ProcessLottie({
  src,
  label,
  className,
}: {
  src: string
  label: string
  className?: string
}) {
  return (
    <DotLottieReact
      src={src}
      autoplay
      loop
      aria-label={label}
      className={cn("h-full w-full", className)}
    />
  )
}
