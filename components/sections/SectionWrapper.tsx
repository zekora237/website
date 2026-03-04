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
      className={cn("py-16 md:py-20 lg:py-24", className)}
      style={{
        backgroundColor: dark ? "#1F3C88" : muted ? "#F2F2F2" : "#ffffff",
        color: dark ? "#ffffff" : "#333333",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}
