"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/Button";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dict = useDictionary();
  const locale = useLocale();
  const pathname = usePathname();

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
  const otherLocale = locale === "en" ? "fr" : "en";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === `/${locale}` : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-white/85 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[72px]">
          {/* Wordmark */}
          <Link
            href={`/${locale}`}
            className="shrink-0 rounded-sm transition-opacity hover:opacity-80"
            aria-label="Zekora — home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/zekora-logo.svg"
              alt="Zekora"
              className="h-[21px] w-auto lg:h-[23px]"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-[14px] font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <Link
              href={switchPath}
              className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
              title={otherLocale === "fr" ? "Passer en français" : "Switch to English"}
            >
              <Globe className="h-4 w-4" />
              {otherLocale.toUpperCase()}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={cn(buttonClass("primary", "sm"), "hidden md:inline-flex")}
            >
              {dict.nav.getQuote}
            </Link>

            {/* Mobile controls */}
            <Link
              href={switchPath}
              className="flex items-center gap-1 rounded-lg border border-border bg-white/70 px-2.5 py-1.5 text-[12px] font-semibold text-foreground md:hidden"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5" />
              {otherLocale.toUpperCase()}
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-white md:hidden"
          >
            <div className="space-y-0.5 px-4 py-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 + i * 0.035 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center rounded-lg px-3.5 py-3 text-[15px] font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-primary-light text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2">
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setOpen(false)}
                  className={cn(buttonClass("primary", "default"), "w-full")}
                >
                  {dict.nav.getQuote}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
