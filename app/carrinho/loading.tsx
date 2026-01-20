import Skeleton from "../../Components/shared/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>

            <div className="mt-6 space-y-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 rounded-3xl border border-neutral-200 p-4 sm:flex-row sm:items-center"
                >
                  <Skeleton className="h-20 w-20" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                    <Skeleton className="h-10 w-36 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-5 w-24" />
            <div className="mt-5 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-11 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
