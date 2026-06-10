# Handoff: Simon Eves Portfolio Site

## Overview
A single-page personal portfolio for Simon Eves — full-stack developer & designer at Flomedia (Southend-on-Sea, Essex). Sections: fixed nav, full-height hero with animated headline and "Currently" widget, infinite skills marquee, filterable 12-project work grid, about section with stack pills, contact block, giant animated "SIMON EVES" wordmark sign-off, and footer. Light + dark themes with a persisted toggle.

## About the Design Files
The files in this bundle are **design references created in HTML** — a high-fidelity prototype showing the intended look and behavior, NOT production code to copy verbatim. Your task is to **recreate this design in the target codebase's environment**. The footer says "Built with Next.js" — if no codebase exists yet, a Next.js (App Router) + Tailwind or CSS-modules project is the natural target. Re-implement the markup, tokens and interactions using the framework's idioms (components, `next/font`, IntersectionObserver hooks, etc.).

`Portfolio v2.html` is fully self-contained (all CSS and vanilla JS inline) and runs by opening it in a browser — use it as the living spec. `tweaks-panel.jsx` is a design-review tool used during the design process; **do not ship it**.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy and animations are final intent. Recreate pixel-perfectly.

## Fonts
- **Headings / wordmark / marquee:** `Degular Display` (Adobe Fonts, weight 800/700). The prototype falls back to **Schibsted Grotesk** (Google Fonts) until a Typekit kit is linked. In production, load the real Degular kit: `<link rel="stylesheet" href="https://use.typekit.net/XXXXXXX.css">` and keep `'degular-display', 'Schibsted Grotesk', sans-serif` as the stack.
- **Body:** `Geist` (300–900), with `font-feature-settings: "ss01", "cv11"`.
- **Mono / labels:** `Geist Mono` (400, 500) — used for all small uppercase labels, tags, section tags, footer.

## Design Tokens

### Colors — light theme (`:root`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#FBFBFB` | page background |
| `--bg-2` | `#F2F2F2` | thumb placeholders, tag chips |
| `--surface` | `#FFFFFF` | cards, Now widget |
| `--ink` | `#141414` | primary text |
| `--ink-2` | `#3A3A3A` | body text |
| `--ink-3` | `#7C7C7C` | labels, secondary |
| `--ink-4` | `#B5B5B5` | muted heading spans, separators |
| `--border` | `rgba(20,20,20,0.08)` | hairlines |
| `--border-strong` | `rgba(20,20,20,0.14)` | hover borders |
| `--accent` | `#4A2B7A` | purple accent (headline span, links, hover flashes) |
| `--accent-soft` | `#EEE6F8` | soft accent fill |

### Colors — dark theme (`html[data-theme="dark"]`)
| Token | Value |
|---|---|
| `--bg` | `#0E0C0A` |
| `--bg-2` | `#181613` |
| `--surface` | `#15120F` |
| `--ink` | `#F5F2EC` |
| `--ink-2` | `#D6D1C7` |
| `--ink-3` | `#8F8A80` |
| `--ink-4` | `#5A554D` |
| `--border` | `rgba(245,242,236,0.10)` |
| `--border-strong` | `rgba(245,242,236,0.18)` |
| `--accent` | `#B533B5` (magenta in dark mode) |
| `--accent-soft` | `rgba(181,51,181,0.18)` |

### Other tokens
- Radius: `--radius: 10px` (cards), `--radius-sm: 6px` (thumbs), `999px` pills
- Max width: `--maxw: 1320px`, horizontal padding 32px (20px ≤960px)
- Selection: accent bg, white text
- Film grain: fixed full-viewport SVG `feTurbulence` noise overlay, `opacity 0.045` + `multiply` (light), `0.10` + `screen` (dark), `z-index 9998`, pointer-events none

### Typography scale
| Element | Font | Size | Weight | Tracking / leading |
|---|---|---|---|---|
| Hero title | Degular | `clamp(48px, 8vw, 112px)` | 800 | `-0.025em` / `0.98` |
| Section title | Degular | `clamp(30px, 3.8vw, 48px)` | 800 | `-0.02em` / `1.04` |
| About heading | Degular | `clamp(36px, 4.5vw, 64px)` | 800 | `-0.02em` / `1` |
| Contact title | Degular | `clamp(44px, 6.5vw, 88px)` | 800 | `-0.025em` / `0.98` |
| Big wordmark | Degular | `clamp(64px, 13.2vw, 178px)` | 800 | `-0.025em` / `0.9`, uppercase, nowrap |
| Card title | Degular | 22px (30px on span-8, 26px on span-6) | 700 | `-0.01em` / `1.2` |
| Body / hero desc | Geist | 16–17px | 400 | `1.55–1.7` |
| Card desc | Geist | 14px (15px wide cards) | 400 | `1.6` |
| Mono labels | Geist Mono | 10–12px | 400–500 | `0.04–0.1em`, uppercase |
| Nav links | Geist | 13px | 400/500 | — |
| Marquee | Degular | 20px | 800 | `0.04em`, uppercase |

## Screens / Sections

### Nav (fixed)
- Fixed top, full width, `padding 18px 32px`, flex space-between, `z-index 100`.
- Background: `color-mix(in oklab, var(--bg) 82%, transparent)` + `backdrop-filter: blur(16px) saturate(140%)`, 1px bottom border.
- Left: stacked two-line wordmark "SIMON / EVES" — Degular 800, 20px, line-height 0.92, uppercase, `-0.01em`. Hover: `rotate(-3deg) scale(1.05)` + accent color, `0.4s cubic-bezier(.2,.7,.2,1)`.
- Right (flex, gap 28px): "Work", "About" (13px, `--ink-3` → `--ink` on hover), theme toggle, "Get in touch" pill CTA (`--ink` bg, `--bg` text, radius 999px, 8px 14px, lifts `-1px` on hover).
- Theme toggle: 34px circle button, sun/moon SVGs cross-fade with rotate+scale (`0.5s cubic-bezier(.4,1.6,.4,1)`).

### 01 Hero
- `min-height: 100vh`, flex column centered, padding `140px 0 80px`.
- Decorative glow: 520px radial accent blob, top 20% / right -10%, `blur(40px)`, opacity 0.5 (0.7 dark), 14s float loop, plus scroll parallax (`translateY(scrollY * 0.25)`).
- Status line (Geist Mono 12px): pulsing 8px green dot `#1F8A5B` (2.4s opacity pulse) + "Available for select projects · Southend-on-Sea, Essex".
- Headline (4 lines): "Full-stack developer / & designer building / **platforms, products** / and brands." Line 3 is accent color and tilted `rotate(-1.5deg)`; line 4 is `--ink-4`.
- **Load animation:** JS splits headline into word masks (`.wm` overflow hidden) containing word spans (`.w`); words start `translateY(130%)` and rise to 0 with `0.9s cubic-bezier(.16,1,.3,1)`, staggered 60ms per word, starting ~150ms after load. After the cascade finishes the masks switch to `overflow: visible` (class `settled`).
- **Hover:** each word is further split into letter spans (`.hl`); hovered letter nudges up `-0.09em` (0.4s ease, 40% peak) and flashes accent color.
- Below, a bordered-top two-column row (1.5fr/1fr, gap 56px): left a 460px max description paragraph; right the **"Currently" widget** — a `--surface` card (border, radius 10px, padding 22px 24px) with mono "CURRENTLY" header + accent dot, and three key/value rows (76px label column, hairline separators): Building / At / Open to.

### Marquee
- Full-bleed strip (`width: 100vw; margin-left: calc(50% - 50vw)`), 1px top+bottom borders, `padding 16px 0`.
- Content group: "FULL-STACK ✦ DESIGN ✦ BRAND ✦ PRINT ✦ AI TOOLING ✦" — Degular 800 20px uppercase, ✦ separators in `--ink-4`, 12px right padding per item.
- **Infinite loop:** JS measures the group width, clones the group enough times to cover `viewport + one group`, sets `--gw` (one group width in px) and `--dur` (speed normalized to ~80px/s) on the track; keyframes translate from 0 to `-1 * var(--gw)` so the wrap is seamless. Recalculates on resize. Honors reduced motion (static).

### 02 Work
- Section padding `100px 0`. Header row: mono section tag "SELECTED WORK · 2023–2026" (with 18px dash prefix) + title "Twelve projects across SaaS, e-commerce, / tooling, brand and print." (second line muted); right-aligned mono counter "12 / 12" that updates on filter.
- **Filter bar:** pill buttons (13px, border, radius 999px): All / Full-stack / SaaS / E-commerce / WordPress / Design & brand / AI & tooling / Print. Active = `--ink` bg, `--bg` text. Filtering toggles `display:none` on non-matching cards (cards carry `data-tags`) and updates the counter "n / 12".
- **Grid:** 12-column CSS grid, 16px gap. Card spans: #01 span-8 (featured, horizontal layout, thumb 56% width, 21/9), #02 span-4, #03 + #04 span-6, #05–#12 span-4 (default). All span-12 below 960px.
- **Card anatomy** (surface bg, 1px border, radius 10px, padding 24px): head row (mono index "01" + outlined type pill) → 16/9 thumb placeholder (bg-2, diagonal hairline stripes via repeating-linear-gradient, centered mono label) → accent category line → Degular title → 14px desc → mono tag chips (bg-2, radius 4px) → bordered-top footer ("Case study ↗" link + mono year). Arrow translates (3px,-3px) on card hover.
- **Card hover:** lift `-3px`, stronger border, soft shadow `0 14px 40px -20px rgba(20,17,15,0.18)`, plus pointer-tracking 3D tilt (max ±5°, `perspective(900px)`, springs back on leave).
- The 12 projects and all copy are final — take titles, descriptions, tags and years verbatim from the HTML.

### 03 About
- Bordered-top section, `100px 0`. Section tag "ABOUT", title "Developer. Designer. / Builder of useful things." (line 2 muted).
- Two-column grid (1fr/1.2fr, gap 80px): left the big heading "End-to-end / from schema to signage." (line 2 muted); right two paragraphs + "STACK & TOOLS" pill list (14 mono pills, border, radius 999px, hover darkens).

### 04 Contact
- Bordered-top, `120px 0 100px`. Two-column (1fr/1fr, gap 56px, align end): left "Let's build / something." (line 2 accent); right three rows — Email (`hello@simoneves.co.uk` ↗), Elsewhere (LinkedIn ↗), Based in (Southend-on-Sea, Essex). Links: 18px medium, underline on hover, arrow translates (2px,-2px).

### Wordmark sign-off
- Centered giant "SIMON EVES" (one line, nowrap) above the footer, `padding 24px 0 56px`.
- **Scroll reveal:** JS splits into letter spans (`.ltr`); when 35% visible (IntersectionObserver, once), letters rise from `translateY(115%)` to 0, `0.9s cubic-bezier(.16,1,.3,1)`, staggered 38ms per letter. Container is clipped during reveal, then unclips (`settled` class) after ~`letters*38ms + 1s`.
- **Hover:** per-letter pop — `0.55s cubic-bezier(.34,1.56,.64,1)` keyframes: up 14% + rotate -5° + scale 1.08, overshoot down, settle — with accent color flash.

### Footer
- Bordered-top, mono 11px, `--ink-3`: "© 2026 Simon Eves — Built with Next.js" left; Work / About / Contact links right. Stacks centered below 960px.

## Interactions & Behavior (summary)
- **Theme toggle:** flips `data-theme` on `<html>`, persists to `localStorage('theme')`, read back on load. All colors swap via CSS variables.
- **Custom cursor (pointer devices only):** 6px white dot (fast lerp 0.45) + 36px ring (slow lerp 0.14), `mix-blend-mode: difference`, rAF loop. Ring grows to 60px over links/buttons, 80px with subtle fill over cards. Hidden when cursor leaves window and entirely on touch (`@media (hover: none)`).
- **Scroll reveals:** `.reveal` elements (cards, section titles, etc.) fade/rise in (16px, 0.6s) via IntersectionObserver.
- **Reduced motion:** every animation (hero cascade, marquee, wordmark, pops) is gated behind `@media (prefers-reduced-motion: no-preference)` — content shows in final state with no motion otherwise.

## State Management
Minimal — no data fetching:
- `theme: 'light' | 'dark'` (persisted)
- `activeFilter: string` + derived visible-count
- Animation flags via classes: `in` / `settled` on hero title and wordmark

## Assets
- No raster images shipped. Project thumbnails are intentional placeholders (striped bg + label) — replace with real screenshots per project. Icons are inline SVG (sun, moon, ↗ arrows). Grain is an inline SVG data-URI.

## Files
- `Portfolio v2.html` — the complete design reference (all CSS + JS inline)
- `tweaks-panel.jsx` — design-review tweaks panel used during prototyping; reference only, do not ship
