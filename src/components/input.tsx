import * as React from "react";
import { cn } from "../utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "glass-surface flex h-9 w-full rounded-lg border-white/10 px-3 py-1 text-sm text-white/90 shadow-[0_0_15px_rgba(255,255,255,0.02)] transition-all placeholder:text-white/[0.35] focus-visible:border-primary/[0.45] focus-visible:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-[0_0_0_4px_rgba(245,181,23,0.08),0_0_22px_rgba(245,181,23,0.06)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
