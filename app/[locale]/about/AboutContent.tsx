"use client";

import { motion } from "framer-motion";
import { Eye, ShieldCheck, Lightbulb, Handshake, Heart, Target, TrendingUp, Layers, CheckCircle2, XCircle } from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";

export function AboutContent() {
  const dict = useDictionary();
  const a = dict.about;

  const values = [
    { icon: Eye, title: a.values.clarity.title, description: a.values.clarity.description },
    { icon: ShieldCheck, title: a.values.reliability.title, description: a.values.reliability.description },
    { icon: Lightbulb, title: a.values.simplicity.title, description: a.values.simplicity.description },
    { icon: Handshake, title: a.values.ownership.title, description: a.values.ownership.description },
    { icon: Heart, title: a.values.ethics.title, description: a.values.ethics.description },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20" style={{ background: "linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)" }}>
        <div className="absolute inset-0" style={{ opacity: 0.06 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "#ffffff" }}>{t(a.header.title)}</h1>
            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{a.header.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#e8ecf5" }}>
                <Target className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-secondary">{a.mission.label}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">{a.mission.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{a.mission.p1}</p>
            <p className="text-muted-foreground leading-relaxed">{t(a.mission.p2)}</p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f2f8 0%, #e6f5f5 50%, #f3f5fa 100%)" }}>
              <div className="text-center p-8 relative">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md" style={{ background: "linear-gradient(135deg, #1F3C88, #253f80)" }}>
                  <Target className="w-10 h-10 text-white" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">{a.mission.placeholder}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Vision */}
      <SectionWrapper muted>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#e8ecf5" }}>
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-primary mb-1.5">{a.vision.servicesTitle}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.vision.servicesDesc}</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#e6f5f5" }}>
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="text-sm font-semibold text-primary mb-1.5">{a.vision.productsTitle}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.vision.productsDesc}</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#e6f5f5" }}>
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-secondary">{a.vision.label}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">{a.vision.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{a.vision.p1}</p>
            <p className="text-muted-foreground leading-relaxed">{t(a.vision.p2)}</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper>
        <div className="text-center mb-14 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5">{a.values.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">{a.values.subtitle}</p>
        </div>
        <MobileCarousel>
          {values.map((v) => <FeatureCard key={v.title} {...v} index={0} />)}
        </MobileCarousel>
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 max-w-4xl mx-auto">
          {values.map((v, i) => <FeatureCard key={v.title} {...v} index={i} />)}
        </div>
      </SectionWrapper>

      {/* Founder Story */}
      <SectionWrapper muted>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">{t(a.story.title)}</h2>
          </div>
          <div className="relative pl-6 border-l-2 border-secondary/30 space-y-6 text-muted-foreground leading-relaxed">
            <p>{t(a.story.p1)}</p>
            <p>{t(a.story.p2)}</p>
            <p>{t(a.story.p3)}</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Philosophy */}
      <SectionWrapper>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">{a.philosophy.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* What We Believe */}
            <div className="relative p-7 lg:p-8 rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ background: "linear-gradient(to bottom, #1BA6A6, #1F3C88)" }} />
              <h3 className="text-lg font-bold text-primary mb-5">{a.philosophy.believeTitle}</h3>
              <ul className="space-y-3.5">
                {a.philosophy.believe.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4.5 h-4.5 text-secondary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* What We Avoid */}
            <div className="relative p-7 lg:p-8 rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ background: "linear-gradient(to bottom, #ef4444, #dc2626)" }} />
              <h3 className="text-lg font-bold text-primary mb-5">{a.philosophy.avoidTitle}</h3>
              <ul className="space-y-3.5">
                {a.philosophy.avoid.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <XCircle className="w-4.5 h-4.5 mt-0.5 shrink-0" style={{ color: "#ef4444" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
