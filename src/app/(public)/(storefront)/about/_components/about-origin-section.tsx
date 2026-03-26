import { Award } from "lucide-react";

export function AboutOriginSection() {
	return (
		<section className="grid gap-6 rounded-[2rem] bg-[#fffdfa] p-6 shadow-[0_28px_70px_-54px_rgba(15,23,42,0.2)] lg:grid-cols-[minmax(0,1.1fr)_24rem] lg:p-8">
			<div className="space-y-5">
				<div className="space-y-2">
					<span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-rose-500">
						Onde tudo começou
					</span>
					<h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
						Do sonho caseiro a uma boutique de confeitaria.
					</h2>
				</div>

				<div className="max-w-2xl space-y-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
					<p>
						A Buenos&apos;Cakes nasceu da visão de mulheres empreendedoras que
						acreditavam que confeitaria vai muito além da receita: ela aproxima
						pessoas, acolhe memórias e empresta beleza aos momentos mais
						especiais da vida.
					</p>
					<p>
						Os primeiros pedidos saíram de uma cozinha residencial perfumada por
						baunilha, chocolate fresco e testes incansáveis. O que começou em
						pequena escala ganhou forma, refinamento e uma identidade própria,
						sem abrir mão do toque manual e da sensibilidade que nos trouxeram
						até aqui.
					</p>
					<p>
						Hoje seguimos evoluindo como uma confeitaria boutique: com padrão
						profissional, escuta atenta e criações que equilibram sabor,
						presença visual e afeto em cada detalhe.
					</p>
				</div>
			</div>

			<div className="flex h-full flex-col justify-between rounded-[1.75rem] bg-[linear-gradient(180deg,#ffffff,#fff4f6)] p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.3)]">
				<div className="flex size-18 items-center justify-center rounded-[1.6rem] bg-[#23161b] text-[#f7d3a1] shadow-[0_22px_44px_-30px_rgba(35,22,27,0.55)]">
					<Award className="size-8" />
				</div>

				<div className="mt-8 space-y-4">
					<p className="text-sm font-bold tracking-[0.16em] text-rose-500 uppercase">
						Nosso compromisso
					</p>
					<p className="text-xl font-black leading-8 tracking-tight text-slate-950">
						Criar doces que pareçam especiais antes mesmo da primeira colherada.
					</p>
					<p className="text-sm leading-7 text-slate-600">
						Sabor memorável, acabamento elegante e calor de cozinha de verdade
						seguem sendo a base de tudo que fazemos.
					</p>
				</div>
			</div>
		</section>
	);
}
