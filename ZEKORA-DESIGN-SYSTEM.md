# ZEKORA — Design System & Visual Identity Guide

> **Version:** 3.0
> **Status:** Active — applies to all Zekora products
> **Last updated:** May 2026
> **Owner:** Zekora
> **Scope:** Websites, mobile apps, SaaS dashboards, internal tools, marketing materials.
> **Implementation reference:** the website at `D:/Zekora/website/zekora/` is the canonical implementation of this system. When the docs and the code disagree, the code wins and this doc is updated.

---

## Table of Contents

1. [Purpose & Philosophy](#1-purpose--philosophy)
2. [File Map](#2-file-map)
3. [Brand Identity](#3-brand-identity)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [Spacing & Layout](#6-spacing--layout)
7. [Border Radius & Shapes](#7-border-radius--shapes)
8. [Shadows & Elevation](#8-shadows--elevation)
9. [Iconography](#9-iconography)
10. [Motion & Animation](#10-motion--animation)
11. [Dark Mode Token Pattern](#11-dark-mode-token-pattern)
12. [Component Library](#12-component-library)
13. [Mockup Library](#13-mockup-library)
14. [Page Structure Patterns](#14-page-structure-patterns)
15. [Page Transitions](#15-page-transitions)
16. [Blog & Long-Form Content](#16-blog--long-form-content)
17. [Imagery & Illustrations](#17-imagery--illustrations)
18. [Responsive Design](#18-responsive-design)
19. [Accessibility](#19-accessibility)
20. [SEO & Structured Data](#20-seo--structured-data)
21. [Code Standards](#21-code-standards)
22. [Brand Configuration Pattern](#22-brand-configuration-pattern)
23. [Internationalization (i18n)](#23-internationalization-i18n)
24. [Platform-Specific Guidelines](#24-platform-specific-guidelines)
25. [Anti-Patterns — What to Avoid](#25-anti-patterns--what-to-avoid)
26. [Checklist for New Projects](#26-checklist-for-new-projects)
27. [Quick Reference Card](#27-quick-reference-card)

---

## 1. Purpose & Philosophy

### 1.1 Purpose

This document is the **single source of truth** for visual and interaction decisions across every Zekora product. It exists so we can:

- Maintain visual consistency across web, mobile, SaaS, marketing.
- Protect the brand from emotional or improvised design choices.
- Onboard new contributors quickly — open the doc, ship on-brand within hours.
- Spin up new products without re-inventing the language.

> **Rule:** any new visual asset, UI component, or design decision should comply with this document. If it can't, update this document first.

### 1.2 Core Visual Philosophy

Every Zekora interface must feel:

| Attribute       | Meaning                                              |
| --------------- | ---------------------------------------------------- |
| **Clean**       | No clutter. White space is intentional, not lazy.    |
| **Structured**  | Grid-aligned. Clear hierarchy. Organised.            |
| **Modern**      | Current patterns. Not trendy. Not retro.             |
| **Trustworthy** | Professional, reliable, predictable.                 |
| **Calm**        | Not noisy. No gimmicks. No bouncy demos.             |
| **Confident**   | Generous type, deliberate motion, real product UI.   |

> **The golden test:** if it looks "too flashy", it's probably wrong. If it looks "too simple", it's probably right.

### 1.3 Brand personality in UI

Zekora is:
- **Professional**, not corporate
- **Clear**, not complicated
- **Calm**, not loud
- **Confident**, not arrogant
- **Modern**, not trendy

> If Zekora were a person: *a calm, intelligent engineer who explains complex things simply.*

---

## 2. File Map

Every token, font, logo, mockup and component referenced in this doc has a real file. Cross-reference:

```
app/
  globals.css                 ← Tokens (:root + .dark) + @theme inline + prose-zekora
  layout.tsx                  ← Root layout, localFont setup, no-FOUC theme script, metadata
  sitemap.ts / robots.ts / manifest.ts
  fonts/                      ← Bundled Outfit, Inter, JetBrains Mono .ttf files
  [locale]/
    layout.tsx                ← Locale wrapper: dictionary, JsonLd, Navbar, Footer
    template.tsx              ← Page transition (re-mounts per route)
    page.tsx                  ← Home
    about/        AboutContent.tsx
    services/     ServicesContent.tsx
    portfolio/    PortfolioContent.tsx
    contact/      ContactContent.tsx
    blog/         page.tsx + [slug]/page.tsx

components/
  ui/             Button.tsx, ThemeToggle.tsx
  layout/         Navbar.tsx, Footer.tsx
  sections/       SectionWrapper.tsx, PageHeader.tsx, CtaBand.tsx,
                  CountUp.tsx, HeroShowcase.tsx, ProjectCard.tsx,
                  ProjectDetailModal.tsx
  mockups/        Mockups.tsx     (BrowserMock, PhoneMock, FloatingChip, PulseDot)
  seo/            JsonLd.tsx

lib/
  config.ts                   ← BRAND constants + t() placeholder helper
  utils.ts                    ← cn() (clsx + tailwind-merge)
  i18n.ts                     ← locale list + getDictionary()
  dictionaries/               ← en.json, fr.json
  dictionary-context.tsx / locale-context.tsx
  blog.ts                     ← Typed BlogPost records
  seo.ts                      ← alternatesFor() + JSON-LD builders

public/
  logos/                      ← zekora-logo.svg, zekora-logo-white.svg,
                                zekora-icon.svg, zekora-icon-white.svg
  og-image.png                ← 1600 × 900 social preview
  _headers                    ← Cloudflare cache + security headers
```

When in doubt: **read the file path** above and follow that pattern.

---

## 3. Brand Identity

### 3.1 Name

- **Full name:** Zekora
- **Wordmark (visual):** lowercase-set "Zekora" in Outfit SemiBold, deep indigo
- **Alternate (SEO-friendly):** "Zekora Tech" — matches the domain `zekoratech.com`
- **Positioning:** *Zekora builds digital solutions that structure, modernise, and grow businesses.*

### 3.2 Logo system

| File                                       | Use                                            |
| ------------------------------------------ | ---------------------------------------------- |
| `public/logos/zekora-logo.svg`             | Wordmark on **light** surfaces (default)       |
| `public/logos/zekora-logo-white.svg`       | Wordmark on **dark** surfaces (footer, hero)   |
| `public/logos/zekora-icon.svg`             | Icon mark only (favicon, app icon, watermark)  |
| `public/logos/zekora-icon-white.svg`       | Icon mark on dark surfaces                     |

The logo is a **wordmark** — typographic, not an abstracted geometric Z. No icon-in-a-box badge. The icon mark exists for app icons and tight spaces (favicons, manifest) only.

### 3.3 Logo rules

✅ **Do:**
- Keep proportional at all sizes.
- Use the white variant on any background darker than `--c-primary`.
- Maintain breathing space ≥ 50% of logo height on all sides.
- Use SVG everywhere — never raster.

❌ **Never:**
- Stretch, rotate, recolour or distort the wordmark.
- Add shadows, glows, gradients, or outlines.
- Re-letter the wordmark in a different typeface — always use the bundled SVG.
- Place over a busy photo without a solid panel underneath.

### 3.4 Signature lines

For client work, use one of:
- *"Built by Zekora"* — typical default
- *"Powered by Zekora"* — when Zekora-built tech is a feature

Placement: footer, subtle, never intrusive.

---

## 4. Color System

### 4.1 Source of truth

Tokens live in **`app/globals.css`**, defined twice — once on `:root` (light), once on `.dark` (dark) — and then mapped into Tailwind's `@theme inline { ... }` block so they're available as `bg-primary`, `text-secondary`, etc.

### 4.2 Light palette (`:root`)

| Token                  | Value       | Role                                                    |
| ---------------------- | ----------- | ------------------------------------------------------- |
| `--c-bg`               | `#ffffff`   | Page background                                         |
| `--c-fg`               | `#14162e`   | Default body text                                       |
| `--c-primary`          | `#2e3a9e`   | Brand indigo — headings, CTAs, links                    |
| `--c-primary-fg`       | `#ffffff`   | Text on primary                                         |
| `--c-primary-light`    | `#eef0fb`   | Tinted indigo surface (active nav, badge bg)            |
| `--c-primary-lighter`  | `#f5f6fc`   | Subtle indigo background                                |
| `--c-primary-hover`    | `#222a75`   | Primary hover                                           |
| `--c-secondary`        | `#1e9e86`   | Brand teal — accents, secondary CTAs                    |
| `--c-secondary-fg`     | `#ffffff`   | Text on secondary                                       |
| `--c-secondary-light`  | `#e4f4f0`   | Teal-tinted surface                                     |
| `--c-secondary-hover`  | `#147a68`   | Secondary hover                                         |
| `--c-muted`            | `#f6f7fb`   | Alternating section background                          |
| `--c-muted-fg`         | `#565c73`   | Secondary text on light surfaces                        |
| `--c-border`           | `#e7e9f2`   | Borders, dividers                                       |
| `--c-card`             | `#ffffff`   | Card surface                                            |
| `--c-card-hover`       | `#fafbfd`   | Card hover surface                                      |
| `--c-ink`              | `#14162e`   | Strong text (titles)                                    |
| `--c-slate`            | `#565c73`   | Soft secondary text                                     |
| `--c-steel`            | `#8a8fa3`   | Tertiary text, axis labels                              |
| `--c-mist`             | `#d8dbe7`   | Soft fill, fake "text" bars in mockups                  |
| `--c-cloud`            | `#eceef5`   | Subtle elevation surface                                |
| `--c-paper`            | `#f6f7fb`   | Section "paper" background                              |
| `--c-brand`            | `#2e3a9e`   | Same as primary — used in copy ("text-brand")           |
| `--c-indigo-tint`      | `#eef0fb`   | Accent tint                                             |
| `--c-teal`             | `#1e9e86`   | Same as secondary                                       |
| `--c-teal-deep`        | `#147a68`   | Deeper teal                                             |
| `--c-teal-tint`        | `#e4f4f0`   | Same as secondary-light                                 |
| `--c-indigo-darker`    | `#1a1f4a`   | Footer background                                       |
| `--grid-line`          | `rgba(46,58,158,0.055)` | `.bg-grid` overlay                          |

### 4.3 Dark palette (`.dark`)

The same tokens are redefined under `.dark`. Highlights of the dark variant:

| Token                  | Dark value  | Notes                                                   |
| ---------------------- | ----------- | ------------------------------------------------------- |
| `--c-bg`               | `#0f1020`   | Deep indigo-black                                       |
| `--c-fg`               | `#e8eaf4`   | Off-white body                                          |
| `--c-primary`          | `#2e3a9e`   | Same hue — but `--c-brand` lifts to `#8e98f2` for legibility |
| `--c-brand`            | `#8e98f2`   | Lifted indigo — used for links / brand text in dark     |
| `--c-secondary`        | `#2ab89d`   | Slightly brighter teal                                  |
| `--c-card`             | `#1c1e38`   | Card surface                                            |
| `--c-ink`              | `#e8eaf4`   | Inverts in dark mode                                    |
| `--c-paper`            | `#15172a`   | Section paper                                           |
| `--c-indigo-darker`    | `#090a14`   | Footer in dark                                          |
| `--grid-line`          | `rgba(255,255,255,0.05)` | Grid overlay                                |

> **Critical:** `--c-ink` flips meaning between light (`#14162e`) and dark (`#e8eaf4`). Never use raw `bg-ink` or `text-ink` on a surface that doesn't also flip — always use semantic pairs (`bg-card text-ink`, `bg-background text-foreground`).

### 4.4 Tailwind mapping (`@theme inline`)

Inside `app/globals.css`:

```css
@theme inline {
  --color-background: var(--c-bg);
  --color-foreground: var(--c-fg);
  --color-primary: var(--c-primary);
  --color-primary-foreground: var(--c-primary-fg);
  --color-primary-light: var(--c-primary-light);
  --color-primary-lighter: var(--c-primary-lighter);
  --color-primary-hover: var(--c-primary-hover);
  --color-secondary: var(--c-secondary);
  --color-secondary-foreground: var(--c-secondary-fg);
  --color-secondary-light: var(--c-secondary-light);
  --color-secondary-hover: var(--c-secondary-hover);
  --color-accent: var(--c-secondary);
  --color-muted: var(--c-muted);
  --color-muted-foreground: var(--c-muted-fg);
  --color-border: var(--c-border);
  --color-ring: var(--c-primary);
  --color-card: var(--c-card);
  --color-ink: var(--c-ink);
  --color-slate: var(--c-slate);
  --color-steel: var(--c-steel);
  --color-mist: var(--c-mist);
  --color-paper: var(--c-paper);
  --color-brand: var(--c-brand);
  /* ...also indigo, teal variants for explicit naming */
}
```

This is what makes `bg-paper`, `text-slate`, `border-border`, `bg-card`, etc. work as Tailwind utilities.

### 4.5 Color usage rules

1. **Indigo is dominant** — headings, primary CTAs, active states, accent lines.
2. **Teal is the accent** — secondary CTAs, icon highlights, "Live" dots, success badges.
3. **Neutrals carry content** — `bg`, `card`, `paper`, `muted`, `ink`, `slate`, `steel`, `mist`.
4. **Max 3 colours per layout.** Indigo + teal + neutral. Anything else is decoration drift.
5. **Selection highlight:** indigo `#2e3a9e` background, white text (set via `::selection` in globals.css).
6. **Focus ring:** 2px solid `var(--color-primary)` with 2px offset (set globally via `*:focus-visible`).

### 4.6 Semantic colours

| Purpose   | Token / pattern                                              |
| --------- | ------------------------------------------------------------ |
| Success   | `bg-secondary-light text-secondary` for badges; `text-secondary` for dots |
| Error     | `text-red-500` / `border-red-400` (Tailwind palette)         |
| Warning   | Use sparingly — `text-amber-600` only when essential         |

We do not maintain dedicated success/error/warning tokens because they are rare. If they become common, promote them into the `--c-*` system.

---

## 5. Typography

### 5.1 Font system

Three families, loaded as `next/font/local` from `app/fonts/`:

| Family             | CSS var          | Use                                                |
| ------------------ | ---------------- | -------------------------------------------------- |
| **Outfit**         | `--font-outfit`  | Display: H1–H5, the Zekora wordmark, large stats   |
| **Inter**          | `--font-inter`   | Body, UI, buttons, navigation, labels              |
| **JetBrains Mono** | `--font-jbmono`  | Eyebrows, code, metadata, axis labels, URLs        |

Mapped to Tailwind via `@theme inline` as:

```css
--font-sans:    var(--font-inter), system-ui, -apple-system, sans-serif;
--font-display: var(--font-outfit), var(--font-inter), system-ui, sans-serif;
--font-mono:    var(--font-jbmono), ui-monospace, "SFMono-Regular", monospace;
```

So you can use `font-sans`, `font-display`, `font-mono` directly in Tailwind classes.

### 5.2 Loading (Next.js)

In `app/layout.tsx`:

```tsx
import localFont from "next/font/local";

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "./fonts/Inter-Regular.ttf",  weight: "400", style: "normal" },
    { path: "./fonts/Inter-Medium.ttf",   weight: "500", style: "normal" },
    { path: "./fonts/Inter-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Inter-Bold.ttf",     weight: "700", style: "normal" },
  ],
});
// Same shape for outfit + jetbrainsMono
```

The three variables are added to the `<html>` className together. Bundled local TTFs survive flaky-network builds (no Google Fonts dependency).

### 5.3 Type scale

#### Headings — use `font-display` (Outfit)

| Level | Weight        | Size (responsive)                                    | Tracking | Line-height |
| ----- | ------------- | ---------------------------------------------------- | -------- | ----------- |
| H1    | 600 (semi)    | `text-[2.3rem] sm:text-[3rem] lg:text-[3.45rem]`     | -0.032em | 1.04        |
| H2    | 600 (semi)    | `text-3xl sm:text-4xl`                               | -0.026em | 1.12        |
| H3    | 600 (semi)    | `text-base` / `text-lg` (context-dependent)          | -0.018em | 1.25        |

H1/H2/H3 get `text-wrap: balance` automatically (set in globals.css).

#### Body & UI — use `font-sans` (Inter)

| Role            | Weight | Size                  | Colour token                 |
| --------------- | ------ | --------------------- | ---------------------------- |
| Body            | 400    | `text-[15px]` / `text-base` | `text-slate` or `text-foreground` |
| Description     | 400    | `text-sm`             | `text-slate`                 |
| UI label        | 500    | `text-sm`             | `text-foreground`            |
| Nav link        | 500    | `text-[14px]`         | `text-muted-foreground`      |
| Button          | 600    | `text-[13px]` → `text-[15px]` by size | white or `text-foreground` |

Paragraphs get `text-wrap: pretty` automatically.

#### Eyebrow / micro-label — use `font-mono` (JetBrains Mono)

```html
<span class="eyebrow text-secondary">Our work</span>
```

The `.eyebrow` utility (defined in globals.css):

```css
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
}
```

### 5.4 Rules

✅ **Do:**
- Use `font-display` on every H1/H2/H3.
- Use `font-mono` for eyebrows, metadata, dates, URLs, code, axis labels.
- Use negative letter-spacing on headings (the global rules already apply this).
- Reach for tabular-nums (`tabular-nums`) for any counter/stat.

❌ **Don't:**
- Mix more than these three families.
- Use Outfit for body text — it's too geometric for long reading.
- Use Inter for the wordmark — the SVG already bakes Outfit.

---

## 6. Spacing & Layout

### 6.1 Content container

Every page constrains content to:

```
max-width: 80rem  (1280px, Tailwind: max-w-7xl)
padding-x: px-5 sm:px-6 lg:px-8
```

### 6.2 Section spacing (vertical rhythm)

| Context                          | Value                       | Tailwind                          |
| -------------------------------- | --------------------------- | --------------------------------- |
| Standard section                 | 80 → 96 → 112 px            | `py-20 md:py-24 lg:py-28`         |
| Section header → content         | 56 → 80 px                  | `mb-14 lg:mb-20`                  |
| Hero                             | 128 / 160 px top-bottom     | `py-32 lg:py-40`                  |
| Inner page header                | 128/64 → 160/80             | `pt-32 pb-16 lg:pt-40 lg:pb-20`   |
| Blog post header                 | 128/48 → 160/64             | `pt-32 pb-12 lg:pt-40 lg:pb-16`   |

Reusable via `<SectionWrapper>` (`components/sections/SectionWrapper.tsx`) — pass `muted` to alternate the background.

### 6.3 Grid gaps

| Context              | Gap         | Tailwind                |
| -------------------- | ----------- | ----------------------- |
| Card grid            | 20–28 px    | `gap-5` / `gap-6 lg:gap-7` |
| Two-column layout    | 48–80 px    | `gap-12 lg:gap-16`      |
| Form fields          | 20 px       | `gap-5`                 |
| Internal stack       | 16–24 px    | `space-y-4` / `space-y-6` |

### 6.4 Section alternation

```
[Page Header]   → bg-background + .bg-grid radial mask
[Section 1]     → bg-background
[Section 2]     → bg-paper (via SectionWrapper muted)
[Section 3]     → bg-background
[CtaBand]       → bg-primary (or bg-card with strong border)
[Footer]        → bg-indigo-darker (forced dark)
```

### 6.5 Spacing tokens

| Token | px   | Common use                                      |
| ----- | ---- | ----------------------------------------------- |
| 1     | 4    | Hairline gaps                                   |
| 2     | 8    | Icon/text gaps                                  |
| 3     | 12   | Label spacing                                   |
| 4     | 16   | Internal padding                                |
| 5     | 20   | Container padding (mobile)                      |
| 6     | 24   | Card padding, grid gap                          |
| 7     | 28   | Card padding (desktop)                          |
| 8     | 32   | Large padding                                   |
| 10    | 40   | Sub-section spacing                             |
| 14    | 56   | Section header bottom                           |
| 20    | 80   | Section padding base                            |

---

## 7. Border Radius & Shapes

| Token            | Value  | Use                                            |
| ---------------- | ------ | ---------------------------------------------- |
| `rounded-md`     | 6 px   | Small inline pills, code chips                 |
| `rounded-lg`     | 8 px   | Icon containers, inputs (small), nav items     |
| `rounded-xl`     | 12 px  | Buttons, inputs, icon boxes, tags              |
| `rounded-2xl`    | 16 px  | Cards, panels, modals, mockup frames           |
| `rounded-full`   | ∞      | Pills, dots, badges, avatars                   |

The PhoneMock and the dashboard cards inside mockups use **container-query units** (`rounded-[15cqw]`, `rounded-[8cqw]`, etc.) so the corners scale with the mock — see §13.

Shape principles:
- Cards: `rounded-2xl` (16 px).
- Interactive elements: `rounded-xl` (12 px).
- Tags/badges: `rounded-full`.
- **Never** `rounded-none` except for full-bleed sections.

---

## 8. Shadows & Elevation

| Level             | CSS value                                          | Use                                       |
| ----------------- | -------------------------------------------------- | ----------------------------------------- |
| `shadow-none`     | —                                                  | Default                                   |
| `shadow-sm`       | `0 1px 2px rgba(0,0,0,0.05)`                       | Resting cards                             |
| `shadow-md`       | `0 4px 6px rgba(0,0,0,0.07)`                       | Buttons at rest                           |
| `shadow-lg`       | `0 10px 15px rgba(0,0,0,0.1)`                      | Card hover                                |
| `shadow-xl`       | `0 20px 25px rgba(0,0,0,0.1)`                      | Strong hover                              |
| `shadow-2xl`      | `0 25px 50px rgba(0,0,0,0.25)`                     | Modals                                    |

### Branded shadows (custom)

Mockups use deeper, indigo-tinted shadows:

```css
shadow-[0_32px_64px_-26px_rgba(20,22,46,0.4)]   /* BrowserMock */
shadow-[0_28px_52px_-16px_rgba(20,22,46,0.5)]   /* PhoneMock  */
```

CTA buttons use shadow tinted with the brand:

```
shadow-sm shadow-primary/25     (resting)
shadow-md shadow-primary/35     (hover)
```

### Elevation patterns

| Element          | Rest         | Hover                                  |
| ---------------- | ------------ | -------------------------------------- |
| Card             | `shadow-sm`  | `shadow-xl` + `-translate-y-1`         |
| Primary button   | `shadow-sm`  | `shadow-md` + slight bg darken         |
| Modal            | `shadow-2xl` | —                                      |
| Mockup frame     | custom xl    | optional `-translate-y-1` on container |

---

## 9. Iconography

### 9.1 Library

- **Web:** [`lucide-react`](https://lucide.dev/) — already imported across the codebase.
- **Mobile (Flutter):** `lucide_icons` package, fallback to Material Symbols Outlined.
- **React Native:** `lucide-react-native`.

### 9.2 Rules

✅ Line-based, geometric, 2 px stroke, consistent across the product.

❌ Never: cartoon, 3D, filled (except for active/selected states), emoji as icons, mixed libraries.

### 9.3 Sizes

| Context              | Tailwind                  |
| -------------------- | ------------------------- |
| Inline with text     | `h-3.5 w-3.5` / `h-4 w-4` |
| Button icon          | `h-4 w-4`                 |
| Nav / footer icon    | `h-4 w-4`                 |
| Card icon            | `h-5 w-5`                 |
| Feature icon         | `h-5 w-5` to `h-6 w-6`    |
| Hero / modal icon    | `h-7 w-7`                 |

### 9.4 Icon containers

```html
<!-- Square, light tint -->
<span class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-brand">
  <Icon class="h-5 w-5" />
</span>

<!-- Square, secondary tint -->
<span class="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light text-secondary">
  <Icon class="h-5 w-5" />
</span>

<!-- Filled CTA-style -->
<span class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
  <Icon class="h-5 w-5" />
</span>
```

---

## 10. Motion & Animation

### 10.1 Tooling

- **Web:** `framer-motion` (already a dependency).
- **Mobile (Flutter):** `AnimationController`, `Hero`, `AnimatedContainer`.
- **React Native:** `react-native-reanimated`.

### 10.2 Easing — `EASE`

One curve, used everywhere:

```ts
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
```

It's defined inline in any component that needs it. Search the repo: every animation references this same tuple. **Don't introduce new curves casually** — pick this one unless there's a real reason.

### 10.3 Duration scale

| Context                  | Duration      | Notes                                       |
| ------------------------ | ------------- | ------------------------------------------- |
| Hover micro-interaction  | 200 ms        | Button bg/colour, badge tint                |
| UI transition            | 300 ms        | Theme toggle, modal open                    |
| Page transition          | 420 ms        | `template.tsx` fade + slide                 |
| Section reveal           | 500–700 ms    | `whileInView` patterns                      |
| CountUp                  | 1.4 s         | Stats on the about page                     |
| Hero word-by-word        | 600 ms        | Per-word stagger                            |

### 10.4 Common patterns

| Pattern               | Implementation summary                                                   |
| --------------------- | ------------------------------------------------------------------------ |
| Fade-in on scroll     | `initial: {opacity:0, y:24-32}` → `whileInView` with `viewport.once`     |
| Staggered reveal      | Parent `transition.staggerChildren: 0.06-0.12`                           |
| Hero word reveal      | Each word `motion.span` with `delay: i * 0.05`                           |
| Page transition       | See §15                                                                  |
| Button press          | `active:scale-[0.985]`                                                   |
| Mobile drawer         | Height `0 → auto` + opacity, items stagger from left (Navbar.tsx)        |
| Chart bar reveal      | `scaleY: 0 → 1`, `transformOrigin: bottom`, staggered                    |

### 10.5 Reduced-motion

`globals.css` already includes the standard `@media (prefers-reduced-motion: reduce)` override. **All non-essential animations must respect it** — usually that just means using framer-motion's built-in respect for the media query, or capping durations.

### 10.6 Forbidden

- Bouncy / overshoot springs.
- Parallax scrolling at section level (the hero mockup has a *very* subtle scroll-tied y-transform; do not extend that pattern further).
- Auto-playing video.
- Spinning / rotating decorations.
- 3D flips.
- Confetti / particles.
- Animations longer than 1.5s for entrances.

---

## 11. Dark Mode Token Pattern

### 11.1 How it works

Two CSS variable blocks in `app/globals.css`:

```css
:root  { --c-bg: #ffffff;  --c-fg: #14162e; ... }   /* light */
.dark  { --c-bg: #0f1020;  --c-fg: #e8eaf4; ... }   /* dark  */
```

A `@custom-variant dark (&:where(.dark, .dark *));` declaration enables Tailwind's `dark:` modifier without media-query coupling. Toggling dark is just **adding `.dark` to `<html>`**.

### 11.2 No-FOUC bootstrap

`app/layout.tsx` injects a tiny synchronous script before React mounts:

```html
<script>
  (function(){try{if(localStorage.getItem('zekora-theme')==='dark'){
    document.documentElement.classList.add('dark');
  }}catch(e){}})();
</script>
```

This **only checks localStorage** — never `prefers-color-scheme`. Default is always light unless the user explicitly toggled.

### 11.3 Toggle

`components/ui/ThemeToggle.tsx` writes `localStorage.zekora-theme` and adds/removes the `.dark` class. It guards against hydration mismatch with a `mounted` state.

### 11.4 Rules

- Build with `--c-*` tokens, not raw hex.
- For text that should always be white on a dark surface (footer, hero badges): hard-code `text-white` / `text-white/65`. This is fine — those surfaces are dark in both modes.
- For text that should swap (e.g. headings on `bg-background`): use `text-ink` or `text-foreground`.
- For overlays / scrims: hard-code `bg-black/70` rather than `bg-ink/70` — `--c-ink` flips and would invert the scrim.

### 11.5 Testing

Toggle, navigate every page, scan for:
- Forced-light surfaces (white panels inside dark pages).
- Invisible icons (white on white).
- Missing borders (the `--c-border` tone is different in dark — sometimes a `dark:border-border` reminder is needed).

---

## 12. Component Library

> All component source lives under `components/`. Open the file to see the canonical implementation. Patterns below are summaries.

### 12.1 Button — `components/ui/Button.tsx`

Four variants × three sizes, sharing one base class. Export both `<Button>` and `buttonClass(variant, size, extra)` (for use on `<a>` / `<Link>`).

```tsx
import { Button } from "@/components/ui/Button";
<Button variant="primary" size="lg">Get a quote</Button>

// or on a Link:
<Link href="/contact" className={cn(buttonClass("primary", "lg"))}>...</Link>
```

| Variant       | Surface                                            | Hover                              |
| ------------- | -------------------------------------------------- | ---------------------------------- |
| `primary`     | `bg-primary text-white shadow-sm shadow-primary/25` | `hover:bg-primary-hover`           |
| `secondary`   | `bg-secondary text-white shadow-sm shadow-secondary/25` | `hover:bg-secondary-hover`     |
| `outline`     | `border border-border bg-card text-foreground`     | `hover:border-primary/45 hover:bg-primary-light/60` |
| `ghost`       | transparent                                        | `hover:bg-muted`                   |

| Size      | Height | Padding-X | Font size       |
| --------- | ------ | --------- | --------------- |
| `sm`      | 36 px  | 16 px     | 13 px           |
| `default` | 44 px  | 20 px     | 14 px           |
| `lg`      | 48 px  | 24 px     | 15 px           |

Shared: `rounded-xl`, semibold, focus ring, `active:scale-[0.985]`, `disabled:opacity-50`.

### 12.2 Card

There is no `<Card>` component — cards are composed inline from utility classes. The canonical card:

```html
<div class="rounded-2xl border border-border bg-card p-7 transition-colors duration-300 hover:border-primary/30">
  <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light text-secondary">
    <Icon class="h-5 w-5" />
  </span>
  <h3 class="mt-4 font-display text-base font-semibold text-ink">Title</h3>
  <p class="mt-2 text-sm leading-relaxed text-slate">Description</p>
</div>
```

Hover lift (optional, used on Selected Work):

```
hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300
```

### 12.3 SectionWrapper — `components/sections/SectionWrapper.tsx`

```tsx
<SectionWrapper muted id="our-work">
  ...
</SectionWrapper>
```

Props: `muted?: boolean`, `dark?: boolean`, `id?: string`, `className?: string`.

Provides padding, max-width container, and the alternating background (`bg-background` vs `bg-paper`).

### 12.4 PageHeader — `components/sections/PageHeader.tsx`

The dark-on-light header used by inner pages. Includes the radial-masked `.bg-grid` overlay.

```tsx
<PageHeader title="Services" subtitle="What we build." />
```

### 12.5 CtaBand — `components/sections/CtaBand.tsx`

The page-closing CTA strip with title, subtitle, and a single CTA button. Used on About, Services, Portfolio.

### 12.6 Navbar — `components/layout/Navbar.tsx`

- `position: fixed`, `inset-x-0 top-0 z-50`.
- Transparent at top; gains `bg-background/85 backdrop-blur-xl` once `window.scrollY > 12`.
- Wordmark swaps (`/logos/zekora-logo.svg` light, `/logos/zekora-logo-white.svg` dark).
- Desktop nav with active-link underline.
- Mobile: hamburger drawer with framer-motion stagger; language switcher and theme toggle always visible.

Rendered **inside `app/[locale]/layout.tsx`**, outside the `template.tsx` transform — so `position: fixed` works correctly.

### 12.7 Footer — `components/layout/Footer.tsx`

- `bg-indigo-darker` (forced dark in both themes).
- Mobile grid: 2 columns. Brand spans full row; Company + Services side-by-side; Contact full row.
- Desktop: 12-column grid (Brand 4 / Company 2 / Services 3 / Contact 3).
- Bottom bar shrinks to `text-[11px]` on mobile.

### 12.8 ThemeToggle — `components/ui/ThemeToggle.tsx`

Light/dark toggle with `mounted` guard. Single source of truth for `localStorage.zekora-theme`.

### 12.9 JsonLd — `components/seo/JsonLd.tsx`

Renders structured data. Accepts a single object or an array. Used in `app/[locale]/layout.tsx` for the Organization + WebSite schemas, and in the blog post page for Article schema. See §20.

### 12.10 Form inputs

Defined inline (no input component yet). Standard pattern:

```html
<input
  class="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm
         placeholder:text-muted-foreground/60
         focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary
         transition-all duration-300"
/>
```

Error state: `border-red-400 focus:ring-red-100`.

### 12.11 Tags / badges

```html
<span class="rounded-md border border-border bg-paper px-2 py-0.5 font-mono text-[11px] text-slate">
  Tag name
</span>
```

For pill-shaped:

```html
<span class="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-brand">Pill</span>
```

---

## 13. Mockup Library

`components/mockups/Mockups.tsx` is the canonical mockup source. Everything is **rendered as DOM** — no screenshots, no images. This makes mocks:

- Theme-aware (they swap in dark mode).
- Internationalisable (any future label can come from the dictionary).
- Animatable (framer-motion driving real elements).
- Crisp at any DPR — no Retina blurring.

### 13.1 Exports

```ts
export function BrowserMock({ screen, url, className }): JSX.Element
export function PhoneMock({ className }): JSX.Element
export function FloatingChip({ label, className }): JSX.Element
export function PulseDot({ className }): JSX.Element
```

### 13.2 `BrowserMock` screens

Pass `screen` to switch the inner view:

| `screen`      | Looks like                                              | Used on                       |
| ------------- | ------------------------------------------------------- | ----------------------------- |
| `"dashboard"` | Stats + bar chart + "Live" pulse (animated)             | Hero, SaaS service section    |
| `"site"`      | Marketing site (hero + 3 staggered feature cards)       | About / mission visual        |
| `"board"`     | Kanban with 3 staggered columns                         | Digitalisation service        |
| `"code"`      | IDE: file tree + tabs + line numbers + animated typing  | Web Dev service               |

Each screen has its own micro-animation (chart bars, stat tick-up, card stagger, line-by-line typing reveal with a blinking caret on the code screen). Animations fire **once on view** and respect reduced-motion.

```tsx
import { BrowserMock } from "@/components/mockups/Mockups";

<BrowserMock screen="code" url="zekora.dev / src/app/page.tsx" />
```

### 13.3 `PhoneMock`

Container-query-sized. Wrap in any width container:

```tsx
<div className="w-[62%] max-w-[248px] mx-auto">
  <PhoneMock />
</div>
```

Internally uses `@container` + `cqw` units (`rounded-[15cqw]`, `border-[3cqw]`, `text-[12cqw]`, etc.) so the phone always keeps its true aspect ratio — no fixed-pixel stretching when the container narrows on mobile.

Includes a balance card with an animated counter (`useCountTo` hook) and a list with staggered row reveal.

### 13.4 `PulseDot` and `FloatingChip`

```tsx
<PulseDot />                       // a teal dot with ping animation
<FloatingChip label="+128 leads" /> // a floating card to layer over a mock
```

### 13.5 Service ↔ mock mapping

`app/[locale]/services/ServicesContent.tsx` decides which mock pairs with which service. The current mapping:

| Service          | Mockup                                          |
| ---------------- | ----------------------------------------------- |
| Web development  | `BrowserMock screen="code"`                     |
| Mobile apps      | `PhoneMock` (wrapped to 62% width)              |
| Digitalisation   | `BrowserMock screen="board"`                    |
| SaaS             | `BrowserMock screen="dashboard"`                |

Add a new service? Either reuse an existing screen or add a new one to `BrowserMock` and grow the `Screen` union.

### 13.6 Rules

- Never replace a Mockup with a real screenshot. The whole point is brand-controlled, themable visuals.
- Keep mockup content abstract — fake "text" via `<Bar>` (a rounded `bg-mist` div). Real-looking numbers ("84,250", "94%") are fine; real client names are not.
- Animations are subtle and **once on view**. No infinite loops except the `PulseDot` ping.

---

## 14. Page Structure Patterns

### 14.1 Inner page

```
<Navbar>                          (in [locale]/layout.tsx)
<template.tsx>                    (transition wrapper)
  <PageHeader>
  <SectionWrapper>...</SectionWrapper>      ← bg-background
  <SectionWrapper muted>...</SectionWrapper> ← bg-paper
  ...
  <CtaBand>
</template.tsx>
<Footer>
```

### 14.2 Home page

```
<Hero>                       ← Scroll parallax + mouse-tilt visual
<Selected Work>              ← Project cards
<Tech strip>                 ← Small tech-logo row
<Services overview>          ← 4 cards (carousel on mobile)
<Why choose us>              ← 4 feature cards
<Process>                    ← 4 connected steps
<CtaBand>
```

### 14.3 Section header pattern (centered)

```html
<div class="text-center mb-14 lg:mb-20">
  <div class="eyebrow text-secondary mb-4">Section eyebrow</div>
  <h2 class="font-display text-3xl font-semibold text-ink sm:text-4xl">Title</h2>
  <p class="mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed text-slate">Description.</p>
</div>
```

### 14.4 Section header pattern (left-aligned with icon)

```html
<div class="flex items-center gap-3 mb-4">
  <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-brand">
    <Icon class="h-5 w-5" />
  </span>
  <span class="eyebrow text-secondary">Section label</span>
</div>
<h2 class="font-display text-3xl font-semibold text-ink sm:text-4xl">Title</h2>
```

---

## 15. Page Transitions

`app/[locale]/template.tsx`:

```tsx
"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### Why `template.tsx` and not `layout.tsx`?

`template.tsx` **remounts on every navigation** (Next.js convention). `layout.tsx` does not. We want the transition to play fresh on each route.

### Implications

- Anything inside the template lives inside a transformed ancestor. This breaks naive `position: fixed` and confuses some `IntersectionObserver` calculations.
- **Navbar lives outside** the template (in `[locale]/layout.tsx`) so its `fixed` positioning works.
- Modals must use `createPortal` to `document.body` to escape the transform context.
- `useInView` inside the template should not rely on negative `rootMargin`. Prefer plain `IntersectionObserver` + an at-mount viewport check (see `CountUp.tsx`).

---

## 16. Blog & Long-Form Content

### 16.1 Data shape — `lib/blog.ts`

```ts
type BlogPost = {
  slug: string;
  locale: "en" | "fr";
  title: string;
  description: string;
  date: string;        // ISO YYYY-MM-DD
  author: string;
  tags: string[];
  readingTime: number;
  content: string;     // HTML
};
```

Same `slug` for EN + FR ⇒ hreflang alternates are wired automatically by `sitemap.ts` and the blog page's `alternatesFor()` call.

### 16.2 Prose styling — `.prose-zekora` (in globals.css)

The blog post body is wrapped in:

```html
<article class="prose-zekora mx-auto max-w-prose px-5 sm:px-6 lg:px-8"
         dangerouslySetInnerHTML={{ __html: post.content }} />
```

`.prose-zekora` styles:

- `h2`, `h3` → `font-display`, calmer spacing than article H1.
- `p`, `em`, `strong` → readable body (17 px, line-height 1.75).
- `a` → indigo with soft underline, full colour on hover.
- `ul`, `ol`, `li` → standard.
- `code` → mono, soft background.
- `blockquote` → teal left border, slate text, italic.
- `figure` → margin top/bottom, centered figcaption.
- `figure > img`, `> img` → full-width, rounded, paper bg.
- `figure > svg`, `> svg` → bordered box, padded, rounded 14 px, paper bg — so inline SVG diagrams sit cleanly.
- `figcaption` → mono, small, steel, centered.
- `table` / `th` / `td` → comparison tables get sensible defaults.

### 16.3 Adding images / diagrams to a post

Three options inside `content` (HTML):

```html
<!-- 1. A real image in /public -->
<figure>
  <img src="/blog/your-post/diagram.png" alt="…" />
  <figcaption>Caption text.</figcaption>
</figure>

<!-- 2. An inline SVG diagram (theme-aware via CSS vars) -->
<figure>
  <svg viewBox="0 0 600 240" role="img" aria-label="…">
    <style>
      .node { fill: var(--c-primary-light); stroke: var(--c-primary); }
      .text { fill: var(--c-ink); font-family: var(--font-sans), sans-serif; }
    </style>
    ...
  </svg>
  <figcaption>Caption text.</figcaption>
</figure>

<!-- 3. A comparison table -->
<table>
  <thead><tr><th>Criterion</th><th>Web</th><th>Mobile</th></tr></thead>
  <tbody>
    <tr><td>Reach</td><td>…</td><td>…</td></tr>
  </tbody>
</table>
```

### 16.4 Rules for inline SVG diagrams

- Use `var(--c-*)` for colours, never hex — auto-theming is free.
- Use `var(--font-sans)`, `var(--font-mono)` for text — type stays on-brand.
- Always set `viewBox` and **never** `width` / `height` attributes — the prose CSS handles sizing.
- Always set `role="img"` and `aria-label="..."`.
- Use a `<style>` block inside the SVG; CSS variables cascade in.
- Keep diagrams readable at 320 px wide (mobile prose container is narrow). Avoid text smaller than `font-size: 10px`.

### 16.5 Article schema (SEO)

`articleSchema()` in `lib/seo.ts` builds the `BlogPosting` JSON-LD. The blog post page (`app/[locale]/blog/[slug]/page.tsx`) renders it via `<JsonLd>` at the top of the page.

---

## 17. Imagery & Illustrations

### 17.1 Photography

If used:
- Realistic, well-lit, not AI-stock-looking.
- Clean neutral backgrounds.
- Business / technology relevant.
- `object-cover` for backgrounds, `object-contain` for screenshots.

### 17.2 Illustrations

- Flat, minimal detail.
- Brand-colour palette only.
- Never cartoon, never playful, never gradients-on-shapes-for-effect.
- For technical concepts, **prefer inline SVG diagrams** (see §16.3) over illustration libraries.

### 17.3 Image loading

- Use `next/image` for any non-decorative raster.
- `priority` on above-the-fold critical images.
- Lazy load below the fold (default for `next/image`).
- Set `sizes` for responsive images.
- Wordmark / icon logos: use plain `<img>` (SVG, tiny, no need for `next/image` optimisation).

### 17.4 Placeholder pattern (no real image yet)

```html
<div class="aspect-[16/10] rounded-2xl border border-border bg-paper flex items-center justify-center">
  <Layers class="h-10 w-10 text-steel/50" />
</div>
```

---

## 18. Responsive Design

### 18.1 Breakpoints

| Breakpoint | Min-width | Tailwind prefix | Target                       |
| ---------- | --------- | --------------- | ---------------------------- |
| base       | 0         | —               | Phones                       |
| `sm`       | 640 px    | `sm:`           | Large phones / small tablets |
| `md`       | 768 px    | `md:`           | Tablets                      |
| `lg`       | 1024 px   | `lg:`           | Desktop                      |
| `xl`       | 1280 px   | `xl:`           | Large desktop                |

### 18.2 Mobile-first

Always write mobile styles first, layer up:

```
text-[2.3rem] sm:text-[3rem] lg:text-[3.45rem]
```

### 18.3 Responsive patterns

| Pattern              | Mobile          | Tablet         | Desktop          |
| -------------------- | --------------- | -------------- | ---------------- |
| Card grid            | 1 col / carousel| 2 col          | 3–4 col          |
| Two-column section   | Stacked         | Stacked        | Side-by-side     |
| Nav                  | Hamburger       | Hamburger / full | Full           |
| Footer               | Brand / 2-col / Contact | 2 col   | 4 col            |
| Hero CTAs            | Single row, mobile-shrunk text | side-by-side | side-by-side |
| Section padding      | `py-20`         | `md:py-24`     | `lg:py-28`       |
| H1 size              | `text-[2.3rem]` | `sm:text-[3rem]` | `lg:text-[3.45rem]` |
| Language switcher    | Always visible  | In nav         | In nav           |

### 18.4 Test viewports

- 375 × 812 (iPhone SE / 13 mini)
- 414 × 896 (iPhone 11)
- 768 × 1024 (iPad portrait)
- 1024 × 768 (iPad landscape / small laptop)
- 1440 × 900 (desktop)

Always toggle EN and FR — French strings are ~20% longer and often expose layout bugs that English hides.

---

## 19. Accessibility

### 19.1 Focus

Global rule in `globals.css`:

```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}
```

Use `focus-visible`, not `focus` — we don't want a ring on click.

### 19.2 Contrast

- Text on `bg-background`: minimum 4.5:1 (AA). The `--c-fg` token meets this on both palettes.
- White on `--c-primary`: ~7.5:1 in light, similar in dark. Safe.
- White on `--c-secondary`: ~3.5:1 — only use for large text (≥18 px) or as a background for icons, not body text.

### 19.3 Semantics

- One `<h1>` per page.
- `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` landmarks.
- Icon-only buttons: `aria-label`.
- Decorative images: empty `alt=""`.
- Inline SVGs: `role="img"` + `aria-label`.

### 19.4 Motion

`prefers-reduced-motion: reduce` is honoured globally (see globals.css). Framer-motion respects the media query when you use its built-in patterns.

### 19.5 Forms

- Every input has a visible `<label>` (or `aria-label`).
- Required fields marked with a red `*`.
- Error messages associated via `aria-describedby`.
- Submit buttons disabled during in-flight submission, not before.

---

## 20. SEO & Structured Data

### 20.1 Metadata

Every page returns Next.js `Metadata` with:
- Unique `title` + `description`.
- `alternates.canonical` + `alternates.languages` (built by `alternatesFor()` in `lib/seo.ts`).
- OpenGraph + Twitter card.
- `robots` with kebab-case `googleBot` keys (`"max-image-preview"`, `"max-snippet"`, `"max-video-preview"`).

### 20.2 Structured data

`lib/seo.ts` exports:

| Builder              | Used in                                                   |
| -------------------- | --------------------------------------------------------- |
| `organizationSchema()` | `app/[locale]/layout.tsx`                               |
| `websiteSchema()`    | `app/[locale]/layout.tsx`                                 |
| `servicesSchema()`   | Services page (if used)                                   |
| `articleSchema()`    | `app/[locale]/blog/[slug]/page.tsx`                       |
| `breadcrumbSchema()` | Use when adding visible breadcrumbs                       |

Rendered via `<JsonLd data={...} />`.

### 20.3 Sitemap & robots

- `app/sitemap.ts` — one entry per locale per page, plus blog posts; full `alternates.languages` for hreflang.
- `app/robots.ts` — allow all, point to sitemap.
- `app/manifest.ts` — PWA-ready manifest.

### 20.4 Performance budget

Lighthouse targets (mobile, throttled):
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

Locked-in optimisations:
- `next/font/local` (no external font requests).
- `optimizePackageImports: ["framer-motion", "lucide-react"]` in `next.config.ts`.
- `public/_headers` for Cloudflare cache control.
- `optimizeCss` left default — turning it on currently regresses CLS on hero.
- No client-side images larger than 200 KB.

---

## 21. Code Standards

### 21.1 General

- TypeScript strict mode for everything web.
- `"use client"` only when the file actually needs hooks / browser APIs.
- One responsibility per component file.
- No `any`. No `// @ts-ignore`. Use proper types or `unknown`.
- No commented-out code in commits.

### 21.2 File layout (Next.js)

See §2 File Map — that is the layout. Don't introduce new top-level directories without updating this doc.

### 21.3 Naming

| Thing            | Convention                                  |
| ---------------- | ------------------------------------------- |
| Component file   | `PascalCase.tsx` (e.g. `SectionWrapper.tsx`) |
| Hook             | `useThing.ts` (camelCase, `use` prefix)     |
| Util             | `utils.ts`, function `camelCase`            |
| CSS variable     | `--c-thing` for colour, `--font-thing` for font, `--grid-line` for special |
| Tailwind utility | Tailwind's own names                        |
| Constant         | `SCREAMING_SNAKE_CASE` only for true constants (`EASE`, `BRAND`) |

### 21.4 `cn()` helper — `lib/utils.ts`

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Use it whenever conditional classes touch Tailwind: it dedupes and merges correctly.

### 21.5 Component patterns

- Type all props with an `interface` or `type`.
- Use `forwardRef` when the component wraps a native element that callers might need to ref.
- Prefer composition over giant prop unions.

---

## 22. Brand Configuration Pattern

### 22.1 Single source — `lib/config.ts`

```ts
export const BRAND = {
  name: "Zekora",
  nameUpper: "ZEKORA",
  altName: "Zekora Tech",
  tagline: "Digital Solutions That Structure & Grow Your Business",
  description: "Zekora builds digital solutions that ...",
  email: "zekora237@gmail.com",
  domain: "zekoratech.com",
  url: "https://zekoratech.com",      // canonical, non-www
  location: "Global — Remote First",
  founded: "2024",
} as const;
```

### 22.2 Template placeholders — `t()`

For copy that references the brand or year inside translation strings:

```ts
export function t(str: string): string {
  return str
    .replace(/\{brand\}/g, BRAND.name)
    .replace(/\{year\}/g, new Date().getFullYear().toString());
}
```

Usage in dictionaries:

```json
{ "footer": { "copyright": "© {year} {brand}. All rights reserved." } }
```

```tsx
<p>{t(dict.footer.copyright)}</p>
```

### 22.3 Why this matters

If the company name or domain changes:
1. Update `lib/config.ts` (one file).
2. Search dictionaries for `{brand}` references (no edits needed if they all use placeholders).
3. Everything propagates.

**Never hardcode** "Zekora" or "zekoratech.com" inside a component.

---

## 23. Internationalization (i18n)

### 23.1 Architecture

- URL-based routing: `/en/about`, `/fr/about`.
- Locale detected by middleware via `Accept-Language`; fallback to English.
- Dictionaries are typed JSON files under `lib/dictionaries/`.

### 23.2 Supported locales

| Code | Language | Status     |
| ---- | -------- | ---------- |
| `en` | English  | Default    |
| `fr` | French   | Full parity |

### 23.3 Dictionary shape

```json
{
  "nav": { "home": "Home", "about": "About", ... },
  "home": { "hero": { ... }, "services": { ... } },
  "about": { ... },
  "services": { ... },
  "portfolio": { ... },
  "contact": { ... },
  "footer": { ... },
  "blog": { "header": { ... }, "back": "...", "readingTime": "{n} min read" }
}
```

### 23.4 Context providers

- `lib/dictionary-context.tsx` → `useDictionary()`
- `lib/locale-context.tsx` → `useLocale()`

### 23.5 Rules

- No hardcoded user-visible strings in components — ever.
- When adding a key, add it to **both** `en.json` and `fr.json` in the same commit.
- Use placeholders for interpolation (`"readingTime": "{n} min read"`) and replace at render.
- French strings run ~20% longer — test layouts in FR.

---

## 24. Platform-Specific Guidelines

### 24.1 Web (Next.js + Tailwind v4 + framer-motion)

The reference implementation. Everything in this doc applies first-class here.

- Tailwind v4 with `@theme inline` mapping to `--c-*` vars.
- Local fonts via `next/font/local`.
- framer-motion for animation.
- Lucide React for icons.
- Cloudflare Workers deployment via `@opennextjs/cloudflare`.

### 24.2 Mobile — Flutter

When porting to Flutter:

```dart
class ZekoraColors {
  // Light
  static const bg            = Color(0xFFFFFFFF);
  static const fg            = Color(0xFF14162E);
  static const primary       = Color(0xFF2E3A9E);
  static const primaryHover  = Color(0xFF222A75);
  static const primaryLight  = Color(0xFFEEF0FB);
  static const secondary     = Color(0xFF1E9E86);
  static const secondaryLight = Color(0xFFE4F4F0);
  static const muted         = Color(0xFFF6F7FB);
  static const mutedFg       = Color(0xFF565C73);
  static const border        = Color(0xFFE7E9F2);
  static const card          = Color(0xFFFFFFFF);
  static const ink           = Color(0xFF14162E);
  static const slate         = Color(0xFF565C73);
  static const steel         = Color(0xFF8A8FA3);
  static const mist          = Color(0xFFD8DBE7);
  static const indigoDarker  = Color(0xFF1A1F4A);
}
```

- Font: bundle Outfit + Inter + JetBrains Mono via `pubspec.yaml` (do not depend on `google_fonts` at runtime).
- Use `lucide_icons` for parity.
- Bottom navigation, not hamburger.
- `Hero` and `AnimatedContainer` for transitions.
- Radius/spacing convert px to dp 1:1.

### 24.3 React Native

Same colour map. Use `react-native-reanimated` for animations and `lucide-react-native` for icons. Set `text-rendering` / antialiasing manually.

### 24.4 SaaS dashboards (web)

- Same tokens.
- Sidebar nav instead of top nav.
- More compact `py-` on sections.
- Cards are the default container.
- Tabular data: use `tabular-nums` and right-align numeric columns.

### 24.5 Email & PDF documents

- Same colours (inline hex for email — CSS vars don't survive most clients).
- Inter (with system-sans fallback).
- Header: brand wordmark on `#2e3a9e`.
- Footer: small "Built by Zekora" in muted text.

---

## 25. Anti-Patterns — What to Avoid

### Design

| ❌ Avoid                                | ✅ Instead                                      |
| --------------------------------------- | ----------------------------------------------- |
| Template-looking page layouts           | Compose from existing components + section patterns |
| More than 3 colours per layout          | Indigo + teal + neutral                         |
| Cartoon / playful illustrations         | Flat, minimal, brand-coloured                   |
| Bouncy / overshoot animations           | `EASE = [0.22, 1, 0.36, 1]`                     |
| Multiple font families                  | Outfit + Inter + JetBrains Mono — that's it     |
| Glass effects everywhere                | Only the Navbar scrolled state                  |
| Dark-mode-follows-system                | Default light; only explicit toggle persists    |
| Real screenshots in mockups             | Use `BrowserMock` / `PhoneMock` DOM mocks       |
| Stock photos of "diverse business team" | Real product UI mocks or simple type-driven hero |
| Decorative text labels above titles     | Only use eyebrows when they add context         |
| Section padding less than `py-20`       | Trust the rhythm                                |

### Code

| ❌ Avoid                                  | ✅ Instead                                      |
| ----------------------------------------- | ----------------------------------------------- |
| Hardcoded "Zekora" / "zekoratech.com"     | `BRAND.name`, `BRAND.url`                       |
| Hardcoded hex colours                     | `bg-primary`, `text-slate`, `--c-*` vars        |
| Hardcoded user-facing strings             | Dictionary keys (`dict.about.mission.p1`)       |
| Inline `style={{ background: "#..." }}`   | Tailwind utility or token reference             |
| Mixing icon libraries                     | Lucide everywhere                               |
| `window` access in server components      | Move to client, or guard with `typeof window !== "undefined"` |
| `useInView` with negative `margin` inside template.tsx | Plain IntersectionObserver with mount-time viewport check (see `CountUp.tsx`) |
| `position: fixed` inside the template     | Move to `[locale]/layout.tsx` or portal out     |
| Modal `position: fixed` inside template   | `createPortal` to `document.body`               |
| Hardcoded brand name in JSON-LD           | Use `BRAND.*` in `lib/seo.ts`                   |

---

## 26. Checklist for New Projects

### Setup
- [ ] Add `app/globals.css` token blocks (`:root` + `.dark`) + `@theme inline` mapping.
- [ ] Bundle Outfit, Inter, JetBrains Mono into `app/fonts/`.
- [ ] Configure `localFont` in `app/layout.tsx` with the three CSS variables.
- [ ] Drop in the no-FOUC theme script in the root layout.
- [ ] Create `lib/config.ts` with the `BRAND` constants for the new project.
- [ ] Set up i18n: middleware + dictionaries + contexts (mirror this repo if needed).
- [ ] Install `framer-motion` + `lucide-react` and add to `optimizePackageImports`.

### Visual
- [ ] Wordmark + icon placed in `public/logos/` (4 variants).
- [ ] Palette tokens match this doc exactly.
- [ ] Typography uses Outfit / Inter / JetBrains Mono with `font-display` / `font-sans` / `font-mono`.
- [ ] H1/H2/H3 use Outfit + negative letter-spacing + `text-wrap: balance`.
- [ ] Spacing follows the scale (§6).
- [ ] Border radius follows the scale (§7).

### Components
- [ ] Button has the 4 variants × 3 sizes (`Button.tsx`).
- [ ] Cards use `rounded-2xl border border-border bg-card`.
- [ ] Form inputs follow the §12.10 pattern.
- [ ] Navbar fixed, scroll-aware, language switcher always visible.
- [ ] Footer uses `bg-indigo-darker`.
- [ ] ThemeToggle wired to `localStorage.<brand>-theme` (rename the key per project).
- [ ] SectionWrapper, PageHeader, CtaBand reused — not re-implemented per page.

### Mockups
- [ ] If product visuals are needed, port `BrowserMock` / `PhoneMock` patterns. Don't use screenshots.

### Motion
- [ ] One `EASE` curve used across the project.
- [ ] Scroll reveals use `viewport: { once: true }`.
- [ ] Reduced-motion respected.

### SEO
- [ ] `metadataBase`, OG, Twitter card, hreflang alternates configured.
- [ ] JSON-LD Organization + WebSite injected in the locale layout.
- [ ] Sitemap + robots + manifest in place.
- [ ] `public/_headers` for cache + security (if Cloudflare).

### Quality
- [ ] Mobile-first, tested at 375 / 768 / 1024 / 1440.
- [ ] All interactive elements show focus rings.
- [ ] All images have alt text.
- [ ] No hardcoded brand strings, hex colours, or user-facing English / French.
- [ ] TypeScript strict on.
- [ ] Lighthouse ≥ 90 on each target.

### Brand consistency
- [ ] Reads as clean / structured / modern / trustworthy / calm.
- [ ] Max 3 colours visible per layout.
- [ ] Generous white space.
- [ ] Final impression: *a professional technology company, not a template.*

---

## 27. Quick Reference Card

```
BRAND        Zekora  /  zekoratech.com  (canonical, non-www)
EMAIL        zekora237@gmail.com
WORDMARK     /logos/zekora-logo.svg  +  -white  +  -icon  +  -icon-white

FONTS        Outfit  (--font-outfit / font-display)
             Inter   (--font-inter  / font-sans)
             JBMono  (--font-jbmono / font-mono)

LIGHT        --c-bg #ffffff   --c-fg #14162e
DARK         --c-bg #0f1020   --c-fg #e8eaf4
PRIMARY      #2e3a9e (indigo) — same in both modes
SECONDARY    #1e9e86 (teal) light · #2ab89d dark
BRAND TEXT   --c-brand: #2e3a9e light · #8e98f2 dark
FOOTER       --c-indigo-darker: #1a1f4a light · #090a14 dark

RADIUS       6  →  rounded-md
             8  →  rounded-lg
             12 →  rounded-xl  (buttons, inputs)
             16 →  rounded-2xl (cards, mockups)
             ∞  →  rounded-full (pills, dots)

EASE         [0.22, 1, 0.36, 1]
DURATION     200ms  micro  /  300ms  ui  /  420ms  page  /  500-700ms  reveal

CONTAINER    max-w-7xl  +  px-5 sm:px-6 lg:px-8
SECTION PAD  py-20 md:py-24 lg:py-28

ICONS        Lucide (2px stroke, line-based)
DARK TOGGLE  document.documentElement.classList.toggle('dark')
             localStorage.setItem('zekora-theme', 'dark' | 'light')

MOCKUPS      BrowserMock screen="dashboard" | "site" | "board" | "code"
             PhoneMock (container-query sized)
             FloatingChip, PulseDot
```

---

> **This document is alive.** When the code changes, this doc should be updated in the same PR. The repo at `D:/Zekora/website/zekora/` is the canonical implementation — if a pattern below contradicts the code, the code is right and this doc needs a fix.

*Zekora — one system, all platforms.*
