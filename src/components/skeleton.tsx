import { cn } from "../utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-white/[0.08] shadow-[0_0_18px_rgba(255,255,255,0.03)_inset]", className)}
      {...props}
    />
  );
}

export { Skeleton };
