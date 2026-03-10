import { Heart, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "../_context/products-catalog-context";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<article className="overflow-hidden rounded-xl border border-rose-100/80 bg-white shadow-[0_14px_28px_-24px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_32px_-24px_rgba(190,24,93,0.32)]">
			<div className="relative h-34 bg-slate-100 sm:h-36">
				<Image
					alt={product.name}
					className="h-full w-full object-cover"
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
					src={product.image}
				/>
				<div className="absolute inset-x-0 bottom-0 h-18 bg-linear-to-t from-black/45 to-transparent" />
				<span className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-bold tracking-[0.08em] text-white uppercase">
					{product.category}
				</span>
				<button
					type="button"
					aria-label={`Favoritar ${product.name}`}
					className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm"
				>
					<Heart className="h-3.5 w-3.5 fill-rose-500" />
				</button>
			</div>

			<div className="space-y-1 p-2.5">
				<h3 className="truncate text-[13px] font-semibold text-slate-900">
					{product.name}
				</h3>
				<div className="flex items-center gap-1 text-[11px] text-slate-400">
					<span className="text-amber-400">★★★★★</span>
					<span>({product.reviews})</span>
				</div>

				<div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
					<strong className="text-base font-bold text-slate-900 sm:text-lg">
						{formatPrice(product.price)}
					</strong>
					<Button
						size="icon-xs"
						className="h-7 w-7 rounded-full bg-rose-500 text-white shadow-none hover:bg-rose-600"
					>
						<ShoppingBasket className="h-3.5 w-3.5" />
					</Button>
				</div>
			</div>
		</article>
	);
}
