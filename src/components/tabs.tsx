"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "../utils";

const Tabs = TabsPrimitive.Root;

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "glass-surface inline-flex items-center gap-1 rounded-lg border-white/10 p-1 text-white/[0.55] shadow-[0_0_15px_rgba(255,255,255,0.02)]",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:shadow-[0_0_14px_rgba(255,255,255,0.06)]",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", className)}
      {...props}
    />
  );
}

const TabsRoot = Tabs;

export { Tabs, TabsRoot, TabsList, TabsTrigger, TabsContent };
