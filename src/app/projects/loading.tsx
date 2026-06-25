import { Skeleton } from "@/components/ui/skeleton"

/** Projects (case studies) loading state. */
export default function Loading() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <Skeleton className="mb-3 h-4 w-28" />
      <Skeleton className="mb-10 h-9 w-56" />

      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="space-y-4 rounded-xl border border-border/60 p-6"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-6 w-40" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
