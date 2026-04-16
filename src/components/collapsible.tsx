import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "../utils"

const CollapsibleContext = React.createContext<{ open: boolean } | null>(null)
const FolderCollapsibleContext = React.createContext<{ open: boolean } | null>(null)

function Collapsible({
  open: openProp,
  defaultOpen,
  onOpenChange,
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const isControlled = openProp !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(Boolean(defaultOpen))
  const open = isControlled ? Boolean(openProp) : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <CollapsibleContext.Provider value={{ open }}>
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        className={cn(className)}
        {...props}
      />
    </CollapsibleContext.Provider>
  )
}

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={cn(className)}
      {...props}
    />
  )
})

CollapsibleTrigger.displayName = "CollapsibleTrigger"

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(className)}
      {...props}
    />
  )
}

function CollapsibleTriggerIcon({
  className,
  openIcon,
  closedIcon,
}: {
  className?: string
  openIcon?: React.ReactNode
  closedIcon?: React.ReactNode
}) {
  const context = React.useContext(CollapsibleContext)
  const open = context?.open ?? false

  if (open) {
    return (
      <>
        {openIcon ?? (
          <ChevronDownIcon
            data-slot="collapsible-trigger-icon-open"
            className={cn("size-3.5 shrink-0", className)}
          />
        )}
      </>
    )
  }

  return (
    <>
      {closedIcon ?? (
        <ChevronRightIcon
          data-slot="collapsible-trigger-icon-closed"
          className={cn("size-3.5 shrink-0", className)}
        />
      )}
    </>
  )
}

function FolderCollapsible({
  open: openProp,
  defaultOpen,
  onOpenChange,
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const isControlled = openProp !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(Boolean(defaultOpen))
  const open = isControlled ? Boolean(openProp) : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <FolderCollapsibleContext.Provider value={{ open }}>
      <Collapsible
        open={open}
        onOpenChange={handleOpenChange}
        data-slot="folder-collapsible"
        className={cn(
          "relative inline-block w-fit min-w-[22rem] max-w-[min(38rem,calc(100vw-4rem))]",
          "before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:top-5 before:z-0 before:content-[''] before:rounded-b-[1.1rem] before:rounded-tr-[1rem] before:border before:border-border before:bg-card",
          "after:pointer-events-none after:absolute after:left-3 after:top-0 after:z-0 after:h-6 after:w-24 after:content-[''] after:border after:border-border after:border-b-0 after:bg-card after:[clip-path:polygon(0%_100%,0%_20%,8%_0%,58%_0%,100%_100%)]",
          className
        )}
        {...props}
      />
    </FolderCollapsibleContext.Provider>
  )
}

function FolderCollapsibleTrigger({
  className,
  children,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  "asChild"
>) {
  return (
    <CollapsibleTrigger
      data-slot="folder-collapsible-trigger"
      className={cn(
        "relative z-10 flex min-h-11 w-full items-center gap-2 px-6 pb-3 pt-5 text-sm font-medium text-foreground",
        className
      )}
      {...props}
    >
      <CollapsibleTriggerIcon
        openIcon={<ChevronDownIcon data-slot="folder-collapsible-trigger-icon-open" className="size-3.5 shrink-0" />}
        closedIcon={<ChevronRightIcon data-slot="folder-collapsible-trigger-icon-closed" className="size-3.5 shrink-0" />}
      />
      <span>{children}</span>
    </CollapsibleTrigger>
  )
}

function FolderCollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="folder-collapsible-content"
      className={cn(
        "relative z-10 overflow-hidden px-6 pb-5 pt-1 text-sm text-muted-foreground data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
        className
      )}
      {...props}
    >
      {children}
    </CollapsibleContent>
  )
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleTriggerIcon,
  FolderCollapsible,
  FolderCollapsibleTrigger,
  FolderCollapsibleContent,
}
