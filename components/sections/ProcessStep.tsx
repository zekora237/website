"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface ProcessStepProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  index?: number;
  /** Whether to show a connecting line to the right (all except last) */
  isLast?: boolean;
}

export function ProcessStep({
  icon: Icon,
  step,
  title,
  description,
  index = 0,
  isLast = false,
}: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connecting dashed line (hidden on last step and on mobile for 2nd/4th) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-1rem)] h-px border-t-2 border-dashed border-border" />
      )}

      {/* Step circle */}
      <div className="relative mb-5">
        <div
          className="w-16 h-16 lg:w-18 lg:h-18 rounded-2xl flex items-center justify-center shadow-md"
          style={{
            background:
              "linear-gradient(135deg, #1F3C88 0%, #253f80 100%)",
          }}
        >
          <Icon className="w-7 h-7" style={{ color: "#ffffff" }} />
        </div>
        <span
          className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shadow-sm"
          style={{
            background:
              "linear-gradient(135deg, #1BA6A6 0%, #158e8e 100%)",
            color: "#ffffff",
          }}
        >
          {step}
        </span>
      </div>
      <h3 className="text-base font-semibold text-primary mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-52">
        {description}
      </p>
    </motion.div>
  );
}
