"use client";

import { motion } from "framer-motion";
import {
  Eye,
  ShieldCheck,
  Feather,
  Handshake,
  Scale,
  Layers,
  TrendingUp,
  Check,
  X,
} from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { PageHeader } from "@/components/sections/PageHeader";
import { CountUp } from "@/components/sections/CountUp";
import { BrowserMock } from "@/components/mockups/Mockups";
import { t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AboutContent() {
  const dict = useDictionary();
  const a = dict.about;

  const values = [
    { icon: Eye, ...a.values.clarity },
    { icon: ShieldCheck, ...a.values.reliability },
    { icon: Feather, ...a.values.simplicity },
    { icon: Handshake, ...a.values.ownership },
    { icon: Scale, ...a.values.ethics },
  ];

  return (
    <>
      <PageHeader title={t(a.header.title)} subtitle={a.header.subtitle} />

      {/* ── Figures ── */}
      <section className="border-b border-border bg-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-12 sm:grid-cols-3 sm:px-6 sm:py-14 lg:px-8">
          {a.figures.map((fig, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="sm:border-l sm:border-border sm:pl-7 sm:first:border-l-0 sm:first:pl-0"
            >
              <div className="font-display text-4xl font-semibold tracking-tight text-brand lg:text-5xl">
                <CountUp to={fig.value} suffix={fig.suffix} />
              </div>
              <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-slate">
                {fig.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <SectionWrapper>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow mb-4 text-secondary">{a.mission.label}</div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {a.mission.title}
            </h2>
            <p className="mt-5 leading-relaxed text-slate">{a.mission.p1}</p>
            <p className="mt-4 leading-relaxed text-slate">{t(a.mission.p2)}</p>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 -z-10">
              <div className="absolute right-6 top-4 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute bottom-2 left-6 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
            </div>
            <BrowserMock screen="site" url="zekora.dev" />
          </div>
        </div>
      </SectionWrapper>

      {/* ── Vision ── */}
      <SectionWrapper muted>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 grid gap-5 sm:grid-cols-2 lg:order-1">
            {[
              {
                icon: Layers,
                title: a.vision.servicesTitle,
                desc: a.vision.servicesDesc,
                tone: "primary" as const,
              },
              {
                icon: TrendingUp,
                title: a.vision.productsTitle,
                desc: a.vision.productsDesc,
                tone: "secondary" as const,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span
                  className={
                    "flex h-11 w-11 items-center justify-center rounded-xl " +
                    (card.tone === "primary"
                      ? "bg-primary-light text-brand"
                      : "bg-secondary-light text-secondary")
                  }
                >
                  <card.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <div className="eyebrow mb-4 text-secondary">{a.vision.label}</div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {a.vision.title}
            </h2>
            <p className="mt-5 leading-relaxed text-slate">{a.vision.p1}</p>
            <p className="mt-4 leading-relaxed text-slate">{t(a.vision.p2)}</p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Core Values ── */}
      <SectionWrapper>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {a.values.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate">
            {a.values.subtitle}
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-7 transition-colors duration-300 hover:border-primary/30"
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
      </SectionWrapper>

      {/* ── Story ── */}
      <SectionWrapper muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {t(a.story.title)}
          </h2>
          <div className="mt-8 space-y-5 border-l-2 border-secondary/35 pl-6 leading-relaxed text-slate">
            <p>{t(a.story.p1)}</p>
            <p>{t(a.story.p2)}</p>
            <p>{t(a.story.p3)}</p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Philosophy ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {a.philosophy.title}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 lg:p-8">
              <h3 className="font-display text-lg font-semibold text-ink">
                {a.philosophy.believeTitle}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {a.philosophy.believe.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-light text-secondary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-paper p-7 lg:p-8">
              <h3 className="font-display text-lg font-semibold text-ink">
                {a.philosophy.avoidTitle}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {a.philosophy.avoid.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist text-steel">
                      <X className="h-3.5 w-3.5" />
                    </span>
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
