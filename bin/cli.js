#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const registryDir = path.join(root, "registry")
const registry = JSON.parse(fs.readFileSync(path.join(registryDir, "registry.json"), "utf8"))
const CONFIG = "linocut.json"
const cwd = process.cwd()

const args = process.argv.slice(2)
const flags = new Set(args.filter((a) => a.startsWith("-")))
const positional = args.filter((a) => !a.startsWith("-"))
const [cmd, ...names] = positional

const log = (m) => console.log(m)
const die = (m) => { console.error(`✗ ${m}`); process.exit(1) }

function detectPM() {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm add"
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn add"
  if (fs.existsSync(path.join(cwd, "bun.lockb")) || fs.existsSync(path.join(cwd, "bun.lock"))) return "bun add"
  return "npm install"
}

function install(deps) {
  const missing = [...new Set(deps)]
  if (!missing.length) return
  if (flags.has("--no-install") || !fs.existsSync(path.join(cwd, "package.json"))) {
    return log(`  install manually: ${missing.join(" ")}`)
  }
  const cmdline = `${detectPM()} ${missing.join(" ")}`
  log(`  $ ${cmdline}`)
  try { execSync(cmdline, { stdio: "inherit", cwd }) } catch { log("  (install failed — run it yourself)") }
}

function readConfig() {
  const p = path.join(cwd, CONFIG)
  if (!fs.existsSync(p)) die(`No ${CONFIG} found. Run \`linocut init\` first.`)
  return JSON.parse(fs.readFileSync(p, "utf8"))
}

function write(dest, content, label) {
  if (fs.existsSync(dest) && !flags.has("--overwrite")) {
    return log(`  skip   ${label} (exists, use --overwrite)`)
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, content)
  log(`  create ${label}`)
}

// Rewrite the "@/lib/utils" import to match the user's configured alias.
const rewrite = (src, cfg) => src.replaceAll("@/lib/utils", cfg.aliases.utils)

function init() {
  const src = fs.existsSync(path.join(cwd, "src")) ? "src" : "."
  const cfg = {
    $schema: "linocut",
    css: `${src}/styles/linocut.css`.replace("./", ""),
    components: `${src}/components/ui`.replace("./", ""),
    lib: `${src}/lib`.replace("./", ""),
    aliases: { utils: "@/lib/utils" },
  }
  write(path.join(cwd, CONFIG), JSON.stringify(cfg, null, 2) + "\n", CONFIG)
  write(path.join(cwd, cfg.css), fs.readFileSync(path.join(registryDir, "styles/linocut.css"), "utf8"), cfg.css)
  write(path.join(cwd, cfg.lib, "utils.ts"), fs.readFileSync(path.join(registryDir, "lib/utils.ts"), "utf8"), `${cfg.lib}/utils.ts`)
  install(registry.baseDependencies)
  log("\n✓ Initialised. Import the stylesheet in your entry point:")
  log(`    import "./${path.relative(src === "." ? "" : src, cfg.css)}"`)
  log("  Then: npx linocut add button card input")
}

function resolve(list, seen = new Set()) {
  for (const n of list) {
    const item = registry.ui[n]
    if (!item) die(`Unknown component "${n}". Run \`linocut list\`.`)
    if (seen.has(n)) continue
    seen.add(n)
    resolve(item.registryDependencies, seen)
  }
  return [...seen]
}

function add() {
  const cfg = readConfig()
  const targets = flags.has("--all") ? Object.keys(registry.ui) : names
  if (!targets.length) die("Specify components, or use --all.")
  const all = resolve(targets)
  const deps = []
  for (const n of all) {
    const item = registry.ui[n]
    const code = rewrite(fs.readFileSync(path.join(registryDir, "ui", item.file), "utf8"), cfg)
    write(path.join(cwd, cfg.components, item.file), code, `${cfg.components}/${item.file}`)
    deps.push(...item.dependencies)
  }
  install(deps)
  log(`\n✓ Added ${all.join(", ")}`)
}

function list() {
  log("linocut components:\n")
  for (const [n, i] of Object.entries(registry.ui)) {
    log(`  ${n.padEnd(10)} ${i.dependencies.length ? `(deps: ${i.dependencies.join(", ")})` : ""}`)
  }
}

const help = () => log(`linocut — paper & ink components you own

  init                 set up config, tokens and utils
  add <names...>       copy components into your project (--all for everything)
  list                 show available components

  flags: --overwrite  --no-install`)

switch (cmd) {
  case "init": init(); break
  case "add": add(); break
  case "list": list(); break
  default: help()
}
