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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Build the path for the other locale based on current pathname */
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
      style={{ backdropFilter: scrolled ? "blur(12px)" : undefined }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-300" style={{ color: scrolled ? "#1F3C88" : "#ffffff" }}>
              {BRAND.nameUpper}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-300"
                style={{ color: scrolled ? "#333333" : "rgba(255,255,255,0.85)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? "#1F3C88" : "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "#333333" : "rgba(255,255,255,0.85)")}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <Link
              href={switchLocalePath}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-300"
              style={{ color: scrolled ? "#333333" : "rgba(255,255,255,0.85)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? "#1F3C88" : "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "#333333" : "rgba(255,255,255,0.85)")}
              title={otherLocale === "fr" ? "Passer en français" : "Switch to English"}
            >
              <Globe className="w-4 h-4" />
              {otherLocale.toUpperCase()}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-300"
              style={{ backgroundColor: scrolled ? "#1F3C88" : "#ffffff", color: scrolled ? "#ffffff" : "#1F3C88" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = scrolled ? "#193175" : "rgba(255,255,255,0.9)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = scrolled ? "#1F3C88" : "#ffffff"; }}
            >
              {dict.nav.getQuote}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 transition-colors" style={{ color: scrolled ? "#333333" : "#ffffff" }} aria-label="Toggle navigation menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="md:hidden bg-white border-t border-border overflow-hidden">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="block text-base font-medium transition-colors" style={{ color: "#333333" }}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.05 }}>
                <Link href={switchLocalePath} onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-base font-medium" style={{ color: "#1BA6A6" }}>
                  <Globe className="w-4 h-4" /> {otherLocale === "fr" ? "Français" : "English"}
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (navLinks.length + 1) * 0.05 }}>
                <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)} className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-white rounded-lg transition-colors" style={{ backgroundColor: "#1F3C88" }}>
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
