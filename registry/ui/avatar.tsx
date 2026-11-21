import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string
  alt?: string
  fallback?: string
}

function Avatar({ className, src, alt = "", fallback, ...props }: AvatarProps) {
  const [failed, setFailed] = React.useState(false)
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 border-line " +
          "bg-sun text-on-sun font-display font-semibold shadow-stamp-sm",
        className
      )}
      {...props}
    >
      {src && !failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} className="size-full object-cover" />
      ) : (
        (fallback ?? alt.slice(0, 2)).toUpperCase()
      )}
    </span>
  )
}

export { Avatar }
