"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CtaBandProps {
  title: string;
  subtitle: string;
  button: string;
  href: string;
}

const fadeMask =
  "radial-gradient(ellipse 80% 100% at 50% 50%, #000 25%, transparent 100%)";

/** Indigo call-to-action band — the page's one bold colour beat. */
export function CtaBand({ title, subtitle, button, href }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark"
        style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-white/[0.06] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem]">
              {title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70">
              {subtitle}
            </p>
          </div>
          <Link
            href={href}
            className="group inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-xl bg-white px-6 text-[15px] font-semibold text-indigo transition-colors hover:bg-white/90 lg:self-auto"
          >
            {button}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
