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
import { t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** A radial fade applied to the grid / glow textures. */
const fadeMask =
  "radial-gradient(ellipse 75% 60% at 50% 0%, #000 45%, transparent 100%)";

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
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 bg-grid"
          style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
        />
        <div className="pointer-events-none absolute -right-32 -top-44 h-[560px] w-[560px] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-44 top-40 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-24 lg:pt-44">
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={heroItem} className="eyebrow mb-6 text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {h.hero.eyebrow}
            </motion.div>
            <motion.h1
              variants={heroItem}
              className="font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[3.4rem] lg:text-[4.3rem]"
            >
              {dict.tagline}
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate lg:text-lg"
            >
              {t(h.hero.subtitle)}
            </motion.p>
            <motion.div
              variants={heroItem}
              className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-3"
            >
              <Link
                href={`/${locale}/contact`}
                className={buttonClass("primary", "lg")}
              >
                {h.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="group inline-flex h-12 items-center gap-1.5 px-3 text-[15px] font-semibold text-foreground"
              >
                {h.hero.ctaSecondary}
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* capability strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.62, duration: 0.6 }}
            className="mt-14 border-t border-border pt-7 lg:mt-20"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {services.map((s) => (
                <div key={s.title} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <s.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-[13.5px] font-semibold text-foreground">
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="border-t border-border bg-paper py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:mt-14"
          >
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group bg-white p-7 transition-colors duration-300 hover:bg-primary-lighter lg:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
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

      {/* ═══════════════ VALUES ═══════════════ */}
      <section className="border-t border-border bg-white py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-2xl"
          >
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
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
                  <span className="font-display text-2xl font-semibold text-primary">
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
      <section className="relative overflow-hidden bg-primary">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 100% at 50% 50%, #000 25%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 100% at 50% 50%, #000 25%, transparent 100%)",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-white/[0.06] blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem]">
                {h.cta.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                {t(h.cta.subtitle)}
              </p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-xl bg-white px-6 text-[15px] font-semibold text-primary transition-colors hover:bg-white/90 lg:self-auto"
            >
              {h.cta.button}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
