import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "../utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-white/10 shadow-[0_0_12px_rgba(255,255,255,0.03)] transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-primary/[0.45] focus-visible:ring-3 focus-visible:ring-primary/20 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-[state=checked]:border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_16px_rgba(245,181,23,0.25)] data-[state=unchecked]:bg-white/[0.07] data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-white ring-0 shadow-[0_1px_4px_rgba(0,0,0,0.45)] transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-[state=checked]:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=checked]:bg-primary-foreground group-data-[size=default]/switch:data-[state=unchecked]:translate-x-0 group-data-[size=sm]/switch:data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
