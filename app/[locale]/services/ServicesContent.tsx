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
import { BrowserMock, PhoneMock } from "@/components/mockups/Mockups";
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

/** The matching brand mockup for each service. */
function ServiceMock({ k }: { k: string }) {
  if (k === "mobile")
    return (
      <div className="mx-auto w-[62%] max-w-[248px]">
        <PhoneMock />
      </div>
    );
  if (k === "webDev")
    return <BrowserMock screen="code" url="zekora.dev / src/app/page.tsx" />;
  if (k === "digital")
    return <BrowserMock screen="board" url="zekora.app/workflow" />;
  return <BrowserMock screen="dashboard" url="zekora.app/dashboard" />;
}

export function ServicesContent() {
  const dict = useDictionary();
  const locale = useLocale();
  const s = dict.services;

  const data = keys.map((key, i) => ({
    id: ids[i],
    key,
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
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Text */}
              <div className={muted ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {svc.title}
                  </h2>
                </div>
                <div className="mt-6 space-y-4">
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
                <div className="mt-6 border-t border-border pt-5">
                  <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-steel">
                    {s.whatsIncluded}
                  </h3>
                  <div className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                    {svc.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-start gap-2 text-[13px] text-slate"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mockup */}
              <div className={`relative ${muted ? "lg:order-1" : ""}`}>
                <div className="pointer-events-none absolute -inset-8 -z-10">
                  <div className="absolute right-6 top-6 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute bottom-2 left-4 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
                </div>
                <ServiceMock k={svc.key} />
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
