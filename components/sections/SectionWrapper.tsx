"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Deep indigo background with light text */
  dark?: boolean;
  /** Soft paper-grey background */
  muted?: boolean;
  /** Extra classes on the inner container */
  containerClassName?: string;
}

export function SectionWrapper({
  children,
  className,
  id,
  dark = false,
  muted = false,
  containerClassName,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-24 lg:py-28",
        dark
          ? "bg-primary text-white"
          : muted
            ? "bg-paper text-foreground"
            : "bg-background text-foreground",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mx-auto max-w-7xl px-5 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </motion.div>
    </section>
  );
}
