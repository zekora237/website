"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Smartphone, Database, Cloud, ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

const serviceIcons: Record<string, LucideIcon> = {
  "web-development": Globe,
  "mobile-apps": Smartphone,
  "digitalization": Database,
  "saas": Cloud,
};

const serviceKeys = ["webDev", "mobile", "digital", "saas"] as const;
const serviceIds = ["web-development", "mobile-apps", "digitalization", "saas"];

export function ServicesContent() {
  const dict = useDictionary();
  const locale = useLocale();
  const s = dict.services;

  const servicesData = serviceKeys.map((key, i) => ({
    id: serviceIds[i],
    icon: serviceIcons[serviceIds[i]],
    ...s.detail[key],
  }));

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20" style={{ background: "linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)" }}>
        <div className="absolute inset-0" style={{ opacity: 0.06 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "#ffffff" }}>{s.header.title}</h1>
            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{s.header.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      {servicesData.map((service, index) => {
        const Icon = service.icon;
        const isMuted = index % 2 === 1;
        return (
          <SectionWrapper key={service.id} id={service.id} muted={isMuted}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ background: "linear-gradient(135deg, #1F3C88, #253f80)" }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">{service.title}</h2>
                </div>
                <div className="space-y-6 mt-6">
                  <div className="relative pl-5 border-l-2" style={{ borderColor: "rgba(239,68,68,0.4)" }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#ef4444" }}>{s.theProblem}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{service.problem}</p>
                  </div>
                  <div className="relative pl-5 border-l-2" style={{ borderColor: "rgba(27,166,166,0.4)" }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">{s.ourSolution}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{service.solution}</p>
                  </div>
                  <div className="relative pl-5 border-l-2" style={{ borderColor: "rgba(31,60,136,0.4)" }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{s.theBenefit}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{service.benefit}</p>
                  </div>
                </div>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="relative p-7 lg:p-8 rounded-2xl border border-border overflow-hidden" style={{ background: isMuted ? "#ffffff" : "#f8f9fb" }}>
                  {/* Accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #1F3C88, #1BA6A6)" }} />
                  <h3 className="text-base font-bold text-primary mb-6">{s.whatsIncluded}</h3>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4.5 h-4.5 text-secondary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </SectionWrapper>
        );
      })}

      {/* CTA */}
      <SectionWrapper dark>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5" style={{ color: "#ffffff" }}>{s.cta.title}</h2>
          <p className="max-w-xl mx-auto mb-10 text-base lg:text-lg" style={{ color: "rgba(255,255,255,0.75)" }}>{t(s.cta.subtitle)}</p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" variant="secondary">
              {s.cta.button}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
