"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out"
    >
      {/* Image placeholder */}
      <div
        className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f0f2f8 0%, #e6f5f5 50%, #f3f5fa 100%)",
        }}
      >
        {/* Abstract geometric decoration */}
        <div
          className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-20 transition-transform duration-700 group-hover:scale-150"
          style={{ backgroundColor: "#1BA6A6" }}
        />
        <div
          className="absolute bottom-6 left-6 w-12 h-12 rounded-lg opacity-10 rotate-12 transition-transform duration-700 group-hover:rotate-45"
          style={{ backgroundColor: "#1F3C88" }}
        />

        <div className="relative text-center px-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm transition-transform duration-500 group-hover:scale-110"
            style={{
              background:
                "linear-gradient(135deg, #1F3C88, #253f80)",
            }}
          >
            <Layers className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            {/* PLACEHOLDER: Replace with actual project screenshot */}
            {imagePlaceholder}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-7">
        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-300"
              style={{
                color: "#1F3C88",
                borderColor: "#e8eaef",
                backgroundColor: "#f8f9fb",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
