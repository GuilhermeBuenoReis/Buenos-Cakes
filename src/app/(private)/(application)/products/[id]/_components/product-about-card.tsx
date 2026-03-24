"use client";

import { ShieldCheck, Truck } from "lucide-react";
import { useProductDetails } from "../_context/product-details-context";

export function ProductAboutCard() {
	const { product } = useProductDetails();

	return (
		<div className="space-y-3 rounded-[24px] border border-white/70 bg-white/70 p-4 shadow-[0_18px_45px_-38px_rgba(15,23,42,0.35)] sm:p-5">
			<div className="space-y-2">
				<h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-[22px]">
					Sobre este {product.category === "Bolos" ? "bolo" : "produto"}
				</h2>
				<p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]">
					{product.description}
				</p>
			</div>

			<div className="grid gap-3 sm:grid-cols-2">
				<div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
					<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
						<ShieldCheck className="h-3.5 w-3.5" />
					</span>
					<div className="text-[13px] leading-tight">
						<p className="font-semibold text-slate-900">Ingredientes</p>
						<p className="text-slate-500">Selecao premium da casa</p>
					</div>
				</div>

				<div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
					<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
						<Truck className="h-3.5 w-3.5" />
					</span>
					<div className="text-[13px] leading-tight">
						<p className="font-semibold text-slate-900">Preparo em 24h</p>
						<p className="text-slate-500">Retirada ou entrega agendada</p>
					</div>
				</div>
			</div>
		</div>
	);
}
