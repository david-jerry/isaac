import { Skeleton } from "@/components/ui/skeleton"

/** About loading state — mirrors the heading / banner / bio+photo / brands layout. */
export default function Loading() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <Skeleton className="h-10 w-80 sm:h-14 sm:w-[34rem]" />
      <Skeleton className="mt-10 aspect-[4/3] w-full rounded-xl sm:aspect-[16/8] md:aspect-[16/6]" />
      <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
        <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      </div>
      <div className="mt-24">
        <Skeleton className="h-9 w-80" />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="hidden md:block" />
          <div className="flex flex-wrap gap-3 border-t border-border pt-8">
            {[20, 28, 44, 32, 24, 40, 36, 28].map((w, i) => (
              <Skeleton key={i} className="h-6" style={{ width: `${w * 4}px` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-24">
        <Skeleton className="h-9 w-72" />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="hidden md:block" />
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2 border-b border-border pb-5">
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
