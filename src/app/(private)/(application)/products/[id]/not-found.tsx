import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

export default function ProductNotFound() {
	return (
		<section className="rounded-3xl border border-rose-100/80 bg-linear-to-br from-rose-50 via-white to-amber-50 p-8 text-center shadow-[0_18px_40px_-28px_rgba(190,24,93,0.35)]">
			<div className="mx-auto flex max-w-md flex-col items-center gap-4">
				<div className="rounded-full bg-white p-4 text-rose-500 shadow-sm">
					<SearchX className="h-8 w-8" />
				</div>
				<div className="space-y-2">
					<h1 className="text-2xl font-semibold text-slate-900">
						Produto nao encontrado
					</h1>
					<p className="text-sm text-slate-500 sm:text-base">
						O item que voce tentou acessar nao existe mais ou nao esta
						disponivel na vitrine atual.
					</p>
				</div>
				<Link
					href="/products"
					className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
				>
					<ArrowLeft className="h-4 w-4" />
					Voltar para o catalogo
				</Link>
			</div>
		</section>
	);
}
