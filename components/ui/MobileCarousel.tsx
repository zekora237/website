"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface MobileCarouselProps {
  children: React.ReactNode[];
  /** Auto-scroll interval in ms (default 4000) */
  interval?: number;
}

/**
 * Horizontal auto-scrolling carousel — mobile only.
 * On sm+ screens it renders children normally (no carousel).
 */
export function MobileCarousel({ children, interval = 4000 }: MobileCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = children.length;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    timeoutRef.current = setTimeout(() => goTo(current + 1), interval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, interval, goTo]);

  // Touch swipe support
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
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex"
          animate={{ x: `-${current * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {children.map((child, i) => (
            <div key={i} className="w-full shrink-0 px-2">
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: current === i ? 24 : 8,
              height: 8,
              backgroundColor: current === i ? "#1BA6A6" : "#cbd5e1",
            }}
          />
        ))}
      </div>
    </div>
  );
}

