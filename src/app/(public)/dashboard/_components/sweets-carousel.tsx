"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { z } from "zod";
import { CarouselIndicators } from "@/app/(public)/dashboard/_components/carousel-indicators";
import { useUrlState } from "@/hooks/use-url-state";

const SLIDE_INTERVAL_MS = 5000;
const CAROUSEL_ACTIVE_INDEX_QUERY_PARAM = "activeIndex";

const carouselImages = [
	{
		alt: "Cupcakes decorados com cobertura rosa",
		src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1400&q=80",
	},
	{
		alt: "Macarons coloridos em uma bandeja",
		src: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=1400&q=80",
	},
	{
		alt: "Doces finos artesanais com chocolate",
		src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80",
	},
	{
		alt: "Bolo confeitado com frutas vermelhas",
		src: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1400&q=80",
	},
];

const sweetsCarouselUrlStateSchema = z.object({
	activeIndex: z.coerce
		.number()
		.int()
		.min(0)
		.max(carouselImages.length - 1)
		.catch(0),
});

const MotionImage = motion.create(Image);

function getNextSlideIndex(currentIndex: number) {
	return (currentIndex + 1) % carouselImages.length;
}

export function SweetsCarousel() {
	const [activeIndex, setActiveIndex] = useUrlState(
		CAROUSEL_ACTIVE_INDEX_QUERY_PARAM,
		sweetsCarouselUrlStateSchema.shape.activeIndex,
	);

	const handleAdvanceSlide = useCallback(() => {
		setActiveIndex((currentIndex) => getNextSlideIndex(currentIndex));
	}, [setActiveIndex]);

	useEffect(() => {
		const intervalId = window.setInterval(
			handleAdvanceSlide,
			SLIDE_INTERVAL_MS,
		);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [handleAdvanceSlide]);

	return (
		<div className="relative mx-auto h-64 w-full max-w-lg overflow-hidden rounded-[26px] bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 p-3 shadow-[0_24px_52px_-30px_rgba(15,23,42,0.55)] sm:h-78">
			<div className="absolute inset-0 rounded-[26px] border border-white/70" />
			<AnimatePresence mode="wait">
				<MotionImage
					alt={carouselImages[activeIndex].alt}
					animate={{ opacity: 1, scale: 1, x: 0 }}
					className="relative h-full w-full rounded-[22px] object-cover"
					exit={{ opacity: 0, scale: 1.04, x: -24 }}
					fill
					initial={{ opacity: 0, scale: 0.98, x: 24 }}
					key={carouselImages[activeIndex].src}
					sizes="(max-width: 1024px) 100vw, 560px"
					src={carouselImages[activeIndex].src}
					transition={{ duration: 0.6, ease: "easeInOut" }}
				/>
			</AnimatePresence>
			<CarouselIndicators carouselImages={carouselImages} />
		</div>
	);
}
