type StarsProps = {
  rating: number;
  size?: "sm" | "md";
  className?: string;
};

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Stars({ rating, size = "sm", className }: StarsProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  const dims = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Avaliação ${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const index = i + 1;
        const filled = index <= full;
        const half = !filled && hasHalf && index === full + 1;

        return (
          <span key={i} className={cn("relative inline-block", dims)} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className={cn(
                "absolute inset-0",
                filled ? "text-amber-500" : "text-neutral-200"
              )}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>

            {half ? (
              <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                <svg
                  viewBox="0 0 24 24"
                  className="h-full w-full text-amber-500"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
