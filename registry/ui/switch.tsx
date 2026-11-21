import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "on" : "off"}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-sm border-2 border-line bg-paper-2 shadow-stamp-sm transition-colors " +
          "data-[state=on]:bg-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 size-4 rounded-[2px] border-2 border-line bg-paper transition-transform",
          checked && "translate-x-5"
        )}
      />
    </button>
  )
)
Switch.displayName = "Switch"

export { Switch }
