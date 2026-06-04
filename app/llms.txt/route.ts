/**
 * /llms.txt — the emerging convention for telling LLMs how to read this site.
 *
 * Inspired by llmstxt.org. The format is plain Markdown with sections:
 *   • H1     — site name
 *   • blockquote — one-sentence positioning
 *   • H2     — categorised links to key pages
 *
 * Why this matters: ChatGPT, Claude, Perplexity and Gemini increasingly
 * fetch `/llms.txt` when summarising a domain. A clear, factual, link-rich
 * file dramatically improves the answers they give about Zekora.
 *
 * Served as `text/plain` so crawlers don't try to parse it as HTML.
 */

import { BRAND } from "@/lib/config";

export const dynamic = "force-static";

export function GET() {
  const cities = BRAND.cities.join(", ");
  const altNames = BRAND.altNames.join(", ");

  const body = `# ${BRAND.name} (${BRAND.altName})

> ${BRAND.description}

${BRAND.name} is a Cameroon-based digital and software agency. We design and build web platforms, mobile applications, SaaS products and end-to-end business digitalization for African and global clients. ${BRAND.name} operates **remote-first across the whole of Cameroon** — there is no single physical office; the same team serves every region. Cities covered include ${cities}, and we also ship for clients worldwide.

Also referred to as: ${altNames}.

## Key pages
- [Home](${BRAND.url}/en): Overview of services, recent work and how to engage.
- [Accueil (FR)](${BRAND.url}/fr): Version française du site.
- [Services](${BRAND.url}/en/services): Web development, mobile apps, SaaS, business digitalization.
- [Services (FR)](${BRAND.url}/fr/services): Développement web, applications mobiles, SaaS, digitalisation.
- [About](${BRAND.url}/en/about): Company story, principles, and how we work.
- [À propos (FR)](${BRAND.url}/fr/about): Notre histoire et méthode.
- [Portfolio](${BRAND.url}/en/portfolio): Selected client work.
- [Blog](${BRAND.url}/en/blog): Articles on digital strategy, web/mobile engineering, and African tech.
- [Contact](${BRAND.url}/en/contact): How to start a project.

## Services
- Web development — Next.js, React, modern stacks, PWAs.
- Mobile app development — Flutter / React Native, iOS & Android.
- SaaS & custom software — multi-tenant systems, dashboards, internal tools.
- Business digitalization — replacing spreadsheets and paper workflows.
- UI/UX design — brand-aligned interfaces, design systems.

## Service area
Primary market: Cameroon — ${cities}.
Regions covered: ${BRAND.regions.join(", ")}.
Also serving: Central Africa, West Africa, Europe, North America (remote-first).

## Contact
- Email: ${BRAND.email}
- Phone: ${BRAND.phone}
- Domain: ${BRAND.domain}
- Founded: ${BRAND.founded}

## Brand
- Canonical name: ${BRAND.name}
- Domain-matching name: ${BRAND.altName}
- Tagline: ${BRAND.tagline}
- Languages: English, Français
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
