"use client";

import Image from "next/image";
import { useProductDetails } from "../_context/product-details-context";

export function ProductGallery() {
	const { product, thumbnailProducts } = useProductDetails();

	return (
		<div className="space-y-3">
			<div className="relative aspect-[1/1.02] overflow-hidden rounded-[24px] border border-rose-100/70 bg-white shadow-[0_24px_45px_-32px_rgba(15,23,42,0.35)]">
				<Image
					alt={product.name}
					className="object-cover"
					fill
					priority
					sizes="(max-width: 1024px) 100vw, 50vw"
					src={product.image}
				/>
			</div>

			<div className="grid grid-cols-4 gap-2">
				{thumbnailProducts.slice(0, 4).map((item) => (
					<div
						key={item.id}
						className="relative aspect-square overflow-hidden rounded-[20px] border border-rose-100/70 bg-white shadow-[0_18px_35px_-32px_rgba(15,23,42,0.35)]"
					>
						<Image
							alt={item.name}
							className="object-cover"
							fill
							sizes="(max-width: 1024px) 25vw, 12vw"
							src={item.image}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
