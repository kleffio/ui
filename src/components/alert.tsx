import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-xl border-l-[3px] border border-transparent px-3.5 py-3 text-left text-sm shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.03)_inset] has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-white/10 border-l-white/20 bg-white/[0.035] text-card-foreground [backdrop-filter:blur(12px)] [-webkit-backdrop-filter:blur(12px)]",
        info:
          "border-blue-500/20 border-l-blue-500 bg-blue-500/5 text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_18px_rgba(59,130,246,0.08)] *:data-[slot=alert-description]:text-foreground/80 *:[svg]:text-blue-400",
        success:
          "border-emerald-500/20 border-l-emerald-500 bg-emerald-500/5 text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_18px_rgba(16,185,129,0.08)] *:data-[slot=alert-description]:text-foreground/80 *:[svg]:text-emerald-400",
        warning:
          "border-amber-400/20 border-l-amber-400 bg-amber-400/5 text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_18px_rgba(245,181,23,0.10)] *:data-[slot=alert-description]:text-foreground/80 *:[svg]:text-amber-400",
        destructive:
          "border-destructive/20 border-l-destructive bg-destructive/5 text-destructive shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_18px_oklch(0.63_0.24_27_/_0.10)] *:data-[slot=alert-description]:text-destructive/80 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        "absolute top-2 right-2 [&_[data-slot=button]]:active:translate-y-0",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
