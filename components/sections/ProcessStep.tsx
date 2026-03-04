"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface ProcessStepProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  index?: number;
}

export function ProcessStep({
  icon: Icon,
  step,
  title,
  description,
  index = 0,
}: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Step Number */}
      <div className="relative mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#1F3C88" }}
        >
          <Icon className="w-7 h-7" style={{ color: "#ffffff" }} />
        </div>
        <span
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center"
          style={{ backgroundColor: "#1BA6A6", color: "#ffffff" }}
        >
          {step}
        </span>
      </div>
      <h3 className="text-base font-semibold text-primary mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-48">
        {description}
      </p>
    </motion.div>
  );
}
