"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={cn(
        "group relative rounded-2xl border border-border bg-white",
        "p-7 lg:p-8",
        "shadow-sm hover:shadow-xl transition-all duration-500 ease-out",
        "hover:-translate-y-1",
        "overflow-hidden"
      )}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, rgba(31,60,136,1) 0%, rgba(27,166,166,1) 100%)",
        }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
        style={{ backgroundColor: "#e8ecf5" }}
      >
        <Icon className="w-5 h-5 text-primary transition-colors duration-500 group-hover:text-secondary" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
