"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/Button";

const projects = [
	{
		title: "Healthy Living Association (H.L.A)",
		description:
			"A modern, professional website for a nonprofit focused on preventive healthcare and community health education in Cameroon.",
		tags: ["Nonprofit", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
		image: "/images/hla.png",
		link: "https://hla-website-nine.vercel.app",
		client: "Healthy Living Association",
		type: "Nonprofit / NGO Website",
		aim: "Build a modern, professional web presence for a nonprofit organization focused on preventive healthcare and community health education in Cameroon.",
		features: [
			"Health program & screening campaign showcases",
			"Volunteer opportunity listings",
			"Stripe-powered donation integration",
			"SEO-optimized & fully responsive",
			"Content-managed architecture for easy updates",
		],
		techStack: [
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Lucide React",
			"Stripe",
			"Vercel",
		],
	},
	{
		title: "TAMWIL — Personal Finance Manager",
		description:
			"A privacy-first, cross-platform personal finance app built with Flutter. 100% offline architecture with comprehensive financial tracking and analytics.",
		tags: ["Mobile App", "Flutter", "Dart", "Riverpod", "FinTech"],
		image: "/images/tamwil.jpg",
		client: "Internal Product",
		type: "Cross-Platform Mobile Application",
		aim: "Provide a privacy-first personal finance management app that works 100% offline, ensuring user data never leaves their device.",
		features: [
			"Multi-source income tracking (salary, freelance, investments)",
			"Detailed expense categorization with custom categories",
			"Bidirectional debt management (owed & receivable)",
			"Smart savings with percentage-based allocation",
			"Financial health scoring system",
			"Interactive charts & analytics dashboard",
			"Multi-language support (English, French)",
			"Dark / Light / System-adaptive theming",
		],
		techStack: ["Flutter", "Dart", "Riverpod", "Dartz", "Material Design 3"],
	},
	{
		title: "Djangi — Cotisation Manager",
		description:
			"A mobile-first PWA for managing tontine/djangi group savings — a community-based savings tradition in Central & West Africa.",
		tags: ["PWA", "Next.js", "TypeScript", "Tailwind CSS", "Offline-First"],
		image: "/images/cotisation.jpg",
		link: "https://cotisation-ashy.vercel.app",
		client: "Internal Product",
		type: "Progressive Web App (PWA)",
		aim: "Digitize and simplify the management of informal community savings groups (djangi/tontines), replacing handwritten paper ledgers with a secure, offline-capable, mobile-friendly app.",
		features: [
			"Real-time dashboard with progress tracking",
			"Weekly contribution tracking per participant",
			"PDF report generation (per-participant & summary)",
			"End-to-end encrypted Google Drive backup & sync",
			"PIN lock security for app access",
			"Fully offline-first — works without internet",
			"Installable PWA on Android & iOS",
			"Configurable group name, amounts & weeks",
		],
		techStack: [
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Dexie.js",
			"jsPDF",
			"Google Drive API",
			"Web Crypto API",
		],
	},
];

export function PortfolioContent() {
	return (
		<>
			{/* Page Header */}
			<section
				className="relative pt-32 pb-16 lg:pt-40 lg:pb-20"
				style={{
					background:
						"linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)",
				}}
			>
				<div className="absolute inset-0" style={{ opacity: 0.03 }}>
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
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
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
							<span style={{ color: "#ffffff" }}>Our Work</span>
						</h1>
						<p className="text-lg sm:text-xl max-w-2xl leading-relaxed">
							<span style={{ color: "rgba(255,255,255,0.75)" }}>
								Every project is treated as a reference of the brand. Here are
								some of the digital solutions we&apos;ve built.
							</span>
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
					<h2 className="text-3xl sm:text-4xl font-bold mb-4">
						<span style={{ color: "#ffffff" }}>Have a Project in Mind?</span>
					</h2>
					<p className="max-w-xl mx-auto mb-8">
						<span style={{ color: "rgba(255,255,255,0.75)" }}>
							Let&apos;s build something great together. Tell us about your
							project and we&apos;ll get back to you within 24 hours.
						</span>
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
