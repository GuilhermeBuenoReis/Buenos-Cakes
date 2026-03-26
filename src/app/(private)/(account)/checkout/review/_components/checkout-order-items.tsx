import { PackageCheck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { CartSheetArtwork } from "@/components/application/cart-sheet-artwork";
import { Button } from "@/components/ui/button";
import type { CartSheetItemData } from "@/contexts/cart-sheet-context";
import { formatPrice } from "@/lib/format-price";
import { CheckoutCard } from "../../_components/checkout-card";

interface CheckoutOrderItemsProps {
	items: CartSheetItemData[];
}

export function CheckoutOrderItems({ items }: CheckoutOrderItemsProps) {
	const itemCount = items.reduce((total, item) => total + item.quantity, 0);

	return (
		<CheckoutCard className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="flex items-start gap-4">
					<div className="flex size-11 items-center justify-center rounded-[1.1rem] border border-[#f0e1e3] bg-[#fff4f5] text-rose-500 shadow-[0_14px_26px_-22px_rgba(212,84,112,0.35)]">
						<PackageCheck className="size-4" />
					</div>
					<div className="space-y-1.5">
						<h2 className="text-lg font-extrabold tracking-tight text-slate-900">
							Itens do pedido
						</h2>
						<p className="max-w-2xl text-sm leading-6 text-slate-600">
							Revise os produtos escolhidos antes da confirmação final.
						</p>
					</div>
				</div>

				<span className="inline-flex h-fit rounded-full border border-[#eee0e2] bg-[#fff7f8] px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-rose-500 uppercase">
					{itemCount} unidade{itemCount > 1 ? "s" : ""}
				</span>
			</div>

			{items.length === 0 ? (
				<div className="mt-6 rounded-[1.7rem] border border-dashed border-[#ddd3d3] bg-[#fcfaf8] p-5 text-sm leading-6 text-slate-500">
					<div className="flex items-center gap-3 text-slate-800">
						<div className="flex size-10 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm">
							<ShoppingBag className="size-4" />
						</div>
						<p className="font-semibold">Seu carrinho ainda está vazio.</p>
					</div>
					<p className="mt-3">
						Adicione produtos ao carrinho para revisar o pedido nesta etapa.
					</p>
					<Button
						asChild
						className="mt-4 rounded-full bg-[#d45470] px-5 text-white shadow-[0_18px_36px_-24px_rgba(212,84,112,0.45)] hover:bg-[#c74a65]"
					>
						<Link href="/products">Ir para produtos</Link>
					</Button>
				</div>
			) : (
				<div className="mt-6 space-y-3.5">
					{items.map((item) => (
						<article
							className="group rounded-[1.55rem] border border-[#ece4e4] bg-[#fffaf9] p-4 shadow-[0_18px_34px_-30px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-[0_24px_42px_-34px_rgba(212,84,112,0.28)]"
							key={item.id}
						>
							<div className="flex items-start gap-4">
								<CartSheetArtwork
									alt={`Imagem de ${item.name} na revisão do pedido`}
									className="size-20 rounded-[1.25rem]"
									src={item.image}
								/>

								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-start justify-between gap-3">
										<div className="min-w-0 space-y-1.5">
											<h3 className="truncate text-base font-extrabold tracking-tight text-slate-900">
												{item.name}
											</h3>
											<p className="text-sm font-semibold text-rose-400">
												{item.highlight}
											</p>
										</div>
										<strong className="text-base font-extrabold text-slate-900">
											{formatPrice(item.quantity * item.unitPrice)}
										</strong>
									</div>

									<div className="mt-4 flex flex-wrap gap-2">
										<span className="rounded-full border border-[#ecdfe1] bg-white px-3 py-1 text-xs font-semibold text-slate-600">
											Qtd. {item.quantity}
										</span>
										<span className="rounded-full border border-[#ecdfe1] bg-white px-3 py-1 text-xs font-semibold text-slate-600">
											Unitário {formatPrice(item.unitPrice)}
										</span>
									</div>
								</div>
							</div>

							<div className="mt-4 flex flex-col gap-3 border-t border-[#efe5e5] pt-4 sm:flex-row sm:items-center sm:justify-between">
								<p className="text-xs leading-5 text-slate-500">
									Se precisar, volte ao catálogo para ajustar o carrinho.
								</p>
								<Button
									asChild
									className="rounded-full border-[#e7dfe0] bg-white px-4 text-slate-700 hover:border-rose-200 hover:text-rose-500"
									size="sm"
									variant="outline"
								>
									<Link href="/products?cart=true">Editar item</Link>
								</Button>
							</div>
						</article>
					))}
				</div>
			)}
		</CheckoutCard>
	);
}
