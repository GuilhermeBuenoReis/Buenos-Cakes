import { Clock3, HeartHandshake, Sparkles, Users } from "lucide-react";

const aboutPillars = [
	{
		description:
			"Receitas refinadas, acabamento delicado e combinações que equilibram textura, aroma e memória afetiva.",
		icon: Sparkles,
		title: "Confeitaria com assinatura",
	},
	{
		description:
			"Cada pedido nasce de uma conversa cuidadosa para entender ocasião, estilo e o momento que você quer celebrar.",
		icon: HeartHandshake,
		title: "Atendimento verdadeiramente próximo",
	},
	{
		description:
			"Produção organizada para entregarmos frescor, consistência e pontualidade em cada detalhe da experiência.",
		icon: Clock3,
		title: "Processo artesanal com rigor profissional",
	},
] as const;

const aboutStats = [
	{ label: "anos adoçando histórias", value: "8+" },
	{ label: "receitas autorais em rotação", value: "40" },
	{ label: "eventos celebrados com clientes", value: "1.2k" },
] as const;

const aboutHighlights = [
	"Ingredientes selecionados com prioridade para frescor e sabor limpo.",
	"Design de doces e bolos pensado para combinar com a estética da sua celebração.",
	"Produção boutique em pequenos lotes, sem perder o calor do feito à mão.",
] as const;

export function AboutValuesSection() {
	return (
		<section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
			<div className="rounded-[2rem] bg-[#f4f4f6] p-6 sm:p-8">
				<div className="space-y-2">
					<span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-slate-500 shadow-sm">
						Nosso jeito de fazer
					</span>
					<h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
						Três pilares que guiam cada criação.
					</h2>
				</div>

				<div className="mt-6 grid gap-4">
					{aboutPillars.map(function renderAboutPillar(pillar) {
						const Icon = pillar.icon;

						return (
							<article
								className="rounded-[1.6rem] border border-white/70 bg-white/85 p-5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.25)]"
								key={pillar.title}
							>
								<div className="flex items-start gap-4">
									<div className="flex size-11 shrink-0 items-center justify-center rounded-[1rem] bg-rose-50 text-rose-500">
										<Icon className="size-5" />
									</div>
									<div className="space-y-2">
										<h3 className="text-lg font-black tracking-tight text-slate-900">
											{pillar.title}
										</h3>
										<p className="text-sm leading-7 text-slate-600">
											{pillar.description}
										</p>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>

			<div className="space-y-6">
				<section className="rounded-[2rem] bg-[#fffdfa] p-6 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.24)]">
					<div className="flex items-center gap-3">
						<div className="flex size-11 items-center justify-center rounded-[1rem] bg-[#23161b] text-white">
							<Users className="size-5" />
						</div>
						<div>
							<h2 className="text-xl font-black tracking-tight text-slate-950">
								Em números
							</h2>
							<p className="text-sm text-slate-500">
								Marcos que contam nossa trajetória.
							</p>
						</div>
					</div>

					<div className="mt-6 grid gap-4">
						{aboutStats.map(function renderAboutStat(stat) {
							return (
								<div
									className="rounded-[1.4rem] border border-[#efe6e7] bg-[#fff8f8] px-4 py-4"
									key={stat.label}
								>
									<p className="text-3xl font-black tracking-tight text-slate-950">
										{stat.value}
									</p>
									<p className="mt-1 text-sm leading-6 text-slate-600">
										{stat.label}
									</p>
								</div>
							);
						})}
					</div>
				</section>

				<section className="rounded-[2rem] bg-[#23161b] p-6 text-white shadow-[0_24px_60px_-40px_rgba(35,22,27,0.5)]">
					<p className="text-sm font-bold tracking-[0.16em] text-[#f7d3a1] uppercase">
						Por que escolhem nossa cozinha
					</p>

					<div className="mt-5 space-y-4">
						{aboutHighlights.map(function renderAboutHighlight(highlight) {
							return (
								<div className="flex gap-3" key={highlight}>
									<div className="mt-1 size-2 rounded-full bg-rose-400" />
									<p className="text-sm leading-7 text-white/82">{highlight}</p>
								</div>
							);
						})}
					</div>
				</section>
			</div>
		</section>
	);
}
