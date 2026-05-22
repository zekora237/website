"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Target,
  Wrench,
  Check,
  User,
  Layers,
} from "lucide-react";
import { useDictionary } from "@/lib/dictionary-context";

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

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const dict = useDictionary();
  const d = dict.portfolio.detail;

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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/65 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex-1 overflow-y-auto">
              {/* Image */}
              <div className="relative aspect-[16/10] w-full bg-cloud">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 672px) 100vw, 672px"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                        <Layers className="h-6 w-6" />
                      </span>
                      <p className="mt-3 font-mono text-xs text-steel">
                        {d.preview}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-6 p-6 sm:p-8">
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    {project.title}
                  </h2>
                  {(project.client || project.type) && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                      {project.client && (
                        <span className="flex items-center gap-1.5 text-xs text-steel">
                          <User className="h-3.5 w-3.5" />
                          {project.client}
                        </span>
                      )}
                      {project.type && (
                        <span className="flex items-center gap-1.5 text-xs text-steel">
                          <Layers className="h-3.5 w-3.5" />
                          {project.type}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-slate">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-paper px-2 py-0.5 font-mono text-[11px] text-slate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.aim && (
                  <div className="rounded-xl border border-border bg-paper p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <h3 className="font-display text-sm font-semibold text-ink">
                        {d.objective}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {project.aim}
                    </p>
                  </div>
                )}

                {project.features && project.features.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" />
                      <h3 className="font-display text-sm font-semibold text-ink">
                        {d.keyFeatures}
                      </h3>
                    </div>
                    <ul className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                      {project.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.techStack && project.techStack.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-steel" />
                      <h3 className="font-display text-sm font-semibold text-ink">
                        {d.techStack}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-white px-2.5 py-1 font-mono text-[11px] text-slate"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.link && (
                  <div className="pt-1">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                      {d.visitProject}
                      <ExternalLink className="h-4 w-4" />
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
