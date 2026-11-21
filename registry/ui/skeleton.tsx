import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm border-2 border-dashed border-line/40 bg-paper-2",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
