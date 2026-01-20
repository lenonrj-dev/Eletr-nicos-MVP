type ShellVariant = "boxed" | "full";

type ShellProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: ShellVariant;
};

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Shell({
  children,
  className,
  innerClassName,
  variant = "boxed",
}: ShellProps) {
  const isFull = variant === "full";

  return (
    <div className={cn("min-h-screen bg-neutral-50 text-neutral-900", className)}>
      {isFull ? (
        <div className={cn("w-full", innerClassName)}>{children}</div>
      ) : (
        <div className="mx-auto w-full max-w-[1160px] px-4 py-8">
          <div
            className={cn(
              "overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_rgba(0,0,0,0.08)]",
              innerClassName
            )}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
