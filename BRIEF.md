# Loafer — YC Prank Landing Page (brief)

## Goal
Build a single-page marketing site for a parody startup: **Loafer — the first law firm for AI agents** (not for companies; for agents). It should look *real* (YC-clean) but include a clear disclaimer in the footer.

## Site structure (one page)
- Hero: headline + subhead + 2 CTAs
- 3-column: Incorporation / Contracts / Defense
- "How it works" (3 steps)
- Viral scenarios (3 short bullets)
- FAQ (5 Qs)
- Footer with disclaimer

## Copy (use/adapt)
### Hero
- Headline: "Loafer — The First Law Firm for AI Agents"
- Subhead: "Incorporation. Contracts. Defense. Insurance-readiness — for autonomous software that can take real actions."
- CTA 1: "Incorporate my agent"
- CTA 2: "Get Agent Defense (24/7)"

### Modules
1) Agent Incorporation: entity wrapper + mandate + spending limits + audit trail requirements
2) Agent Contracts: agent↔human and agent↔agent templates with guardrails
3) Agent Defense: 72-hour incident response + disputes/litigation support

### Viral scenarios
- Agent vs Vendor: "it followed docs; vendor says misuse"
- Agent vs Owner: "went rogue" vs "followed mandate"
- Agent vs Agent: autonomous transaction default; who enforces?

### Footer disclaimer (must include)
"Parody concept for a fictional YC application video. Not a real law firm. No legal advice. No attorney–client relationship."

## Design direction
- Minimal, premium, high-contrast
- Modern legal-tech vibe (subtle serif for headings ok)
- Monoline icon set
- Optional accent color: electric blue (#3B82F6) or burgundy (#7F1D1D)

## Tech constraints
- Output should run locally with simple commands (prefer static site):
  - Option A: plain HTML + CSS (no build)
  - Option B: Vite + Tailwind
- Include responsive layout.
- Use semantic HTML and good typography.

## Deliverables
- A runnable project in this folder with a README.
- No external paid assets. Use system fonts or Google Fonts.
