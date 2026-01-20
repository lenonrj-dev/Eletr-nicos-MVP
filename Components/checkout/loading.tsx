import Skeleton from "../shared/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-5 w-36" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-11 w-full rounded-2xl" />
                </div>
              ))}
            </div>
            <Skeleton className="mt-6 h-5 w-28" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full rounded-2xl" />
              ))}
            </div>
            <Skeleton className="mt-6 h-11 w-full rounded-full" />
          </div>

          <div className="lg:col-span-4 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-5 w-28" />
            <div className="mt-5 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-11 w-full rounded-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
