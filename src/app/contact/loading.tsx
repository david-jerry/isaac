import { Skeleton } from "@/components/ui/skeleton"

/** Contact loading state — mirrors the "Let's Create / Magic Together" layout. */
export default function Loading() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col justify-center gap-12 px-6 py-20 sm:gap-16">
      <div>
        <Skeleton className="h-10 w-64 sm:h-14 sm:w-96" />
        <Skeleton className="mt-3 h-10 w-72 sm:h-14 sm:w-[28rem]" />
        <div className="mt-8 space-y-2.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="mx-auto h-12 w-full max-w-xl sm:h-20" />
    </section>
  )
}
