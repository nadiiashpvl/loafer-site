# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

No test runner is configured.

## Architecture

Single-page static site with no framework. All content lives in two files:

- **`index.html`** — the entire page (nav, all sections, footer). Tailwind utility classes inline throughout.
- **`src/main.js`** — all client-side JS: FAQ accordion, mobile menu, copy-to-clipboard, and the `llms.txt` toggle (SPA-style view switch using `history.pushState`).
- **`src/style.css`** — Tailwind v4 entry (`@import "tailwindcss"`), custom `@theme` font variables, and hand-written CSS for FAQ animation and the markdown view.

### `llms.txt` feature

The nav has an `llms.txt` link. Clicking it hides `#normal-view`, shows `#markdown-view`, and renders `MARKDOWN_CONTENT` (a hardcoded string at the top of `main.js`) via `marked`. The URL changes to `/llms.txt` via `pushState`. The content in `MARKDOWN_CONTENT` mirrors the page copy — if you update page content, update that string too.

### Tailwind v4 setup

Tailwind is loaded via the Vite plugin (`@tailwindcss/vite`) — no `tailwind.config.js`. Custom fonts are declared with `@theme` in `style.css`. The `font-serif` utility class is overridden there to use `DM Serif Display`.

## GitHub

Repo: `nadiiashpvl/loafer-site` on GitHub (SSH remote `git@github.com:nadiiashpvl/loafer-site.git`).

Branch: `main` is the only branch. Push directly to `main` — no PR workflow is in use.

```bash
git add <files>
git commit -m "message"
git push
```

Use `gh repo view` or `gh browse` to open the repo in the browser.

### Assets

Team photos (`aleks.jpg`, `nadiia.jpg`) live in `public/` and are served at the root path (`/aleks.jpg`).
