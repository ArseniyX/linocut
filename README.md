# linocut: neobrutalist React + Tailwind CSS components

[![license: MIT](https://img.shields.io/badge/license-MIT-1c1a17)](LICENSE)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-c2410c)](https://tailwindcss.com)
[![React 19](https://img.shields.io/badge/React-19-3f6212)](https://react.dev)
[![Live demo](https://img.shields.io/badge/demo-live-e8b931)](https://arseniyx.github.io/linocut/)

**A copy-paste React component library with a hand-printed, paper-and-ink look.** Thick ink borders, flat colour, hard offset "stamp" shadows, and warm paper tones, with built-in dark mode. Same copy-the-source model as shadcn/ui, but with a distinct visual identity and **no Radix or headless-UI dependency**.

**[Live demo →](https://arseniyx.github.io/linocut/)**

[![linocut: neobrutalist React and Tailwind CSS components](docs/screenshot.jpg)](https://arseniyx.github.io/linocut/)

## Why linocut?

Most shadcn-style libraries share one look: neutral grey, soft shadows, rounded corners. linocut gives you a different one, inspired by linocut block printing: bold outlines, a limited ink palette (`ink`, `rust`, `moss`, `sun`) and shadows that press flat when you click.

- **A real visual identity.** Not a re-skin of the default theme. Buttons physically press down, tables are ruled like a ledger, and cards have dashed print marks.
- **Zero UI-library dependencies.** No Radix, no Headless UI. Just React, Tailwind, `clsx` and `tailwind-merge` (plus `class-variance-authority` for variant components). The Dialog uses the native `<dialog>` element, so focus trapping, `Esc` and top-layer stacking come from the browser.
- **Small, readable source.** Every component is a single file of roughly 15 to 60 lines. Read it in a minute, change it in two.
- **You own the code.** `npx linocut add` copies files into your repo. No package to upgrade, no version lock-in, no fighting a library's API.
- **Tailwind v4 native.** Design tokens are plain `@theme` variables in one CSS file, with no `tailwind.config.js`.
- **Dark mode that holds up.** Paper and ink swap, and the coloured fills keep fixed foreground colours so text stays readable.

## Quick start

```bash
npx linocut init                       # config, design tokens, cn() util
npx linocut add button card dialog     # copy components into your project
```

`init` creates `linocut.json`, `styles/linocut.css` and `lib/utils.ts` (under `src/` if you have one), and installs the base dependencies. Import the stylesheet once in your entry point:

```ts
import "./styles/linocut.css"
```

Then use the components:

```tsx
import { Button } from "@/components/ui/button"

<Button variant="rust">Print</Button>
```

## linocut vs. shadcn/ui

| | linocut | shadcn/ui |
| --- | --- | --- |
| Distribution | Copy source into your repo via CLI | Copy source into your repo via CLI |
| Visual style | Neobrutalist paper-and-ink: hard borders, flat colour, stamp shadows | Neutral, soft, minimal |
| Primitives | Plain React plus native HTML (`<dialog>`) | Radix UI |
| Extra dependencies | `clsx`, `tailwind-merge`, `class-variance-authority` | Radix packages, plus the above |
| Tailwind | v4, `@theme` tokens | v3 and v4 |
| Component count | 18 and growing | 50+ |
| Complex widgets (combobox, date picker, popover, menus) | Not yet | Yes |

**When to pick shadcn/ui instead:** you need a large set of accessible, battle-tested complex widgets today, or you want a neutral look. **Pick linocut when** you want a bold, memorable style on small, dependency-free components, for landing pages, indie products, dashboards with personality, or side projects. You can also mix them: both are just files in your repo.

## Components

`alert` · `avatar` · `badge` · `button` · `card` · `checkbox` · `dialog` · `input` · `kbd` · `label` · `progress` · `select` · `separator` · `skeleton` · `switch` · `table` · `tabs` · `textarea`

```bash
npx linocut list          # show everything available
npx linocut add --all     # add every component
```

| Flag           | Effect                                     |
| -------------- | ------------------------------------------ |
| `--overwrite`  | replace files that already exist           |
| `--no-install` | print dependencies instead of installing   |

## Use cases

- Indie products and SaaS landing pages that shouldn't look like every other template
- Portfolios, zines, blogs and documentation sites
- Internal tools and dashboards with a bit of character
- Hackathon and side projects where you want something distinctive fast

## Theming

All design tokens live in `styles/linocut.css` as Tailwind v4 `@theme` variables: `paper`, `ink`, `rust`, `moss`, `sun`, fonts, radii and the stamp shadows. Dark mode is a `.dark` class on a parent element. Edit the file freely.

Text on the coloured fills uses `text-on-sun`, `text-on-moss` and `text-on-rust`, which stay the same in both themes.

## Develop

```bash
npm install
npm run preview:dev      # showcase site on localhost
npm run preview:build    # production build to preview/dist
npm run typecheck
```

The showcase in `preview/` is deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.

## FAQ

**Is linocut a shadcn alternative?** It uses the same model (copy the source, own it) but ships a different design language and no Radix dependency. It has fewer components, so it's an alternative for style, not for breadth.

**Is it neobrutalism?** In spirit, yes: thick borders, hard shadows and flat colour. linocut leans warmer and more print-like than the typical bright neobrutalist kit.

**Does it work with Next.js, Vite, Remix or Astro?** Anything that runs React and Tailwind CSS v4. It is developed and tested against React 19; other versions are untested.

**Is it accessible?** Components use semantic HTML, visible focus outlines and ARIA roles where needed (tabs, dialog, switch). It has fewer built-in behaviours than Radix-based libraries, so test complex flows yourself.

## License

MIT. See [LICENSE](LICENSE).
