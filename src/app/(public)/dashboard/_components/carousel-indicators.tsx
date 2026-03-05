import { z } from "zod";
import { useUrlState } from "@/hooks/use-url-state";

interface CarouselImage {
	src: string;
}

interface CarouselIndicatorsProps {
	carouselImages: CarouselImage[];
}

const CAROUSEL_ACTIVE_INDEX_QUERY_PARAM = "activeIndex";

const carouselIndicatorsUrlStateSchema = z.object({
	activeIndex: z.coerce.number().int().min(0).catch(0),
});

export function CarouselIndicators({
	carouselImages,
}: CarouselIndicatorsProps) {
	const [activeIndex, setActiveIndex] = useUrlState(
		CAROUSEL_ACTIVE_INDEX_QUERY_PARAM,
		carouselIndicatorsUrlStateSchema.shape.activeIndex,
	);

	function handleSetActiveIndex(index: number) {
		setActiveIndex(index);
	}

	return (
		<div className="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
			{carouselImages.map((image, index) => (
				<button
					aria-label={`Ir para imagem ${index + 1}`}
					className={`pointer-events-auto h-2 rounded-full transition-all ${
						index === activeIndex ? "w-5 bg-white" : "w-2 bg-white/60"
					}`}
					key={image.src}
					onClick={() => handleSetActiveIndex(index)}
					type="button"
				/>
			))}
		</div>
	);
}
