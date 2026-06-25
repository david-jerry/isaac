import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand">
        Error 404
      </p>
      <h1 className="mt-4 text-7xl font-bold leading-none tracking-tight sm:text-9xl">
        404<span className="text-brand">.</span>
      </h1>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        Page not found
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Let&apos;s get you back on track.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </Button>
    </section>
  )
}
