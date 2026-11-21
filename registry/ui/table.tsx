import * as React from "react"
import { cn } from "@/lib/utils"

const Table = ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-auto rounded-md border-2 border-line bg-paper shadow-stamp">
    <table className={cn("w-full text-sm", className)} {...props} />
  </div>
)
const TableHeader = (p: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="border-b-2 border-line bg-paper-2" {...p} />
)
const TableBody = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...p} />
const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn("border-b border-dashed border-line/40 last:border-0 hover:bg-paper-2/60", className)} {...props} />
)
const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("h-10 px-4 text-left font-mono text-xs font-medium uppercase tracking-widest", className)} {...props} />
)
const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("px-4 py-3", className)} {...props} />
)

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
