"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Database,
  Cloud,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { type LucideIcon } from "lucide-react";

interface ServiceDetail {
  id: string;
  icon: LucideIcon;
  title: string;
  problem: string;
  solution: string;
  benefit: string;
  features: string[];
}

const servicesData: ServiceDetail[] = [
  {
    id: "web-development",
    icon: Globe,
    title: "Web Development",
    problem:
      "Many businesses rely on outdated, poorly designed websites that fail to represent their brand or convert visitors. Others have no web presence at all.",
    solution:
      "We design and develop custom websites and web applications using modern technologies — responsive, fast, SEO-optimized, and built to scale.",
    benefit:
      "A professional digital presence that works for your business 24/7, attracting clients and building trust.",
    features: [
      "Custom responsive design",
      "SEO optimization",
      "Performance-first development",
      "Content management systems",
      "E-commerce solutions",
      "Web application development",
    ],
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Applications",
    problem:
      "Users expect seamless mobile experiences. A clunky app or the absence of one means lost engagement and revenue.",
    solution:
      "We build native and cross-platform mobile applications for iOS and Android, focused on performance, usability, and real user needs.",
    benefit:
      "A powerful mobile tool that keeps your users engaged, simplifies processes, and opens new revenue channels.",
    features: [
      "iOS & Android development",
      "Cross-platform solutions",
      "Intuitive UI/UX design",
      "Offline-first capabilities",
      "Push notifications",
      "App Store optimization",
    ],
  },
  {
    id: "digitalization",
    icon: Database,
    title: "Business Digitalization",
    problem:
      "Manual processes, paper-based systems, and disconnected tools slow businesses down, create errors, and limit growth.",
    solution:
      "We analyse your workflows and build digital systems that automate, organize, and connect your operations — from booking systems to inventory management.",
    benefit:
      "Streamlined operations, reduced errors, better data visibility, and time saved for what matters most.",
    features: [
      "Process analysis & mapping",
      "Custom internal tools",
      "Workflow automation",
      "Data management systems",
      "Integration with existing tools",
      "Training & documentation",
    ],
  },
  {
    id: "saas",
    icon: Cloud,
    title: "SaaS & Custom Systems",
    problem:
      "Off-the-shelf software rarely fits complex or unique business needs. Customization options are limited, and costs add up.",
    solution:
      "We design and build scalable SaaS platforms and custom systems tailored to your exact requirements — owned and controlled by you.",
    benefit:
      "A proprietary system that fits your business perfectly, grows with you, and gives you full control.",
    features: [
      "SaaS platform development",
      "Multi-tenant architecture",
      "API design & development",
      "Dashboard & analytics",
      "Subscription management",
      "Scalable infrastructure",
    ],
  },
];

export function ServicesContent() {
  return (
    <>
      {/* Page Header */}
      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{ background: "linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)" }}
      >
        <div className="absolute inset-0" style={{ opacity: 0.03 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "#ffffff" }}>
              Our Services
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              We build digital solutions that solve real problems. Each service
              is designed to help your business gain clarity, efficiency, and
              growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      {servicesData.map((service, index) => (
        <SectionWrapper
          key={service.id}
          id={service.id}
          muted={index % 2 === 1}
        >
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start`}
          >
            {/* Content */}
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#e8ecf5" }}
                >
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                  {service.title}
                </h2>
              </div>

              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">
                    The Problem
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.problem}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">
                    Our Solution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.solution}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">
                    The Benefit
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.benefit}
                  </p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <div
                className="p-8 rounded-2xl border border-border"
                style={{ background: "linear-gradient(135deg, #f3f5fa 0%, #e6f5f5 100%)" }}
              >
                <h3 className="text-lg font-semibold text-primary mb-6">
                  What&apos;s Included
                </h3>
                <ul className="space-y-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionWrapper>
      ))}

      {/* CTA */}
      <SectionWrapper dark>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#ffffff" }}>
            Need a Custom Solution?
          </h2>
          <p className="max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
            Every business is unique. Let&apos;s discuss your specific
            challenges and find the right approach together.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Get a Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}

