import * as React from "react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "peer size-5 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-line bg-paper shadow-stamp-sm " +
          "checked:bg-ink checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23f6f1e7' stroke-width='2.5'%3E%3Cpath d='M3 8.5l3.2 3L13 4.5'/%3E%3C/svg%3E\")] " +
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
