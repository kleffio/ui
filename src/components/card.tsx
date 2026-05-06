import * as React from "react";
import { clearGlowFollowPosition, installGlowFollow, setGlowFollowPosition } from "./glow-follow";
import { cn } from "../utils";

// Ensure global glow-follow listeners are installed when this module loads.
installGlowFollow();

type CardProps = React.ComponentProps<"div"> & {
  frosted?: boolean;
  focus?: boolean;
  spotlight?: boolean;
  size?: "default" | "sm";
  "data-frosted"?: "true" | "false";
  "data-focus"?: "true" | "false";
  "data-spotlight"?: "true" | "false";
};

function Card({
  className,
  frosted = false,
  focus = false,
  spotlight = false,
  size = "default",
  "data-frosted": dataFrosted,
  "data-focus": dataFocus,
  "data-spotlight": dataSpotlight,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  ...props
}: CardProps) {
  const glassState = frosted ? "true" : dataFrosted === "true" || dataFrosted === "false" ? dataFrosted : undefined;
  const focusState = focus ? "true" : dataFocus === "true" || dataFocus === "false" ? dataFocus : undefined;
  const spotlightState = spotlight ? "true" : dataSpotlight === "true" || dataSpotlight === "false" ? dataSpotlight : undefined;
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event);

    setGlowFollowPosition(event.currentTarget, event.clientX, event.clientY);
  };
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(event);

    setGlowFollowPosition(event.currentTarget, event.clientX, event.clientY);
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);

    clearGlowFollowPosition(event.currentTarget);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);

    setGlowFollowPosition(event.currentTarget, event.clientX, event.clientY);
  };
  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerEnter?.(event);

    setGlowFollowPosition(event.currentTarget, event.clientX, event.clientY);
  };
  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event);

    clearGlowFollowPosition(event.currentTarget);
  };

  return (
    <div
      data-slot="card"
      data-frosted={glassState}
      data-focus={focusState}
      data-spotlight={spotlightState}
      data-size={size}
      className={cn(
        glassState ? "overview-glass-card" : "rounded-xl border border-border bg-card",
        "group/card flex flex-col gap-4 py-4 text-sm text-card-foreground has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-2xl *:[img:last-child]:rounded-b-2xl",
        className
      )}
      onMouseEnter={spotlightState === "true" ? handleMouseEnter : onMouseEnter}
      onMouseLeave={spotlightState === "true" ? handleMouseLeave : onMouseLeave}
      onMouseMove={spotlightState === "true" ? handleMouseMove : onMouseMove}
      onPointerEnter={spotlightState === "true" ? handlePointerEnter : onPointerEnter}
      onPointerLeave={spotlightState === "true" ? handlePointerLeave : onPointerLeave}
      onPointerMove={spotlightState === "true" ? handlePointerMove : onPointerMove}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-2xl border-t border-white/[0.06] bg-white/[0.02] p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
