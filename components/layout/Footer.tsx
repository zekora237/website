"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { BRAND, t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const dict = useDictionary();
  const locale = useLocale();
  const f = dict.footer;

  const companyLinks = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
  const serviceLinks = [
    { href: `/${locale}/services#web-development`, label: f.webDev },
    { href: `/${locale}/services#mobile-apps`, label: f.mobile },
    { href: `/${locale}/services#digitalization`, label: f.digital },
    { href: `/${locale}/services#saas`, label: f.saas },
  ];

  return (
    <footer className="bg-indigo-darker text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href={`/${locale}`}
              className="inline-block rounded-sm transition-opacity hover:opacity-80"
              aria-label="Zekora — home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/zekora-logo-white.svg"
                alt="Zekora"
                className="h-6 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              {f.description}
            </p>
          </div>

          {/* Company */}
          <nav className="lg:col-span-2" aria-label={f.company}>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">
              {f.company}
            </h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav className="lg:col-span-3" aria-label={f.services}>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">
              {f.services}
            </h4>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">
              {f.contact}
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-white/40 transition-colors group-hover:text-secondary" />
                  {BRAND.email}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/65">
                <MapPin className="h-4 w-4 text-white/40" />
                {BRAND.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{t(f.copyright)}</p>
          <p className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-secondary" />
            {t(f.builtBy)}
          </p>
        </div>
      </div>
    </footer>
  );
}
