import * as React from "react"
import { cn } from "@/lib/utils"

export interface DialogProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Built on the native <dialog>: focus trapping, Esc and top-layer for free. */
function Dialog({ open, onOpenChange, className, children, ...props }: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={() => onOpenChange(false)}
      onClick={(e) => { if (e.target === ref.current) onOpenChange(false) }}
      className={cn(
        "m-auto w-[min(92vw,28rem)] rounded-md border-2 border-line bg-paper p-0 text-ink shadow-[6px_6px_0_0_var(--color-ink)] " +
          "backdrop:bg-ink/50 backdrop:backdrop-blur-[1px]",
        className
      )}
      {...props}
    >
      {children}
    </dialog>
  )
}

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1 border-b-2 border-dashed border-line/40 p-5", className)} {...props} />
)
const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("font-display text-xl font-semibold", className)} {...props} />
)
const DialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-ink-soft", className)} {...props} />
)
const DialogBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-5", className)} {...props} />
)
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex justify-end gap-2 border-t-2 border-dashed border-line/40 p-4", className)} {...props} />
)

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter }
