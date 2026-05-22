"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";

/** Layered device composition for the hero — real Zekora work in a
 *  browser window with a mobile app overlapping in front. */
export function HeroShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[560px]"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-12 -z-10">
        <div className="absolute right-8 top-2 h-60 w-60 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-0 left-2 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* Browser window */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_32px_64px_-26px_rgba(20,22,46,0.4)]">
        <div className="flex items-center gap-1.5 border-b border-border bg-paper px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-mist" />
          <span className="h-2.5 w-2.5 rounded-full bg-mist" />
          <span className="h-2.5 w-2.5 rounded-full bg-mist" />
          <div className="ml-2.5 flex h-6 items-center gap-1.5 rounded-md border border-border bg-white px-2.5">
            <Lock className="h-3 w-3 text-steel" />
            <span className="font-mono text-[11px] text-steel">
              healthy-living-association
            </span>
          </div>
        </div>
        <div className="relative aspect-[1884/824]">
          <Image
            src="/images/hla.png"
            alt="A client website built by Zekora"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 92vw, 560px"
            priority
          />
        </div>
      </div>

      {/* Floating accent card — top-left */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-5 top-10 hidden items-center gap-2.5 rounded-xl border border-border bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur sm:flex"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary-light text-secondary">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <span className="text-[12px] font-semibold text-ink">
          Live &amp; shipped
        </span>
      </motion.div>

      {/* Phone — overlapping front */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-12 right-[-3%] w-[33%] min-w-[140px]"
      >
        <div className="rounded-[1.7rem] border-[5px] border-ink bg-ink shadow-[0_26px_50px_-14px_rgba(20,22,46,0.5)]">
          <div className="relative aspect-[459/942] overflow-hidden rounded-[1.4rem]">
            <Image
              src="/images/hero-app.png"
              alt="A mobile app built by Zekora"
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
