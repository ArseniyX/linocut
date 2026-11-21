import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
  const v = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      className={cn("h-4 w-full overflow-hidden rounded-sm border-2 border-line bg-paper shadow-stamp-sm", className)}
      {...props}
    >
      <div
        className="h-full border-r-2 border-line bg-sun transition-[width] bg-[repeating-linear-gradient(45deg,transparent_0_6px,rgb(0_0_0/.12)_6px_8px)]"
        style={{ width: `${v}%` }}
      />
    </div>
  )
}

export { Progress }
