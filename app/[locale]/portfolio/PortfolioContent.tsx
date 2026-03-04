"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/Button";
import { t } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";
import { useLocale } from "@/lib/locale-context";

export function PortfolioContent() {
	const dict = useDictionary();
	const locale = useLocale();
	const p = dict.portfolio;

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
				<div className="absolute inset-0" style={{ opacity: 0.06 }}>
					<div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
				</div>
				<div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					>
						<h1
							className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
							style={{ color: "#ffffff" }}
						>
							{p.header.title}
						</h1>
						<p
							className="text-lg sm:text-xl max-w-2xl leading-relaxed"
							style={{ color: "rgba(255,255,255,0.75)" }}
						>
							{p.header.subtitle}
						</p>
					</motion.div>
				</div>
			</section>

			<SectionWrapper>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{p.projects.map((project, i) => (
						<ProjectCard key={project.title} {...project} index={i} />
					))}
				</div>
				<div className="text-center mt-16">
					<p className="text-sm text-muted-foreground">
						{p.moreComingSoon}
					</p>
				</div>
			</SectionWrapper>

			{/* CTA */}
			<SectionWrapper dark>
				<div className="text-center">
					<h2
						className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5"
						style={{ color: "#ffffff" }}
					>
						{p.cta.title}
					</h2>
					<p
						className="max-w-xl mx-auto mb-10 text-base lg:text-lg"
						style={{ color: "rgba(255,255,255,0.75)" }}
					>
						{t(p.cta.subtitle)}
					</p>
					<Link href={`/${locale}/contact`}>
						<Button size="lg" variant="secondary">
							{p.cta.button}
							<ArrowRight className="ml-2 w-4 h-4" />
						</Button>
					</Link>
				</div>
			</SectionWrapper>
		</>
	);
}
