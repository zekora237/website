"use client";

import { motion } from "framer-motion";
import {
  Eye,
  ShieldCheck,
  Lightbulb,
  Handshake,
  Heart,
  Target,
  TrendingUp,
  Layers,
} from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { BRAND } from "@/lib/config";

const values = [
  {
    icon: Eye,
    title: "Clarity",
    description:
      "Clear communication, clear scope, clear expectations. No ambiguity in work or relationships.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "Commitments are respected. Deadlines are taken seriously. Quality is consistent. Trust is a core asset.",
  },
  {
    icon: Lightbulb,
    title: "Simplicity",
    description:
      "Simple solutions are preferred. Complexity must always be justified. Systems should be understandable by users.",
  },
  {
    icon: Handshake,
    title: "Ownership",
    description:
      "We take responsibility for our work. Mistakes are acknowledged and corrected. Every project is a reference.",
  },
  {
    icon: Heart,
    title: "Ethical Work",
    description:
      "Honest pricing, transparent communication, respect for all stakeholders. No deceptive or harmful practices.",
  },
];

export function AboutContent() {
  return (
    <>
      {/* Page Header */}
      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{
          background: "linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)",
        }}
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
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: "#ffffff" }}
            >
              About {BRAND.name}
            </h1>
            <p
              className="text-lg sm:text-xl max-w-2xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              A technology-driven company that builds digital solutions and
              creates scalable products — with clarity, quality, and purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#e8ecf5" }}
              >
                <Target className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Our Mission
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              Solving Real Problems, Not Just Delivering Software
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To help businesses build solid digital foundations that make their
              work easier, clearer, and more efficient.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {BRAND.name} designs and builds websites, mobile applications, and
              internal business systems for clients. These services help
              organisations establish or improve their digital presence,
              digitalise internal processes, and gain efficiency, clarity, and
              operational control.
            </p>
          </div>
          <div className="relative">
            <div
              className="aspect-square rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #f3f5fa 0%, #e6f5f5 100%)",
              }}
            >
              <div className="text-center p-8">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#e8ecf5" }}
                >
                  <Target className="w-10 h-10 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {/* PLACEHOLDER: Replace with a professional image representing the company's mission */}
                  Mission illustration placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Vision */}
      <SectionWrapper muted>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white border border-border shadow-sm">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "#e8ecf5" }}
                >
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-primary mb-1">
                  Services
                </h4>
                <p className="text-xs text-muted-foreground">
                  Revenue, experience, and market understanding
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-border shadow-sm">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "#e6f5f5" }}
                >
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="text-sm font-semibold text-primary mb-1">
                  Products
                </h4>
                <p className="text-xs text-muted-foreground">
                  Scalability, ownership, and long-term value
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#e6f5f5" }}
              >
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Our Vision
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              From Digital Services to Venture Building
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To grow from a digital services company into a venture-building
              organisation that both serves clients through high-quality
              solutions and creates scalable digital products.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {BRAND.name} follows a dual-growth approach: services generate revenue
              and market understanding, while products generate scalability and
              long-term value. Both pillars are essential and reinforce each
              other.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Core Values
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These values guide all decisions, collaborations, and projects.
            They are non-negotiable and define who we are.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {values.map((value, i) => (
            <FeatureCard key={value.title} {...value} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Founder Story */}
      <SectionWrapper muted>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
            The Story Behind {BRAND.name}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {BRAND.name} was born from a simple observation: too many businesses
              struggle with digital tools that don&apos;t fit their needs. Off-the-shelf
              solutions are often too generic, and custom development is often
              too chaotic.
            </p>
            <p>
              We set out to bridge that gap — building structured, clear, and
              reliable digital solutions that truly serve the businesses they&apos;re
              made for. Not rushed. Not over-engineered. Just right.
            </p>
            <p>
              As we grew, we noticed patterns: problems that kept coming back
              across different clients. That&apos;s when the idea of building our own
              products emerged. Today, {BRAND.name} operates on two pillars —
              serving clients and building scalable products — each reinforcing
              the other.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Philosophy */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Our Philosophy
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">
                What We Believe
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">✔</span>
                  Services create stability
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">✔</span>
                  Products create leverage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">✔</span>
                  Structure enables sustainable growth
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">✔</span>
                  Growth is pursued with patience and alignment
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-3">
                What We Avoid
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#ef4444" }} className="mt-1">✖</span>
                  Rushed, low-quality work
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#ef4444" }} className="mt-1">✖</span>
                  One-size-fits-all solutions
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#ef4444" }} className="mt-1">✖</span>
                  Over-engineering simple problems
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#ef4444" }} className="mt-1">✖</span>
                  Projects conflicting with ethical principles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

