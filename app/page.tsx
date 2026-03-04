"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Globe,
  Smartphone,
  Database,
  Cloud,
  Eye,
  ShieldCheck,
  Lightbulb,
  Handshake,
  Search,
  Palette,
  Code,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { ProcessStep } from "@/components/sections/ProcessStep";

// --- Data ---

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies. Responsive, fast, and designed to convert.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android.",
  },
  {
    icon: Database,
    title: "Business Digitalization",
    description:
      "Transform manual processes into efficient digital systems. Gain clarity and operational control.",
  },
  {
    icon: Cloud,
    title: "SaaS & Custom Systems",
    description:
      "Scalable software-as-a-service platforms and tailored internal tools built for your specific needs.",
  },
];

const features = [
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
      "Commitments are respected. Deadlines are taken seriously. Quality is consistent.",
  },
  {
    icon: Lightbulb,
    title: "Simplicity",
    description:
      "Simple solutions are preferred. Complexity must always be justified.",
  },
  {
    icon: Handshake,
    title: "Ownership",
    description:
      "We take responsibility for our work. Every project is treated as a reference of the brand.",
  },
];

const processSteps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We understand your business, goals, and challenges.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "We create structured, clear solutions tailored to you.",
  },
  {
    icon: Code,
    title: "Development",
    description: "We build with modern tools, clean code, and best practices.",
  },
  {
    icon: Rocket,
    title: "Delivery",
    description: "We launch, support, and ensure everything runs smoothly.",
  },
];

// --- Animation Variants ---

const heroTextVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const heroWordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HomePage() {
  const heroTitle = "Digital Solutions That Structure & Grow Your Business";
  const words = heroTitle.split(" ");

  return (
    <>
      {/* ======== HERO ======== */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)",
        }}
      >
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0" style={{ opacity: 0.03 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Gradient orbs */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            top: "25%", right: "25%", width: "24rem", height: "24rem",
            backgroundColor: "rgba(27, 166, 166, 0.1)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            bottom: "25%", left: "25%", width: "20rem", height: "20rem",
            backgroundColor: "rgba(27, 166, 166, 0.05)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            {/* Animated Title */}
            <motion.h1
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              style={{ color: "#ffffff" }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={heroWordVariants}
                  className="inline-block mr-3 lg:mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.75)" }}
            >
              Zekora builds websites, mobile apps, and business systems that
              help organisations modernize, gain efficiency, and grow with
              confidence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Get a Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white! border-2! text-white! hover:bg-white! hover:text-primary!"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======== SERVICES OVERVIEW ======== */}
      <SectionWrapper id="services">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            What We Build
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From concept to delivery, we create digital solutions that solve
            real business problems — not just software.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ======== WHY CHOOSE ZEKORA ======== */}
      <SectionWrapper muted>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Why Choose Zekora
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our core values define how we work and what you can expect. Every
            project reflects our commitment to quality and clarity.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ======== PROCESS ======== */}
      <SectionWrapper>
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Our Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A structured approach from understanding your needs to delivering
            results. No surprises, just clarity at every step.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {processSteps.map((step, i) => (
            <ProcessStep
              key={step.title}
              {...step}
              step={i + 1}
              index={i}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ======== CTA SECTION ======== */}
      <SectionWrapper dark>
        <div className="text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#ffffff" }}
          >
            Ready to Build Something Great?
          </h2>
          <p
            className="max-w-xl mx-auto mb-8"
            style={{ color: "rgba(255, 255, 255, 0.75)" }}
          >
            Let&apos;s discuss your project. We&apos;ll help you define the
            right solution and bring it to life.
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
