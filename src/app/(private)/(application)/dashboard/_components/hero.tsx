import { HeroActions } from "./hero-actions";
import { SweetsCarousel } from "./sweets-carousel";

export function Hero() {
	return (
		<section className="rounded-2xl bg-[#f4f4f6] p-5 sm:p-6 lg:px-8 lg:py-10">
			<div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
				<div className="space-y-6">
					<span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-rose-500">
						Novidades de primavera
					</span>

					<h1 className="max-w-xl text-3xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
						A doçura que sua <span className="text-rose-500">vida</span> merece.
					</h1>

					<p className="max-w-xl text-base leading-relaxed text-slate-600">
						Explore nossa seleção exclusiva de doces artesanais, bolos
						personalizados e kits para presente feitos com ingredientes
						selecionados.
					</p>

					<HeroActions />
				</div>

				<SweetsCarousel />
			</div>
		</section>
	);
}
