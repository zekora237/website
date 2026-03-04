"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { BRAND } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dict = useDictionary();
  const locale = useLocale();
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const otherLocale = locale === "en" ? "fr" : "en";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Build the path for the other locale based on current pathname */
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : undefined,
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : undefined,
        boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{ background: scrolled ? "linear-gradient(135deg, #1F3C88, #1BA6A6)" : "rgba(255,255,255,0.15)" }}
            >
              <span className="text-sm font-bold" style={{ color: "#ffffff" }}>Z</span>
            </div>
            <span
              className="text-lg lg:text-xl font-bold tracking-tight transition-colors duration-300"
              style={{ color: scrolled ? "#1F3C88" : "#ffffff" }}
            >
              {BRAND.nameUpper}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300"
                style={{
                  color: isActive(link.href)
                    ? (scrolled ? "#1F3C88" : "#ffffff")
                    : (scrolled ? "#5a6577" : "rgba(255,255,255,0.7)"),
                  backgroundColor: isActive(link.href)
                    ? (scrolled ? "rgba(31,60,136,0.08)" : "rgba(255,255,255,0.12)")
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.color = scrolled ? "#1F3C88" : "#ffffff";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.color = scrolled ? "#5a6577" : "rgba(255,255,255,0.7)";
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Language switcher */}
            <Link
              href={switchLocalePath}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ml-2"
              style={{ color: scrolled ? "#5a6577" : "rgba(255,255,255,0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? "#1F3C88" : "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "#5a6577" : "rgba(255,255,255,0.7)")}
              title={otherLocale === "fr" ? "Passer en français" : "Switch to English"}
            >
              <Globe className="w-4 h-4" />
              {otherLocale.toUpperCase()}
            </Link>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              className="ml-3 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: scrolled ? "#1F3C88" : "rgba(255,255,255,0.95)",
                color: scrolled ? "#ffffff" : "#1F3C88",
                boxShadow: scrolled ? "0 2px 8px rgba(31,60,136,0.25)" : "0 2px 8px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = scrolled ? "#193175" : "#ffffff";
                e.currentTarget.style.boxShadow = scrolled ? "0 4px 16px rgba(31,60,136,0.35)" : "0 4px 16px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = scrolled ? "#1F3C88" : "rgba(255,255,255,0.95)";
                e.currentTarget.style.boxShadow = scrolled ? "0 2px 8px rgba(31,60,136,0.25)" : "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              {dict.nav.getQuote}
            </Link>
          </div>

          {/* Mobile: Language + Menu */}
          <div className="md:hidden flex items-center gap-2.5">
            <Link
              href={switchLocalePath}
              className="flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1.5 transition-all duration-300"
              style={{
                color: scrolled ? "#1F3C88" : "#ffffff",
                border: scrolled ? "1.5px solid rgba(31,60,136,0.25)" : "1.5px solid rgba(255,255,255,0.4)",
                backgroundColor: scrolled ? "rgba(31,60,136,0.05)" : "rgba(255,255,255,0.1)",
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              {otherLocale.toUpperCase()}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                color: scrolled ? "#1a1a2e" : "#ffffff",
                backgroundColor: isOpen ? (scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.15)") : "transparent",
              }}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid #e8eaef" }}
          >
            <div className="px-5 py-5 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 text-base font-medium rounded-xl transition-colors"
                    style={{
                      color: isActive(link.href) ? "#1F3C88" : "#5a6577",
                      backgroundColor: isActive(link.href) ? "rgba(31,60,136,0.06)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04 }}
                className="pt-2"
              >
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full px-5 py-3.5 text-sm font-semibold text-white rounded-xl transition-all"
                  style={{ background: "linear-gradient(135deg, #1F3C88, #253f80)" }}
                >
                  {dict.nav.getQuote}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
