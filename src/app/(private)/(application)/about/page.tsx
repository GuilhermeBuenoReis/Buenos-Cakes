import type { Metadata } from "next";
import { AboutCtaSection } from "./_components/about-cta-section";
import { AboutHero } from "./_components/about-hero";
import { AboutOriginSection } from "./_components/about-origin-section";
import { AboutValuesSection } from "./_components/about-values-section";

export const metadata: Metadata = {
	title: "Sobre Nós | Buenos'Cakes",
};

export default function AboutPage() {
	return (
		<div className="space-y-6 pb-4">
			<AboutHero />
			<AboutOriginSection />
			<AboutValuesSection />
			<AboutCtaSection />
		</div>
	);
}
