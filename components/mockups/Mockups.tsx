"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Lock, TrendingUp, ArrowUpRight, Folder, FileCode2 } from "lucide-react";
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

/** Counts a numeric value up once visible. Mirrors `CountUp` but inline. */
function useCountTo(target: number, active: boolean, duration = 1.1) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return v;
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const bars = [30, 46, 38, 58, 50, 68, 44, 56, 74];
  // Animated stat values
  const visits = useCountTo(1284, inView, 1.2);
  const score = useCountTo(94, inView, 1.0);
  const orders = useCountTo(320, inView, 1.1);

  const stats = [
    { value: Math.round(visits).toLocaleString("en-US"), up: "12%" },
    { value: `${Math.round(score)}%`, up: "4%" },
    { value: Math.round(orders).toLocaleString("en-US"), up: "8%" },
  ];

  return (
    <div ref={ref} className="bg-paper p-4">
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
            <div className="font-display text-[15px] font-semibold tabular-nums text-ink">
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
          viewport={{ once: true, amount: 0.2 }}
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
      {/* cards — staggered in */}
      <motion.div
        className="grid grid-cols-3 gap-2.5 bg-paper px-4 pb-5"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
            }}
            className="rounded-lg border border-border bg-card p-2.5"
          >
            <div className="mb-2 h-6 w-6 rounded-md bg-secondary-light" />
            <Bar className="mb-1.5 h-1.5 w-full" />
            <Bar className="h-1.5 w-2/3" />
          </motion.div>
        ))}
      </motion.div>
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
            <motion.div
              className="space-y-2"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                shown: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 + ci * 0.08 },
                },
              }}
            >
              {Array.from({ length: col.cards }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    shown: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: EASE },
                    },
                  }}
                  className="rounded-lg border border-border bg-card p-2.5"
                >
                  <Bar className="mb-1.5 h-1.5 w-full" />
                  <Bar className="mb-2.5 h-1.5 w-2/3" />
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-4 rounded-full bg-indigo-tint" />
                    <Bar className="h-1.5 w-6 bg-secondary-light" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── code editor screen ─────────────────
 * A fake IDE: file tree on the left, a tabbed editor with gutter
 * line numbers, and "code" rendered as colored bars (keyword =
 * brand primary, string = teal, comment = steel, identifier = ink).
 * Lines fade in sequentially with a blinking caret on the last line.
 */

type CodeTok = {
  /** "kw" keyword · "id" identifier · "str" string · "cm" comment · "num" number · "pn" punctuation */
  k: "kw" | "id" | "str" | "cm" | "num" | "pn";
  /** width in code-character cells */
  w: number;
};

const tokenColor: Record<CodeTok["k"], string> = {
  kw: "bg-primary/85",
  id: "bg-ink/75 dark:bg-ink/55",
  str: "bg-secondary/85",
  cm: "bg-steel/60",
  num: "bg-primary/55",
  pn: "bg-steel/50",
};

/** Per-line indent + token spec (purely visual, no real code). */
const codeLines: { indent: number; toks: CodeTok[] }[] = [
  { indent: 0, toks: [{ k: "cm", w: 22 }] },
  { indent: 0, toks: [{ k: "kw", w: 6 }, { k: "id", w: 10 }, { k: "pn", w: 1 }, { k: "kw", w: 4 }, { k: "str", w: 14 }] },
  { indent: 0, toks: [] },
  { indent: 0, toks: [{ k: "kw", w: 7 }, { k: "kw", w: 8 }, { k: "id", w: 10 }, { k: "pn", w: 2 }] },
  { indent: 1, toks: [{ k: "kw", w: 6 }, { k: "id", w: 8 }, { k: "pn", w: 1 }, { k: "kw", w: 5 }, { k: "id", w: 7 }, { k: "pn", w: 2 }] },
  { indent: 1, toks: [{ k: "kw", w: 6 }, { k: "id", w: 12 }, { k: "pn", w: 2 }] },
  { indent: 2, toks: [{ k: "id", w: 6 }, { k: "pn", w: 1 }, { k: "str", w: 16 }, { k: "pn", w: 1 }] },
  { indent: 2, toks: [{ k: "id", w: 8 }, { k: "pn", w: 1 }, { k: "num", w: 4 }, { k: "pn", w: 1 }] },
  { indent: 1, toks: [{ k: "pn", w: 1 }] },
  { indent: 0, toks: [{ k: "pn", w: 1 }] },
];

function CodeScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const tick = () => {
      i += 1;
      setRevealed(i);
      if (i < codeLines.length) {
        timer = window.setTimeout(tick, 85);
      }
    };
    let timer = window.setTimeout(tick, 200);
    return () => window.clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={ref} className="grid grid-cols-[80px_1fr] bg-card">
      {/* file tree */}
      <aside className="border-r border-border bg-paper px-2.5 py-3">
        <div className="mb-2 flex items-center gap-1.5 text-steel">
          <Folder className="h-3 w-3" />
          <Bar className="h-1.5 w-10" />
        </div>
        <div className="space-y-1.5 pl-2">
          {[
            { icon: FileCode2, w: "w-11", active: false },
            { icon: FileCode2, w: "w-9", active: true },
            { icon: FileCode2, w: "w-12", active: false },
            { icon: FileCode2, w: "w-8", active: false },
            { icon: FileCode2, w: "w-10", active: false },
          ].map((f, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-1.5 rounded px-1 py-0.5",
                f.active && "bg-primary-light"
              )}
            >
              <f.icon
                className={cn(
                  "h-2.5 w-2.5",
                  f.active ? "text-brand" : "text-steel"
                )}
              />
              <Bar
                className={cn(
                  "h-1.5",
                  f.w,
                  f.active && "bg-brand/70"
                )}
              />
            </div>
          ))}
        </div>
      </aside>

      {/* editor */}
      <div className="flex min-w-0 flex-col">
        {/* tab bar */}
        <div className="flex items-center border-b border-border bg-paper">
          <div className="flex items-center gap-1.5 border-r border-border bg-card px-3 py-2">
            <FileCode2 className="h-2.5 w-2.5 text-brand" />
            <span className="font-mono text-[10px] text-ink">page.tsx</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 opacity-60">
            <FileCode2 className="h-2.5 w-2.5 text-steel" />
            <span className="font-mono text-[10px] text-steel">layout.tsx</span>
          </div>
        </div>

        {/* code area */}
        <div className="flex min-w-0 flex-1 bg-card py-2.5 font-mono text-[10px]">
          {/* gutter */}
          <div className="flex flex-col items-end gap-[3px] border-r border-border px-2 text-[9px] tabular-nums text-steel/70">
            {codeLines.map((_, i) => (
              <span key={i} style={{ opacity: i < revealed ? 1 : 0.3 }}>
                {i + 1}
              </span>
            ))}
          </div>
          {/* tokens */}
          <div className="flex min-w-0 flex-1 flex-col gap-[3px] overflow-hidden px-3">
            {codeLines.map((line, li) => {
              const visible = li < revealed;
              const isCaretLine = li === revealed - 1;
              return (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, x: -4 }}
                  animate={
                    visible
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -4 }
                  }
                  transition={{ duration: 0.18, ease: EASE }}
                  className="flex h-[7px] items-center gap-1"
                  style={{ paddingLeft: `${line.indent * 10}px` }}
                >
                  {line.toks.map((tok, ti) => (
                    <span
                      key={ti}
                      className={cn("h-[6px] rounded-[2px]", tokenColor[tok.k])}
                      style={{ width: `${tok.w * 3}px` }}
                    />
                  ))}
                  {isCaretLine && (
                    <span className="ml-0.5 inline-block h-[8px] w-[1px] animate-pulse bg-primary" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── browser frame ─────────────────────── */

type Screen = "dashboard" | "site" | "board" | "code";

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
      {screen === "code" && <CodeScreen />}
    </div>
  );
}

/* ───────────────────────── phone mock ────────────────────────── */

/** Phone mock — sized in container-query units so it keeps a true phone
 *  aspect ratio at any width (no fixed-pixel stretching on mobile). */
export function PhoneMock({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const balance = useCountTo(84250, inView, 1.4);

  return (
    <div ref={ref} className={cn("@container w-full", className)}>
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
            <div className="font-display text-[12cqw] font-semibold leading-none tabular-nums text-white">
              {Math.round(balance).toLocaleString("en-US")}
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
          {/* list — staggered rows */}
          <motion.div
            className="space-y-[4cqw] rounded-[6cqw] border border-border bg-card p-[5cqw]"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  shown: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4, ease: EASE },
                  },
                }}
                className="flex items-center gap-[5cqw]"
              >
                <div className="h-[14cqw] w-[14cqw] shrink-0 rounded-[4cqw] bg-indigo-tint" />
                <div className="flex-1 space-y-[2cqw]">
                  <Bar className="h-[2.6cqw] w-2/3" />
                  <Bar className="h-[2.6cqw] w-1/3 bg-mist/70" />
                </div>
                <Bar className="h-[2.6cqw] w-[14cqw] bg-secondary-light" />
              </motion.div>
            ))}
          </motion.div>
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
