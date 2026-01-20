import Skeleton from "../../../Components/shared/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Skeleton className="h-4 w-64" />

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-[420px] w-full rounded-[26px]" />
            <div className="mt-4 grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-20 w-full rounded-2xl" />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-[26px] border border-neutral-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-3 h-8 w-56" />
            <Skeleton className="mt-4 h-6 w-28" />
            <Skeleton className="mt-6 h-10 w-full rounded-full" />

            <Skeleton className="mt-6 h-20 w-full rounded-2xl" />
            <Skeleton className="mt-4 h-20 w-full rounded-2xl" />
          </div>
        </div>

        <div className="mt-10">
          <Skeleton className="h-8 w-56" />
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-[26px] border border-neutral-200 bg-white p-4"
              >
                <Skeleton className="h-44 w-full" />
                <Skeleton className="mt-4 h-4 w-2/3" />
                <Skeleton className="mt-2 h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
