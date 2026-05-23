/**
 * Zekora — Blog
 *
 * Posts are typed records. To publish a new article, add an entry to the
 * `POSTS` array below. Use the same `slug` for the EN and FR versions of
 * the same article so hreflang alternates link them together.
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
  /** Article body — HTML (h2, p, ul, etc.). */
  content: string;
};

const POSTS: BlogPost[] = [
  /* ─── EN ──────────────────────────────────────────────────────── */
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

  /* ─── FR ──────────────────────────────────────────────────────── */
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
