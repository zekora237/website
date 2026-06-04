/**
 * Zekora — Blog
 *
 * Posts are typed records. To publish a new article, add an entry to the
 * `POSTS` array below. Use the same `slug` for the EN and FR versions of
 * the same article so hreflang alternates link them together.
 *
 * Content is HTML. Allowed inside the prose-zekora container:
 *   - h2 / h3 / p / em / strong / a
 *   - ul / ol / li
 *   - code / blockquote
 *   - table / thead / tbody / tr / th / td
 *   - figure / figcaption
 *   - img (use Next-served paths in /public)
 *   - inline <svg> — colors should reference brand CSS vars
 *     (e.g. var(--c-primary), var(--c-secondary)) so they auto-theme.
 */

export type BlogPost = {
  slug: string;
  locale: "en" | "fr";
  title: string;
  description: string;
  /** ISO date — YYYY-MM-DD */
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
  /** Article body — HTML (h2, p, ul, figure/svg, etc.). */
  content: string;
};

/* ──────────────────────────────────────────────────────────────
 * Shared SVG diagrams — embedded in the Web-vs-Mobile post.
 * Defined once so the EN and FR versions stay byte-identical.
 * Colors reference CSS variables defined in app/globals.css so
 * the diagrams adapt to the active theme automatically.
 * ──────────────────────────────────────────────────────────── */

/**
 * Decision tree — locale-aware.
 * Layout notes:
 *  - viewBox 600 × 320 (taller than v1 so 2-line text and bigger fonts fit)
 *  - Q1 and Q2 boxes are 58 tall; Q1 uses 2-line text for both locales so the
 *    longer French label doesn't overflow.
 *  - Font sizes bumped (q-text 16, leaf 16, yn 13) so the diagram stays
 *    readable on mobile, where viewBox-units shrink to ~0.56× of desktop.
 */
function decisionTreeSvg(locale: "en" | "fr"): string {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  const yes = t("YES", "OUI");
  const no = t("NO", "NON");
  // Q1 — kept to 2 lines in both languages for symmetry + safe FR fit
  const q1L1 = t("Users return", "Utilisateurs reviennent");
  const q1L2 = t("at least weekly?", "chaque semaine ?");
  // Q2 — short enough to live on one line in both languages
  const q2 = t(
    "Offline, push or hardware?",
    "Hors-ligne, push ou matériel ?"
  );
  const ariaLabel = t(
    "Decision tree comparing web app and mobile app",
    "Arbre de décision : application web ou mobile"
  );

  return `
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${ariaLabel}">
  <style>
    .q { fill: var(--c-primary-light); stroke: var(--c-primary); stroke-width: 1.2; }
    .leaf-web { fill: var(--c-primary); }
    .leaf-mobile { fill: var(--c-secondary); }
    .leaf-text { fill: #fff; font-family: var(--font-mono), monospace; font-size: 16px; font-weight: 700; letter-spacing: 0.12em; }
    .q-text { fill: var(--c-ink); font-family: var(--font-sans), sans-serif; font-size: 16px; font-weight: 500; }
    .edge { stroke: var(--c-mist); stroke-width: 1.5; fill: none; }
    .yn { fill: var(--c-slate); font-family: var(--font-mono), monospace; font-size: 13px; font-weight: 600; letter-spacing: 0.12em; }
  </style>

  <!-- edges (drawn first so boxes overlay them) -->
  <path class="edge" d="M300,72 V102 H85 V132" />
  <path class="edge" d="M300,72 V102 H455 V132" />
  <path class="edge" d="M455,190 V220 H345 V250" />
  <path class="edge" d="M455,190 V220 H515 V250" />

  <!-- yes / no labels on the horizontal segments -->
  <text class="yn" x="192" y="96" text-anchor="middle">${no}</text>
  <text class="yn" x="378" y="96" text-anchor="middle">${yes}</text>
  <text class="yn" x="400" y="214" text-anchor="middle">${no}</text>
  <text class="yn" x="485" y="214" text-anchor="middle">${yes}</text>

  <!-- Q1: 2-line text in a 260 × 58 box -->
  <rect class="q" x="170" y="14" width="260" height="58" rx="12" />
  <text class="q-text" x="300" y="39" text-anchor="middle">
    <tspan x="300" dy="0">${q1L1}</tspan>
    <tspan x="300" dy="20">${q1L2}</tspan>
  </text>

  <!-- WEB-1 leaf -->
  <rect class="leaf-web" x="20" y="132" width="130" height="58" rx="12" />
  <text class="leaf-text" x="85" y="168" text-anchor="middle">WEB</text>

  <!-- Q2: single-line text in a 290 × 58 box (wider to fit both locales) -->
  <rect class="q" x="310" y="132" width="290" height="58" rx="12" />
  <text class="q-text" x="455" y="167" text-anchor="middle">${q2}</text>

  <!-- WEB-2 leaf -->
  <rect class="leaf-web" x="280" y="250" width="130" height="58" rx="12" />
  <text class="leaf-text" x="345" y="286" text-anchor="middle">WEB</text>

  <!-- MOBILE leaf -->
  <rect class="leaf-mobile" x="450" y="250" width="130" height="58" rx="12" />
  <text class="leaf-text" x="515" y="286" text-anchor="middle">MOBILE</text>
</svg>
`.trim();
}

/** Scorecard rows: [label, position 0..1, side]. Both locales share positions. */
type ScoreRow = { en: string; fr: string; pos: number };
const SCORE_ROWS: ScoreRow[] = [
  { en: "Search discoverability", fr: "Découverte par recherche", pos: 0.06 },
  { en: "Reach (any device)", fr: "Portée (tout appareil)", pos: 0.15 },
  { en: "Time to launch", fr: "Délai de lancement", pos: 0.18 },
  { en: "Update cycle", fr: "Cycle de mises à jour", pos: 0.12 },
  { en: "Push notifications", fr: "Notifications push", pos: 0.93 },
  { en: "Offline mode", fr: "Mode hors-ligne", pos: 0.85 },
  { en: "Hardware access", fr: "Accès au matériel", pos: 0.95 },
  { en: "Daily engagement", fr: "Engagement quotidien", pos: 0.78 },
];

function scoreCardSvg(locale: "en" | "fr"): string {
  const trackStart = 220;
  const trackEnd = 560;
  const trackWidth = trackEnd - trackStart;
  const rowHeight = 36;
  const rowY = (i: number) => 84 + i * rowHeight;
  const webLabel = locale === "fr" ? "WEB" : "WEB";
  const mobileLabel = locale === "fr" ? "MOBILE" : "MOBILE";
  const title =
    locale === "fr"
      ? "Tableau de bord : où chacun excelle"
      : "Capability scorecard: where each shines";

  const rows = SCORE_ROWS.map((row, i) => {
    const y = rowY(i);
    const cx = trackStart + row.pos * trackWidth;
    const side = row.pos < 0.5 ? "web" : "mobile";
    const label = locale === "fr" ? row.fr : row.en;
    return `
      <text class="label" x="12" y="${y + 4}">${label}</text>
      <line class="track" x1="${trackStart}" y1="${y}" x2="${trackEnd}" y2="${y}" />
      <circle class="dot-${side}" cx="${cx.toFixed(0)}" cy="${y}" r="7" />`;
  }).join("");

  return `
<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
  <style>
    .label { fill: var(--c-fg); font-family: var(--font-sans), sans-serif; font-size: 14px; font-weight: 500; }
    .pill-text { fill: #fff; font-family: var(--font-mono), monospace; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; }
    .pill-web { fill: var(--c-primary); }
    .pill-mobile { fill: var(--c-secondary); }
    .track { stroke: var(--c-mist); stroke-width: 4; stroke-linecap: round; fill: none; }
    .center-line { stroke: var(--c-border); stroke-width: 1; stroke-dasharray: 2 4; }
    .dot-web { fill: var(--c-primary); stroke: var(--c-bg); stroke-width: 3; }
    .dot-mobile { fill: var(--c-secondary); stroke: var(--c-bg); stroke-width: 3; }
  </style>
  <rect class="pill-web" x="196" y="12" width="76" height="26" rx="13" />
  <text class="pill-text" x="234" y="30" text-anchor="middle">${webLabel}</text>
  <rect class="pill-mobile" x="500" y="12" width="92" height="26" rx="13" />
  <text class="pill-text" x="546" y="30" text-anchor="middle">${mobileLabel}</text>
  <line class="center-line" x1="390" y1="62" x2="390" y2="356" />
  ${rows}
</svg>
`.trim();
}

/**
 * Timeline — locale-aware.
 * Bugs fixed from v1:
 *  - row label and total no longer share Y with the bar (they live on a
 *    dedicated label row above each bar, so "Mobile app (iOS + Android)"
 *    can't overlap the build segment and "22 weeks" can't sit inside the
 *    green launch segment)
 *  - font sizes bumped so the diagram stays readable when the SVG scales
 *    down inside the prose container on mobile
 */
function timelineSvg(locale: "en" | "fr"): string {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  return `
<svg viewBox="0 0 600 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${t(
    "Typical path-to-launch timeline: web vs mobile",
    "Délai typique de lancement : web vs mobile"
  )}">
  <style>
    .row-label { fill: var(--c-ink); font-family: var(--font-sans), sans-serif; font-size: 15px; font-weight: 600; }
    .axis-title { fill: var(--c-steel); font-family: var(--font-mono), monospace; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; }
    .week-tick { stroke: var(--c-border); stroke-width: 1; }
    .week-text { fill: var(--c-steel); font-family: var(--font-mono), monospace; font-size: 12px; }
    .seg-design { fill: var(--c-primary); opacity: 0.35; }
    .seg-build { fill: var(--c-primary); opacity: 0.85; }
    .seg-launch { fill: var(--c-secondary); }
    .total-text { fill: var(--c-ink); font-family: var(--font-mono), monospace; font-size: 13px; font-weight: 700; }
    .axis { stroke: var(--c-mist); stroke-width: 1; }
    .legend-text { fill: var(--c-slate); font-family: var(--font-mono), monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.04em; }
  </style>

  <!-- title -->
  <text class="axis-title" x="12" y="22">${t(
    "TYPICAL PATH-TO-LAUNCH (WEEKS)",
    "DÉLAI TYPIQUE DE LANCEMENT (SEMAINES)"
  )}</text>

  <!-- WEB row: label + total on their own line above the bar -->
  <text class="row-label" x="12" y="56">${t("Web app", "App. web")}</text>
  <text class="total-text" x="588" y="56" text-anchor="end">${t(
    "8 weeks",
    "8 semaines"
  )}</text>
  <rect class="seg-design" x="90" y="66" width="44" height="22" rx="5" />
  <rect class="seg-build"  x="134" y="66" width="110" height="22" rx="5" />
  <rect class="seg-launch" x="244" y="66" width="22" height="22" rx="5" />

  <!-- MOBILE row -->
  <text class="row-label" x="12" y="120">${t(
    "Mobile app (iOS + Android)",
    "App. mobile (iOS + Android)"
  )}</text>
  <text class="total-text" x="588" y="120" text-anchor="end">${t(
    "22 weeks",
    "22 semaines"
  )}</text>
  <rect class="seg-design" x="90" y="130" width="66" height="22" rx="5" />
  <rect class="seg-build"  x="156" y="130" width="352" height="22" rx="5" />
  <rect class="seg-launch" x="508" y="130" width="66" height="22" rx="5" />

  <!-- x-axis -->
  <line class="axis" x1="90" y1="178" x2="574" y2="178" />
  <line class="week-tick" x1="90"  y1="176" x2="90"  y2="184" />
  <line class="week-tick" x1="200" y1="176" x2="200" y2="184" />
  <line class="week-tick" x1="310" y1="176" x2="310" y2="184" />
  <line class="week-tick" x1="420" y1="176" x2="420" y2="184" />
  <line class="week-tick" x1="530" y1="176" x2="530" y2="184" />
  <line class="week-tick" x1="574" y1="176" x2="574" y2="184" />
  <text class="week-text" x="90"  y="202" text-anchor="middle">0</text>
  <text class="week-text" x="200" y="202" text-anchor="middle">5</text>
  <text class="week-text" x="310" y="202" text-anchor="middle">10</text>
  <text class="week-text" x="420" y="202" text-anchor="middle">15</text>
  <text class="week-text" x="530" y="202" text-anchor="middle">20</text>
  <text class="week-text" x="574" y="202" text-anchor="middle">22</text>

  <!-- legend -->
  <rect class="seg-design" x="90" y="232" width="14" height="14" rx="3" />
  <text class="legend-text" x="110" y="244">${t(
    "Design / scope",
    "Conception / cadrage"
  )}</text>
  <rect class="seg-build" x="${locale === "fr" ? 260 : 220}" y="232" width="14" height="14" rx="3" />
  <text class="legend-text" x="${locale === "fr" ? 280 : 240}" y="244">${t(
    "Build",
    "Développement"
  )}</text>
  <rect class="seg-launch" x="${locale === "fr" ? 430 : 340}" y="232" width="14" height="14" rx="3" />
  <text class="legend-text" x="${locale === "fr" ? 450 : 360}" y="244">${t(
    "QA / launch",
    "QA / mise en ligne"
  )}</text>
</svg>
`.trim();
}

/* ──────────────────────────────────────────────────────────────
 * Pricing-article SVGs — used by the
 * "How much does a website cost in Cameroon" post.
 *
 * Design notes:
 *  - All five SVGs share the same viewBox width (600) so they sit
 *    cleanly inside the prose container at any breakpoint.
 *  - Colours reference brand CSS vars so dark mode auto-adapts.
 *  - Locale-aware: labels accept (en, fr) tuples.
 * ──────────────────────────────────────────────────────────── */

/** Horizontal price ladder — five tiers on a piecewise-linear scale.
 *
 * Why piecewise: the actual range goes from 0 FCFA to 25 000 000+ FCFA.
 * A pure linear scale crushes the first three tiers (0–2M) into 8% of
 * the chart width, making their bars invisible pills. A pure log scale
 * does the opposite — it crushes the agency / enterprise tiers.
 *
 * The piecewise scale gives each "decade" of price meaningful width:
 * 0–100K, 100K–500K, 500K–2M, 2M–6M, 6M–25M each occupy a roughly
 * comparable visual slice, so every tier reads at a glance while the
 * tick marks above the bars keep the absolute scale honest.
 */
function priceLadderSvg(locale: "en" | "fr"): string {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);

  const tiers: Array<{
    name: string;
    sub: string;
    min: number;
    max: number;
    highlight?: boolean;
  }> = [
    {
      name: t("DIY (no-code)", "Bricolage (no-code)"),
      sub: t("Wix · WordPress.com · Carrd", "Wix · WordPress.com · Carrd"),
      min: 0,
      max: 100_000,
    },
    {
      name: t("Junior freelancer", "Freelanceur débutant"),
      sub: t("Student or self-taught", "Étudiant ou autodidacte"),
      min: 100_000,
      max: 500_000,
    },
    {
      name: t("Senior freelancer / micro-agency", "Freelanceur senior / micro-agence"),
      sub: t("Solo expert or 2–5 people", "Expert solo ou équipe 2–5 pers."),
      min: 500_000,
      max: 2_000_000,
    },
    {
      name: t("Professional agency", "Agence professionnelle"),
      sub: t("Design + dev + SEO + support", "Design + dev + SEO + support"),
      min: 2_000_000,
      max: 6_000_000,
      highlight: true,
    },
    {
      name: t("Enterprise / SaaS", "Projet entreprise / SaaS"),
      sub: t(
        "Dashboards, integrations, MoMo",
        "Dashboards, intégrations, MoMo"
      ),
      min: 6_000_000,
      max: 25_000_000,
    },
  ];

  /** Piecewise stops — (value, x-coordinate). xFor() interpolates linearly between adjacent stops. */
  const stops: Array<{ v: number; x: number }> = [
    { v: 0, x: 240 },
    { v: 100_000, x: 282 },
    { v: 500_000, x: 332 },
    { v: 2_000_000, x: 396 },
    { v: 6_000_000, x: 472 },
    { v: 25_000_000, x: 580 },
  ];
  const xFor = (v: number): number => {
    if (v <= stops[0].v) return stops[0].x;
    if (v >= stops[stops.length - 1].v) return stops[stops.length - 1].x;
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      if (v >= a.v && v <= b.v) {
        const t = (v - a.v) / (b.v - a.v);
        return a.x + t * (b.x - a.x);
      }
    }
    return stops[0].x;
  };

  const fmt = (v: number) => {
    if (v >= 1_000_000) {
      const m = v / 1_000_000;
      return Number.isInteger(m) ? `${m}M` : `${m.toFixed(1)}M`;
    }
    if (v >= 1_000) return `${v / 1_000}K`;
    return String(v);
  };

  const rowH = 62;
  const rowY = (i: number) => 70 + i * rowH;

  const ariaLabel = t(
    "Price ladder for website projects in Cameroon, in FCFA",
    "Échelle de prix d'un site web au Cameroun, en FCFA"
  );

  const rows = tiers
    .map((tier, i) => {
      const y = rowY(i);
      const x1 = xFor(tier.min);
      const x2 = xFor(tier.max);
      const w = Math.max(x2 - x1, 10);
      const fill = tier.highlight ? "url(#barHi)" : "url(#barRest)";
      const stroke = tier.highlight
        ? "var(--c-secondary)"
        : "var(--c-primary)";
      const labelColor = tier.highlight ? "var(--c-secondary)" : "var(--c-slate)";
      const rangeLabel =
        tier.max >= 25_000_000
          ? `${fmt(tier.min)} FCFA+`
          : `${fmt(tier.min)} → ${fmt(tier.max)} FCFA`;
      // Range labels always sit BELOW the bar so they never collide with
      // it, regardless of bar width. That eliminated the "0 → 100K" text
      // overlapping the first bar in the previous version.
      const labelX = x1;
      return `
      <text class="tier-name" x="14" y="${y - 6}">${tier.name}</text>
      <text class="tier-sub"  x="14" y="${y + 12}">${tier.sub}</text>
      <rect class="bar" x="${x1.toFixed(0)}" y="${y - 16}" width="${w.toFixed(0)}" height="26" rx="6" fill="${fill}" stroke="${stroke}" />
      <text class="range" x="${labelX.toFixed(0)}" y="${y + 24}" fill="${labelColor}">${rangeLabel}</text>`;
    })
    .join("");

  // Axis ticks line up with the piecewise stops so they read as
  // "where each tier boundary sits on the scale".
  const tickValues = [100_000, 500_000, 2_000_000, 6_000_000, 25_000_000];
  const ticks = tickValues
    .map((v) => {
      const x = xFor(v);
      return `
      <line class="tick" x1="${x.toFixed(0)}" y1="50" x2="${x.toFixed(0)}" y2="${rowY(4) + 6}" />
      <text class="tick-text" x="${x.toFixed(0)}" y="42" text-anchor="middle">${fmt(v)}</text>`;
    })
    .join("");

  return `
<svg viewBox="0 0 600 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${ariaLabel}">
  <style>
    .title { fill: var(--c-steel); font-family: var(--font-mono), monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; }
    .tier-name { fill: var(--c-ink); font-family: var(--font-sans), sans-serif; font-size: 14px; font-weight: 600; }
    .tier-sub  { fill: var(--c-steel); font-family: var(--font-sans), sans-serif; font-size: 11.5px; font-weight: 500; }
    .bar { stroke-width: 1.2; }
    .range { font-family: var(--font-mono), monospace; font-size: 11.5px; font-weight: 700; }
    .tick { stroke: var(--c-border); stroke-width: 1; stroke-dasharray: 2 3; }
    .tick-text { fill: var(--c-steel); font-family: var(--font-mono), monospace; font-size: 10.5px; font-weight: 600; }
  </style>
  <defs>
    <linearGradient id="barRest" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="var(--c-primary-light)" />
      <stop offset="100%" stop-color="var(--c-primary)" stop-opacity="0.65" />
    </linearGradient>
    <linearGradient id="barHi" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="var(--c-secondary)" stop-opacity="0.35" />
      <stop offset="100%" stop-color="var(--c-secondary)" />
    </linearGradient>
  </defs>
  <text class="title" x="14" y="22">${t(
    "WEBSITE BUDGET RANGE — CAMEROON, 2026 (FCFA)",
    "FOURCHETTE DE BUDGET — CAMEROUN, 2026 (FCFA)"
  )}</text>
  ${ticks}
  ${rows}
</svg>
`.trim();
}

/** Cost-breakdown donut — what makes up the price tag. */
function costBreakdownSvg(locale: "en" | "fr"): string {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  // Sum must equal 100
  const slices = [
    {
      label: t("Design & UX", "Design & UX"),
      pct: 25,
      color: "var(--c-primary)",
    },
    {
      label: t("Development", "Développement"),
      pct: 40,
      color: "var(--c-primary-hover)",
    },
    {
      label: t("Project management", "Gestion de projet"),
      pct: 10,
      color: "var(--c-secondary)",
    },
    {
      label: t("QA & testing", "QA & tests"),
      pct: 10,
      color: "var(--c-secondary-hover)",
    },
    {
      label: t("Launch & training", "Lancement & formation"),
      pct: 15,
      color: "var(--c-steel)",
    },
  ];

  // Donut geometry
  const cx = 180;
  const cy = 200;
  const r = 110;
  const rInner = 66;
  let startAngle = -Math.PI / 2; // start at 12 o'clock
  const arcPath = (sa: number, ea: number) => {
    const x1 = cx + r * Math.cos(sa);
    const y1 = cy + r * Math.sin(sa);
    const x2 = cx + r * Math.cos(ea);
    const y2 = cy + r * Math.sin(ea);
    const xi1 = cx + rInner * Math.cos(ea);
    const yi1 = cy + rInner * Math.sin(ea);
    const xi2 = cx + rInner * Math.cos(sa);
    const yi2 = cy + rInner * Math.sin(sa);
    const large = ea - sa > Math.PI ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${xi1.toFixed(2)} ${yi1.toFixed(2)} A ${rInner} ${rInner} 0 ${large} 0 ${xi2.toFixed(2)} ${yi2.toFixed(2)} Z`;
  };
  const arcs = slices
    .map((s) => {
      const sweep = (s.pct / 100) * 2 * Math.PI;
      const ea = startAngle + sweep;
      const d = arcPath(startAngle, ea);
      startAngle = ea;
      return `<path d="${d}" fill="${s.color}" />`;
    })
    .join("");

  // Legend on the right
  const legend = slices
    .map((s, i) => {
      const y = 80 + i * 36;
      return `
      <rect x="330" y="${y}" width="14" height="14" rx="3" fill="${s.color}" />
      <text class="lg-label" x="354" y="${y + 11}">${s.label}</text>
      <text class="lg-pct"   x="588" y="${y + 11}" text-anchor="end">${s.pct}%</text>`;
    })
    .join("");

  const ariaLabel = t(
    "Cost breakdown of a professional website project",
    "Répartition du coût d'un site web professionnel"
  );

  return `
<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${ariaLabel}">
  <style>
    .title  { fill: var(--c-steel); font-family: var(--font-mono), monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; }
    .center-num { fill: var(--c-ink); font-family: var(--font-sans), sans-serif; font-size: 22px; font-weight: 700; }
    .center-sub { fill: var(--c-steel); font-family: var(--font-mono), monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; }
    .lg-label { fill: var(--c-ink); font-family: var(--font-sans), sans-serif; font-size: 13.5px; font-weight: 500; }
    .lg-pct { fill: var(--c-slate); font-family: var(--font-mono), monospace; font-size: 13.5px; font-weight: 700; }
  </style>
  <text class="title" x="14" y="22">${t(
    "WHERE THE BUDGET GOES",
    "OÙ VA LE BUDGET"
  )}</text>
  ${arcs}
  <text class="center-num" x="${cx}" y="${cy - 4}" text-anchor="middle">100%</text>
  <text class="center-sub" x="${cx}" y="${cy + 16}" text-anchor="middle">${t("OF BUDGET", "DU BUDGET")}</text>
  ${legend}
</svg>
`.trim();
}

/** TCO — 3-year stacked bars showing year-1 spike vs recurring costs. */
function tcoTimelineSvg(locale: "en" | "fr"): string {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  // Heights in viewBox units — relative not absolute FCFA
  const years = [
    {
      label: t("Year 1", "Année 1"),
      total: t("4 000 000 FCFA", "4 000 000 FCFA"),
      segs: [
        { label: t("Build", "Création"), h: 200, color: "var(--c-primary)" },
        { label: t("Hosting", "Hébergement"), h: 18, color: "var(--c-secondary)" },
        { label: t("Maintenance", "Maintenance"), h: 32, color: "var(--c-steel)" },
      ],
    },
    {
      label: t("Year 2", "Année 2"),
      total: t("700 000 FCFA", "700 000 FCFA"),
      segs: [
        { label: t("Hosting", "Hébergement"), h: 20, color: "var(--c-secondary)" },
        { label: t("Maintenance", "Maintenance"), h: 40, color: "var(--c-steel)" },
        { label: t("Small updates", "Petites évolutions"), h: 24, color: "var(--c-primary-hover)" },
      ],
    },
    {
      label: t("Year 3", "Année 3"),
      total: t("1 200 000 FCFA", "1 200 000 FCFA"),
      segs: [
        { label: t("Hosting", "Hébergement"), h: 22, color: "var(--c-secondary)" },
        { label: t("Maintenance", "Maintenance"), h: 44, color: "var(--c-steel)" },
        { label: t("New features", "Nouvelles fonctions"), h: 60, color: "var(--c-primary-hover)" },
      ],
    },
  ];

  const colW = 100;
  const colGap = 70;
  const colsStartX = 90;
  const baseY = 280; // bottom of bars

  const cols = years
    .map((yr, i) => {
      const x = colsStartX + i * (colW + colGap);
      let cursor = baseY;
      const segs = yr.segs
        .map((seg) => {
          cursor -= seg.h;
          return `<rect x="${x}" y="${cursor}" width="${colW}" height="${seg.h}" rx="2" fill="${seg.color}" />`;
        })
        .join("");
      return `
      ${segs}
      <text class="year-label" x="${x + colW / 2}" y="${baseY + 22}" text-anchor="middle">${yr.label}</text>
      <text class="year-total" x="${x + colW / 2}" y="${baseY + 40}" text-anchor="middle">${yr.total}</text>`;
    })
    .join("");

  // Static legend matching first-year segments. Labels are kept short
  // and similar in length so the four items read with a visually
  // uniform spacing along the row — the previous "Création (one-off)"
  // was twice as wide as "Évolutions", which broke the rhythm.
  const legendItems = [
    { label: t("Build", "Création"), color: "var(--c-primary)" },
    { label: t("Hosting", "Hébergement"), color: "var(--c-secondary)" },
    { label: t("Maintenance", "Maintenance"), color: "var(--c-steel)" },
    { label: t("Updates", "Évolutions"), color: "var(--c-primary-hover)" },
  ];
  const legend = legendItems
    .map((it, i) => {
      // 4 items × 144 units = 576, fits inside the 14..590 work area.
      const x = 14 + i * 144;
      return `<rect x="${x}" y="350" width="12" height="12" rx="2" fill="${it.color}" />
              <text class="lg" x="${x + 18}" y="361">${it.label}</text>`;
    })
    .join("");

  const ariaLabel = t(
    "Three-year total cost of ownership for a website project",
    "Coût total de possession d'un site web sur trois ans"
  );

  return `
<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${ariaLabel}">
  <style>
    .title { fill: var(--c-steel); font-family: var(--font-mono), monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; }
    .year-label { fill: var(--c-ink); font-family: var(--font-sans), sans-serif; font-size: 13px; font-weight: 600; }
    .year-total { fill: var(--c-slate); font-family: var(--font-mono), monospace; font-size: 12px; font-weight: 700; }
    .lg { fill: var(--c-slate); font-family: var(--font-mono), monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; }
    .axis { stroke: var(--c-mist); stroke-width: 1; }
  </style>
  <text class="title" x="14" y="22">${t(
    "3-YEAR COST — BUILD vs LIVING",
    "COÛT SUR 3 ANS — CRÉATION vs VIE COURANTE"
  )}</text>
  <line class="axis" x1="60" y1="280" x2="580" y2="280" />
  ${cols}
  ${legend}
</svg>
`.trim();
}

/**
 * Decision matrix — budget × complexity, with the recommended tier in
 * each quadrant.
 *
 * Layout changes from the previous version:
 *  - Axis labels are horizontal (no rotated text) and sit on
 *    dedicated header / footer / side rows so they can't be clipped.
 *  - Cards are wider (qW = 248) with a real 16 px gap, so two-line
 *    bodies actually fit without clipping at the right edge.
 *  - Body text is hand-split as a tuple `[line1, line2]` per locale
 *    rather than auto-split at word index 7 — the previous heuristic
 *    pushed long words off the card. Now every line fits the width.
 */
function decisionMatrixSvg(locale: "en" | "fr"): string {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  // Tuple-aware companion of t(): picks between two [line1, line2] pairs
  // without losing the tuple type. Keeps card body splits type-safe.
  const tt = (
    en: [string, string],
    fr: [string, string]
  ): [string, string] => (locale === "fr" ? fr : en);

  // 2 × 2 layout — sized so the left-side row labels ("Complexe",
  // "Plus simple") have enough breathing room that they can't crash
  // into the cards. colXLeft = 84 reserves 70 px of usable label
  // space on the left (from x=14 to x=72, with a 12 px gap before
  // the first card). The cards themselves stay 240 px wide with a
  // 12 px column gap and fit comfortably inside the 600-unit viewBox.
  const qW = 240;
  const qH = 110;
  const colXLeft = 84;
  const colXRight = colXLeft + qW + 12; // 336
  const rowYTop = 90;
  const rowYBot = rowYTop + qH + 14; // 214

  type Tone = "warning" | "primary" | "neutral";
  type Quad = {
    x: number;
    y: number;
    tone: Tone;
    title: string;
    lines: [string, string];
  };

  const quadrants: Quad[] = [
    // TOP-LEFT — Low budget × Complex need = risk
    {
      x: colXLeft,
      y: rowYTop,
      tone: "warning",
      title: t("Risk zone", "Zone à risque"),
      lines: tt(
        ["Underfunded scope. Expect", "abandon or rebuild within a year."],
        ["Cadrage sous-financé. Abandon", "ou refonte en moins d'un an."]
      ),
    },
    // TOP-RIGHT — High budget × Complex = bespoke agency build
    {
      x: colXRight,
      y: rowYTop,
      tone: "primary",
      title: t("Custom agency build", "Projet sur mesure (agence)"),
      lines: tt(
        ["Multi-team build, real ownership,", "scales over 3 – 5 years."],
        ["Équipe pluri-disciplinaire, vraie", "propriété, échelle 3 – 5 ans."]
      ),
    },
    // BOTTOM-LEFT — Low budget × Simple = DIY / junior
    //
    // FR title kept to 24 characters (same as the EN one) so it
    // fits the ~25-char inner card width at 14 px bold. "Débutant"
    // is implied by the bottom-left position of the quadrant and by
    // the body line ("landing pages, sites vitrine, MVP").
    {
      x: colXLeft,
      y: rowYBot,
      tone: "neutral",
      title: t(
        "DIY or junior freelancer",
        "Bricolage ou freelanceur"
      ),
      lines: tt(
        ["Fine for landing pages, hobby", "sites and validation MVPs."],
        ["OK pour landing pages, sites", "vitrine et MVP de validation."]
      ),
    },
    // BOTTOM-RIGHT — High budget × Simple = overspend
    {
      x: colXRight,
      y: rowYBot,
      tone: "warning",
      title: t("Overinvestment", "Sur-investissement"),
      lines: tt(
        ["Paying agency rates for brochure", "pages. Resize the brief."],
        ["Tarif d'agence pour un site", "vitrine. Revoir le périmètre."]
      ),
    },
  ];

  const fillFor = (tone: Tone) =>
    tone === "primary"
      ? "var(--c-primary-light)"
      : tone === "warning"
        ? "rgba(200, 110, 40, 0.10)"
        : "var(--c-bg)";
  const strokeFor = (tone: Tone) =>
    tone === "primary"
      ? "var(--c-primary)"
      : tone === "warning"
        ? "rgba(200, 110, 40, 0.55)"
        : "var(--c-mist)";
  const titleColorFor = (tone: Tone) =>
    tone === "primary"
      ? "var(--c-primary)"
      : tone === "warning"
        ? "rgba(150, 75, 25, 1)"
        : "var(--c-ink)";

  const cards = quadrants
    .map((q) => {
      const fill = fillFor(q.tone);
      const stroke = strokeFor(q.tone);
      const titleColor = titleColorFor(q.tone);
      return `
        <rect x="${q.x}" y="${q.y}" width="${qW}" height="${qH}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="1.2" />
        <text class="q-title" x="${q.x + 18}" y="${q.y + 30}" fill="${titleColor}">${q.title}</text>
        <text class="q-body" x="${q.x + 18}" y="${q.y + 56}" fill="var(--c-slate)">
          <tspan x="${q.x + 18}" dy="0">${q.lines[0]}</tspan>
          <tspan x="${q.x + 18}" dy="20">${q.lines[1]}</tspan>
        </text>`;
    })
    .join("");

  // Side / header axis labels — plain horizontal text so they can never
  // get clipped by an SVG rotation transform.
  const colHeaderLow = t("LOWER BUDGET", "BUDGET RÉDUIT");
  const colHeaderHigh = t("HIGHER BUDGET", "BUDGET ÉLEVÉ");
  // Short, single-word axis labels in both languages so they fit the
  // ~70 px gutter to the left of the cards. The earlier FR label
  // "Plus simple" was ~72 px wide and bled into the bottom-left card.
  const rowLabelSimple = t("Simple", "Simple");
  const rowLabelComplex = t("Complex", "Complexe");

  const ariaLabel = t(
    "Decision matrix mapping project complexity against available budget",
    "Matrice de décision croisant complexité du projet et budget"
  );

  return `
<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${ariaLabel}">
  <style>
    .axis-title { fill: var(--c-steel); font-family: var(--font-mono), monospace; font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; }
    .axis-side  { fill: var(--c-steel); font-family: var(--font-mono), monospace; font-size: 10.5px; font-weight: 700; letter-spacing: 0.10em; }
    .q-title { font-family: var(--font-sans), sans-serif; font-size: 14px; font-weight: 700; }
    .q-body  { font-family: var(--font-sans), sans-serif; font-size: 12.5px; font-weight: 500; }
    .axis-rule { stroke: var(--c-mist); stroke-width: 1; stroke-dasharray: 3 4; }
  </style>

  <!-- TOP — column headers -->
  <text class="axis-title" x="${(colXLeft + qW / 2).toFixed(0)}" y="74" text-anchor="middle">${colHeaderLow}</text>
  <text class="axis-title" x="${(colXRight + qW / 2).toFixed(0)}" y="74" text-anchor="middle">${colHeaderHigh}</text>

  <!-- LEFT — row labels (horizontal, set wide of the cards) -->
  <text class="axis-side" x="14" y="${(rowYTop + qH / 2 + 4).toFixed(0)}">${rowLabelComplex}</text>
  <text class="axis-side" x="14" y="${(rowYBot + qH / 2 + 4).toFixed(0)}">${rowLabelSimple}</text>

  <!-- soft divider between the two columns / rows so the matrix reads as a 2×2 grid -->
  <line class="axis-rule" x1="${(colXRight - 8).toFixed(0)}" y1="${(rowYTop - 4).toFixed(0)}" x2="${(colXRight - 8).toFixed(0)}" y2="${(rowYBot + qH + 4).toFixed(0)}" />
  <line class="axis-rule" x1="${colXLeft}" y1="${(rowYBot - 7).toFixed(0)}" x2="${(colXRight + qW).toFixed(0)}" y2="${(rowYBot - 7).toFixed(0)}" />

  ${cards}

  <!-- BOTTOM — single axis caption -->
  <text class="axis-title" x="300" y="348" text-anchor="middle">${t(
    "BUDGET AVAILABLE  →    PROJECT COMPLEXITY  ↑",
    "BUDGET DISPONIBLE  →    COMPLEXITÉ DU PROJET  ↑"
  )}</text>
</svg>
`.trim();
}

/* ──────────────────────────────────────────────────────────────
 * Posts
 * ──────────────────────────────────────────────────────────── */

const POSTS: BlogPost[] = [
  /* ─── EN — Website cost in Cameroon 2026 (pricing pillar) ── */
  {
    slug: "website-cost-cameroon-2026",
    locale: "en",
    title:
      "How much does a professional website cost in Cameroon in 2026? Complete pricing guide",
    description:
      "Real FCFA price ranges, what each tier includes, hidden costs, and how to choose the right partner — a transparent guide for businesses in Cameroon.",
    date: "2026-06-04",
    author: "Zekora",
    tags: [
      "Pricing",
      "Cameroon",
      "Web Development",
      "Digital Agency",
      "Small Business",
    ],
    readingTime: 11,
    content: `
<p>“How much does a website cost?” is the question every business in Cameroon asks before they start a digital project — and the one almost nobody answers honestly. Quotes range from <strong>50 000 FCFA</strong> to <strong>25 million FCFA</strong> for what sounds like the same thing. Most of the time, the people asking walk away more confused than they were before.</p>

<p>This guide cuts through the confusion. Real FCFA ranges from the Cameroonian market in 2026. What each price level actually buys you. What hidden costs hit you in year two. And, at the end, how to tell whether a quote is fair or you’re being overcharged.</p>

<p>If you’re budgeting a website for a business in <strong>Yaoundé, Douala, Bafoussam, Bamenda, Garoua, Buea, Kribi, Limbé</strong> or anywhere else in Cameroon, this is the article we wish someone had handed us before our first project.</p>

<h2>Why prices vary by 500× for “the same website”</h2>

<p>A 100 000 FCFA WordPress.com page and a 12 000 000 FCFA agency build are both technically “websites”. They’re also as different as a moped and a delivery truck. The price gap reflects five concrete differences:</p>

<ul>
<li><strong>Who builds it</strong> — a student doing it part-time vs. a five-person agency with designers, developers, project managers and QA.</li>
<li><strong>What’s under the hood</strong> — a template anyone can use vs. custom code written for your business.</li>
<li><strong>How findable it is</strong> — zero SEO vs. structured data + bilingual indexing + Google Business Profile linkage.</li>
<li><strong>How fast it loads</strong> — a generic shared host vs. a modern edge-deployed stack like Next.js + Cloudflare.</li>
<li><strong>Who fixes it when it breaks</strong> — nobody, the freelancer who disappeared three months in, vs. an agency you can still reach in 2027.</li>
</ul>

<p>Below, we map every realistic price level the Cameroonian market offers in 2026, what you get, and what you risk.</p>

<h2>The five tiers of website pricing in Cameroon (2026)</h2>

<figure>
${priceLadderSvg("en")}
<figcaption>Realistic 2026 budget ranges by provider type, in FCFA. Most professional business projects sit between 2 000 000 and 6 000 000.</figcaption>
</figure>

<h3>Tier 1 — DIY / no-code (0–100 000 FCFA)</h3>
<p>You build it yourself on a no-code platform like Wix, WordPress.com or Carrd. Subscription is roughly <strong>5 000–10 000 FCFA per month</strong>. No designer, no developer, no SEO.</p>
<p><strong>Best fit:</strong> a personal page, a one-page portfolio, a temporary landing page while you finalise your scope.</p>
<p><em>If you need more</em>: the next tier adds a real human who can give you a proper layout and a custom domain that doesn't read "made-on-Wix" to your customers.</p>

<h3>Tier 2 — Junior freelancer (100 000–500 000 FCFA)</h3>
<p>A student or self-taught developer puts a WordPress (or sometimes a custom) theme online with your logo and 5–6 pages. This is the price point you'll see most often on Facebook and WhatsApp — many Cameroonian freelancers settle around <strong>250 000–400 000 FCFA</strong> for a basic 5-page showcase site.</p>
<p>The risk isn't the price — it's what happens six months later: the freelancer is busy, the password is lost, the host has stopped renewing.</p>
<p><strong>Best fit:</strong> a sole trader or new business testing whether a web presence converts, or anyone whose customers will <em>not</em> Google them before deciding to buy.</p>
<p><em>If you need more</em>: structured SEO, a non-template design, and someone you can call in 18 months when the site needs a refresh.</p>

<h3>Tier 3 — Senior freelancer or micro-agency (500 000–2 000 000 FCFA)</h3>
<p>An experienced solo developer or a 2–5 person micro-agency. You get a real design pass, decent quality, basic SEO, and usually three months of post-launch support. Build time is typically 3–8 weeks depending on scope — a tight showcase site can ship in 2–3 weeks when everyone is responsive.</p>
<p><strong>Best fit:</strong> a small business that wants a serious online presence and isn't planning to add custom dashboards, Mobile Money payments or a bilingual interface from day one.</p>
<p><em>If you need more</em>: a full team (UX + dev + QA + PM), structured-data SEO, multilingual rollout, or integrations with MTN MoMo / Orange Money. That's the next tier.</p>

<h3>Tier 4 — Professional agency (2 000 000–6 000 000 FCFA) — <em>the sweet spot for serious businesses</em></h3>
<p>This is where the price-to-quality ratio peaks for most Cameroonian businesses that take their digital presence seriously. A real team — designers, developers, project managers, QA — builds you a modern, fast, multilingual website with structured data, real SEO, Google Business Profile linkage, and an optional 6–12 month maintenance contract.</p>
<p>Build time ranges from <strong>4 to 14 weeks</strong> depending on scope: a focused agency-quality showcase site can ship in 4–6 weeks; a content-rich multilingual site with custom interactions sits at 8–14 weeks. The site is yours, the source is yours, and the team is reachable when you need a change next year.</p>
<p><strong>Best fit:</strong> SMEs, NGOs, professional services, schools, real-estate companies, agencies, restaurants with delivery, microfinances with a customer-facing site — anyone who needs the site to actively help win business rather than just exist online.</p>

<h3>Tier 5 — Enterprise / SaaS platform (6 000 000 FCFA+)</h3>
<p>Custom dashboards, multi-tenant systems, Mobile Money (MTN MoMo, Orange Money) integration, e-commerce with stock and logistics, multilingual customer portals, role-based access, audit logs. Build time is typically 4–10 months and the same team handles the ongoing platform.</p>
<p><strong>Best fit:</strong> FinTech, large e-commerce, B2B SaaS, hospitals, microfinance institutions, multi-branch businesses — projects where the website is a working operational system, not a marketing surface.</p>

<p style="margin-top: 1.5em;"><em>Whatever your project size — from a one-page launch to a complex multi-tenant platform — the right tier is the one that matches your needs honestly. We're equally happy to scope an ambitious Tier 4 build or a focused Tier 2 quick-launch.</em></p>

<h2>What the budget actually buys</h2>

<p>The single biggest reason quotes feel arbitrary is that the line items aren’t broken down. Here’s the real composition of a professional website project — roughly the same across mid-tier projects everywhere on the continent.</p>

<figure>
${costBreakdownSvg("en")}
<figcaption>Where the budget for a Tier 4 project goes. Development is less than half — most of the work happens before and after the code is written.</figcaption>
</figure>

<p>A few things stand out:</p>
<ul>
<li><strong>Design and UX are 25%</strong> — not optional. The reason agency sites look better isn’t mystery; it’s that a quarter of the budget paid for someone to think about it.</li>
<li><strong>Development is only 40%</strong> — the rest is scoping, project management, testing, content, launch and training. Quotes that are “only development” are usually missing half the work.</li>
<li><strong>Launch and training is 15%</strong> — the part most freelancers skip. It’s also the part that determines whether the website actually gets used.</li>
</ul>

<h2>What the years AFTER the build actually cost</h2>

<p>The initial build is one cheque. The years after are where most pricing conversations turn into surprises. The honest answer is that <em>it depends on what you choose to pay for</em> — there's a minimum scenario, and a maintenance scenario, and they're very different numbers.</p>

<figure>
${tcoTimelineSvg("en")}
<figcaption>The total cost of ownership for a Tier 4 website over three years. The build is the spike. Years 2 and 3 are usually small unless you actively commission new features.</figcaption>
</figure>

<h3>The mandatory ongoing items (everyone pays these)</h3>

<table>
<thead>
<tr><th>Item</th><th>Yearly cost (FCFA)</th><th>What you get</th></tr>
</thead>
<tbody>
<tr><td>Domain name (.com)</td><td>6 000 – 12 000</td><td>The address (yourbrand.com)</td></tr>
<tr><td>Hosting — basic shared</td><td>25 000 – 70 000</td><td>Hostinger / Namecheap / OVH starter, fine for a showcase site</td></tr>
<tr><td>Hosting — performance / VPS</td><td>60 000 – 200 000</td><td>Modern stack (Cloudflare Pages, Hetzner, DigitalOcean) for traffic + fast load</td></tr>
<tr><td>SSL certificate</td><td>0</td><td>Free via Let's Encrypt or Cloudflare</td></tr>
<tr><td>Email at your domain</td><td>0 – 50 000</td><td>Free via Cloudflare Email Routing, or Zoho Mail (~7 500/year/user), or Google Workspace (~45 000/year/user)</td></tr>
</tbody>
</table>

<p>So the realistic <strong>minimum</strong> after the build is just <strong>30 000 – 100 000 FCFA per year</strong> if you stay on basic shared hosting with a forwarded email. That's it. You don't <em>have</em> to spend more.</p>

<h3>The optional items (only when you want them)</h3>

<table>
<thead>
<tr><th>Item</th><th>Cost</th><th>When you need it</th></tr>
</thead>
<tbody>
<tr><td>Maintenance contract</td><td>5–10% of build cost / year, or à la carte</td><td>If you want guaranteed response time, security patches managed, monthly check-ins</td></tr>
<tr><td>New module or feature</td><td>200 000 – 1 500 000 / module</td><td>When you decide to add a blog, a booking system, a payment gateway, etc. — billed when you commission it, not yearly</td></tr>
<tr><td>Content updates by us</td><td>~20 000 / hour or bundled</td><td>If you'd rather not learn the admin yourself</td></tr>
<tr><td>Redesign / major refresh</td><td>30–60% of original build</td><td>Typically every 3–5 years — only when the brand or strategy changes</td></tr>
</tbody>
</table>

<p>This is the part that often gets misrepresented. Many clients do exactly this: <strong>pay only the hosting + domain</strong> after launch, and only call us back when there's something specific to build — a new module, a redesign, an integration. Updates are not a yearly bill; they're project-based, when you actually need them.</p>

<p>For a Tier 4 build at 3 000 000 FCFA, year-one out-of-pocket is around <strong>3 050 000 – 3 100 000 FCFA</strong>. Years 2 and 3 can be as low as <strong>30 000 – 100 000 FCFA</strong> each if you don't commission anything new. The big number you see in the chart above is the <em>maximum</em> realistic scenario with a full maintenance contract and an occasional new feature — not the floor.</p>

<h2>How to choose the right tier — without overspending or underspending</h2>

<p>The right tier isn’t about picking the cheapest or the fanciest — it’s about matching project complexity to budget honestly. Two quadrants on this map produce 90% of the disappointed clients we meet:</p>

<figure>
${decisionMatrixSvg("en")}
<figcaption>If you land in the top-left, the project will collapse before launch. If you land in the bottom-right, you’re overpaying for what you actually need.</figcaption>
</figure>

<p>Practical rule of thumb:</p>
<ul>
<li><strong>If your business sells anything &gt; 100 000 FCFA per transaction</strong> — invest at Tier 3 or 4. The credibility uplift pays for itself in 3–6 closed deals.</li>
<li><strong>If your customers Google before they call</strong> — Tier 3 minimum, ideally Tier 4 with real SEO.</li>
<li><strong>If you accept Mobile Money payments online</strong> — Tier 4 or 5 only. Junior tiers don’t safely integrate MTN MoMo or Orange Money APIs.</li>
<li><strong>If you’re bilingual (FR + EN)</strong> — Tier 4 or 5. Anything cheaper usually means one language at a time.</li>
</ul>

<h2>How to spot a fair quote (and a red-flag one)</h2>

<p>Bring this checklist to your next meeting with any provider. Quotes that don’t address these items are almost always priced wrong — either too low (something’s missing) or too high (someone’s padding).</p>

<ul>
<li><strong>A written scope.</strong> A real provider gives you pages, features, integrations and out-of-scope items in writing.</li>
<li><strong>A milestone-based timeline.</strong> Discovery → design → build → QA → launch, with dates.</li>
<li><strong>Itemised pricing.</strong> Design, development, content integration, SEO, launch, training. Lump-sum quotes hide trade-offs.</li>
<li><strong>Ownership clause.</strong> Source code, content, accounts and domains belong to <em>you</em>, not the provider.</li>
<li><strong>Maintenance terms.</strong> What’s included for the first three months, what’s extra, what’s the hourly rate after.</li>
<li><strong>A real portfolio of live sites.</strong> Not screenshots, not “redacted for confidentiality”. Real URLs that load today.</li>
<li><strong>Stack transparency.</strong> What technology will the site be built on, and why? “Modern stack” is not an answer.</li>
</ul>

<p>Red flags: a single-line quote with no breakdown, a price that’s 70% below the market, “we’ll talk about ownership later”, no written scope, no examples of live work, refusing to put a timeline in writing.</p>

<h2>The honest answer for a typical business in Cameroon in 2026</h2>

<p>If you're a small or medium-sized business — a clinic in Yaoundé, a real-estate agency in Douala, an NGO operating across Adamaoua, a school in Bafoussam, a restaurant chain in Buea — the realistic number is between <strong>1 500 000 and 3 500 000 FCFA</strong> for an agency-quality initial build (Tier 3 to lower Tier 4).</p>

<p>After launch, your minimum ongoing cost is just <strong>30 000–100 000 FCFA per year</strong> for hosting + domain. Anything beyond that — maintenance, new features, redesigns — is commissioned only when you decide it's time, not on a recurring bill.</p>

<p>That gets you a real team, real ownership, real SEO, and a site you can keep growing for 3–5 years before a redesign becomes necessary. It is not the cheapest option on the market. It is — by a wide margin — the cheapest option that actually keeps working.</p>

<h2>Frequently asked questions</h2>

<h3>How much does a professional website cost in Cameroon in 2026?</h3>
<p>Realistic 2026 ranges for the initial build: junior freelancers on Facebook / WhatsApp sit around <strong>250 000–500 000 FCFA</strong>, senior freelancers or micro-agencies between <strong>500 000–2 000 000 FCFA</strong>, and professional agencies between <strong>1 500 000 and 6 000 000 FCFA</strong> depending on scope (multilingual, integrations, custom design). Full enterprise SaaS platforms with MoMo + dashboards + multi-tenant features start at 6 000 000 FCFA and can run to 20 000 000+. Always confirm what's included before comparing two quotes.</p>

<h3>What’s the difference between a WordPress site and a custom-built site?</h3>
<p>A WordPress site uses a theme — fast to set up, but the design isn’t yours and the performance, SEO and security depend on plugins you don’t control. A custom build (Next.js, React, or similar) is written for your business: faster, more secure, owned by you, and more flexible to evolve. For a brochure site, WordPress is fine. For anything with logged-in users, payments, multilingualism or data, custom is almost always the right call within 18 months.</p>

<h3>What annual costs should I expect after the initial build?</h3>
<p>The mandatory minimum is small: <strong>30 000 to 100 000 FCFA per year</strong> for a .com domain (~6 000–12 000) + basic hosting (~25 000–70 000) + free email forwarding. That's it. Everything else — maintenance contracts, new features, redesigns — is optional and commissioned only when you decide you want them, not on a recurring bill. Most clients pay just hosting + domain after launch and call us back when they have a specific need: a new module, an integration, a refresh. Updates are project-based, not yearly.</p>

<h3>How can I avoid overpaying — or underpaying?</h3>
<p>Get <strong>three written quotes</strong> from providers at the same tier (don’t compare a junior freelancer to an agency — they’re different services). Compare them on scope, ownership, timeline and maintenance, not just the headline number. The middle quote is usually the most realistic. A quote that’s 70% below the others is hiding work that will resurface as “extras” later.</p>

<h3>How long does it take to build a professional website?</h3>
<p>It depends entirely on scope. A focused, well-briefed showcase site can ship in <strong>2 to 3 weeks</strong> when both sides are responsive. A typical Tier 4 multilingual site lands at <strong>4 to 14 weeks</strong>: 1–2 weeks of discovery and design, 2–8 weeks of build, 1 week of QA + launch. A complex SaaS or e-commerce platform with custom dashboards, Mobile Money and admin tools is closer to <strong>4 to 10 months</strong>. The single biggest factor is the size of the scope, not the size of the team — anything with a "1 week to launch" promise is either reusing a template or skipping testing.</p>

<h2>Ready to talk numbers for your project?</h2>

<p>At <strong>Zekora</strong>, we work mostly at the Tier 4 level — agency-grade builds for serious Cameroonian businesses, with real ownership, real SEO, and the long-term support that turns a website into a working asset rather than an expense. Yaoundé, Douala, and every other city in Cameroon, remote-first.</p>

<p>Get a free, no-pressure quote that itemises the work and locks down ownership before the first line of code is written. <a href="/en/contact">Start the conversation here</a> — or read our <a href="/en/services">services overview</a> to see exactly what each tier looks like.</p>
`.trim(),
  },

  /* ─── FR — Coût d'un site web au Cameroun 2026 (pilier prix) ─ */
  {
    slug: "website-cost-cameroon-2026",
    locale: "fr",
    title:
      "Combien coûte un site web professionnel au Cameroun en 2026 ? Guide complet des prix",
    description:
      "Fourchettes réelles en FCFA, ce que chaque niveau inclut vraiment, les coûts cachés, et comment choisir le bon prestataire — guide transparent pour les entreprises au Cameroun.",
    date: "2026-06-04",
    author: "Zekora",
    tags: [
      "Tarifs",
      "Cameroun",
      "Création de site web",
      "Agence digitale",
      "PME",
    ],
    readingTime: 11,
    content: `
<p>«&nbsp;Combien coûte un site web&nbsp;?&nbsp;» — c&rsquo;est la question que se pose toute entreprise au Cameroun avant de lancer un projet digital, et c&rsquo;est aussi celle à laquelle presque personne ne répond honnêtement. Les devis vont de <strong>50&nbsp;000 FCFA</strong> à <strong>25&nbsp;millions de FCFA</strong> pour ce qui ressemble au même produit. Le plus souvent, les personnes qui demandent repartent plus perdues qu&rsquo;avant.</p>

<p>Ce guide tranche dans le flou. Des fourchettes réelles, en FCFA, sur le marché camerounais en 2026. Ce que chaque niveau de prix vous achète vraiment. Les coûts cachés qui tombent en année 2. Et, à la fin, comment savoir si un devis est juste ou si on vous surfacture.</p>

<p>Si vous préparez un budget site web pour une entreprise à <strong>Yaoundé, Douala, Bafoussam, Bamenda, Garoua, Buea, Kribi, Limbé</strong> ou ailleurs au Cameroun, voici l&rsquo;article qu&rsquo;on aurait aimé lire avant notre premier projet.</p>

<h2>Pourquoi les prix varient de 1 à 500 pour «&nbsp;le même site&nbsp;»</h2>

<p>Un site WordPress.com à 100&nbsp;000 FCFA et un projet d&rsquo;agence à 12&nbsp;000&nbsp;000 FCFA sont tous deux techniquement des «&nbsp;sites web&nbsp;». Ils sont aussi aussi différents qu&rsquo;une moto et un camion de livraison. L&rsquo;écart de prix reflète cinq différences concrètes&nbsp;:</p>

<ul>
<li><strong>Qui le construit</strong> — un étudiant à temps partiel vs. une agence de cinq personnes avec designers, développeurs, chefs de projet et QA.</li>
<li><strong>Ce qu&rsquo;il y a sous le capot</strong> — un template que tout le monde peut utiliser vs. du code écrit pour votre entreprise.</li>
<li><strong>La capacité à être trouvé</strong> — zéro SEO vs. données structurées + indexation bilingue + liaison avec votre Google Business Profile.</li>
<li><strong>La vitesse de chargement</strong> — un hébergement mutualisé générique vs. une stack moderne déployée à la périphérie (Next.js + Cloudflare).</li>
<li><strong>Qui le répare quand ça casse</strong> — personne, le freelanceur qui a disparu trois mois plus tard, vs. une agence qu&rsquo;on peut encore joindre en 2027.</li>
</ul>

<p>Ci-dessous, nous cartographions chaque niveau de prix réaliste du marché camerounais en 2026, ce que vous obtenez et ce que vous risquez.</p>

<h2>Les cinq niveaux de prix au Cameroun (2026)</h2>

<figure>
${priceLadderSvg("fr")}
<figcaption>Fourchettes de budget réalistes 2026 selon le type de prestataire, en FCFA. La plupart des projets sérieux pour une entreprise se situent entre 2&nbsp;000&nbsp;000 et 6&nbsp;000&nbsp;000.</figcaption>
</figure>

<h3>Niveau 1 — Bricolage / no-code (0–100&nbsp;000 FCFA)</h3>
<p>Vous le construisez vous-même sur une plateforme no-code comme Wix, WordPress.com ou Carrd. L&rsquo;abonnement tourne autour de <strong>5&nbsp;000 à 10&nbsp;000 FCFA par mois</strong>. Pas de designer, pas de développeur, pas de SEO.</p>
<p><strong>Le bon choix si&nbsp;:</strong> vous voulez une page perso, un portfolio d&rsquo;une page, ou une landing page temporaire pendant que vous affinez votre périmètre.</p>
<p><em>Si vous avez besoin de plus&nbsp;:</em> le niveau suivant ajoute une vraie personne pour concevoir la mise en page et un nom de domaine propre qui ne crie pas «&nbsp;fait sur Wix&nbsp;» à vos clients.</p>

<h3>Niveau 2 — Freelanceur débutant (100&nbsp;000–500&nbsp;000 FCFA)</h3>
<p>Un étudiant ou un autodidacte met en ligne un thème WordPress (ou parfois un site sur mesure) avec votre logo et 5–6 pages. C&rsquo;est le tarif qu&rsquo;on voit le plus souvent sur Facebook et WhatsApp&nbsp;: beaucoup de freelanceurs camerounais se positionnent autour de <strong>250&nbsp;000 à 400&nbsp;000 FCFA</strong> pour un site vitrine de 5 pages.</p>
<p>Le risque n&rsquo;est pas le prix — c&rsquo;est ce qui se passe six mois plus tard&nbsp;: le freelanceur est occupé, le mot de passe est perdu, l&rsquo;hébergeur n&rsquo;a pas été renouvelé.</p>
<p><strong>Le bon choix si&nbsp;:</strong> vous êtes auto-entrepreneur ou nouvelle entreprise, et vous voulez tester si une présence web convertit&nbsp;; ou vos clients ne Googleront pas avant d&rsquo;acheter.</p>
<p><em>Si vous avez besoin de plus&nbsp;:</em> un SEO structuré, un design non-template, et quelqu&rsquo;un que vous pouvez rappeler dans 18 mois quand le site a besoin d&rsquo;un rafraîchissement.</p>

<h3>Niveau 3 — Freelanceur senior ou micro-agence (500&nbsp;000–2&nbsp;000&nbsp;000 FCFA)</h3>
<p>Un développeur solo expérimenté ou une micro-agence de 2 à 5 personnes. Vous obtenez un vrai travail de design, une qualité correcte, un SEO de base, et généralement trois mois de support après lancement. Délai typique&nbsp;: 3 à 8 semaines selon le périmètre — un site vitrine bien cadré peut sortir en 2 à 3 semaines quand les deux parties sont réactives.</p>
<p><strong>Le bon choix si&nbsp;:</strong> vous êtes une PME qui veut une présence en ligne sérieuse et vous n&rsquo;avez pas besoin de tableaux de bord sur mesure, de Mobile Money ou d&rsquo;interface bilingue dès le départ.</p>
<p><em>Si vous avez besoin de plus&nbsp;:</em> une équipe complète (UX + dev + QA + chef de projet), un SEO avec données structurées, le déploiement bilingue ou les intégrations MTN MoMo / Orange Money. C&rsquo;est le niveau suivant.</p>

<h3>Niveau 4 — Agence professionnelle (2&nbsp;000&nbsp;000–6&nbsp;000&nbsp;000 FCFA) — <em>le rapport qualité-prix optimal pour les entreprises sérieuses</em></h3>
<p>C&rsquo;est ici que le ratio prix-qualité atteint son maximum pour la majorité des entreprises camerounaises qui prennent leur présence digitale au sérieux. Une vraie équipe — designers, développeurs, chefs de projet, QA — vous construit un site moderne, rapide, multilingue, avec données structurées, SEO réel, liaison Google Business Profile et un contrat de maintenance optionnel de 6 à 12 mois.</p>
<p>Le délai va de <strong>4 à 14 semaines</strong> selon le périmètre&nbsp;: un site vitrine de qualité agence se livre en 4 à 6 semaines, un site multilingue riche en contenu avec interactions sur mesure se situe entre 8 et 14 semaines. Le site est à vous, le code est à vous, et l&rsquo;équipe reste joignable l&rsquo;année suivante.</p>
<p><strong>Le bon choix si&nbsp;:</strong> vous êtes une PME, ONG, service professionnel, école, agence immobilière, agence digitale, restaurant avec livraison, microfinance avec site client — bref, quiconque a besoin d&rsquo;un site qui aide activement à gagner des contrats, pas seulement à exister en ligne.</p>

<h3>Niveau 5 — Plateforme entreprise / SaaS (6&nbsp;000&nbsp;000 FCFA et plus)</h3>
<p>Tableaux de bord sur mesure, systèmes multi-tenants, intégration Mobile Money (MTN MoMo, Orange Money), e-commerce avec stock et logistique, portails clients multilingues, gestion des rôles, journaux d&rsquo;audit. Délai typique&nbsp;: 4 à 10 mois, et la même équipe gère ensuite la plateforme.</p>
<p><strong>Le bon choix si&nbsp;:</strong> vous êtes une FinTech, un e-commerce d&rsquo;envergure, un SaaS B2B, un hôpital, une microfinance, une entreprise multi-agences — bref, des projets où le site est un système opérationnel actif, pas une surface marketing.</p>

<p style="margin-top: 1.5em;"><em>Quelle que soit la taille de votre projet — d&rsquo;une page d&rsquo;atterrissage simple à une plateforme multi-tenants complexe — le bon niveau est celui qui correspond honnêtement à votre besoin. Nous sommes tout aussi heureux de cadrer un projet Tier 4 ambitieux qu&rsquo;un lancement Tier 2 rapide.</em></p>

<h2>Ce que le budget achète vraiment</h2>

<p>La principale raison pour laquelle les devis paraissent arbitraires, c&rsquo;est que les postes ne sont pas détaillés. Voici la vraie composition d&rsquo;un projet de site web professionnel — à peu près la même pour les projets de niveau intermédiaire partout en Afrique francophone.</p>

<figure>
${costBreakdownSvg("fr")}
<figcaption>Répartition du budget d&rsquo;un projet de niveau 4. Le développement représente moins de la moitié — la majorité du travail se fait avant et après le code.</figcaption>
</figure>

<p>Quelques points à retenir&nbsp;:</p>
<ul>
<li><strong>Design et UX, c&rsquo;est 25&nbsp;%</strong> — pas optionnel. La raison pour laquelle les sites d&rsquo;agence sont plus beaux n&rsquo;est pas un mystère&nbsp;: un quart du budget a payé quelqu&rsquo;un pour y réfléchir.</li>
<li><strong>Le développement, c&rsquo;est seulement 40&nbsp;%</strong> — le reste, c&rsquo;est cadrage, gestion de projet, tests, contenu, lancement et formation. Les devis «&nbsp;uniquement développement&nbsp;» oublient la moitié du travail.</li>
<li><strong>Lancement et formation, c&rsquo;est 15&nbsp;%</strong> — la partie que la plupart des freelances sautent. C&rsquo;est aussi celle qui détermine si le site sera réellement utilisé.</li>
</ul>

<h2>Ce que coûtent vraiment les années APRÈS la création</h2>

<p>La création initiale, c&rsquo;est un chèque. Les années suivantes, c&rsquo;est là que la plupart des conversations sur les prix tournent à la surprise. La réponse honnête est que <em>ça dépend de ce que vous décidez de payer</em> — il y a un scénario minimum, et un scénario avec maintenance, et ce sont des montants très différents.</p>

<figure>
${tcoTimelineSvg("fr")}
<figcaption>Coût total de possession d&rsquo;un site de niveau 4 sur trois ans. La création est la pointe. Les années 2 et 3 sont en général petites — sauf si vous décidez activement de commander de nouvelles fonctionnalités.</figcaption>
</figure>

<h3>Les postes obligatoires (tout le monde les paye)</h3>

<table>
<thead>
<tr><th>Poste</th><th>Coût annuel (FCFA)</th><th>Ce que vous obtenez</th></tr>
</thead>
<tbody>
<tr><td>Nom de domaine (.com)</td><td>6&nbsp;000 – 12&nbsp;000</td><td>L&rsquo;adresse (votremarque.com)</td></tr>
<tr><td>Hébergement — mutualisé basique</td><td>25&nbsp;000 – 70&nbsp;000</td><td>Hostinger / Namecheap / OVH starter, suffisant pour un site vitrine</td></tr>
<tr><td>Hébergement — performance / VPS</td><td>60&nbsp;000 – 200&nbsp;000</td><td>Stack moderne (Cloudflare Pages, Hetzner, DigitalOcean) pour le trafic + la rapidité</td></tr>
<tr><td>Certificat SSL</td><td>0</td><td>Gratuit via Let&rsquo;s Encrypt ou Cloudflare</td></tr>
<tr><td>Email à votre domaine</td><td>0 – 50&nbsp;000</td><td>Gratuit via Cloudflare Email Routing, ou Zoho Mail (~7&nbsp;500/an/utilisateur), ou Google Workspace (~45&nbsp;000/an/utilisateur)</td></tr>
</tbody>
</table>

<p>Le <strong>minimum</strong> réaliste après la création se résume donc à <strong>30&nbsp;000 – 100&nbsp;000 FCFA par an</strong> si vous restez sur un hébergement mutualisé basique avec un email redirigé gratuit. C&rsquo;est tout. Vous n&rsquo;êtes <em>pas obligé</em> de dépenser plus.</p>

<h3>Les postes optionnels (uniquement si vous les voulez)</h3>

<table>
<thead>
<tr><th>Poste</th><th>Coût</th><th>Quand c&rsquo;est utile</th></tr>
</thead>
<tbody>
<tr><td>Contrat de maintenance</td><td>5–10&nbsp;% du coût initial / an, ou à la carte</td><td>Si vous voulez un temps de réponse garanti, les patchs de sécurité gérés, un point régulier</td></tr>
<tr><td>Nouveau module ou fonctionnalité</td><td>200&nbsp;000 – 1&nbsp;500&nbsp;000 / module</td><td>Quand vous décidez d&rsquo;ajouter un blog, un système de réservation, une passerelle de paiement, etc. — facturé à la commande, pas chaque année</td></tr>
<tr><td>Mises à jour de contenu par nous</td><td>~20&nbsp;000 / heure ou en forfait</td><td>Si vous préférez ne pas apprendre l&rsquo;admin vous-même</td></tr>
<tr><td>Refonte / rafraîchissement majeur</td><td>30–60&nbsp;% du coût initial</td><td>En général tous les 3 à 5 ans — uniquement quand la marque ou la stratégie change</td></tr>
</tbody>
</table>

<p>C&rsquo;est la partie souvent mal présentée. Beaucoup de clients font exactement ceci&nbsp;: <strong>ils ne paient que l&rsquo;hébergement + le domaine</strong> après le lancement, et nous rappellent uniquement quand il y a quelque chose de précis à construire — un nouveau module, une refonte, une intégration. Les évolutions ne sont pas une facture annuelle&nbsp;: elles sont à la demande, quand vous en avez réellement besoin.</p>

<p>Pour un projet de niveau 4 à 3&nbsp;000&nbsp;000 FCFA, la première année tourne autour de <strong>3&nbsp;050&nbsp;000 – 3&nbsp;100&nbsp;000 FCFA</strong> tout compris. Les années 2 et 3 peuvent descendre jusqu&rsquo;à <strong>30&nbsp;000 – 100&nbsp;000 FCFA</strong> chacune si vous ne commandez rien de nouveau. Le grand chiffre du graphique au-dessus, c&rsquo;est le <em>scénario maximum</em> avec contrat de maintenance complet et une évolution occasionnelle — pas le plancher.</p>

<h2>Comment choisir le bon niveau — sans surpayer ni sous-payer</h2>

<p>Le bon niveau n&rsquo;est pas le moins cher ni le plus haut de gamme — c&rsquo;est celui qui aligne honnêtement la complexité du projet et le budget. Deux quadrants de cette matrice produisent 90&nbsp;% des clients déçus que nous rencontrons&nbsp;:</p>

<figure>
${decisionMatrixSvg("fr")}
<figcaption>Si vous tombez en haut à gauche, le projet va s&rsquo;effondrer avant le lancement. En bas à droite, vous surpayez pour ce dont vous avez réellement besoin.</figcaption>
</figure>

<p>Règles pratiques&nbsp;:</p>
<ul>
<li><strong>Si votre activité vend des biens ou services à plus de 100&nbsp;000 FCFA la transaction</strong> — investissez au niveau 3 ou 4. Le gain de crédibilité se rembourse en 3 à 6 deals signés.</li>
<li><strong>Si vos clients Googlent avant d&rsquo;appeler</strong> — niveau 3 minimum, idéalement niveau 4 avec un vrai SEO.</li>
<li><strong>Si vous acceptez Mobile Money en ligne</strong> — niveau 4 ou 5 uniquement. Les niveaux juniors n&rsquo;intègrent pas les API MTN MoMo ou Orange Money en toute sécurité.</li>
<li><strong>Si vous êtes bilingue (FR + EN)</strong> — niveau 4 ou 5. En dessous, c&rsquo;est généralement une langue à la fois.</li>
</ul>

<h2>Comment reconnaître un devis juste (et un devis suspect)</h2>

<p>Apportez cette checklist à votre prochain rendez-vous avec un prestataire. Les devis qui n&rsquo;abordent pas ces points sont presque toujours mal tarifés — soit trop bas (il manque quelque chose) soit trop hauts (on vous surcharge).</p>

<ul>
<li><strong>Un périmètre écrit.</strong> Un vrai prestataire vous remet par écrit les pages, fonctionnalités, intégrations et exclusions.</li>
<li><strong>Un planning par jalons.</strong> Cadrage → design → développement → QA → lancement, avec des dates.</li>
<li><strong>Une tarification détaillée.</strong> Design, développement, intégration de contenu, SEO, lancement, formation. Les forfaits cachent les arbitrages.</li>
<li><strong>Clause de propriété.</strong> Le code, le contenu, les comptes et les domaines vous appartiennent, pas au prestataire.</li>
<li><strong>Conditions de maintenance.</strong> Ce qui est inclus pendant les trois premiers mois, ce qui ne l&rsquo;est pas, le tarif horaire après.</li>
<li><strong>Un vrai portfolio de sites en ligne.</strong> Pas de captures d&rsquo;écran, pas de «&nbsp;masqué pour confidentialité&nbsp;». De vraies URL qui chargent aujourd&rsquo;hui.</li>
<li><strong>Transparence sur la stack.</strong> Quelle technologie, et pourquoi&nbsp;? «&nbsp;Stack moderne&nbsp;» n&rsquo;est pas une réponse.</li>
</ul>

<p>Signaux d&rsquo;alerte&nbsp;: un devis en une seule ligne sans détail, un prix 70&nbsp;% sous le marché, «&nbsp;on parlera de la propriété plus tard&nbsp;», pas de périmètre écrit, pas d&rsquo;exemples en ligne, refus de mettre un planning par écrit.</p>

<h2>La réponse honnête pour une entreprise typique au Cameroun en 2026</h2>

<p>Si vous êtes une PME — une clinique à Yaoundé, une agence immobilière à Douala, une ONG opérant dans l&rsquo;Adamaoua, une école à Bafoussam, une chaîne de restaurants à Buea — le chiffre réaliste se situe entre <strong>1&nbsp;500&nbsp;000 et 3&nbsp;500&nbsp;000 FCFA</strong> pour une création initiale de qualité agence (haut du Niveau 3 ou bas du Niveau 4).</p>

<p>Après le lancement, votre minimum est juste <strong>30&nbsp;000 – 100&nbsp;000 FCFA par an</strong> pour l&rsquo;hébergement et le domaine. Tout le reste — maintenance, nouvelles fonctionnalités, refontes — n&rsquo;est commandé que lorsque vous décidez qu&rsquo;il est temps, pas sur une facture récurrente.</p>

<p>Vous obtenez alors une vraie équipe, une vraie propriété, un vrai SEO, et un site que vous pouvez faire évoluer pendant 3 à 5 ans avant qu&rsquo;une refonte ne devienne nécessaire. Ce n&rsquo;est pas l&rsquo;option la moins chère du marché. C&rsquo;est, de loin, l&rsquo;option la moins chère qui continue de fonctionner.</p>

<h2>Questions fréquentes</h2>

<h3>Combien coûte un site web professionnel au Cameroun en 2026 ?</h3>
<p>Fourchettes réalistes 2026 pour la création initiale&nbsp;: les freelanceurs débutants sur Facebook et WhatsApp se positionnent autour de <strong>250&nbsp;000 – 500&nbsp;000 FCFA</strong>, les freelanceurs seniors ou micro-agences entre <strong>500&nbsp;000 et 2&nbsp;000&nbsp;000 FCFA</strong>, et les agences professionnelles entre <strong>1&nbsp;500&nbsp;000 et 6&nbsp;000&nbsp;000 FCFA</strong> selon le périmètre (multilingue, intégrations, design sur mesure). Les plateformes SaaS d&rsquo;entreprise avec MoMo + tableaux de bord + fonctions multi-tenants démarrent à 6&nbsp;000&nbsp;000 FCFA et peuvent monter à 20&nbsp;000&nbsp;000+. Vérifiez toujours ce qui est inclus avant de comparer deux devis.</p>

<h3>Quelle est la différence entre un site WordPress et un site sur mesure ?</h3>
<p>Un site WordPress utilise un thème — rapide à mettre en place, mais le design n&rsquo;est pas le vôtre, et la performance, le SEO et la sécurité dépendent de plugins que vous ne contrôlez pas. Un site sur mesure (Next.js, React ou similaire) est écrit pour votre entreprise&nbsp;: plus rapide, plus sécurisé, votre propriété, et plus souple à faire évoluer. Pour un site vitrine, WordPress convient. Pour tout ce qui implique utilisateurs connectés, paiements, multilinguisme ou données, le sur mesure est presque toujours le bon choix à 18 mois.</p>

<h3>Quels coûts annuels prévoir après la création ?</h3>
<p>Le minimum obligatoire est petit&nbsp;: <strong>30&nbsp;000 à 100&nbsp;000 FCFA par an</strong> pour un domaine .com (~6&nbsp;000–12&nbsp;000) + l&rsquo;hébergement basique (~25&nbsp;000–70&nbsp;000) + un email redirigé gratuit. C&rsquo;est tout. Le reste — contrats de maintenance, nouvelles fonctionnalités, refontes — est optionnel et commandé uniquement quand vous décidez que vous en voulez, pas sur une facture récurrente. La plupart des clients ne payent que l&rsquo;hébergement + le domaine après le lancement, et nous rappellent quand ils ont un besoin précis&nbsp;: un nouveau module, une intégration, un rafraîchissement. Les évolutions sont à la commande, pas chaque année.</p>

<h3>Comment éviter de surpayer — ou de sous-payer ?</h3>
<p>Obtenez <strong>trois devis écrits</strong> de prestataires du même niveau (ne comparez pas un freelance débutant à une agence — ce ne sont pas les mêmes services). Comparez-les sur le périmètre, la propriété, le délai et la maintenance, pas seulement sur le montant affiché. Le devis du milieu est généralement le plus réaliste. Un devis 70&nbsp;% sous les autres cache du travail qui ressortira plus tard en «&nbsp;options supplémentaires&nbsp;».</p>

<h3>Combien de temps faut-il pour créer un site web professionnel ?</h3>
<p>Cela dépend entièrement du périmètre. Un site vitrine bien cadré peut sortir en <strong>2 à 3 semaines</strong> quand les deux parties sont réactives. Un projet typique de Niveau 4 (multilingue, design sur mesure) se situe entre <strong>4 et 14 semaines</strong>&nbsp;: 1 à 2 semaines de cadrage et design, 2 à 8 semaines de développement, 1 semaine de QA + lancement. Une plateforme SaaS ou e-commerce complexe avec tableaux de bord, Mobile Money et outils d&rsquo;administration tourne plutôt autour de <strong>4 à 10 mois</strong>. Le facteur principal, c&rsquo;est la taille du périmètre, pas la taille de l&rsquo;équipe — toute promesse de «&nbsp;1 semaine pour le lancement&nbsp;» réutilise soit un template, soit saute les tests.</p>

<h2>Prêt à parler chiffres pour votre projet ?</h2>

<p>Chez <strong>Zekora</strong>, nous travaillons principalement en niveau 4 — des projets calibre agence pour des entreprises camerounaises sérieuses, avec une vraie propriété, un vrai SEO et le support long-terme qui transforme un site web en actif de travail plutôt qu&rsquo;en charge. Yaoundé, Douala, et toutes les autres villes du Cameroun, en mode remote-first.</p>

<p>Obtenez un devis gratuit, sans pression, qui détaille le travail et verrouille la propriété avant la première ligne de code. <a href="/fr/contact">Démarrez la conversation ici</a> — ou consultez notre <a href="/fr/services">aperçu des services</a> pour voir exactement à quoi ressemble chaque niveau.</p>
`.trim(),
  },

  /* ─── EN — Web vs Mobile (new) ────────────────────────────── */
  {
    slug: "web-app-or-mobile-app-decision-framework",
    locale: "en",
    title: "Web app or mobile app? A decision framework for small businesses",
    description:
      "Should you build a mobile app, a web app, or both? A practical guide for small businesses — with diagrams to make the trade-offs visible.",
    date: "2026-05-23",
    author: "Zekora",
    tags: ["Web vs Mobile", "Product Strategy", "Small Business"],
    readingTime: 6,
    content: `
<p>“Should we build a mobile app?” is one of the most common — and most expensive — questions we hear from small businesses. The right answer is rarely “yes” on the first product. It is usually “not yet, and here&rsquo;s why.”</p>

<p>This post walks through the decision the way we walk through it with clients: a short tree to get to a default answer, a scorecard to sanity-check it, and a timeline to put real cost on the choice.</p>

<h2>Start with one question</h2>

<p>Almost every web-vs-mobile decision collapses to two follow-up questions on top of one core one.</p>

<figure>
${decisionTreeSvg("en")}
<figcaption>If users don&rsquo;t return weekly, web wins on default. Mobile only beats web when you need things the browser can&rsquo;t reliably deliver.</figcaption>
</figure>

<p>The reason the tree leans toward web is simple: <em>web is always cheaper to find, share, and update</em>. Mobile only pays back when there is a real reason users keep opening the icon.</p>

<h2>When the web wins</h2>

<ul>
<li><strong>You need to be found.</strong> Search engines crawl websites, not app stores in the same way. If discovery is part of growth, you need a web presence first.</li>
<li><strong>Your users are casual.</strong> Booking once a month, checking a price, filling a form. Asking them to install an app is asking them to opt in to a relationship they don&rsquo;t want yet.</li>
<li><strong>You ship changes often.</strong> A web app deploys in minutes. A mobile app needs a store review every time you fix a typo.</li>
<li><strong>You have one team.</strong> One web codebase covers iPhone, Android, tablets, laptops, work computers. Two mobile codebases cover only iPhone and Android — and you still need a backend.</li>
</ul>

<h2>When mobile wins</h2>

<ul>
<li><strong>Re-engagement matters.</strong> If your business model depends on people opening the product several times a week, the home-screen icon and push notifications are worth the cost.</li>
<li><strong>You need the device.</strong> Camera-heavy flows (delivery proof, KYC scans), GPS, biometrics, NFC payments — these are native-first capabilities.</li>
<li><strong>The network is unreliable.</strong> Field agents, drivers, technicians. Offline storage and sync make mobile non-optional.</li>
<li><strong>Performance is part of the brand.</strong> If smooth, near-instant interactions are the product (think wallets, trading, gaming), native still has a real edge.</li>
</ul>

<figure>
${scoreCardSvg("en")}
<figcaption>Each dot is roughly where the strength sits on a web ↔ mobile axis. Web wins on reach and speed of iteration; mobile wins on intimacy and device-level capabilities.</figcaption>
</figure>

<h2>The “both” trap — and the PWA middle ground</h2>

<p>The most expensive answer is “let&rsquo;s do both at the same time.” It triples the surface area you have to maintain before you know whether the product idea even works.</p>

<p>A better sequence:</p>
<ol>
<li><strong>Ship the web version first.</strong> Use it to validate that real users will pay, return, and recommend it.</li>
<li><strong>Add a Progressive Web App (PWA) layer</strong> for installable-from-the-browser, basic offline, and home-screen presence. It gets you ~70% of the “feels like an app” experience for ~10% of the cost.</li>
<li><strong>Build a native app only when the PWA stops being enough</strong> — usually that means push notifications you can&rsquo;t live without, deep hardware integration, or store-level distribution becoming critical.</li>
</ol>

<h2>What it actually costs</h2>

<p>The honest comparison isn&rsquo;t feature-for-feature — it&rsquo;s effort-to-launch. A small-business web app takes about two months of focused work; a real iOS + Android launch is closer to five months because you&rsquo;re building three things (backend, iOS, Android) instead of one (web + backend).</p>

<figure>
${timelineSvg("en")}
<figcaption>Indicative timeline for a small-business product. Mobile takes roughly 2.5× longer to first launch because you carry two native codebases on top of the same backend.</figcaption>
</figure>

<h2>Pick the cheaper bet first</h2>

<p>If you take one thing away: <em>the question isn&rsquo;t “web or mobile?” — it&rsquo;s “what&rsquo;s the cheapest experiment that proves people want this?”</em> For 9 out of 10 small businesses, that experiment is a clean, fast, well-structured web app — with the option to add native later, once the demand is real.</p>

<p>That&rsquo;s the work we do at Zekora: building the right version of the product, in the right order, so you&rsquo;re not paying for an app store presence before you&rsquo;ve earned it.</p>
`.trim(),
  },

  /* ─── FR — Web vs Mobile (new) ────────────────────────────── */
  {
    slug: "web-app-or-mobile-app-decision-framework",
    locale: "fr",
    title:
      "Web app ou application mobile ? Un cadre de décision pour les PME",
    description:
      "Faut-il construire une application mobile, une application web, ou les deux ? Un guide pratique pour les petites entreprises — avec des diagrammes pour rendre les arbitrages visibles.",
    date: "2026-05-23",
    author: "Zekora",
    tags: ["Web ou Mobile", "Stratégie produit", "PME"],
    readingTime: 6,
    content: `
<p>« Faut-il qu&rsquo;on construise une appli mobile ?&nbsp;» est l&rsquo;une des questions les plus fréquentes — et les plus coûteuses — que nous entendons des petites entreprises. La bonne réponse, sur un premier produit, est rarement «&nbsp;oui&nbsp;». C&rsquo;est presque toujours «&nbsp;pas encore, et voici pourquoi&nbsp;».</p>

<p>Cet article suit le même chemin que nous parcourons avec nos clients&nbsp;: un arbre rapide pour obtenir une réponse par défaut, un tableau de scores pour la vérifier, et une chronologie pour mettre un vrai coût sur la décision.</p>

<h2>Commencer par une seule question</h2>

<p>Presque toute décision web vs mobile se ramène à une question centrale, complétée par deux sous-questions.</p>

<figure>
${decisionTreeSvg("fr")}
<figcaption>Si les utilisateurs ne reviennent pas chaque semaine, le web l&rsquo;emporte par défaut. Le mobile ne gagne que quand on a besoin de choses que le navigateur ne fournit pas de manière fiable.</figcaption>
</figure>

<p>L&rsquo;arbre penche vers le web pour une raison simple&nbsp;: <em>le web est toujours moins cher à découvrir, à partager et à mettre à jour</em>. Le mobile ne s&rsquo;amortit que s&rsquo;il existe une vraie raison pour les utilisateurs de rouvrir l&rsquo;icône.</p>

<h2>Quand le web gagne</h2>

<ul>
<li><strong>Vous devez être trouvé.</strong> Les moteurs de recherche indexent les sites, pas les apps de la même façon. Si la découverte fait partie de votre croissance, il vous faut d&rsquo;abord une présence web.</li>
<li><strong>Vos utilisateurs sont occasionnels.</strong> Réserver une fois par mois, vérifier un tarif, remplir un formulaire. Leur demander d&rsquo;installer une appli, c&rsquo;est leur demander de s&rsquo;engager dans une relation qu&rsquo;ils n&rsquo;ont pas encore choisie.</li>
<li><strong>Vous publiez des changements souvent.</strong> Un site web se déploie en quelques minutes. Une appli mobile passe par un examen du store à chaque correction de coquille.</li>
<li><strong>Vous avez une seule équipe.</strong> Une base de code web couvre iPhone, Android, tablettes, ordinateurs portables et machines de bureau. Deux bases mobiles ne couvrent qu&rsquo;iPhone et Android — et il faut quand même un backend.</li>
</ul>

<h2>Quand le mobile gagne</h2>

<ul>
<li><strong>Le réengagement compte.</strong> Si votre modèle dépend de gens qui ouvrent le produit plusieurs fois par semaine, l&rsquo;icône sur l&rsquo;écran d&rsquo;accueil et les notifications push valent le coût.</li>
<li><strong>Vous avez besoin de l&rsquo;appareil.</strong> Flux avec caméra (preuve de livraison, scans KYC), GPS, biométrie, paiements NFC — ce sont des capacités natives par nature.</li>
<li><strong>Le réseau est instable.</strong> Agents terrain, chauffeurs, techniciens. Le stockage et la synchronisation hors-ligne rendent le mobile incontournable.</li>
<li><strong>La performance fait partie de la marque.</strong> Si une interaction fluide et quasi-instantanée <em>est</em> le produit (portefeuilles, trading, jeux), le natif garde un vrai avantage.</li>
</ul>

<figure>
${scoreCardSvg("fr")}
<figcaption>Chaque point indique approximativement où se situe la force sur un axe web ↔ mobile. Le web gagne sur la portée et la vitesse d&rsquo;itération ; le mobile gagne sur la proximité et l&rsquo;accès au matériel.</figcaption>
</figure>

<h2>Le piège du «&nbsp;les deux&nbsp;» — et la voie du PWA</h2>

<p>La réponse la plus coûteuse, c&rsquo;est «&nbsp;faisons les deux en même temps&nbsp;». Cela triple la surface à maintenir avant même de savoir si l&rsquo;idée produit fonctionne.</p>

<p>Une meilleure séquence&nbsp;:</p>
<ol>
<li><strong>Livrer d&rsquo;abord la version web.</strong> Utilisez-la pour valider que de vrais utilisateurs paient, reviennent et recommandent.</li>
<li><strong>Ajouter une couche PWA</strong> (Progressive Web App) pour l&rsquo;installation depuis le navigateur, un hors-ligne basique et la présence sur l&rsquo;écran d&rsquo;accueil. Vous obtenez ~70&nbsp;% de l&rsquo;effet «&nbsp;comme une appli&nbsp;» pour ~10&nbsp;% du coût.</li>
<li><strong>Ne construire une appli native qu&rsquo;une fois la PWA insuffisante</strong> — généralement quand les notifications push deviennent indispensables, qu&rsquo;une intégration matérielle profonde est nécessaire, ou que la distribution en store est critique.</li>
</ol>

<h2>Ce que ça coûte réellement</h2>

<p>La comparaison honnête n&rsquo;est pas fonctionnalité par fonctionnalité — c&rsquo;est l&rsquo;effort jusqu&rsquo;au lancement. Une appli web pour une PME prend environ deux mois de travail concentré&nbsp;; un vrai lancement iOS + Android s&rsquo;approche plutôt de cinq mois, parce que vous construisez trois choses (backend, iOS, Android) au lieu d&rsquo;une (web + backend).</p>

<figure>
${timelineSvg("fr")}
<figcaption>Délai indicatif pour un produit de PME. Le mobile prend environ 2,5× plus de temps avant le premier lancement, car vous portez deux bases natives en plus du même backend.</figcaption>
</figure>

<h2>Faire le pari le moins cher en premier</h2>

<p>Si vous ne retenez qu&rsquo;une chose&nbsp;: <em>la question n&rsquo;est pas «&nbsp;web ou mobile&nbsp;?&nbsp;» — c&rsquo;est «&nbsp;quelle est l&rsquo;expérimentation la moins chère qui prouve que les gens veulent ça&nbsp;?&nbsp;»</em> Pour 9 PME sur 10, cette expérimentation, c&rsquo;est une appli web propre, rapide et bien structurée — avec la possibilité d&rsquo;ajouter du natif plus tard, une fois la demande réelle.</p>

<p>C&rsquo;est le travail que nous faisons chez Zekora&nbsp;: construire la bonne version du produit, dans le bon ordre, pour ne pas payer une présence dans les stores avant de l&rsquo;avoir méritée.</p>
`.trim(),
  },

  /* ─── EN — original ──────────────────────────────────────── */
  {
    slug: "signs-your-business-needs-digital-foundation",
    locale: "en",
    title: "Three signs your business needs a structured digital foundation",
    description:
      "For small and growing businesses, the difference between having a website and having a real digital foundation is the difference between a billboard and a functioning department.",
    date: "2026-05-22",
    author: "Zekora",
    tags: ["Digital Strategy", "Small Business", "Digitalization"],
    readingTime: 4,
    content: `
<p>For small and growing businesses, the difference between <em>having a website</em> and having a real digital foundation is the difference between a billboard and a functioning department. One looks busy. The other actually does work.</p>
<p>Here are three signs your business has outgrown improvised tools and needs structured digital systems.</p>

<h2>1. You can&rsquo;t answer a simple operational question without asking three people</h2>
<p>How many bookings did you take last month? How many active members still owe a contribution? Which staff handled which job? If those answers live in someone&rsquo;s head, in a notebook, or in scattered WhatsApp messages, you don&rsquo;t have data — you have folklore.</p>
<p>A structured system makes the answers <em>obvious</em>. The same question always returns the same number. Decisions stop being guesses.</p>

<h2>2. Your day-to-day runs on goodwill, not process</h2>
<p>Things work because Maria remembers, because Jean always closes up, because someone always thinks to check. That&rsquo;s not a process — it&rsquo;s a vulnerability. When Maria gets sick or Jean moves on, the work stalls.</p>
<p>Digitalisation, at its core, is making implicit knowledge explicit. It&rsquo;s writing down how the work actually happens, so the business doesn&rsquo;t depend on heroics.</p>

<h2>3. New growth means new chaos, not new income</h2>
<p>If adding ten more customers means ten more spreadsheets, twenty more messages, and an extra weekend of catching up — you&rsquo;re not scaling, you&rsquo;re stretching. Each new customer should feel similar to the last one. If they don&rsquo;t, the structure isn&rsquo;t ready.</p>

<h2>Start small, build right</h2>
<p>You don&rsquo;t need a massive rebuild. Most businesses start with one painful workflow — bookings, contributions, inventory, customer follow-up — and replace it with something clear, reliable, and theirs. Then the next one. Then the next.</p>
<p>That&rsquo;s what we do at Zekora — quietly, structurally, and at a pace that respects the business that already exists.</p>
`.trim(),
  },

  /* ─── FR — original ──────────────────────────────────────── */
  {
    slug: "signs-your-business-needs-digital-foundation",
    locale: "fr",
    title:
      "Trois signes que votre entreprise a besoin d’une fondation digitale structurée",
    description:
      "Pour une PME en croissance, la différence entre « avoir un site web » et avoir une vraie fondation digitale, c'est la différence entre un panneau publicitaire et un département qui fonctionne.",
    date: "2026-05-22",
    author: "Zekora",
    tags: ["Stratégie digitale", "PME", "Digitalisation"],
    readingTime: 4,
    content: `
<p>Pour une PME en croissance, la différence entre <em>avoir un site web</em> et avoir une vraie fondation digitale, c&rsquo;est la différence entre un panneau publicitaire et un département qui fonctionne. L&rsquo;un fait illusion. L&rsquo;autre fait le travail.</p>
<p>Voici trois signes que votre entreprise a dépassé les outils improvisés et a besoin de systèmes digitaux structurés.</p>

<h2>1. Vous ne pouvez pas répondre à une question opérationnelle simple sans demander à trois personnes</h2>
<p>Combien de réservations le mois dernier&nbsp;? Combien de membres actifs sont encore débiteurs&nbsp;? Quel employé a traité quel dossier&nbsp;? Si les réponses vivent dans la tête de quelqu&rsquo;un, dans un carnet, ou dans des messages WhatsApp dispersés, vous n&rsquo;avez pas de données — vous avez du folklore.</p>
<p>Un système structuré rend la réponse <em>évidente</em>. La même question renvoie toujours le même chiffre. Les décisions cessent d&rsquo;être des suppositions.</p>

<h2>2. Le quotidien tient sur la bonne volonté, pas sur un processus</h2>
<p>Les choses fonctionnent parce que Maria s&rsquo;en souvient, parce que Jean ferme toujours, parce que quelqu&rsquo;un pense toujours à vérifier. Ce n&rsquo;est pas un processus — c&rsquo;est une vulnérabilité. Quand Maria tombe malade ou que Jean part, le travail s&rsquo;arrête.</p>
<p>La digitalisation, au fond, c&rsquo;est rendre explicite la connaissance implicite. C&rsquo;est écrire comment le travail se fait vraiment, pour que l&rsquo;entreprise ne dépende plus du héroïsme quotidien.</p>

<h2>3. La croissance amène du chaos, pas du revenu</h2>
<p>Si dix clients supplémentaires signifient dix tableurs de plus, vingt messages de plus, et un week-end de rattrapage — vous ne grandissez pas, vous vous étirez. Chaque nouveau client devrait ressembler au précédent. Sinon, la structure n&rsquo;est pas prête.</p>

<h2>Commencer petit, construire juste</h2>
<p>Pas besoin d&rsquo;une refonte massive. La plupart des entreprises commencent par un workflow douloureux — réservations, cotisations, stock, suivi client — et le remplacent par quelque chose de clair, fiable, et qui leur appartient. Puis le suivant. Puis le suivant.</p>
<p>C&rsquo;est ce que nous faisons chez Zekora — calmement, structurellement, à un rythme qui respecte l&rsquo;entreprise qui existe déjà.</p>
`.trim(),
  },
];

/** All posts (across languages). */
export const blogPosts = POSTS;

/** Posts for a locale, newest first. */
export function postsForLocale(locale: string): BlogPost[] {
  return POSTS.filter((p) => p.locale === locale).sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

/** Look up a single post. */
export function postBySlug(slug: string, locale: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug && p.locale === locale);
}

/** Unique slugs across all locales — for static generation. */
export function allBlogSlugs(): string[] {
  return Array.from(new Set(POSTS.map((p) => p.slug)));
}
