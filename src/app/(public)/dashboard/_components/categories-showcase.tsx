import Image from "next/image";

const categoryCards = [
	{
		title: "Bolos Artísticos",
		subtitle: "A partir de R$ 89,90",
		image:
			"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
	},
	{
		title: "Doces Gourmet",
		subtitle: "A partir de R$ 4,50/un",
		image:
			"https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=1200&q=80",
	},
	{
		title: "Presentes",
		subtitle: "Kits Personalizados",
		image:
			"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
	},
	{
		title: "Linha Diet",
		subtitle: "Zero Açúcar",
		image:
			"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1200&q=80",
	},
];

export function CategoriesShowcase() {
	return (
		<section className="space-y-6 rounded-2xl bg-[#f4f4f6] px-4 py-6 sm:px-6 sm:py-7">
			<div className="space-y-2 text-center">
				<h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
					Navegue por Categorias
				</h2>
				<div className="mx-auto h-1 w-16 rounded-full bg-rose-500" />
			</div>

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{categoryCards.map((card) => (
					<article
						className="group relative h-44 overflow-hidden rounded-[24px] bg-slate-100 sm:h-48"
						key={card.title}
					>
						<Image
							alt={card.title}
							className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
							src={card.image}
						/>
						<div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent" />

						<div className="absolute inset-x-0 bottom-0 space-y-0.5 p-4 text-white">
							<h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
								{card.title}
							</h3>
							<p className="text-sm text-white/80 sm:text-base">
								{card.subtitle}
							</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
