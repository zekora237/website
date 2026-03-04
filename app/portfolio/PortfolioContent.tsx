"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/Button";

/**
 * PLACEHOLDER PROJECTS
 * These are sample projects for layout and demonstration purposes.
 * Replace with actual project data when available.
 */
const projects = [
  {
    title: "Hotel Booking Platform",
    description:
      "A comprehensive booking and management system for a boutique hotel chain. Includes online reservations, room management, and guest communication tools.",
    tags: ["Web App", "Booking System", "Next.js", "PostgreSQL"],
    imagePlaceholder:
      "PLACEHOLDER: Hotel booking dashboard screenshot — replace with actual project image",
  },
  {
    title: "Restaurant POS System",
    description:
      "Custom point-of-sale and order management system designed for multi-location restaurant operations. Streamlined ordering, kitchen display, and reporting.",
    tags: ["Business System", "React", "Node.js", "Real-time"],
    imagePlaceholder:
      "PLACEHOLDER: Restaurant POS interface screenshot — replace with actual project image",
  },
  {
    title: "Field Service Mobile App",
    description:
      "Cross-platform mobile application for field technicians. Includes job scheduling, digital forms, offline capability, and GPS tracking.",
    tags: ["Mobile App", "React Native", "Offline-first"],
    imagePlaceholder:
      "PLACEHOLDER: Mobile app screens mockup — replace with actual project image",
  },
  {
    title: "Inventory Management SaaS",
    description:
      "Multi-tenant SaaS platform for small businesses to manage inventory, track orders, and generate reports. Built for simplicity and scalability.",
    tags: ["SaaS", "Dashboard", "TypeScript", "API"],
    imagePlaceholder:
      "PLACEHOLDER: SaaS dashboard screenshot — replace with actual project image",
  },
  {
    title: "Corporate Website Redesign",
    description:
      "Complete redesign and development of a corporate website for a logistics company. Focus on brand positioning, performance, and lead generation.",
    tags: ["Website", "SEO", "Next.js", "Tailwind CSS"],
    imagePlaceholder:
      "PLACEHOLDER: Corporate website homepage screenshot — replace with actual project image",
  },
  {
    title: "Client Portal & CRM",
    description:
      "Custom client portal with integrated CRM capabilities. Allows businesses to manage client relationships, projects, and communications in one place.",
    tags: ["Web App", "CRM", "Dashboard", "PostgreSQL"],
    imagePlaceholder:
      "PLACEHOLDER: CRM dashboard screenshot — replace with actual project image",
  },
];

export function PortfolioContent() {
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
              Our Work
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Every project is treated as a reference of the brand. Here are
              some of the digital solutions we&apos;ve built.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-6">
            More projects coming soon. We document every build with care.
          </p>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper dark>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#ffffff" }}>
            Have a Project in Mind?
          </h2>
          <p className="max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
            Let&apos;s build something great together. Tell us about your
            project and we&apos;ll get back to you within 24 hours.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}

