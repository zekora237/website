"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Layers, Eye } from "lucide-react";
import { ProjectDetailModal, type ProjectDetail } from "./ProjectDetailModal";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  index?: number;
  /** Path to an actual project screenshot (e.g. "/images/hla.png") */
  image?: string;
  /** Live project URL */
  link?: string;
  /** Fallback placeholder text when no image is provided */
  imagePlaceholder?: string;
  client?: string;
  type?: string;
  aim?: string;
  features?: string[];
  techStack?: string[];
}

export function ProjectCard({
  title,
  description,
  tags,
  index = 0,
  image,
  link,
  imagePlaceholder = "Project screenshot",
  client,
  type,
  aim,
  features,
  techStack,
}: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const project: ProjectDetail = {
    title,
    description,
    tags,
    image,
    link,
    client,
    type,
    aim,
    features,
    techStack,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      >
        <div
          className="group block rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          {/* Image area — object-contain to show the full image */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "16/10",
              background: image
                ? "linear-gradient(135deg, #f0f2f8 0%, #e8edf5 50%, #f3f5fa 100%)"
                : "linear-gradient(135deg, #f0f2f8 0%, #e6f5f5 50%, #f3f5fa 100%)",
            }}
          >
            {image ? (
              <>
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                {/* Indicators */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {link && (
                    <div className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                    <Eye className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-20 transition-transform duration-700 group-hover:scale-150"
                  style={{ backgroundColor: "#1BA6A6" }}
                />
                <div
                  className="absolute bottom-6 left-6 w-12 h-12 rounded-lg opacity-10 rotate-12 transition-transform duration-700 group-hover:rotate-45"
                  style={{ backgroundColor: "#1F3C88" }}
                />
                <div className="relative flex items-center justify-center h-full text-center px-4">
                  <div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm transition-transform duration-500 group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, #1F3C88, #253f80)" }}
                    >
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">
                      {imagePlaceholder}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-6 lg:p-7">
            <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
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
            {/* View details link */}
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-300"
              style={{ color: "#1BA6A6" }}
            >
              <Eye className="w-3.5 h-3.5" />
              View Details
            </span>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={project}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
