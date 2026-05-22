"use client";

import type { MouseEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { BrowserMock, PhoneMock, FloatingChip } from "@/components/mockups/Mockups";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TILT = 7; // max degrees — faint

/** Layered, brand-built device composition for the hero — with scroll
 *  parallax (depth) and a faint mouse-follow tilt. */
export function HeroShowcase() {
  const reduce = useReducedMotion();

  // Scroll parallax
  const { scrollY } = useScroll();
  const yBrowser = useTransform(scrollY, [0, 760], [0, reduce ? 0 : -26]);
  const yPhone = useTransform(scrollY, [0, 760], [0, reduce ? 0 : -90]);
  const yChip = useTransform(scrollY, [0, 760], [0, reduce ? 0 : -134]);

  // Mouse-follow tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 110, damping: 18, mass: 0.4 });
  const rotateY = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px * TILT);
    my.set(-py * TILT);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="w-full max-w-[560px]"
      style={{ perspective: 1100 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -inset-12 -z-10">
          <div className="absolute right-8 top-2 h-60 w-60 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute bottom-0 left-2 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />
        </div>

        {/* Browser — dashboard */}
        <motion.div style={{ y: yBrowser }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            <BrowserMock screen="dashboard" url="zekora.app/dashboard" />
          </motion.div>
        </motion.div>

        {/* Floating accent */}
        <motion.div
          style={{ y: yChip }}
          className="absolute -left-6 top-12 hidden sm:block"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.85, ease: EASE }}
          >
            <FloatingChip label="Live &amp; shipped" />
          </motion.div>
        </motion.div>

        {/* Phone — app */}
        <motion.div
          style={{ y: yPhone }}
          className="absolute -bottom-16 right-[-4%] w-[36%] min-w-[150px] max-w-[198px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52, ease: EASE }}
          >
            <PhoneMock />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
