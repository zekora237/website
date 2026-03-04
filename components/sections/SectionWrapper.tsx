"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Use dark background (primary blue) */
  dark?: boolean;
  /** Use muted/gray background */
  muted?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  dark = false,
  muted = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-24 lg:py-28", className)}
      style={{
        backgroundColor: dark ? "#1F3C88" : muted ? "#f8f9fb" : "#ffffff",
        color: dark ? "#ffffff" : undefined,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}
