import * as React from "react";

import { cn } from "../utils";

function ShinePill({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="shine-pill" className={cn("ui-shine-pill", className)} {...props}>
      <span className="ui-shine-pill__content">{children}</span>
    </span>
  );
}

export { ShinePill };
