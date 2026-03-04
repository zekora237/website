import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { BRAND } from "@/lib/config";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#web-development", label: "Web Development" },
    { href: "/services#mobile-apps", label: "Mobile Applications" },
    { href: "/services#digitalization", label: "Business Digitalization" },
    { href: "/services#saas", label: "SaaS & Custom Systems" },
  ],
};

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1F3C88", color: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#ffffff" }}
            >
              {BRAND.nameUpper}
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Building digital solutions that structure, modernize, and grow
              businesses.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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

          {/* Services Links */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
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

          {/* Contact Info */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li
                className="flex items-center gap-2 text-sm"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <Mail size={16} />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="hover:text-white transition-colors"
                >
                  {BRAND.email}
                </a>
              </li>
              <li
                className="flex items-center gap-2 text-sm"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <MapPin size={16} />
                <span>{BRAND.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Built by {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
