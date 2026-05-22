# ZEKORA — Universal Design System & Visual Identity Guide

> **Version:** 2.0  
> **Status:** Active — Applies to all Zekora products  
> **Last updated:** April 2026  
> **Owner:** Zekora  
> **Scope:** Websites, Mobile Apps, SaaS Dashboards, Internal Tools, Marketing Materials

---

## Table of Contents

1. [Purpose & Philosophy](#1-purpose--philosophy)
2. [Brand Identity](#2-brand-identity)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Spacing & Layout](#5-spacing--layout)
6. [Border Radius & Shapes](#6-border-radius--shapes)
7. [Shadows & Elevation](#7-shadows--elevation)
8. [Iconography](#8-iconography)
9. [Motion & Animation](#9-motion--animation)
10. [Component Library](#10-component-library)
11. [Page Structure Patterns](#11-page-structure-patterns)
12. [Imagery & Illustrations](#12-imagery--illustrations)
13. [Dark & Light Surfaces](#13-dark--light-surfaces)
14. [Responsive Design](#14-responsive-design)
15. [Accessibility](#15-accessibility)
16. [SEO & Performance](#16-seo--performance)
17. [Code Standards](#17-code-standards)
18. [Brand Configuration Pattern](#18-brand-configuration-pattern)
19. [Internationalization (i18n)](#19-internationalization-i18n)
20. [Platform-Specific Guidelines](#20-platform-specific-guidelines)
21. [Anti-Patterns — What to Avoid](#21-anti-patterns--what-to-avoid)
22. [Checklist for New Projects](#22-checklist-for-new-projects)

---

## 1. Purpose & Philosophy

### 1.1 Purpose

This document is the **single source of truth** for all visual and interaction decisions across every product built by or for Zekora. It ensures:

- **Visual consistency** across all platforms (web, mobile, SaaS, marketing)
- **Brand protection** from random or emotional design decisions
- **Scalability** — new products can be created without re-inventing the visual language
- **Developer onboarding** — any developer or designer can build on-brand immediately

> 📌 **Rule:** Any visual asset, UI component, or design decision must comply with this document.

### 1.2 Core Visual Philosophy

Every Zekora interface must feel:

| Attribute       | Meaning                                            |
| --------------- | -------------------------------------------------- |
| **Clean**       | No clutter. White space is intentional.             |
| **Structured**  | Grid-aligned. Clear hierarchy. Organized.           |
| **Modern**      | Current technologies, current patterns. Not trendy. |
| **Trustworthy** | Professional, reliable, predictable.                |
| **Calm**        | Not noisy. No flashy gimmicks.                      |

> **The golden test:** If a design looks "too flashy" or "too decorated", it is probably wrong for Zekora.  
> **If it looks "too simple", it's probably right.**

### 1.3 Brand Personality in UI

Zekora is:
- **Professional**, not corporate
- **Clear**, not complicated
- **Calm**, not loud
- **Confident**, not arrogant
- **Modern**, not trendy

> If Zekora were a person: _A calm, intelligent engineer who explains complex things simply._

---

## 2. Brand Identity

### 2.1 Brand Name

- **Full name:** Zekora
- **Display name (logo/nav):** ZEKORA (uppercase)
- **Positioning statement:** _"Zekora builds digital solutions that structure, modernize, and grow businesses."_

### 2.2 Brand Signature (for client projects)

Use one of:
- `Built by Zekora`
- `Powered by Zekora`

> Placement: subtle, professional, never intrusive. Typically in the footer.

### 2.3 Logo System

#### Primary Logo
- Abstract geometric **Z** symbol + `ZEKORA` in uppercase
- Sans-serif typography
- Used for: headers, footers, main branding areas

#### Icon Logo (Secondary)
- Z symbol only (no text)
- Used for: app icons, favicons, watermarks, small spaces

#### Logo Construction (SVG reference)

The Zekora icon is composed of three layers:
1. **Rounded rectangle background** — filled with Primary Blue (`#1F3C88`)
2. **Z letterform** — white (`#FFFFFF`), geometric angular shape
3. **Horizontal accent bar** — Teal (`#1BA6A6`), centered across the Z

```svg
<!-- Icon example at 50×50 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <rect width="50" height="50" rx="10" fill="#1F3C88"/>
  <path d="M11 12h28v5L17 38H39v5H11v-5L33 17H11v-5z" fill="#ffffff"/>
  <rect x="11" y="22" width="28" height="5" rx="2.5" fill="#1BA6A6"/>
</svg>
```

#### Logo Rules

✅ **Do:**
- Keep proportional at all sizes
- Ensure breathing space (minimum clear zone = 50% of logo height on all sides)
- Ensure it works on both light and dark backgrounds
- Scale properly from 16×16 (favicon) to banner size

❌ **Never:**
- Stretch or distort
- Rotate
- Alter colors
- Add shadows, glows, or gradients beyond the defined ones
- Place on busy/cluttered backgrounds without proper contrast

### 2.4 Logo in UI (Navbar Pattern)

When used in navigation bars:

```
[Z icon in gradient box] ZEKORA    nav-links...    [CTA button]
```

- **Icon container:** 32×32px (w-8 h-8), rounded-lg, gradient background (`linear-gradient(135deg, #1F3C88, #1BA6A6)`)
- **Text:** `ZEKORA` in font-bold, tracking-tight, text-lg to text-xl
- On dark/hero backgrounds: icon container uses `rgba(255,255,255,0.15)`, text is white
- On scrolled/light backgrounds: icon container uses gradient, text is Primary Blue

---

## 3. Color System

### 3.1 Core Palette

#### Primary Colors

| Token                | Hex         | Usage                          | Meaning                        |
| -------------------- | ----------- | ------------------------------ | ------------------------------ |
| `primary`            | `#1F3C88`   | Main brand color, headings, CTA backgrounds, links | Trust, technology, stability |
| `primary-hover`      | `#193175`   | Hover state for primary elements | Darker primary                |
| `primary-light`      | `#e8ecf5`   | Icon backgrounds, subtle highlights | Tinted primary surface       |
| `primary-lighter`    | `#f3f5fa`   | Very subtle backgrounds        | Barely-there primary tint      |

#### Secondary / Accent Colors

| Token                | Hex         | Usage                          | Meaning                      |
| -------------------- | ----------- | ------------------------------ | ---------------------------- |
| `secondary`          | `#1BA6A6`   | Accents, highlights, badges, secondary CTAs | Growth, innovation  |
| `secondary-hover`    | `#158e8e`   | Hover state for secondary elements | Darker teal                |
| `secondary-light`    | `#e6f5f5`   | Icon ring backgrounds, subtle teal surfaces | Tinted teal surface  |

#### Neutral Colors

| Token                | Hex         | Usage                          |
| -------------------- | ----------- | ------------------------------ |
| `background`         | `#ffffff`   | Page backgrounds               |
| `foreground`         | `#1a1a2e`   | Primary text color             |
| `muted`              | `#f8f9fb`   | Alternate section backgrounds  |
| `muted-foreground`   | `#5a6577`   | Secondary text, descriptions   |
| `border`             | `#e8eaef`   | Card borders, dividers         |
| `card`               | `#ffffff`   | Card backgrounds               |
| `card-hover`         | `#f9fafb`   | Card hover state               |

#### Dark Surface Colors (Footer, Hero, Dark Sections)

| Token                | Hex                       | Usage                          |
| -------------------- | ------------------------- | ------------------------------ |
| `dark-bg`            | `#141f45`                 | Footer background              |
| `hero-gradient`      | `linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)` | Hero & page header backgrounds |
| `dark-text`          | `#ffffff`                 | Text on dark surfaces          |
| `dark-text-muted`    | `rgba(255,255,255,0.75)`  | Subtitle text on dark surfaces |
| `dark-text-subtle`   | `rgba(255,255,255,0.7)`   | Description text on dark       |
| `dark-text-dim`      | `rgba(255,255,255,0.6)`   | Footer links                   |
| `dark-text-faint`    | `rgba(255,255,255,0.5)`   | Copyright text                 |
| `dark-border`        | `rgba(255,255,255,0.1)`   | Dividers on dark surfaces      |

#### Semantic Colors

| Purpose     | Color       | Usage                          |
| ----------- | ----------- | ------------------------------ |
| `success`   | `green-50/200/700` | Success messages, confirmations |
| `error`     | `red-50/200/400/500/700` | Error states, validation, destructive actions |
| `warning`   | _(use sparingly)_ | Warnings, caution states       |

### 3.2 Brand Gradient

The primary brand gradient is used sparingly for accent elements:

```css
background: linear-gradient(135deg, #1F3C88 0%, #1BA6A6 100%);
```

**Used for:**
- Gradient text (`.text-gradient` utility)
- Accent lines on cards (top 3px border)
- Decorative separator in footer
- Icon containers in process steps

**Also used (more subtle):**
```css
/* Blue-only gradient for buttons/icon boxes */
background: linear-gradient(135deg, #1F3C88, #253f80);
```

### 3.3 Color Usage Rules

1. **Blue is dominant** — used for headings, primary CTAs, navbar active states, section titles
2. **Teal is secondary** — used for accents, secondary CTAs, icon highlights, badges
3. **Neutrals support content** — backgrounds, text, borders
4. **Maximum 3 colors per layout** — never more
5. **Selection highlight:** `rgba(31, 60, 136, 0.15)` background with `#1F3C88` text
6. **Focus ring:** 2px solid `#1F3C88`, 2px offset

### 3.4 CSS Custom Properties (Web)

```css
@theme inline {
  --color-background: #ffffff;
  --color-foreground: #1a1a2e;
  --color-primary: #1F3C88;
  --color-primary-foreground: #ffffff;
  --color-primary-light: #e8ecf5;
  --color-primary-lighter: #f3f5fa;
  --color-primary-hover: #193175;
  --color-secondary: #1BA6A6;
  --color-secondary-foreground: #ffffff;
  --color-secondary-light: #e6f5f5;
  --color-secondary-hover: #158e8e;
  --color-muted: #f8f9fb;
  --color-muted-foreground: #5a6577;
  --color-accent: #1BA6A6;
  --color-accent-foreground: #ffffff;
  --color-border: #e8eaef;
  --color-ring: #1F3C88;
  --color-card: #ffffff;
  --color-card-hover: #f9fafb;
}
```

### 3.5 Mobile (Flutter/Native) Equivalent

```dart
class ZekoraColors {
  static const primary = Color(0xFF1F3C88);
  static const primaryHover = Color(0xFF193175);
  static const primaryLight = Color(0xFFe8ecf5);
  static const secondary = Color(0xFF1BA6A6);
  static const secondaryHover = Color(0xFF158e8e);
  static const secondaryLight = Color(0xFFe6f5f5);
  static const background = Color(0xFFffffff);
  static const foreground = Color(0xFF1a1a2e);
  static const muted = Color(0xFFf8f9fb);
  static const mutedForeground = Color(0xFF5a6577);
  static const border = Color(0xFFe8eaef);
  static const card = Color(0xFFffffff);
  static const footerBg = Color(0xFF141f45);
}
```

---

## 4. Typography

### 4.1 Font Family

**Primary (and only) font:** [Inter](https://fonts.google.com/specimen/Inter)

- Used for: **everything** — headings, body, buttons, navigation, labels, inputs
- Fallback stack: `'Inter', system-ui, -apple-system, sans-serif`

> ❌ No decorative fonts. No script fonts. No mixed font families.  
> ✅ Sans-serif only. One font. Always.

### 4.2 Web Loading Strategy

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
```

### 4.3 Type Scale & Hierarchy

#### Headings

| Level | Weight    | Line Height | Letter Spacing | Sizes (responsive)                              |
| ----- | --------- | ----------- | -------------- | ------------------------------------------------ |
| H1    | **700** (bold) | 1.06–1.08 | -0.025em     | `text-4xl sm:text-5xl lg:text-6xl xl:text-7xl`  |
| H2    | **700** (bold) | 1.15      | -0.02em       | `text-3xl sm:text-4xl lg:text-5xl`              |
| H3    | **600** (semi-bold) | 1.3  | -0.01em       | `text-lg` to `text-base`                        |

#### Body & Labels

| Role              | Weight | Size                  | Line Height | Color                |
| ----------------- | ------ | --------------------- | ----------- | -------------------- |
| Body text         | 400    | `text-base lg:text-lg`| 1.75        | `foreground`         |
| Description       | 400    | `text-sm`             | relaxed     | `muted-foreground`   |
| Small / Captions  | 400–500| `text-xs`             | normal      | `muted-foreground`   |
| Labels (form)     | 500    | `text-sm`             | normal      | `foreground`         |
| Badges / Tags     | 600    | `text-xs`             | normal      | varies               |
| Section labels    | 600    | `text-xs` uppercase   | normal      | `secondary`          |
| Nav links         | 500    | `text-sm`             | normal      | varies by state      |
| Buttons           | 600–700| `text-sm` to `text-base` | normal   | white or primary     |

### 4.4 Typography Rules

✅ **Do:**
- Maintain clear hierarchy (H1 > H2 > H3 > body)
- Use generous line spacing for body text (1.75)
- Use tighter line height for headings (1.06–1.15)
- Use negative letter-spacing on headings for a refined feel
- Use uppercase + tracking-wider for section labels/badges

❌ **Don't:**
- Use more than one font family
- Use decorative or script fonts
- Use font weights below 400 or above 700
- Skip heading levels (H1 → H3)

---

## 5. Spacing & Layout

### 5.1 Content Container

All page content is constrained to a maximum width with consistent horizontal padding:

```
max-width: 80rem (1280px) — Tailwind: max-w-7xl
padding-x: 20px → 24px → 32px (responsive)
Tailwind: px-5 sm:px-6 lg:px-8
```

### 5.2 Section Spacing

| Context                  | Spacing                        | Tailwind Class                 |
| ------------------------ | ------------------------------ | ------------------------------ |
| Section vertical padding | 80px → 96px → 112px           | `py-20 md:py-24 lg:py-28`     |
| Section header to content| 56px → 80px                    | `mb-14 lg:mb-20`              |
| Hero vertical padding    | 128px top, 160px on desktop    | `py-32 lg:py-40`              |
| Page header (inner pages)| 128px top / 64px bottom → 160px/80px | `pt-32 pb-16 lg:pt-40 lg:pb-20` |

### 5.3 Grid Gaps

| Context          | Gap               | Tailwind               |
| ---------------- | ----------------- | ----------------------- |
| Card grids       | 24px → 28px       | `gap-6 lg:gap-7`        |
| Two-column layout| 48px → 80px       | `gap-12 lg:gap-20`      |
| Form fields      | 20px              | `gap-5`                 |
| Internal stacks  | 16px–24px         | `space-y-4` to `space-y-6` |

### 5.4 Section Alternation Pattern

Sections alternate between white and muted backgrounds for visual rhythm:

```
[Hero] → dark (primary gradient)
[Section 1] → white (#ffffff)
[Section 2] → muted (#f8f9fb)
[Section 3] → white
[CTA] → dark (primary solid #1F3C88)
[Footer] → dark footer (#141f45)
```

### 5.5 Common Spacing Tokens

| Token   | Value  | Usage                                |
| ------- | ------ | ------------------------------------ |
| `1`     | 4px    | Minimal gaps, icon offsets           |
| `2`     | 8px    | Tight element spacing                |
| `3`     | 12px   | Label spacing, icon gaps             |
| `4`     | 16px   | Component internal padding           |
| `5`     | 20px   | Container padding (mobile)           |
| `6`     | 24px   | Grid gaps, card padding              |
| `7`     | 28px   | Card inner padding (desktop)         |
| `8`     | 32px   | Large component padding              |
| `10`    | 40px   | Section sub-spacing                  |
| `14`    | 56px   | Section header margin bottom         |
| `20`    | 80px   | Section padding (base)               |

---

## 6. Border Radius & Shapes

### 6.1 Radius Scale

| Token        | Value  | Usage                                      |
| ------------ | ------ | ------------------------------------------ |
| `rounded-lg` | 8px    | Logo icon container, small UI elements     |
| `rounded-xl` | 12px   | Buttons, inputs, icon boxes, tags          |
| `rounded-2xl`| 16px   | Cards, modals, panels, images              |
| `rounded-full`| 9999px| Pills, badges, dots, avatars, nav pills    |

### 6.2 Shape Principles

- Cards and containers: `rounded-2xl` (16px)
- Interactive elements (buttons, inputs): `rounded-xl` (12px)
- Tags and badges: `rounded-full` (pill shape)
- Icon backgrounds: `rounded-xl` (12px) for square, `rounded-full` for circular
- No sharp corners (no `rounded-none`) except for full-bleed sections

---

## 7. Shadows & Elevation

### 7.1 Shadow Scale

| Level            | CSS Value (Tailwind)              | Usage                              |
| ---------------- | --------------------------------- | ---------------------------------- |
| `shadow-none`    | none                              | Default state of most elements     |
| `shadow-sm`      | `0 1px 2px rgba(0,0,0,0.05)`     | Cards at rest, subtle depth        |
| `shadow-md`      | `0 4px 6px rgba(0,0,0,0.07)`     | Buttons at rest, elevated elements |
| `shadow-lg`      | `0 10px 15px rgba(0,0,0,0.1)`    | Hover state for cards              |
| `shadow-xl`      | `0 20px 25px rgba(0,0,0,0.1)`    | Strong hover on cards              |
| `shadow-2xl`     | `0 25px 50px rgba(0,0,0,0.25)`   | Modals, popovers                   |

### 7.2 CTA Button Shadow

Primary buttons use a branded shadow:
```css
box-shadow: 0 2px 8px rgba(31, 60, 136, 0.25);
/* On hover: */
box-shadow: 0 4px 16px rgba(31, 60, 136, 0.35);
```

### 7.3 Elevation Patterns

| Element          | Rest State    | Hover State                         |
| ---------------- | ------------- | ----------------------------------- |
| Cards            | `shadow-sm`   | `shadow-xl` + `translateY(-4px)`    |
| Buttons (primary)| `shadow-md`   | `shadow-lg` + `translateY(-2px)`    |
| Modals           | `shadow-2xl`  | N/A                                 |
| Navbar (scrolled)| Custom subtle | N/A                                 |
| Feature cards    | none          | `shadow-lg` + bg change             |

### 7.4 Navbar Shadow (Scrolled State)

```css
box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04);
```

---

## 8. Iconography

### 8.1 Icon Library

**Primary:** [Lucide React](https://lucide.dev/) (web) — a fork of Feather Icons

For mobile/native: Use equivalent line-based icon sets:
- Flutter: `lucide_icons` package or Material Symbols (outlined)
- React Native: `lucide-react-native`

### 8.2 Icon Style Rules

✅ **Do:**
- Use simple, line-based icons
- Use rounded or geometric shapes
- Maintain consistent stroke width (default 2px for Lucide)
- Use icons at consistent sizes

❌ **Never:**
- Cartoon icons
- 3D emoji
- Filled/solid icons (unless absolutely necessary for a selected/active state)
- Mixing icon libraries in a single product

### 8.3 Icon Sizes

| Context              | Size          | Tailwind           |
| -------------------- | ------------- | ------------------- |
| Inline with text     | 14–16px       | `w-3.5 h-3.5` or `w-4 h-4` |
| Button icon          | 16px          | `w-4 h-4`           |
| Nav/footer icon      | 16px          | `w-4 h-4`           |
| Card icon            | 20px          | `w-5 h-5`           |
| Feature icon         | 24px          | `w-6 h-6`           |
| Process step icon    | 28px          | `w-7 h-7`           |
| Hero/modal icon      | 28–32px       | `w-7 h-7`           |

### 8.4 Icon Container Patterns

#### Square container with light background
```html
<div class="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-light">
  <Icon class="w-5 h-5 text-primary" />
</div>
```

#### Circular container with light background
```html
<div class="w-16 h-16 rounded-full flex items-center justify-center bg-secondary-light">
  <Icon class="w-6 h-6 text-secondary" />
</div>
```

#### Gradient container (elevated)
```html
<div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
     style="background: linear-gradient(135deg, #1F3C88, #253f80)">
  <Icon class="w-5 h-5 text-white" />
</div>
```

---

## 9. Motion & Animation

### 9.1 Animation Library

**Web:** [Framer Motion](https://www.framer.com/motion/)  
**Mobile (Flutter):** Built-in `AnimationController` / `AnimatedContainer` / `Hero`  
**React Native:** `react-native-reanimated`

### 9.2 Animation Philosophy

Animations must be:
- **Smooth** — no jank or stutter
- **Subtle** — enhance, not distract
- **Professional** — convey quality and precision
- **Purposeful** — every animation should have a reason

### 9.3 Core Animation Values

#### Easing Curve (Standard)

```
[0.22, 1, 0.36, 1]
```

This is a custom ease-out curve used consistently across all animations. It feels:
- Fast start
- Gentle deceleration
- No bounce

#### Duration Scale

| Context                   | Duration | Usage                            |
| ------------------------- | -------- | -------------------------------- |
| Micro-interactions        | 200ms    | Modal open/close, tooltip        |
| UI transitions            | 300ms    | Button hover, color changes      |
| Element reveal            | 350ms    | Carousel slides, menu            |
| Section entrance          | 500ms    | Cards, features on scroll        |
| Hero text                 | 600ms    | Primary headline reveal          |
| Complex sequences         | 700ms    | SectionWrapper fade-in           |

### 9.4 Allowed Animation Patterns

| Pattern                | Implementation                                      |
| ---------------------- | --------------------------------------------------- |
| **Fade-in on scroll**  | `opacity: 0 → 1`, `y: 32 → 0`, triggered by viewport intersection |
| **Staggered reveal**   | Children animate sequentially with 80–150ms delay   |
| **Hero word reveal**   | Each word animates individually: `opacity: 0, y: 24 → opacity: 1, y: 0` |
| **Button hover lift**  | `translateY(-2px)` + shadow increase                |
| **Card hover lift**    | `translateY(-4px)` + shadow increase                |
| **Button press**       | `scale(0.97)` on active                             |
| **Mobile menu**        | Height 0→auto + opacity, items stagger from left    |
| **Carousel slide**     | `opacity + x-axis` slide with AnimatePresence        |
| **Modal**              | Fade + scale(0.95→1) + translateY(20→0)             |

### 9.5 Scroll Animation Defaults

```typescript
// Standard section entrance
{
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

// Card/element entrance (staggered)
{
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
}
```

### 9.6 Forbidden Animations

❌ **Never use:**
- Bouncy/spring effects with visible overshoot
- Parallax scrolling
- Auto-playing video backgrounds
- Spinning/rotating elements
- Fade-in delays longer than 1.5s
- Animations that block user interaction
- 3D flip/rotate transitions
- Confetti or particle effects

---

## 10. Component Library

### 10.1 Button

#### Variants

| Variant     | Background          | Text Color | Border              | Hover Effect                    |
| ----------- | ------------------- | ---------- | -------------------- | ------------------------------- |
| `primary`   | `#1F3C88`           | white      | none                 | Darken + lift + shadow increase |
| `secondary` | `#1BA6A6`           | white      | none                 | Darken + lift + shadow increase |
| `outline`   | transparent         | `#1F3C88`  | 2px solid `#1F3C88`  | Fill with primary, text → white |
| `ghost`     | transparent         | foreground | none                 | Muted background on hover      |

#### Sizes

| Size      | Height | Padding-X | Font Size |
| --------- | ------ | --------- | --------- |
| `sm`      | 36px   | 16px      | 14px      |
| `default` | 44px   | 24px      | 14px      |
| `lg`      | 52px   | 32px      | 16px      |

#### Common Properties
- Border radius: `rounded-xl` (12px)
- Font weight: 600 (semibold)
- Transition: `all 300ms ease-out`
- Active state: `scale(0.97)`
- Focus: 2px ring, primary color, 2px offset
- Disabled: `opacity: 0.5`, no pointer events

### 10.2 Card (Service Card / Feature Card / Project Card)

#### Service Card
```
┌─────────────────────────────┐
│ [3px gradient accent - hidden, shows on hover]
│                             │
│  [Icon in light bg box]     │
│                             │
│  Title (text-lg, semibold)  │
│  Description (text-sm, muted) │
│                             │
└─────────────────────────────┘
```

- Background: white
- Border: 1px solid `border`
- Radius: `rounded-2xl` (16px)
- Padding: `p-7 lg:p-8`
- Shadow: `shadow-sm` → `shadow-xl` on hover
- Hover: lift `-translate-y-1`, accent line appears

#### Feature Card
```
┌─────────────────────────────┐
│      [Circular icon]        │
│    centered, ringed bg      │
│                             │
│     Title (centered)        │
│   Description (centered)    │
└─────────────────────────────┘
```

- No border by default
- Padding: `p-6 lg:p-8`
- Radius: `rounded-2xl`
- Hover: white bg + `shadow-lg`
- Text alignment: center

#### Project Card
```
┌─────────────────────────────┐
│     [Image / Placeholder]   │
│      aspect-ratio: 16/10    │
├─────────────────────────────┤
│  Title                      │
│  Description (3 lines max)  │
│  [tags] [tags] [tags]       │
│  👁 View Details            │
└─────────────────────────────┘
```

- Same shadow/border/radius as Service Card
- Image uses `object-contain` with gradient bg
- Tags: pill shape, primary color, muted bg
- Clickable → opens modal

### 10.3 Section Wrapper

A reusable wrapper for all content sections:

```typescript
interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;   // Primary blue background
  muted?: boolean;  // Soft gray background
}
```

- Padding: `py-20 md:py-24 lg:py-28`
- Inner container: `max-w-7xl mx-auto px-5 sm:px-6 lg:px-8`
- Includes scroll-triggered fade-in animation

### 10.4 Page Header (Inner Pages)

Every inner page (About, Services, Portfolio, Contact) starts with a consistent hero header:

```
┌─────────────────────────────────────────┐
│  [Dark gradient background]             │
│  [Dot pattern overlay at 6% opacity]    │
│                                         │
│  H1 Title (white, bold)                 │
│  Subtitle (white 75% opacity)           │
│                                         │
│  pt-32 pb-16 lg:pt-40 lg:pb-20         │
└─────────────────────────────────────────┘
```

Background: `linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)`

Dot pattern overlay:
```css
background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
background-size: 40px 40px;
opacity: 0.06;
```

### 10.5 Navbar

- **Fixed** at top, z-50
- **Transparent** on hero → **white glass** on scroll
- Glass effect: `rgba(255,255,255,0.92)` + `blur(20px) saturate(180%)`
- Height: `h-16 lg:h-20`
- Text color transitions between white (on hero) and dark (on scroll)
- Mobile: hamburger menu with slide-down drawer
- Language switcher (Globe icon + locale code) always visible on mobile

### 10.6 Footer

- Background: `#141f45` (darker than primary)
- Top accent line: gradient `transparent → #1BA6A6 → #1F3C88 → transparent`
- 4-column grid on desktop (brand, company links, services, contact)
- 2-column + centered on mobile
- Text: white at various opacity levels (0.9, 0.7, 0.6, 0.5, 0.4)
- Signature: "Built by {brand}" in bottom bar

### 10.7 Form Inputs

```css
/* Base input styling */
w-full px-4 py-3.5 rounded-xl border bg-white text-foreground text-sm
placeholder:text-muted-foreground/60
focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary
transition-all duration-300
```

- Error state: `border-red-400`, `focus:ring-red-100`
- Labels: `text-sm font-medium text-foreground mb-2`
- Required indicator: red asterisk `*`
- Optional indicator: small muted text `(optional)`

### 10.8 Tags / Badges

```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
      style="color: #1F3C88; border-color: #e8eaef; background-color: #f8f9fb;">
  Tag Name
</span>
```

### 10.9 Accent Line Pattern

A thin gradient line used as a visual accent on cards, forms, and sections:

```html
<!-- Top accent on cards -->
<div class="absolute top-0 left-0 right-0 h-[3px]"
     style="background: linear-gradient(90deg, #1F3C88, #1BA6A6)" />
```

### 10.10 Mobile Carousel

For mobile-only horizontal card browsing:
- Auto-advances with configurable interval (default 4500ms)
- Touch swipe support (50px threshold)
- Progress indicator dots with animated fill
- Navigation arrows on sides
- Visible only below `sm` breakpoint (640px)

---

## 11. Page Structure Patterns

### 11.1 Standard Page Layout

```
[Navbar - fixed]
[Page Header - dark gradient + dot pattern]
[Content Sections - alternating white/muted]
[CTA Section - dark primary background]
[Footer - dark footer background]
```

### 11.2 Home Page Structure

```
Hero (full viewport, dark gradient)
├── Headline (word-by-word reveal)
├── Subtitle
└── Two CTAs (primary + outline)

Services Overview (white)
├── Centered title + subtitle
└── 4-column card grid (carousel on mobile)

Why Choose Us (muted)
├── Centered title + subtitle
└── 4-column feature cards (carousel on mobile)

Our Process (white)
├── Centered title + subtitle
└── 4-column step cards with connecting lines

CTA (dark primary)
├── Centered title + subtitle
└── Single CTA button
```

### 11.3 Inner Page Structure

```
Page Header (dark gradient, shorter than hero)
├── H1 Title
└── Subtitle

Content Sections (alternating, page-specific)

CTA Section (dark primary)
├── Centered title + subtitle
└── Single CTA button
```

### 11.4 Section Title Pattern

```html
<!-- Standard section header (centered) -->
<div class="text-center mb-14 lg:mb-20">
  <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5">
    Section Title
  </h2>
  <p class="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
    Section description text.
  </p>
</div>
```

### 11.5 Section Label Pattern (with icon)

Used when a section needs a contextual label above the title:

```html
<div class="flex items-center gap-3 mb-4">
  <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-light">
    <Icon class="w-5 h-5 text-primary" />
  </div>
  <span class="text-sm font-semibold uppercase tracking-wider text-secondary">
    Section Label
  </span>
</div>
<h2 class="text-3xl sm:text-4xl font-bold text-primary mb-6">Section Title</h2>
```

---

## 12. Imagery & Illustrations

### 12.1 Photography Rules

If images are used:
- **Realistic** — no AI-generated looking stock photos
- **Professional** — well-lit, high quality
- **Neutral backgrounds** — clean, uncluttered
- **Business or technology-related** — relevant to context
- **Object-fit:** `cover` for background images, `contain` for project screenshots

### 12.2 Illustration Rules

If illustrations are used:
- **Flat** design style
- **Minimal** detail
- **Consistent** with brand color palette only
- No cartoon or playful illustrations

### 12.3 Image Loading

- Always use framework image optimization (Next.js `<Image>`, Flutter cached network)
- Implement lazy loading for below-fold images
- Provide proper `sizes` attributes for responsive images
- Use `priority` for above-fold critical images

### 12.4 Placeholder Pattern

When real images aren't available:
```
Gradient background: linear-gradient(135deg, #f0f2f8, #e6f5f5, #f3f5fa)
Centered icon (Layers) in gradient container
Subtle decorative shapes (circles, rounded rects) at low opacity
```

---

## 13. Dark & Light Surfaces

### 13.1 Light Surface (Default)

- Background: white or muted gray
- Text: `foreground` (#1a1a2e) for primary, `muted-foreground` (#5a6577) for secondary
- Headings: `primary` (#1F3C88)
- Borders: `border` (#e8eaef)

### 13.2 Dark Surface (Hero, CTA, Footer)

| Element           | Color                           |
| ----------------- | ------------------------------- |
| Background        | Primary gradient or solid #1F3C88 or #141f45 |
| Primary text      | `#ffffff`                       |
| Secondary text    | `rgba(255,255,255,0.75)`        |
| Muted text        | `rgba(255,255,255,0.6-0.7)`     |
| Faint text        | `rgba(255,255,255,0.4-0.5)`     |
| Borders           | `rgba(255,255,255,0.1)`         |
| Interactive hover | Full white or slightly brighter |

### 13.3 Glass Morphism (Navbar)

```css
background: rgba(255, 255, 255, 0.92);
backdrop-filter: blur(20px) saturate(180%);
```

Used only for the navbar scrolled state. Do not overuse glass effects.

### 13.4 Decorative Overlay (Dot Pattern)

Used exclusively on dark hero/header sections:
```css
background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
background-size: 40px 40px;
opacity: 0.06;
```

---

## 14. Responsive Design

### 14.1 Breakpoints

| Breakpoint | Width    | Tailwind Prefix | Target                   |
| ---------- | -------- | --------------- | ------------------------ |
| Base       | 0px      | (none)          | Mobile phones            |
| `sm`       | 640px    | `sm:`           | Large phones / small tablets |
| `md`       | 768px    | `md:`           | Tablets                  |
| `lg`       | 1024px   | `lg:`           | Desktop                  |
| `xl`       | 1280px   | `xl:`           | Large desktop            |

### 14.2 Mobile-First Approach

All styles are written mobile-first. Desktop is the override:

```css
/* Mobile default */
text-4xl

/* Tablet override */
sm:text-5xl

/* Desktop override */
lg:text-6xl xl:text-7xl
```

### 14.3 Responsive Patterns

| Pattern                | Mobile         | Tablet        | Desktop         |
| ---------------------- | -------------- | ------------- | --------------- |
| Card grid              | Carousel       | 2 columns     | 3–4 columns     |
| Two-column layout      | Stack          | Stack         | Side-by-side    |
| Navigation             | Hamburger      | Full nav      | Full nav        |
| Footer                 | Centered stack | 2 columns     | 4 columns       |
| Section padding        | `py-20`        | `py-24`       | `py-28`         |
| Typography (H1)        | `text-4xl`     | `text-5xl`    | `text-6xl+`     |
| Hero CTA buttons       | Stacked        | Side-by-side  | Side-by-side    |
| Lang switcher          | Always visible | In nav bar    | In nav bar      |

### 14.4 Test Breakpoints

Always test at these widths:
- **375px** — iPhone SE
- **768px** — iPad portrait
- **1024px** — iPad landscape / small laptop
- **1440px** — Standard desktop

### 14.5 Mobile Carousel Pattern

Cards that appear in a grid on desktop should be shown as an auto-scrolling carousel on mobile (`< sm` breakpoint):
- One card visible at a time
- Swipe left/right to navigate
- Auto-advances every ~4.5 seconds
- Progress dots with animated fill
- Chevron arrows for manual navigation

---

## 15. Accessibility

### 15.1 Focus Management

- All interactive elements must have visible focus indicators
- Default: `2px solid #1F3C88` outline with `2px` offset
- Use `focus-visible` (not `focus`) to avoid showing on click

### 15.2 Color Contrast

- Text on white backgrounds: minimum 4.5:1 ratio (AA)
- Text on dark backgrounds: white (#ffffff) on #1F3C88 meets AA
- Never use color alone to convey information

### 15.3 Semantic HTML

- Use proper heading hierarchy (H1 → H2 → H3)
- Use `<nav>`, `<main>`, `<section>`, `<footer>` landmarks
- All images must have descriptive `alt` text
- All buttons must have accessible labels (`aria-label` for icon-only buttons)

### 15.4 Motion

- Respect `prefers-reduced-motion` — disable non-essential animations
- No auto-playing animations that can't be paused (except subtle carousels)

### 15.5 Forms

- Every input must have a visible `<label>`
- Error messages must be associated with their input
- Required fields must be clearly marked
- Success/error feedback must be visually distinct (color + icon)

---

## 16. SEO & Performance

### 16.1 Metadata Requirements

Every page must have:
- Unique `<title>` (format: `Page Title | Brand Name`)
- Unique `meta description` (< 160 characters)
- Proper Open Graph tags (title, description, type, locale, siteName)
- Canonical URL
- Language/locale declaration

### 16.2 Performance Targets

- Lighthouse Performance: **90+**
- Lighthouse Accessibility: **90+**
- Lighthouse SEO: **90+**
- First Contentful Paint: **< 1.5s**
- Largest Contentful Paint: **< 2.5s**
- Cumulative Layout Shift: **< 0.1**

### 16.3 Optimization Techniques

- Use framework-optimized image components (Next.js `<Image>`, etc.)
- Lazy load below-fold images
- Use `display: swap` for web fonts
- Minimize JavaScript bundle size
- Preconnect to external origins
- Use proper caching headers
- Generate sitemap.xml

---

## 17. Code Standards

### 17.1 General Rules

- **TypeScript** with strict mode enabled for all web projects
- **Dart** with strong analysis options for Flutter projects
- Clean, organized, commented where necessary
- Production-ready — no TODO hacks in production
- No messy inline styling (use design tokens and utility classes)

### 17.2 File Organization (Web / Next.js)

```
/app
  /[locale]         — Localized routes
    /about
    /services
    /contact
    /portfolio
    layout.tsx      — Locale layout (navbar, footer, providers)
    page.tsx        — Home page
  layout.tsx        — Root layout (fonts, metadata)
  globals.css       — Global styles + design tokens
/components
  /ui               — Atomic components (Button, Input, etc.)
  /layout           — Structural (Navbar, Footer)
  /sections         — Page sections (Cards, Wrappers, etc.)
/lib
  config.ts         — Brand configuration constants
  utils.ts          — Utility functions (cn, etc.)
  i18n.ts           — i18n configuration
  /dictionaries     — Translation JSON files
/public
  /images
  /logos
  /icons
/styles             — Additional styles if needed
```

### 17.3 Component Patterns

- Use `"use client"` directive only when needed (interactivity, hooks)
- Extract reusable components — DRY principle
- Type all props with interfaces
- Use `forwardRef` for components that wrap native elements
- Consistent naming: PascalCase for components, camelCase for functions

### 17.4 Utility: `cn()` for Class Merging

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 18. Brand Configuration Pattern

### 18.1 Central Configuration

All brand-related constants must be defined in a single configuration file. **No hardcoded brand names scattered across files.**

```typescript
// lib/config.ts
export const BRAND = {
  name: "Zekora",
  nameUpper: "ZEKORA",
  tagline: "Digital Solutions That Structure & Grow Your Business",
  description: "Zekora builds digital solutions that structure, modernize, and grow businesses.",
  email: "zekora237@gmail.com",
  domain: "zekora.com",
  url: "https://zekora.com",
  location: "Global — Remote First",
} as const;
```

### 18.2 Template Replacement

Use `{brand}` and `{year}` placeholders in translation strings, replaced at runtime:

```typescript
export function t(str: string): string {
  return str
    .replace(/\{brand\}/g, BRAND.name)
    .replace(/\{year\}/g, new Date().getFullYear().toString());
}
```

### 18.3 Why This Matters

If the company name changes:
1. Update **one file** (`lib/config.ts`)
2. Update translation files (search `{brand}` references)
3. Everything updates everywhere

---

## 19. Internationalization (i18n)

### 19.1 Architecture

- URL-based routing: `/en/about`, `/fr/about`
- Browser language detection via `Accept-Language` header (middleware)
- Fallback to English for unsupported locales
- Translation dictionaries as JSON files

### 19.2 Supported Locales

| Code | Language | Status    |
| ---- | -------- | --------- |
| `en` | English  | Default   |
| `fr` | French   | Supported |

### 19.3 Translation Structure

All user-visible strings must be in dictionaries — never hardcoded:

```json
{
  "nav": { "home": "Home", "about": "About", ... },
  "home": { "hero": { ... }, "services": { ... } },
  "about": { "header": { ... }, "mission": { ... } },
  ...
}
```

### 19.4 Context Providers

Translation dictionaries and locale are provided via React Context:
- `DictionaryProvider` — provides the translation dictionary
- `LocaleProvider` — provides the current locale string
- Client components consume via `useDictionary()` and `useLocale()`

---

## 20. Platform-Specific Guidelines

### 20.1 Web (Next.js + Tailwind + Framer Motion)

- Use Tailwind CSS utility classes with design tokens in `globals.css`
- Use Framer Motion for animations
- Use Lucide React for icons
- Use Next.js `<Image>` for optimized images
- Use Next.js `<Link>` for internal navigation
- Deploy on Vercel (optimized for it)

### 20.2 Mobile (Flutter)

- Use Inter font (add via `google_fonts` package or bundle)
- Match color system exactly (see Section 3.5)
- Use Material Design 3 as base, customize to match brand
- Radius, spacing, and shadow patterns should match (convert px to dp)
- Use `Hero` animations and `AnimatedContainer` for subtle transitions
- Icon set: `lucide_icons` package or Material Symbols (outlined weight 300–400)
- Bottom navigation instead of hamburger menu (mobile-native pattern)

### 20.3 React Native

- Same principles as web
- Use `react-native-reanimated` for animations
- Use `lucide-react-native` for icons
- Match spacing/color/typography systems exactly

### 20.4 SaaS Dashboards

- Use the same color system and typography
- Sidebar navigation instead of top navbar
- More compact spacing (reduce section padding)
- Cards are the primary content container
- Use the accent line pattern for card category distinction
- Keep the same button and input styling

### 20.5 Emails & Documents

- Same color palette
- Inter or system sans-serif fallback
- Clean, structured layout
- Header: brand gradient (#1F3C88 → #1BA6A6)
- Footer: "Built by Zekora" in muted text

---

## 21. Anti-Patterns — What to Avoid

### Design Anti-Patterns

| ❌ Avoid                        | ✅ Instead                             |
| ------------------------------- | -------------------------------------- |
| Template-looking design         | Custom, purpose-built layouts          |
| Overuse of gradients            | Gradients only for accents (3px lines, text, icons) |
| Too many colors                 | Max 3 colors per layout                |
| Cartoon illustrations           | Flat, minimal, on-brand illustrations  |
| Generic Bootstrap feel          | Custom component styling               |
| Bouncy/spring animations        | Smooth ease-out curves                 |
| Parallax scrolling              | Simple fade-in on scroll               |
| Auto-playing video backgrounds  | Static or subtle pattern backgrounds   |
| Blur/frosted overlays on content| Glass effect only on navbar            |
| Decorative notes/labels above titles | Only use section labels when contextually needed |
| Neon/bright accent colors       | Muted, professional tones              |
| Crowded layouts                 | Generous white space                   |
| Overly complex card designs     | Clean cards with subtle hover effects  |
| Multiple font families          | Inter only                             |
| Inline styles scattered everywhere | Design tokens + utility classes      |

### Code Anti-Patterns

| ❌ Avoid                           | ✅ Instead                            |
| ---------------------------------- | ------------------------------------- |
| Hardcoded brand name in components | Use `BRAND.name` from config          |
| Hardcoded color values             | Use design tokens / CSS variables     |
| Hardcoded strings in UI            | Use translation dictionaries          |
| Mixing icon libraries              | One library per project               |
| No TypeScript types                | Type everything                       |
| Giant monolithic components        | Small, reusable, composable           |
| `window` access in SSR code        | Guard with `typeof window !== 'undefined'` or use hooks |

---

## 22. Checklist for New Projects

Use this checklist when starting any new Zekora product:

### Setup
- [ ] Install Inter font
- [ ] Configure color tokens/variables matching Section 3
- [ ] Set up `BRAND` configuration (Section 18)
- [ ] Set up i18n structure if needed (Section 19)
- [ ] Configure icon library (Lucide or equivalent)

### Visual Identity
- [ ] Logo placed correctly (icon + text, proper sizing)
- [ ] Color palette matches exactly (primary, secondary, neutrals)
- [ ] Typography uses Inter exclusively
- [ ] Heading hierarchy is clear and consistent
- [ ] Spacing follows the scale (Section 5)
- [ ] Border radius matches the scale (Section 6)

### Components
- [ ] Buttons follow variant system (primary, secondary, outline, ghost)
- [ ] Cards use correct radius, shadow, and hover patterns
- [ ] Inputs follow the form input pattern
- [ ] Navigation matches the established pattern
- [ ] Footer includes brand signature

### Animations
- [ ] Using correct easing curve `[0.22, 1, 0.36, 1]`
- [ ] Animations are subtle and professional
- [ ] Scroll-triggered animations use `viewport: { once: true }`
- [ ] No forbidden animation patterns

### Quality
- [ ] Mobile-first responsive design
- [ ] Tested at 375px, 768px, 1024px, 1440px
- [ ] All interactive elements have focus indicators
- [ ] All images have alt text
- [ ] No hardcoded brand names
- [ ] No hardcoded user-facing strings (use translations)
- [ ] TypeScript strict mode enabled
- [ ] Lighthouse scores above 90

### Brand Consistency
- [ ] Feels clean, structured, modern, trustworthy, calm
- [ ] No flashy/trendy elements
- [ ] White space is generous
- [ ] Maximum 3 colors visible per layout
- [ ] Overall impression: _professional tech company, not a startup template_

---

## Quick Reference Card

```
BRAND:      Zekora / ZEKORA
FONT:       Inter (400, 500, 600, 700)
PRIMARY:    #1F3C88  (Deep Blue)
SECONDARY:  #1BA6A6  (Teal)
BACKGROUND: #ffffff
FOREGROUND: #1a1a2e
MUTED:      #f8f9fb
BORDER:     #e8eaef
FOOTER BG:  #141f45
GRADIENT:   linear-gradient(135deg, #1F3C88, #1BA6A6)
RADIUS:     12px (buttons) / 16px (cards) / 9999px (pills)
EASING:     [0.22, 1, 0.36, 1]
ICONS:      Lucide (line-based, 2px stroke)
MAX-WIDTH:  1280px (80rem)
CONTAINER:  px-5 sm:px-6 lg:px-8
```

---

> **This document is alive.** It will be reviewed periodically and updated as Zekora grows. Any changes must be intentional, documented, and applied consistently across all products.

---

*Zekora — One system, all platforms.*

