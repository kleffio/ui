import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "../utils"
import { Input } from "./input"

type AnimatedPlaceholderInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "placeholder"
> & {
  icon: LucideIcon
  placeholder: string
}

function AnimatedPlaceholderInput({
  icon: Icon,
  placeholder,
  className,
  ...props
}: AnimatedPlaceholderInputProps) {
  return (
    <div
      data-slot="animated-placeholder-input"
      className="ui-animated-input relative"
    >
      <Icon className="ui-animated-input__icon pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        {...props}
        placeholder={placeholder}
        className={cn(
          "ui-animated-input__field h-12 rounded-full border-white/10 bg-background/70 pl-11 pr-4 shadow-none",
          className
        )}
      />
    </div>
  )
}

export { AnimatedPlaceholderInput }
