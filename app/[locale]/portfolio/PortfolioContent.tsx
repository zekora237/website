"use client";

import { Plus } from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

export function PortfolioContent() {
  const dict = useDictionary();
  const locale = useLocale();
  const p = dict.portfolio;

  return (
    <>
      <PageHeader title={p.header.title} subtitle={p.header.subtitle} />

      <SectionWrapper>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {p.projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {/* More to come */}
        <div className="mx-auto mt-8 flex max-w-lg items-center gap-4 rounded-2xl border border-dashed border-mist bg-paper px-6 py-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-tint text-brand">
            <Plus className="h-5 w-5" />
          </span>
          <p className="text-sm leading-relaxed text-slate">
            {p.moreComingSoon}
          </p>
        </div>
      </SectionWrapper>

      <CtaBand
        title={p.cta.title}
        subtitle={t(p.cta.subtitle)}
        button={p.cta.button}
        href={`/${locale}/contact`}
      />
    </>
  );
}
