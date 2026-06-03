# Zekora — SEO & AI Discoverability Playbook

This file documents the SEO strategy already shipped in the code and, more
importantly, the **off-page actions** that have to happen outside this repo
for the on-page work to convert into ranking and AI-tool recall.

## Goal

Be the answer when someone asks (in either language):

- "zekora" / "zekoratech" — direct brand search
- "best software agency in Cameroon" / "agence web Cameroun"
- "web development Douala" / "création site web Yaoundé"
- (in ChatGPT/Claude/Perplexity/Gemini) — "Who is Zekora?" / "Tell me about
  software agencies in Cameroon"

---

## What's already shipped in the code

| Asset | File | Effect |
|---|---|---|
| Brand config with Cameroon HQ + city list + social handles | `lib/config.ts` | Single source of truth for every schema and meta tag |
| LocalBusiness + ProfessionalService schema with address, geo, areaServed (Cameroon + 14 cities + 10 regions), serviceArea, ContactPoint, sameAs | `lib/seo.ts` → `organizationSchema()` | Makes us eligible for local rich results in Google + Knowledge Graph |
| FAQ schema (5 quote-worthy Q&A pairs per language) | `lib/seo.ts` → `faqSchema()` / `homepageFaq()` | What AI assistants cite when summarising Zekora |
| Locale-aware title + description with Yaoundé / Douala / Cameroon | `app/[locale]/layout.tsx` | Geo signal even before AI/Google reads the JSON-LD |
| Brand-variant + bilingual + city keywords | `app/layout.tsx` | Surfaces for "zekora", "zekoratech", "agence web Cameroun", "best software agency Cameroon" |
| `robots.txt` explicitly allowing every major AI crawler (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Amazonbot, Bytespider, cohere-ai, …) | `app/robots.ts` | Removes the silent "ambiguous → block" failure mode |
| `/llms.txt` — the emerging convention for telling LLMs how to summarise the site | `app/llms.txt/route.ts` | Read by ChatGPT, Claude, Perplexity, Gemini |
| `alternates.languages` with `x-default` | `lib/seo.ts` → `alternatesFor()` | Correct hreflang for FR ↔ EN |
| Sitemap with per-locale entries + blog posts | `app/sitemap.ts` | Already in place |

## Things only YOU can do — in priority order

### 1. Cloudflare dashboard (15 minutes — biggest single win for AI crawl)

`robots.txt` is necessary but **not sufficient**. Cloudflare blocks AI bots at
the edge before they ever see `robots.txt`. Go to:

> **Cloudflare Dashboard → zekoratech.com → Security → Bots**

- **If "Super Bot Fight Mode" or "Block AI Bots" is ON → turn it OFF**, or move
  AI bots to "Allow". This is almost certainly why Cloudflare's AI Crawl
  metrics show "OpenAI/Claude = 0".
- Under **AI Crawl Control** (Cloudflare's newer panel) — explicitly allow:
  GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot,
  Google-Extended, Applebot-Extended, CCBot.
- Under **WAF → Custom rules**: check there's no rule blocking known bot UAs.

Re-check Cloudflare AI Crawl Metrics 24–48 h later. You should start seeing
non-zero requests from all major LLM crawlers.

### 2. Google Search Console (30 minutes — biggest single win for "zekora" ranking)

Until you actively tell Google the site exists, "zekora" will keep losing to
older entities (there's a Spanish brand and a few personal profiles using the
name). After site verification:

1. **Verify ownership** at https://search.google.com/search-console — pick the
   `https://zekoratech.com` property (domain property is best).
2. **Submit the sitemap** at `https://zekoratech.com/sitemap.xml`.
3. **Request indexing** for the homepage and each main page manually:
   `/en`, `/fr`, `/en/services`, `/fr/services`, `/en/about`, `/fr/about`,
   `/en/contact`, `/fr/contact`, `/en/portfolio`, `/fr/portfolio`.
4. Set the **international targeting** → primary country = **Cameroon**.
   This single setting is the strongest "I am Cameroonian" signal we can give.
5. Repeat for **Bing Webmaster Tools** (https://www.bing.com/webmasters). Bing
   also powers Copilot + DuckDuckGo, so it's not just Bing.

### 3. Google Business Profile (45 minutes — wins local map pack)

> https://www.google.com/business/

Create a profile for "Zekora" with:

- Category: **Software Company** (primary), **Web Designer**, **Marketing Agency** (secondary)
- Address: real Yaoundé / Douala address (post-card verification — Google sends
  a postcard with a code)
- Phone: +237 number (must match the one in `lib/config.ts`)
- Service area: Cameroon, then add cities individually
- Hours, photos, services list
- Website: https://zekoratech.com

Once verified you'll appear in the Maps pack for "agence web Yaoundé" /
"software agency Douala" queries — the most valuable real-estate on Google.

### 4. Knowledge Graph entity (1 hour — wins the brand sidebar)

The reason "zekora" alone is hard is that Google has no entity for it. Two
ways to create one:

1. **Wikidata** — go to https://www.wikidata.org and create an item:
   - Label (en): Zekora
   - Label (fr): Zekora
   - Alias: ZekoraTech, Zekora Tech
   - Description: "Digital agency and software studio based in Cameroon"
   - Statements: instance of → business, country → Cameroon,
     headquarters location → Yaoundé, official website → zekoratech.com,
     founded → 2024
2. **Fill in every `BRAND.social` profile** in `lib/config.ts` for real and
   make sure each social profile **links back to zekoratech.com**. That
   bidirectional link is what Google uses to confirm an entity:
   - LinkedIn Company Page
   - X (Twitter)
   - GitHub Organisation
   - Facebook Page
   - Instagram

After both are done, the JSON-LD `sameAs` array we already ship will start
populating Google's Knowledge Graph entry for Zekora.

### 5. Cameroon-specific backlinks (ongoing — the single biggest local ranking factor)

Local search ranking is dominated by backlinks from .cm domains and local
authorities. Top targets:

- Submit to **Cameroon business directories**: gocamtrade.com,
  douala.business, camerounexport.com
- **Yellow Pages Cameroon** (annuaire camerounais)
- Get listed on **Clutch.co**, **GoodFirms**, **The Manifest**,
  **DesignRush** under "Cameroon agencies"
- Sponsor or speak at **Silicon Mountain** events (Buea tech community)
- Sponsor a small Cameroonian dev meetup → free press in local outlets
- Guest-post on **TechCabal**, **Disrupt Africa**, **Africa Business
  Communities** about a Cameroon-specific topic ("Building for the bilingual
  Cameroonian market", "Mobile-first SaaS for FCFA payments", etc.)
- Be listed in **F6S**, **AngelList**, **Crunchbase** as a Cameroon-based
  company

### 6. AI-specific submissions (ongoing)

- **ChatGPT** — there's no direct submission, but creating a Wikidata entry,
  a Wikipedia article (if eligible), and getting mentioned on tech blogs is
  what trains it. The fastest path is being mentioned by a site GPT *does*
  trust — TechCrunch Africa, Quartz Africa, TechCabal.
- **Perplexity** — make sure pages are crawlable (we've done this).
  Perplexity tracks freshness, so a blog cadence helps.
- **Claude** — Anthropic respects `robots.txt` and llms.txt (we've done
  both). Make sure no Cloudflare rule blocks ClaudeBot.
- **Google Gemini / SGE** — same robots policy, and Google's index of you,
  drives this. Search Console submission (step 2) feeds Gemini.

### 7. Content cadence (ongoing — compounds)

The single most effective long-term move is publishing useful content
that gets shared. Suggested first batch of articles:

- "Combien coûte la création d'un site web professionnel au Cameroun en 2026 ?"
- "Application mobile vs PWA : quel choix pour une PME camerounaise ?"
- "Comment digitaliser une tontine ou un djangi en 2026"
- "Best practices for accepting MTN MoMo / Orange Money in a SaaS"
- "Bilingual UX in French/English: lessons from building for Cameroon"

Each gets two URLs (one per locale) with proper hreflang, and is shared on
LinkedIn + X.

## Reality check — timelines

| Metric | Expected first signal | Strong signal |
|---|---|---|
| Cloudflare AI Crawls > 0 | 24–48 h after step 1 | 1 week |
| "zekora" ranks #1 | 2–3 weeks after steps 2 + 4 | 2–3 months |
| Cameroon local pack appearance | 1 week after step 3 | 1–3 months |
| AI tools answer "what is zekora?" | 2–4 weeks after step 1 + content | 3–6 months |
| Ranking for "agence web Cameroun" | 2–6 months (depends on backlinks) | 6–12 months |

SEO is the only growth channel where the lag is real but the compounding is
also real. The work above is the floor — the multiplier is consistency.

---

_This doc is the source of truth for the SEO program. Keep it updated when
the strategy or settings change._
