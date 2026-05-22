"use client";

import { motion, type Variants } from "framer-motion";
import { Lock, TrendingUp, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ───────────────────────── primitives ───────────────────────── */

/** A fake "line of text" — a soft rounded bar. */
function Bar({ className }: { className?: string }) {
  return <div className={cn("rounded-full bg-mist", className)} />;
}

/** A pulsing "live" status dot. */
export function PulseDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-2 w-2", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
    </span>
  );
}

/* ───────────────────────── browser screens ───────────────────── */

const chartParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const chartBar: Variants = {
  hidden: { scaleY: 0 },
  shown: { scaleY: 1, transition: { duration: 0.55, ease: EASE } },
};

function DashboardScreen() {
  const bars = [30, 46, 38, 58, 50, 68, 44, 56, 74];
  const stats = [
    { value: "1,284", up: "12%" },
    { value: "94%", up: "4%" },
    { value: "320", up: "8%" },
  ];
  return (
    <div className="bg-paper p-4">
      {/* header */}
      <div className="mb-3.5 flex items-center justify-between">
        <div className="space-y-1.5">
          <Bar className="h-2.5 w-28" />
          <Bar className="h-1.5 w-16 bg-mist/70" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-indigo-tint" />
          <div className="h-7 w-16 rounded-lg bg-primary" />
        </div>
      </div>
      {/* stat cards */}
      <div className="mb-3 grid grid-cols-3 gap-2.5">
        {stats.map((s, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-2.5">
            <Bar className="mb-2 h-1.5 w-10" />
            <div className="font-display text-[15px] font-semibold text-ink">
              {s.value}
            </div>
            <div className="mt-1.5 inline-flex items-center gap-0.5 rounded bg-secondary-light px-1.5 py-0.5">
              <TrendingUp className="h-2.5 w-2.5 text-secondary" />
              <span className="text-[9px] font-semibold text-secondary">
                {s.up}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* chart card */}
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="mb-3 flex items-center justify-between">
          <Bar className="h-2 w-20" />
          <div className="flex items-center gap-1.5">
            <PulseDot />
            <span className="text-[9px] font-semibold text-secondary">
              Live
            </span>
          </div>
        </div>
        <motion.div
          className="flex h-[72px] items-end gap-1.5"
          variants={chartParent}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-40px" }}
        >
          {bars.map((h, i) => (
            <motion.div
              key={i}
              variants={chartBar}
              className={cn(
                "flex-1 rounded-t-[3px]",
                i === bars.length - 1 ? "bg-secondary" : "bg-primary/85"
              )}
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function SiteScreen() {
  return (
    <div className="bg-card">
      {/* nav */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 rounded bg-primary" />
          <Bar className="h-2 w-12" />
        </div>
        <div className="hidden gap-3 sm:flex">
          {[0, 1, 2, 3].map((i) => (
            <Bar key={i} className="h-1.5 w-3" />
          ))}
        </div>
        <div className="h-6 w-14 rounded-md bg-primary" />
      </div>
      {/* hero */}
      <div className="bg-paper px-4 py-6 text-center">
        <div className="mx-auto mb-3 inline-flex h-3.5 w-16 rounded-full bg-indigo-tint" />
        <div className="mx-auto mb-2.5 space-y-1.5">
          <Bar className="mx-auto h-2.5 w-3/5 bg-ink/80" />
          <Bar className="mx-auto h-2.5 w-4/5 bg-ink/80" />
          <Bar className="mx-auto h-2.5 w-2/5 bg-ink/80" />
        </div>
        <div className="mx-auto mb-4 space-y-1">
          <Bar className="mx-auto h-1.5 w-3/4" />
          <Bar className="mx-auto h-1.5 w-2/3" />
        </div>
        <div className="mx-auto h-7 w-24 rounded-lg bg-primary" />
      </div>
      {/* cards */}
      <div className="grid grid-cols-3 gap-2.5 bg-paper px-4 pb-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-2.5">
            <div className="mb-2 h-6 w-6 rounded-md bg-secondary-light" />
            <Bar className="mb-1.5 h-1.5 w-full" />
            <Bar className="h-1.5 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BoardScreen() {
  const cols = [
    { dot: "bg-steel", cards: 3 },
    { dot: "bg-primary", cards: 2 },
    { dot: "bg-secondary", cards: 2 },
  ];
  return (
    <div className="bg-paper p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <Bar className="h-2.5 w-24" />
        <div className="h-7 w-7 rounded-lg bg-primary" />
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {cols.map((col, ci) => (
          <div key={ci} className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", col.dot)} />
              <Bar className="h-1.5 w-10" />
            </div>
            {Array.from({ length: col.cards }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-2.5"
              >
                <Bar className="mb-1.5 h-1.5 w-full" />
                <Bar className="mb-2.5 h-1.5 w-2/3" />
                <div className="flex items-center justify-between">
                  <div className="h-4 w-4 rounded-full bg-indigo-tint" />
                  <Bar className="h-1.5 w-6 bg-secondary-light" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── browser frame ─────────────────────── */

type Screen = "dashboard" | "site" | "board";

export function BrowserMock({
  screen = "dashboard",
  url = "zekora.app",
  className,
}: {
  screen?: Screen;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card",
        "shadow-[0_32px_64px_-26px_rgba(20,22,46,0.4)]",
        className
      )}
    >
      {/* chrome */}
      <div className="flex items-center gap-1.5 border-b border-border bg-paper px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-mist" />
        <span className="h-2.5 w-2.5 rounded-full bg-mist" />
        <span className="h-2.5 w-2.5 rounded-full bg-mist" />
        <div className="ml-2.5 flex h-6 max-w-[220px] flex-1 items-center gap-1.5 rounded-md border border-border bg-card px-2.5">
          <Lock className="h-3 w-3 shrink-0 text-steel" />
          <span className="truncate font-mono text-[11px] text-steel">
            {url}
          </span>
        </div>
      </div>
      {screen === "dashboard" && <DashboardScreen />}
      {screen === "site" && <SiteScreen />}
      {screen === "board" && <BoardScreen />}
    </div>
  );
}

/* ───────────────────────── phone mock ────────────────────────── */

/** Phone mock — sized in container-query units so it keeps a true phone
 *  aspect ratio at any width (no fixed-pixel stretching on mobile). */
export function PhoneMock({ className }: { className?: string }) {
  return (
    <div className={cn("@container w-full", className)}>
      <div className="rounded-[15cqw] border-[3cqw] border-[#1c1e30] bg-[#1c1e30] shadow-[0_28px_52px_-16px_rgba(20,22,46,0.5)]">
        <div className="flex flex-col gap-[5cqw] overflow-hidden rounded-[11cqw] bg-paper p-[6cqw]">
          {/* status bar */}
          <div className="flex items-center justify-between px-[2cqw] pt-[1cqw]">
            <Bar className="h-[2.6cqw] w-[14cqw]" />
            <div className="flex gap-[2cqw]">
              <span className="h-[2.6cqw] w-[2.6cqw] rounded-full bg-mist" />
              <span className="h-[2.6cqw] w-[6cqw] rounded-full bg-mist" />
            </div>
          </div>
          {/* header */}
          <div className="flex items-center justify-between">
            <Bar className="h-[5cqw] w-[40cqw]" />
            <div className="h-[14cqw] w-[14cqw] rounded-full bg-indigo-tint" />
          </div>
          {/* balance card */}
          <div className="rounded-[8cqw] bg-primary p-[7cqw]">
            <Bar className="mb-[4cqw] h-[3cqw] w-[28cqw] bg-card/35" />
            <div className="font-display text-[12cqw] font-semibold leading-none text-white">
              84,250
            </div>
            <div className="mt-[6cqw] flex gap-[4cqw]">
              <div className="h-[14cqw] flex-1 rounded-[4cqw] bg-card/15" />
              <div className="h-[14cqw] flex-1 rounded-[4cqw] bg-card/15" />
            </div>
          </div>
          {/* stat row */}
          <div className="grid grid-cols-2 gap-[5cqw]">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="rounded-[6cqw] border border-border bg-card p-[5cqw]"
              >
                <div className="mb-[3cqw] h-[10cqw] w-[10cqw] rounded-[3cqw] bg-secondary-light" />
                <Bar className="mb-[2cqw] h-[2.6cqw] w-[20cqw]" />
                <div className="font-display text-[7cqw] font-semibold leading-none text-ink">
                  {i === 0 ? "1.15M" : "320"}
                </div>
              </div>
            ))}
          </div>
          {/* list */}
          <div className="space-y-[4cqw] rounded-[6cqw] border border-border bg-card p-[5cqw]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-[5cqw]">
                <div className="h-[14cqw] w-[14cqw] shrink-0 rounded-[4cqw] bg-indigo-tint" />
                <div className="flex-1 space-y-[2cqw]">
                  <Bar className="h-[2.6cqw] w-2/3" />
                  <Bar className="h-[2.6cqw] w-1/3 bg-mist/70" />
                </div>
                <Bar className="h-[2.6cqw] w-[14cqw] bg-secondary-light" />
              </div>
            ))}
          </div>
          {/* bottom nav */}
          <div className="flex items-center justify-around rounded-[6cqw] border border-border bg-card py-[5cqw]">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-[8cqw] w-[8cqw] rounded-[3cqw]",
                  i === 0 ? "bg-primary" : "bg-mist"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* small floating accent — used to layer over a mock */
export function FloatingChip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-border bg-card/95 px-3.5 py-2.5 shadow-lg backdrop-blur",
        className
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary-light text-secondary">
        <ArrowUpRight className="h-4 w-4" />
      </span>
      <span className="text-[12px] font-semibold text-ink">{label}</span>
    </div>
  );
}
