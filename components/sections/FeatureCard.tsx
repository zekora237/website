"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group text-center p-6 lg:p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-500 ease-out"
    >
      <div className="relative mx-auto mb-5 w-16 h-16">
        {/* Soft ring behind icon */}
        <div
          className="absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: "#e6f5f5" }}
        />
        <div className="relative w-full h-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-secondary transition-transform duration-500 group-hover:scale-110" />
        </div>
      </div>
      <h3 className="text-base font-semibold text-primary mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
