import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        xs: "size-3.5",
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
      },
    },
    defaultVariants: { size: "md" },
  }
);

function Spinner({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  return (
    <div
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Spinner, spinnerVariants };
