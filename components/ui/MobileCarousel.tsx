"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileCarouselProps {
  children: React.ReactNode[];
  /** Auto-scroll interval in ms (default 4500) */
  interval?: number;
}

/**
 * Horizontal auto-scrolling carousel — mobile only.
 * On sm+ screens it renders children normally (no carousel).
 */
export function MobileCarousel({ children, interval = 4500 }: MobileCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = children.length;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total);
    setProgress(0);
  }, [total]);

  // Auto-advance + progress bar
  useEffect(() => {
    setProgress(0);
    const step = 30; // ms per progress tick
    const ticks = interval / step;
    let tick = 0;

    progressRef.current = setInterval(() => {
      tick++;
      setProgress((tick / ticks) * 100);
    }, step);

    timeoutRef.current = setTimeout(() => goTo(current + 1), interval);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, interval, goTo]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
  };

  return (
    <div className="sm:hidden">
      {/* Carousel viewport */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="px-1"
          >
            {children[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls: arrows + dots + progress */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => goTo(current - 1)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: "#f0f2f8", color: "#1F3C88" }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: current === i ? 28 : 8,
                height: 8,
                backgroundColor: current === i ? "transparent" : "#d1d5db",
              }}
            >
              {current === i && (
                <>
                  <div className="absolute inset-0 rounded-full" style={{ backgroundColor: "#e0e7ff" }} />
                  <div
                    className="absolute inset-0 rounded-full origin-left"
                    style={{
                      backgroundColor: "#1BA6A6",
                      transform: `scaleX(${progress / 100})`,
                      transition: "transform 30ms linear",
                    }}
                  />
                </>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: "#f0f2f8", color: "#1F3C88" }}
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
