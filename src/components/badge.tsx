import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all shadow-[0_0_10px_rgba(255,255,255,0.03)] [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-primary/25 bg-primary/[0.15] text-primary shadow-[0_0_12px_rgba(245,181,23,0.14)]",
        secondary: "border-white/10 bg-white/10 text-white/80",
        destructive: "border-destructive/25 bg-destructive/10 text-destructive shadow-[0_0_12px_oklch(0.63_0.24_27_/_0.13)]",
        outline: "border-white/10 bg-white/[0.03] text-white/80",
        ghost: "text-white/70 hover:bg-white/[0.06] hover:text-white",
        beta: "bg-amber-500/[0.15] text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,181,23,0.12)]",
        stable: "bg-emerald-500/[0.15] text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.12)]",
        deprecated: "bg-destructive/10 text-destructive border-destructive/25",
        new: "bg-blue-500/[0.15] text-blue-300 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.12)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
