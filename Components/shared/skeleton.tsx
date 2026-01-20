export default function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-neutral-200/70 ${className}`}
      aria-hidden="true"
    />
  );
}
