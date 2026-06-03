import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/config";

/**
 * Zekora robots policy.
 *
 * Two intents:
 *
 *   1. Standard search engines (Googlebot, Bingbot, …) — fully allow.
 *      They follow the generic "*" rule already.
 *
 *   2. AI training + retrieval crawlers — explicitly allow each by name.
 *      Without an explicit rule many of them either (a) treat ambiguity
 *      as "do not crawl" or (b) get blocked by Cloudflare's bot policy.
 *      Explicit allow-listing is the only reliable way to be indexed
 *      by ChatGPT, Claude, Perplexity, Google Gemini, etc.
 *
 *      Bot names below are the official user-agent tokens published by
 *      each vendor (2024–2025). They cover:
 *        • OpenAI    — GPTBot (training), OAI-SearchBot (live search),
 *                      ChatGPT-User (user-initiated browsing)
 *        • Anthropic — ClaudeBot, Claude-Web, anthropic-ai
 *        • Google AI — Google-Extended (Gemini), GoogleOther
 *        • Perplexity — PerplexityBot, Perplexity-User
 *        • Microsoft — Bingbot (already covered), Copilot relies on Bing
 *        • Meta      — FacebookBot, Meta-ExternalAgent
 *        • Apple     — Applebot, Applebot-Extended (Apple Intelligence)
 *        • Amazon    — Amazonbot
 *        • Common    — CCBot (Common Crawl, used by many LLMs upstream)
 *        • Others    — Bytespider (ByteDance), cohere-ai, DuckAssistBot,
 *                      Diffbot, Timpibot, ImagesiftBot, You.com
 *
 *  IMPORTANT: this file is the easy half. The other half is the
 *  Cloudflare dashboard — go to Security → Bots and either disable
 *  "Block AI Bots" or add an explicit allow-rule for the same list,
 *  otherwise Cloudflare overrides this robots.txt at the edge.
 */
export default function robots(): MetadataRoute.Robots {
  const aiBotsAllowed = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "Google-Extended",
    "GoogleOther",
    "PerplexityBot",
    "Perplexity-User",
    "Applebot-Extended",
    "Applebot",
    "Amazonbot",
    "FacebookBot",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "Bytespider",
    "CCBot",
    "cohere-ai",
    "cohere-training-data-crawler",
    "DuckAssistBot",
    "Diffbot",
    "Timpibot",
    "ImagesiftBot",
    "YouBot",
  ];

  return {
    rules: [
      // Default policy — everyone may crawl everything except the API.
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // Explicit allow for each AI crawler. Same disallow set so we
      // don't expose API routes that aren't meant to be indexed.
      ...aiBotsAllowed.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${BRAND.url}/sitemap.xml`,
    host: BRAND.url,
  };
}
