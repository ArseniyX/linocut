import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva("relative w-full rounded-md border-2 border-line p-4 shadow-stamp-sm", {
  variants: {
    variant: {
      note: "bg-paper-2 text-ink",
      warn: "bg-sun text-on-sun",
      danger: "bg-rust text-on-rust",
    },
  },
  defaultVariants: { variant: "note" },
})

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
)
Alert.displayName = "Alert"

const AlertTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5 className={cn("mb-1 font-display font-semibold", className)} {...props} />
)
const AlertDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm opacity-90", className)} {...props} />
)

export { Alert, AlertTitle, AlertDescription }
