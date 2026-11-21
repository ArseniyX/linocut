import * as React from "react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "peer relative size-5 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-line bg-paper shadow-stamp-sm " +
          "checked:bg-ink " +
          // the tick is a rotated L drawn with borders, so it follows the theme (paper on ink) in light and dark
          "before:absolute before:left-[5px] before:top-[1px] before:h-[10px] before:w-[5px] before:rotate-45 " +
          "before:border-b-[2.5px] before:border-r-[2.5px] before:border-paper before:opacity-0 before:content-[''] checked:before:opacity-100 " +
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
