import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-primary/20 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-full border-transparent bg-gradient-kleff text-primary-foreground shadow-[0_12px_27px_rgba(196,143,0,0.22)] hover:opacity-95",
        outline:
          "glass-surface border-white/10 text-white/80 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-white/[0.15] hover:bg-white/[0.07] hover:text-white",
        secondary:
          "border-white/[0.08] bg-white/[0.06] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/[0.14] hover:bg-white/[0.1] hover:text-white",
        ghost:
          "text-white/70 hover:bg-white/[0.06] hover:text-white",
        destructive:
          "border-destructive/25 bg-destructive/10 text-destructive shadow-[0_0_16px_oklch(0.63_0.24_27_/_0.12)] hover:border-destructive/[0.35] hover:bg-destructive/20 hover:shadow-[0_0_22px_oklch(0.63_0.24_27_/_0.20)]",
        link:
          "text-primary underline-offset-4 hover:text-primary/[0.85] hover:drop-shadow-[0_0_8px_rgba(245,181,23,0.35)]",
      },
      size: {
        default:  "h-9 gap-1.5 px-3.5",
        xs:       "h-6 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm:       "h-8 gap-1 rounded-md px-3 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg:       "h-10 gap-2 px-4 text-base",
        icon:     "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
