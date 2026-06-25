import { Skeleton } from "@/components/ui/skeleton"

/** Home (Hero) loading state. */
export default function Loading() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col justify-center px-6 pb-20 pt-24 sm:pt-32">
      <Skeleton className="mb-6 h-7 w-48 rounded-full" />
      <Skeleton className="mb-4 h-4 w-32" />
      <div className="space-y-3">
        <Skeleton className="h-12 w-full max-w-3xl" />
        <Skeleton className="h-12 w-4/5 max-w-2xl" />
        <Skeleton className="h-12 w-2/3 max-w-xl" />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Skeleton className="h-11 w-44 rounded-md" />
        <Skeleton className="h-11 w-40 rounded-md" />
      </div>
    </section>
  )
}
