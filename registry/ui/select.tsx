import * as React from "react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-10 w-full appearance-none rounded-md border-2 border-line bg-paper pl-3 pr-9 text-sm shadow-stamp-sm " +
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs">▾</span>
    </div>
  )
)
Select.displayName = "Select"

export { Select }
