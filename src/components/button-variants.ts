import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_2px_16px_oklch(0.80_0.17_90_/_0.30),0_1px_3px_rgba(0,0,0,0.3)] hover:bg-primary/90 hover:shadow-[0_4px_24px_oklch(0.80_0.17_90_/_0.42),0_1px_3px_rgba(0,0,0,0.3)]",
        outline:
          "border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/[0.15] hover:text-foreground",
        secondary:
          "bg-white/[0.06] border border-white/[0.08] text-secondary-foreground hover:bg-white/[0.1]",
        ghost:
          "hover:bg-white/[0.06] hover:text-foreground",
        destructive:
          "bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:  "h-8 gap-1.5 px-3",
        xs:       "h-6 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm:       "h-7 gap-1 rounded-md px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg:       "h-10 gap-2 px-4 text-base",
        icon:     "size-8",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-md",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
