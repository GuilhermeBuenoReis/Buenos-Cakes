import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutCtaSection() {
	return (
		<section className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#fff7f8,#f4f4f6)] p-6 sm:p-8 lg:p-10">
			<div className="pointer-events-none absolute -right-16 top-0 size-44 rounded-full bg-rose-200/40 blur-3xl" />
			<div className="pointer-events-none absolute bottom-0 left-0 size-40 rounded-full bg-[#f7d3a1]/40 blur-3xl" />

			<div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
				<div className="max-w-2xl space-y-3">
					<span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-rose-500 shadow-sm">
						Vamos celebrar juntos
					</span>
					<h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
						Se a ocasião merece carinho, ela também merece um doce com presença.
					</h2>
					<p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
						Explore nosso catálogo, descubra sabores autorais e encontre a
						criação ideal para o seu próximo momento especial.
					</p>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<Button
						asChild
						className="h-11 rounded-full bg-[#d45470] px-6 text-white shadow-[0_18px_36px_-24px_rgba(212,84,112,0.45)] hover:bg-[#c74a65]"
					>
						<Link href="/products">
							Ver Produtos
							<ArrowRight className="size-4" />
						</Link>
					</Button>

					<Button
						asChild
						className="h-11 rounded-full border-[#eadbde] bg-white px-6 text-slate-700 hover:border-rose-200 hover:bg-white hover:text-rose-500"
						variant="outline"
					>
						<Link href="/checkout">Começar um pedido</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
