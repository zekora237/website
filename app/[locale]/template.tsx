"use client";

import { motion } from "framer-motion";

/**
 * Re-mounts on every navigation — gives each route a subtle fade/slide
 * entrance. The Y-translate is small enough to feel like a settle rather
 * than a slide, and short enough that the LCP isn't delayed.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
