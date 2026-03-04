"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  index?: number;
  /** Placeholder image description — replace with actual project image */
  imagePlaceholder?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  index = 0,
  imagePlaceholder = "Project screenshot",
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group rounded-xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image Placeholder */}
      <div
        className="relative h-48 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #f3f5fa 0%, #e6f5f5 100%)",
        }}
      >
        <div className="text-center px-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2"
            style={{ backgroundColor: "#e8ecf5" }}
          >
            <ExternalLink className="w-5 h-5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">
            {/* PLACEHOLDER: Replace with actual project screenshot */}
            {imagePlaceholder}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium text-primary"
              style={{ backgroundColor: "#e8ecf5" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
