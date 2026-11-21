import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-line font-medium transition-all " +
    "shadow-stamp active:translate-x-[3px] active:translate-y-[3px] active:shadow-none " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-ink-soft",
        paper: "bg-paper text-ink hover:bg-paper-2",
        rust: "bg-rust text-on-rust hover:brightness-110",
        ghost: "border-transparent shadow-none bg-transparent hover:bg-paper-2 active:translate-x-0 active:translate-y-0",
        link: "border-transparent shadow-none underline underline-offset-4 decoration-2 active:translate-x-0 active:translate-y-0",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-sm",
        md: "h-10 px-4 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-md",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
)
Button.displayName = "Button"

export { Button, buttonVariants }
