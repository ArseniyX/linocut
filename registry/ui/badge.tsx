import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border-2 border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-paper-2 text-ink",
        sun: "bg-sun text-on-sun",
        moss: "bg-moss text-on-moss",
        rust: "bg-rust text-on-rust",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
