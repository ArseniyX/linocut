import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{ value: string; setValue: (v: string) => void } | null>(null)
const useTabs = () => {
  const c = React.useContext(TabsContext)
  if (!c) throw new Error("Tabs components must be used inside <Tabs>")
  return c
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  defaultValue: string
  value?: string
  onValueChange?: (v: string) => void
}

function Tabs({ defaultValue, value, onValueChange, className, ...props }: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal
  const setValue = (v: string) => { setInternal(v); onValueChange?.(v) }
  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={cn("flex flex-col gap-3", className)} {...props} />
    </TabsContext.Provider>
  )
}

const TabsList = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div role="tablist" className={cn("inline-flex w-fit gap-1 rounded-md border-2 border-line bg-paper-2 p-1", className)} {...props} />
)

function TabsTrigger({ value, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const t = useTabs()
  const active = t.value === value
  return (
    <button
      role="tab"
      type="button"
      aria-selected={active}
      onClick={() => t.setValue(value)}
      className={cn(
        "rounded-sm px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-rust",
        active ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ value, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const t = useTabs()
  if (t.value !== value) return null
  return <div role="tabpanel" className={className} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
