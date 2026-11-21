import * as React from "react"
import { cn } from "@/lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 border-dashed border-line/50",
        orientation === "horizontal" ? "w-full border-t-2" : "h-full self-stretch border-l-2",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
