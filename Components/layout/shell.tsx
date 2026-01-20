type ShellProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Shell({ children, className, innerClassName }: ShellProps) {
  return (
    <div className={cn("min-h-screen bg-neutral-50 text-neutral-900", className)}>
      <div className={cn("w-full", innerClassName)}>{children}</div>
    </div>
  );
}
