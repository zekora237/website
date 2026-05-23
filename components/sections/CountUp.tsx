"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 → `to` with an ease-out cubic curve.
 *
 * Bulletproof on mobile: starts the animation as soon as the element is
 * visible (or already on screen at mount), and falls back to a timer if
 * IntersectionObserver never fires — which can happen inside transformed
 * ancestors (e.g. the Next.js template.tsx fade/slide wrapper).
 */
export function CountUp({ to, suffix = "", duration = 1.5, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startAnim = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      let raf = 0;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    // 1) If already in viewport at mount → start immediately.
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportH && rect.bottom > 0) {
      startAnim();
      return;
    }

    // 2) Otherwise observe intersection.
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              startAnim();
              io?.disconnect();
              break;
            }
          }
        },
        { threshold: 0.1 }
      );
      io.observe(el);
    }

    // 3) Safety fallback — always animate within ~1.4s even if observer
    //    never fires (transform parents, weird mobile browsers, etc.).
    const fallback = window.setTimeout(startAnim, 1400);

    return () => {
      io?.disconnect();
      window.clearTimeout(fallback);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
