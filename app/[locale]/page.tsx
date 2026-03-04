"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Globe, Smartphone, Database, Cloud,
  Eye, ShieldCheck, Lightbulb, Handshake,
  Search, Palette, Code, Rocket, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { ProcessStep } from "@/components/sections/ProcessStep";
import { t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

const heroTextVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const heroWordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomePage() {
  const dict = useDictionary();
  const locale = useLocale();
  const h = dict.home;

  const heroTitle = dict.tagline;
  const words = heroTitle.split(" ");

  const services = [
    { icon: Globe, ...h.services.webDev },
    { icon: Smartphone, ...h.services.mobile },
    { icon: Database, ...h.services.digital },
    { icon: Cloud, ...h.services.saas },
  ];

  const features = [
    { icon: Eye, ...h.whyUs.clarity },
    { icon: ShieldCheck, ...h.whyUs.reliability },
    { icon: Lightbulb, ...h.whyUs.simplicity },
    { icon: Handshake, ...h.whyUs.ownership },
  ];

  const processSteps = [
    { icon: Search, ...h.process.discovery },
    { icon: Palette, ...h.process.design },
    { icon: Code, ...h.process.development },
    { icon: Rocket, ...h.process.delivery },
  ];

  return (
    <>
      {/* ======== HERO ======== */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)" }}
      >
        <div className="absolute inset-0" style={{ opacity: 0.03 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="absolute rounded-full blur-3xl" style={{ top: "25%", right: "25%", width: "24rem", height: "24rem", backgroundColor: "rgba(27,166,166,0.1)" }} />
        <div className="absolute rounded-full blur-3xl" style={{ bottom: "25%", left: "25%", width: "20rem", height: "20rem", backgroundColor: "rgba(27,166,166,0.05)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.h1 variants={heroTextVariants} initial="hidden" animate="visible" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6" style={{ color: "#ffffff" }}>
              {words.map((word, i) => (
                <motion.span key={i} variants={heroWordVariants} className="inline-block mr-3 lg:mr-4">{word}</motion.span>
              ))}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="text-lg sm:text-xl max-w-xl mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              {t(h.hero.subtitle)}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant="secondary">
                  {h.hero.ctaPrimary}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/services`}>
                <Button size="lg" variant="outline" className="border-white! border-2! text-white! hover:bg-white! hover:text-primary!">
                  {h.hero.ctaSecondary}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======== SERVICES ======== */}
      <SectionWrapper id="services">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">{h.services.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{h.services.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </SectionWrapper>

      {/* ======== WHY CHOOSE ======== */}
      <SectionWrapper muted>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">{t(h.whyUs.title)}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{h.whyUs.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
        </div>
      </SectionWrapper>

      {/* ======== PROCESS ======== */}
      <SectionWrapper>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">{h.process.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{h.process.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {processSteps.map((step, i) => <ProcessStep key={step.title} {...step} step={i + 1} index={i} />)}
        </div>
      </SectionWrapper>

      {/* ======== CTA ======== */}
      <SectionWrapper dark>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#ffffff" }}>{h.cta.title}</h2>
          <p className="max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>{t(h.cta.subtitle)}</p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" variant="secondary">
              {h.cta.button}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}

