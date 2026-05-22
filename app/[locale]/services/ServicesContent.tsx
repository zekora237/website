"use client";

import {
  Code2,
  Smartphone,
  Workflow,
  Layers,
  Check,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

const icons: Record<string, LucideIcon> = {
  webDev: Code2,
  mobile: Smartphone,
  digital: Workflow,
  saas: Layers,
};
const keys = ["webDev", "mobile", "digital", "saas"] as const;
const ids = ["web-development", "mobile-apps", "digitalization", "saas"];

export function ServicesContent() {
  const dict = useDictionary();
  const locale = useLocale();
  const s = dict.services;

  const data = keys.map((key, i) => ({
    id: ids[i],
    icon: icons[key],
    ...s.detail[key],
  }));

  return (
    <>
      <PageHeader title={s.header.title} subtitle={s.header.subtitle} />

      {data.map((svc, index) => {
        const Icon = svc.icon;
        const muted = index % 2 === 1;
        const blocks = [
          { label: s.theProblem, text: svc.problem, dot: "bg-steel", line: "border-mist" },
          { label: s.ourSolution, text: svc.solution, dot: "bg-secondary", line: "border-secondary/45" },
          { label: s.theBenefit, text: svc.benefit, dot: "bg-primary", line: "border-primary/40" },
        ];
        return (
          <SectionWrapper key={svc.id} id={svc.id} muted={muted}>
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Problem · Solution · Benefit */}
              <div className={muted ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {svc.title}
                  </h2>
                </div>
                <div className="mt-7 space-y-5">
                  {blocks.map((b) => (
                    <div key={b.label} className={`border-l-2 pl-5 ${b.line}`}>
                      <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${b.dot}`} />
                        <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-steel">
                          {b.label}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate">
                        {b.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's included */}
              <div className={muted ? "lg:order-1" : ""}>
                <div
                  className={
                    "rounded-2xl border border-border p-7 lg:p-8 " +
                    (muted ? "bg-white" : "bg-paper")
                  }
                >
                  <h3 className="font-display text-base font-semibold text-ink">
                    {s.whatsIncluded}
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {svc.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-light text-secondary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </SectionWrapper>
        );
      })}

      <CtaBand
        title={s.cta.title}
        subtitle={t(s.cta.subtitle)}
        button={s.cta.button}
        href={`/${locale}/contact`}
      />
    </>
  );
}
