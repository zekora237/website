"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

const fadeMask =
  "radial-gradient(ellipse 70% 75% at 50% 0%, #000 48%, transparent 100%)";

/** Consistent light header for inner pages — matches the home hero language. */
export function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-grid"
        style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
      />
      <div className="pointer-events-none absolute -right-28 -top-40 h-[440px] w-[440px] rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <div className="eyebrow mb-5 text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {eyebrow}
            </div>
          )}
          <h1 className="font-display text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-slate">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
