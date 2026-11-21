import * as React from "react"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"
import { Label } from "@/ui/label"
import { Badge } from "@/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/ui/alert"
import { Switch } from "@/ui/switch"
import { Checkbox } from "@/ui/checkbox"
import { Separator } from "@/ui/separator"
import { Progress } from "@/ui/progress"
import { Skeleton } from "@/ui/skeleton"
import { Avatar } from "@/ui/avatar"
import { Kbd } from "@/ui/kbd"
import { Select } from "@/ui/select"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/tabs"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from "@/ui/dialog"

/* ---------- helpers ---------- */

function useCopy() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const copy = React.useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1500)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }, [])
  return { copied, copy }
}

function CopyCommand({ command, id }: { command: string; id: string }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(command, id)}
      className="group flex w-full items-center justify-between gap-4 rounded-md border-2 border-line bg-paper px-4 py-3 text-left font-mono text-sm shadow-stamp transition-all hover:bg-paper-2 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
      aria-label={"Copy command: " + command}
    >
      <span className="truncate"><span className="text-rust">$</span> {command}</span>
      <span className="shrink-0 text-xs text-ink-soft">{copied === id ? "copied ✓" : "copy"}</span>
    </button>
  )
}

/* ---------- showcase card ---------- */

type DemoProps = {
  id: string
  title: string
  description: string
  code: string
  children: React.ReactNode
  /** extra classes on the preview surface */
  stage?: string
  wide?: boolean
}

function Demo({ id, title, description, code, children, stage, wide }: DemoProps) {
  const { copied, copy } = useCopy()
  return (
    <section id={id} className={"scroll-mt-24 " + (wide ? "lg:col-span-2" : "")}>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm text-ink-soft">{description}</p>
        </div>
        <code className="rounded-sm border-2 border-line bg-paper-2 px-2 py-1 font-mono text-xs">
          npx linocut add {id}
        </code>
      </div>

      <div className="overflow-hidden rounded-md border-2 border-line bg-paper shadow-stamp">
        <Tabs defaultValue="preview" className="gap-0">
          <div className="flex items-center justify-between border-b-2 border-line bg-paper-2 px-3 py-2">
            <TabsList className="border-0 bg-transparent p-0">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <Button size="sm" variant="ghost" onClick={() => copy(code, id + "-code")}>
              {copied === id + "-code" ? "Copied ✓" : "Copy code"}
            </Button>
          </div>
          <TabsContent value="preview">
            <div
              className={
                "flex min-h-48 items-center justify-center p-8 [background-image:radial-gradient(color-mix(in_oklab,var(--color-ink)_12%,transparent)_1px,transparent_1px)] [background-size:20px_20px] " +
                (stage ?? "")
              }
            >
              <div className="w-full">{children}</div>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <pre className="max-h-96 overflow-auto bg-ink p-5 font-mono text-[13px] leading-relaxed text-paper">
              <code>{code}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

/* ---------- component index (sidebar) ---------- */

const INDEX = [
  ["button", "Button"],
  ["badge", "Badge"],
  ["form", "Form"],
  ["alert", "Alert"],
  ["progress", "Progress & Skeleton"],
  ["tabs", "Tabs"],
  ["table", "Table"],
  ["avatar", "Avatar"],
  ["dialog", "Dialog"],
  ["kbd", "Kbd"],
] as const

/* ---------- page ---------- */

export default function App() {
  const [dark, setDark] = React.useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  )
  const [on, setOn] = React.useState(true)
  const [open, setOpen] = React.useState(false)
  const [progress, setProgress] = React.useState(62)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <div className="min-h-screen">
      {/* nav */}
      <header className="sticky top-0 z-20 border-b-2 border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-display text-2xl font-bold">
            <span className="inline-block size-5 rotate-6 border-2 border-line bg-rust shadow-stamp-sm" aria-hidden />
            linocut
          </a>
          <nav className="flex items-center gap-1">
            <a href="#components" className="hidden px-3 text-sm font-medium hover:underline sm:inline">Components</a>
            <a href="#install" className="hidden px-3 text-sm font-medium hover:underline sm:inline">Install</a>
            <Button size="sm" variant="paper" onClick={() => setDark(!dark)} aria-pressed={dark}>
              {dark ? "☀ Light" : "☾ Dark"}
            </Button>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* hero */}
        <section className="border-b-2 border-line">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Badge variant="sun">v0.1 · React + Tailwind v4</Badge>
              <h1 className="mt-5 text-5xl font-bold leading-[1.02] sm:text-7xl">
                Components cut in <span className="relative inline-block text-rust">bold ink<span className="absolute -bottom-1 left-0 h-1.5 w-full bg-sun/70 -z-10" aria-hidden /></span>.
              </h1>
              <p className="mt-6 max-w-lg text-lg text-ink-soft">
                Copy-paste components with a handcrafted paper-and-ink look. Hard edges, flat colour,
                offset shadows. No runtime package — you own every line.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#components"><Button size="lg">Browse components</Button></a>
                <a href="#install"><Button size="lg" variant="paper">Get started</Button></a>
              </div>
            </div>

            {/* live collage */}
            <div className="relative mx-auto w-full max-w-md" aria-hidden>
              <Card className="-rotate-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Press room</CardTitle>
                    <Badge variant="moss">live</Badge>
                  </div>
                  <CardDescription>Zine #4 — 300 copies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={72} />
                  <div className="flex items-center gap-2">
                    <Avatar fallback="AB" /><Avatar fallback="CD" className="bg-moss text-on-moss" /><Avatar fallback="EF" className="bg-rust text-on-rust" />
                    <span className="ml-1 text-sm text-ink-soft">3 printers online</span>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" tabIndex={-1}>Approve</Button>
                  <Button size="sm" variant="paper" tabIndex={-1}>Reprint</Button>
                </CardFooter>
              </Card>
              <Alert variant="warn" className="absolute -bottom-10 -right-2 w-64 rotate-3 bg-paper">
                <AlertTitle>Low ink</AlertTitle>
                <AlertDescription>Order before Friday.</AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* install */}
        <section id="install" className="scroll-mt-16 border-b-2 border-line bg-paper-2">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-3">
            {[
              ["1", "Init", "npx linocut init"],
              ["2", "Add", "npx linocut add button card dialog"],
              ["3", "Own it", "Files land in your repo. Edit freely."],
            ].map(([n, t, c]) => (
              <div key={n} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-sm border-2 border-line bg-sun font-display font-bold shadow-stamp-sm">{n}</span>
                  <h2 className="text-xl font-bold">{t}</h2>
                </div>
                {n === "3" ? <p className="text-ink-soft">{c}</p> : <CopyCommand command={c} id={"step-" + n} />}
              </div>
            ))}
          </div>
        </section>

        {/* components */}
        <div id="components" className="mx-auto flex max-w-6xl gap-12 px-6 py-16">
          <aside className="sticky top-24 hidden h-fit w-44 shrink-0 lg:block">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-soft">Components</p>
            <ul className="space-y-1 border-l-2 border-line">
              {INDEX.map(([id, label]) => (
                <li key={id}>
                  <a href={"#" + id} className="-ml-0.5 block border-l-2 border-transparent px-3 py-1 text-sm hover:border-rust hover:font-medium hover:text-rust">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="grid min-w-0 flex-1 gap-14 lg:grid-cols-2">
            <Demo
              id="button" wide title="Button" description="Five variants, three sizes. Presses down like a stamp."
              code={`import { Button } from "@/components/ui/button"

<Button>Solid</Button>
<Button variant="paper">Paper</Button>
<Button variant="rust">Rust</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>`}
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button>Solid</Button>
                <Button variant="paper">Paper</Button>
                <Button variant="rust">Rust</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </Demo>

            <Demo
              id="badge" title="Badge" description="Tiny labels for status."
              code={`import { Badge } from "@/components/ui/badge"

<Badge>default</Badge>
<Badge variant="sun">sun</Badge>
<Badge variant="moss">moss</Badge>
<Badge variant="rust">rust</Badge>`}
            >
              <div className="flex flex-wrap justify-center gap-2">
                <Badge>default</Badge><Badge variant="sun">sun</Badge><Badge variant="moss">moss</Badge><Badge variant="rust">rust</Badge>
              </div>
            </Demo>

            <Demo
              id="kbd" title="Kbd" description="Keyboard hints that look like keycaps."
              code={`import { Kbd } from "@/components/ui/kbd"

<Kbd>⌘</Kbd> <Kbd>K</Kbd>`}
            >
              <p className="text-center text-sm">
                Open the palette with <Kbd>⌘</Kbd> <Kbd>K</Kbd>
              </p>
            </Demo>

            <Demo
              id="form" wide title="Form" description="Input, Textarea, Select, Checkbox and Switch composed in a Card."
              stage="items-start"
              code={`<Card>
  <CardHeader>
    <CardTitle>Sign in</CardTitle>
    <CardDescription>Welcome back to the press room.</CardDescription>
  </CardHeader>
  <CardContent className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <Label htmlFor="e">Email</Label>
      <Input id="e" placeholder="you@example.com" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="r">Role</Label>
      <Select id="r"><option>Printer</option><option>Designer</option></Select>
    </div>
    <Textarea placeholder="Say something…" className="sm:col-span-2" />
    <label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked /> Remember me</label>
    <label className="flex items-center gap-2 text-sm"><Switch checked={on} onCheckedChange={setOn} /> Notifications</label>
  </CardContent>
  <CardFooter className="justify-between">
    <Button variant="link">Forgot password?</Button>
    <Button>Sign in</Button>
  </CardFooter>
</Card>`}
            >
              <Card className="mx-auto max-w-2xl">
                <CardHeader>
                  <CardTitle>Sign in</CardTitle>
                  <CardDescription>Welcome back to the press room.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="e">Email</Label><Input id="e" placeholder="you@example.com" /></div>
                  <div className="space-y-2">
                    <Label htmlFor="r">Role</Label>
                    <Select id="r"><option>Printer</option><option>Designer</option><option>Editor</option></Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2"><Label htmlFor="m">Message</Label><Textarea id="m" placeholder="Say something…" /></div>
                  <label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked /> Remember me</label>
                  <label className="flex items-center gap-2 text-sm"><Switch checked={on} onCheckedChange={setOn} /> Notifications {on ? "on" : "off"}</label>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="link">Forgot password?</Button>
                  <Button>Sign in</Button>
                </CardFooter>
              </Card>
            </Demo>

            <Demo
              id="alert" wide title="Alert" description="Info, warning and danger — loud enough to notice."
              code={`<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Proofs are ready for review.</AlertDescription>
</Alert>
<Alert variant="warn">…</Alert>
<Alert variant="danger">…</Alert>`}
            >
              <div className="mx-auto grid max-w-xl gap-3">
                <Alert><AlertTitle>Heads up</AlertTitle><AlertDescription>Proofs are ready for review.</AlertDescription></Alert>
                <Alert variant="warn"><AlertTitle>Low ink</AlertTitle><AlertDescription>Order more before Friday.</AlertDescription></Alert>
                <Alert variant="danger"><AlertTitle>Press jammed</AlertTitle><AlertDescription>Check the rollers.</AlertDescription></Alert>
              </div>
            </Demo>

            <Demo
              id="progress" title="Progress & Skeleton" description="Click the bar to change it."
              code={`<Progress value={62} />

<div className="flex items-center gap-3">
  <Skeleton className="size-10" />
  <div className="flex-1 space-y-2">
    <Skeleton className="h-3 w-2/3" />
    <Skeleton className="h-3 w-1/3" />
  </div>
</div>`}
            >
              <div className="mx-auto max-w-xs space-y-6">
                <div className="space-y-2">
                  <Progress value={progress} />
                  <div className="flex items-center justify-between text-xs text-ink-soft">
                    <span>{progress}%</span>
                    <Button size="sm" variant="paper" onClick={() => setProgress((p) => (p >= 100 ? 0 : Math.min(100, p + 19)))}>
                      Advance
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10" />
                  <div className="flex-1 space-y-2"><Skeleton className="h-3 w-2/3" /><Skeleton className="h-3 w-1/3" /></div>
                </div>
              </div>
            </Demo>

            <Demo
              id="avatar" title="Avatar" description="Initials fallback, recolour with a class."
              code={`<Avatar fallback="AB" />
<Avatar fallback="CD" className="bg-moss text-on-moss" />
<Avatar fallback="EF" className="bg-rust text-on-rust" />`}
            >
              <div className="flex justify-center gap-3">
                <Avatar fallback="AB" /><Avatar fallback="CD" className="bg-moss text-on-moss" /><Avatar fallback="EF" className="bg-rust text-on-rust" />
              </div>
            </Demo>

            <Demo
              id="tabs" title="Tabs" description="Accessible tablist, zero dependencies."
              code={`<Tabs defaultValue="team">
  <TabsList>
    <TabsTrigger value="team">Team</TabsTrigger>
    <TabsTrigger value="jobs">Jobs</TabsTrigger>
  </TabsList>
  <TabsContent value="team">…</TabsContent>
  <TabsContent value="jobs">…</TabsContent>
</Tabs>`}
            >
              <Tabs defaultValue="team" className="mx-auto max-w-xs">
                <TabsList>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="jobs">Jobs</TabsTrigger>
                </TabsList>
                <TabsContent value="team"><p className="text-sm text-ink-soft">Three printers, one very tired editor.</p></TabsContent>
                <TabsContent value="jobs"><p className="text-sm text-ink-soft">Two jobs in the queue.</p></TabsContent>
              </Tabs>
            </Demo>

            <Demo
              id="table" wide title="Table" description="Ruled like a ledger."
              code={`<Table>
  <TableHeader>
    <TableRow><TableHead>Job</TableHead><TableHead>Status</TableHead><TableHead>Copies</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Poster A2</TableCell>
      <TableCell><Badge variant="moss">done</Badge></TableCell>
      <TableCell>120</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
            >
              <div className="mx-auto max-w-xl bg-paper">
                <Table>
                  <TableHeader><TableRow><TableHead>Job</TableHead><TableHead>Status</TableHead><TableHead>Copies</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Poster A2</TableCell><TableCell><Badge variant="moss">done</Badge></TableCell><TableCell>120</TableCell></TableRow>
                    <TableRow><TableCell>Zine #4</TableCell><TableCell><Badge variant="sun">printing</Badge></TableCell><TableCell>300</TableCell></TableRow>
                    <TableRow><TableCell>Flyer</TableCell><TableCell><Badge variant="rust">jammed</Badge></TableCell><TableCell>50</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
            </Demo>

            <Demo
              id="dialog" wide title="Dialog" description="Esc or click outside to close."
              code={`const [open, setOpen] = React.useState(false)

<Button onClick={() => setOpen(true)}>Open dialog</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogHeader>
    <DialogTitle>Discard this proof?</DialogTitle>
    <DialogDescription>This can't be undone.</DialogDescription>
  </DialogHeader>
  <DialogBody>Press <Kbd>Esc</Kbd> or click outside to close.</DialogBody>
  <DialogFooter>
    <Button variant="paper" onClick={() => setOpen(false)}>Keep</Button>
    <Button variant="rust" onClick={() => setOpen(false)}>Discard</Button>
  </DialogFooter>
</Dialog>`}
            >
              <div className="flex justify-center">
                <Button onClick={() => setOpen(true)}>Open dialog</Button>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogHeader><DialogTitle>Discard this proof?</DialogTitle><DialogDescription>This can't be undone.</DialogDescription></DialogHeader>
                <DialogBody className="text-sm">Press <Kbd>Esc</Kbd> or click outside to close.</DialogBody>
                <DialogFooter>
                  <Button variant="paper" onClick={() => setOpen(false)}>Keep</Button>
                  <Button variant="rust" onClick={() => setOpen(false)}>Discard</Button>
                </DialogFooter>
              </Dialog>
            </Demo>
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-line bg-paper-2">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-ink-soft">
          <span className="font-display text-lg font-bold text-ink">linocut</span>
          <Separator className="hidden flex-1 sm:block" />
          <span>MIT licensed. Cut, paste, print.</span>
        </div>
      </footer>
    </div>
  )
}
