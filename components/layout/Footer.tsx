"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
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
    <footer style={{ backgroundColor: "#1F3C88", color: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== MOBILE FOOTER (< md) ===== */}
        <div className="md:hidden py-10">
          {/* Brand — centered */}
          <div className="text-center mb-8">
            <Link
              href={`/${locale}`}
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#ffffff" }}
            >
              {BRAND.nameUpper}
            </Link>
            <p
              className="mt-3 text-sm leading-relaxed mx-auto max-w-xs"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {f.description}
            </p>
          </div>

          {/* Links — 2 columns side by side */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h4
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {f.company}
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {f.services}
              </h4>
              <ul className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact — centered */}
          <div
            className="text-center mb-8 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <h4
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {f.contact}
            </h4>
            <div className="flex flex-col items-center gap-3">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <Mail size={14} /> {BRAND.email}
              </a>
              <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                <MapPin size={14} /> {BRAND.location}
              </span>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="text-center pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t(f.copyright)}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t(f.builtBy)}
            </p>
          </div>
        </div>

        {/* ===== DESKTOP FOOTER (md+) ===== */}
        <div className="hidden md:block">
          <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link
                href={`/${locale}`}
                className="text-2xl font-bold tracking-tight"
                style={{ color: "#ffffff" }}
              >
                {BRAND.nameUpper}
              </Link>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                {f.description}
              </p>
            </div>

            {/* Company */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {f.company}
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {f.services}
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {f.contact}
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Mail size={16} />
                  <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                    {BRAND.email}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <MapPin size={16} />
                  <span>{BRAND.location}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 flex items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t(f.copyright)}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t(f.builtBy)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
