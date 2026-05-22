"use client";

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
        <p className="mt-14 text-center text-sm text-slate">
          {p.moreComingSoon}
        </p>
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
