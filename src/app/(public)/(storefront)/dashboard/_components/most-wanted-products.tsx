import Image from "next/image";
import Link from "next/link";

const featuredProducts = [
	{
		name: "Bolo Red Velvet Premium",
		price: "R$ 124,90",
		ratingCount: 48,
		image:
			"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=80",
		isBestSeller: true,
	},
	{
		name: "Caixa Macarons (12 un)",
		price: "R$ 68,00",
		ratingCount: 32,
		image:
			"https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=1200&q=80",
		isBestSeller: false,
	},
	{
		name: "Cupcake Trufado Belga",
		price: "R$ 15,90",
		ratingCount: 105,
		image:
			"https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80",
		isBestSeller: false,
	},
	{
		name: "Kit Brownie Artesanal (6 un)",
		price: "R$ 42,00",
		ratingCount: 56,
		image:
			"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80",
		isBestSeller: false,
	},
];

export function MostWantedProducts() {
	return (
		<section className="space-y-4 rounded-2xl bg-[#f4f4f6] px-4 py-5 sm:px-6 sm:py-6">
			<div className="flex items-end justify-between gap-4">
				<div className="space-y-1">
					<h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
						Os Mais Desejados
					</h2>
					<p className="text-xs text-slate-500 sm:text-sm">
						Nossos produtos recordistas de pedidos.
					</p>
				</div>

				<Link
					className="text-xs font-semibold text-rose-500 transition hover:text-rose-600 sm:text-sm"
					href="#"
				>
					Ver todos
				</Link>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{featuredProducts.map((product) => (
					<article className="space-y-2" key={product.name}>
						<div className="relative h-40 overflow-hidden rounded-[20px] bg-slate-100 sm:h-44">
							<Image
								alt={product.name}
								className="h-full w-full object-cover"
								fill
								sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
								src={product.image}
							/>

							{product.isBestSeller ? (
								<span className="absolute left-2.5 top-2.5 rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-bold tracking-[0.08em] text-white uppercase">
									Best Seller
								</span>
							) : null}
						</div>

						<div className="space-y-1">
							<div className="flex items-center gap-1.5 text-[11px] text-slate-400">
								<span className="tracking-[0.12em] text-amber-400">★★★★★</span>
								<span>({product.ratingCount})</span>
							</div>

							<h3 className="text-sm font-semibold tracking-tight text-slate-900 sm:text-sm">
								{product.name}
							</h3>
							<p className="text-sm font-semibold tracking-tight text-rose-500 sm:text-lg">
								{product.price}
							</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
