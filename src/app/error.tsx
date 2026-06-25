"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"

/** Route-level error boundary — the project's 500 design. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Operational Excellence (WAF): surface the error for observability.
    console.error(error)
  }, [error])

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand">
        Error 500
      </p>
      <h1 className="mt-4 text-7xl font-bold leading-none tracking-tight sm:text-9xl">
        500<span className="text-brand">.</span>
      </h1>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        Something went wrong
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        An unexpected error occurred on our end. You can try again, or head back
        to the home page.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" onClick={reset}>
          <RotateCcw className="size-4" />
          Try again
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </section>
  )
}
