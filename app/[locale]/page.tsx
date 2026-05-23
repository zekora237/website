"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Code2,
  Smartphone,
  Workflow,
  Layers,
  Eye,
  ShieldCheck,
  Feather,
  Handshake,
  Search,
  PenTool,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { HeroShowcase } from "@/components/sections/HeroShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TECH = ["Next.js", "React", "Flutter", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"];

const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: EASE },
};

const fadeMask =
  "radial-gradient(ellipse 70% 60% at 60% 0%, #000 45%, transparent 100%)";

export default function HomePage() {
  const dict = useDictionary();
  const locale = useLocale();
  const h = dict.home;

  const services = [
    { icon: Code2, ...h.services.webDev },
    { icon: Smartphone, ...h.services.mobile },
    { icon: Workflow, ...h.services.digital },
    { icon: Layers, ...h.services.saas },
  ];
  const values = [
    { icon: Eye, ...h.whyUs.clarity },
    { icon: ShieldCheck, ...h.whyUs.reliability },
    { icon: Feather, ...h.whyUs.simplicity },
    { icon: Handshake, ...h.whyUs.ownership },
  ];
  const steps = [
    { icon: Search, ...h.process.discovery },
    { icon: PenTool, ...h.process.design },
    { icon: Code2, ...h.process.development },
    { icon: Rocket, ...h.process.delivery },
  ];

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden bg-background">
        <div
          className="pointer-events-none absolute inset-0 bg-grid"
          style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
        />
        <div className="pointer-events-none absolute -left-44 top-20 h-[440px] w-[440px] rounded-full bg-secondary/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32 lg:pt-40">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-12">
            {/* Text */}
            <motion.div variants={heroStagger} initial="hidden" animate="visible">
              <motion.div variants={heroItem} className="eyebrow mb-6 text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                {h.hero.eyebrow}
              </motion.div>
              <motion.h1
                variants={heroItem}
                className="font-display text-[2.3rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[3rem] lg:text-[3.45rem]"
              >
                {dict.tagline}
              </motion.h1>
              <motion.p
                variants={heroItem}
                className="mt-6 max-w-md text-[16.5px] leading-relaxed text-slate"
              >
                {t(h.hero.subtitle)}
              </motion.p>
              <motion.div
                variants={heroItem}
                className="mt-8 flex flex-row flex-nowrap items-center gap-1.5 sm:gap-x-2"
              >
                <Link
                  href={`/${locale}/contact`}
                  className={buttonClass(
                    "primary",
                    "lg",
                    "h-11 shrink-0 gap-1.5 px-3.5 text-[13px] sm:h-12 sm:gap-2 sm:px-6 sm:text-[15px]"
                  )}
                >
                  {h.hero.ctaPrimary}
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="group inline-flex h-11 shrink-0 items-center gap-1 px-2 text-[13px] font-semibold text-foreground sm:h-12 sm:gap-1.5 sm:px-3 sm:text-[15px]"
                >
                  {h.hero.ctaSecondary}
                  <ArrowRight className="h-3.5 w-3.5 text-brand transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Visual */}
            <div className="flex justify-center lg:justify-end">
              <HeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TECH STRIP ═══════════════ */}
      <section className="border-y border-border bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-8 sm:flex-row sm:justify-between sm:gap-10 sm:px-6 lg:px-8">
          <span className="eyebrow shrink-0 text-steel">{h.stackLabel}</span>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
            {TECH.map((name) => (
              <span
                key={name}
                className="font-display text-[15px] font-semibold text-slate"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="bg-background py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10"
          >
            <div className="lg:col-span-7">
              <div className="eyebrow mb-4 text-secondary">
                {h.services.eyebrow}
              </div>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.7rem]">
                {h.services.title}
              </h2>
            </div>
            <p className="text-[15px] leading-relaxed text-slate lg:col-span-5 lg:pb-1.5">
              {h.services.subtitle}
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:mt-14"
          >
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group bg-card p-7 transition-colors duration-300 hover:bg-primary-lighter lg:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-brand transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-steel">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {s.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SELECTED WORK ═══════════════ */}
      <section className="border-t border-border bg-paper py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10"
          >
            <div className="lg:col-span-7">
              <div className="eyebrow mb-4 text-secondary">
                {h.work.eyebrow}
              </div>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.7rem]">
                {h.work.title}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-1.5">
              <p className="text-[15px] leading-relaxed text-slate">
                {h.work.subtitle}
              </p>
              <Link
                href={`/${locale}/portfolio`}
                className="group mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand"
              >
                {h.work.viewAll}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {dict.portfolio.projects.map((project, i) => (
              <ProjectCard key={project.title} {...project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ VALUES ═══════════════ */}
      <section className="border-t border-border bg-background py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <div className="eyebrow mb-4 text-secondary">{h.whyUs.eyebrow}</div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.7rem]">
              {t(h.whyUs.title)}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate">
              {h.whyUs.subtitle}
            </p>
          </motion.div>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="lg:px-7 lg:first:pl-0 lg:last:pr-0"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section className="border-t border-border bg-paper py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10"
          >
            <div className="lg:col-span-7">
              <div className="eyebrow mb-4 text-secondary">
                {h.process.eyebrow}
              </div>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.7rem]">
                {h.process.title}
              </h2>
            </div>
            <p className="text-[15px] leading-relaxed text-slate lg:col-span-5 lg:pb-1.5">
              {h.process.subtitle}
            </p>
          </motion.div>

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.09 }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-semibold text-brand">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                  <s.icon className="h-[18px] w-[18px] text-steel" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <CtaBand
        title={h.cta.title}
        subtitle={t(h.cta.subtitle)}
        button={h.cta.button}
        href={`/${locale}/contact`}
      />
    </>
  );
}
