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
 * Posts
 * ──────────────────────────────────────────────────────────── */

const POSTS: BlogPost[] = [
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
