import * as React from "react"
import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-6 items-center justify-center rounded-sm border-2 border-line bg-paper-2 px-1.5 " +
          "font-mono text-[11px] shadow-stamp-sm",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
