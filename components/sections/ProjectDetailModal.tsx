"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Target, Wrench, CheckCircle2, User, Layers } from "lucide-react";

export interface ProjectDetail {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  client?: string;
  type?: string;
  aim?: string;
  features?: string[];
  techStack?: string[];
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEsc]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              {/* Image */}
              {project.image ? (
                <div className="relative w-full bg-gradient-to-br from-slate-100 to-slate-50">
                  <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 672px) 100vw, 672px"
                      priority
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="w-full flex items-center justify-center"
                  style={{
                    aspectRatio: "16/10",
                    background: "linear-gradient(135deg, #f0f2f8 0%, #e6f5f5 50%, #f3f5fa 100%)",
                  }}
                >
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm"
                      style={{ background: "linear-gradient(135deg, #1F3C88, #253f80)" }}
                    >
                      <Layers className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-gray-400">Project preview</p>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {project.title}
                  </h2>
                  {(project.client || project.type) && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      {project.client && (
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <User className="w-3.5 h-3.5" />
                          {project.client}
                        </span>
                      )}
                      {project.type && (
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Layers className="w-3.5 h-3.5" />
                          {project.type}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        color: "#1F3C88",
                        borderColor: "#e8eaef",
                        backgroundColor: "#f0f2f8",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Aim */}
                {project.aim && (
                  <div className="rounded-xl p-4 border border-gray-100" style={{ backgroundColor: "#f8f9fb" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4" style={{ color: "#1F3C88" }} />
                      <h3 className="text-sm font-semibold" style={{ color: "#1F3C88" }}>
                        Objective
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{project.aim}</p>
                  </div>
                )}

                {/* Key Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4" style={{ color: "#1BA6A6" }} />
                      <h3 className="text-sm font-semibold text-gray-900">Key Features</h3>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#1BA6A6" }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-gray-500" />
                      <h3 className="text-sm font-semibold text-gray-900">Tech Stack</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visit link */}
                {project.link && (
                  <div className="pt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                      style={{ background: "linear-gradient(135deg, #1F3C88, #253f80)" }}
                    >
                      Visit Live Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

