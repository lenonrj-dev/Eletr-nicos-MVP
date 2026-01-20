import Skeleton from "../../Components/shared/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="mt-3 h-4 w-72" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-5 w-28" />
            <div className="mt-5 space-y-3">
              {Array.from({ length: 7 }).map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full rounded-2xl" />
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-[26px] border border-neutral-200 bg-white p-4"
                >
                  <Skeleton className="h-44 w-full" />
                  <Skeleton className="mt-4 h-4 w-2/3" />
                  <Skeleton className="mt-2 h-3 w-1/2" />
                  <Skeleton className="mt-4 h-9 w-full rounded-full" />
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-48 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
