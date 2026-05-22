"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectDetailModal, type ProjectDetail } from "./ProjectDetailModal";
import { useDictionary } from "@/lib/dictionary-context";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  index?: number;
  image?: string;
  link?: string;
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
  client,
  type,
  aim,
  features,
  techStack,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const dict = useDictionary();

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
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_22px_44px_-22px_rgba(20,22,46,0.32)]"
      >
        {/* Screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden bg-cloud">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-xs text-steel">
                {dict.portfolio.detail.preview}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-semibold text-ink">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-paper px-2 py-0.5 font-mono text-[11px] text-slate"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
            {dict.portfolio.detail.viewDetails}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </motion.button>

      <ProjectDetailModal
        project={project}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
