import * as React from "react"

import { cn } from "../utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "glass-surface flex field-sizing-content min-h-16 w-full rounded-lg border-white/10 px-3 py-2 text-base text-white/90 shadow-[0_0_15px_rgba(255,255,255,0.02)] transition-all outline-none placeholder:text-white/[0.35] focus-visible:border-primary/[0.45] focus-visible:bg-white/[0.055] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-[0_0_0_4px_rgba(245,181,23,0.08),0_0_22px_rgba(245,181,23,0.06)] disabled:cursor-not-allowed disabled:bg-white/[0.03] disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
