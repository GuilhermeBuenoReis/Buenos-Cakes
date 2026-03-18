"use client";

import { MapPin, ReceiptText } from "lucide-react";
import { CartSheetArtwork } from "@/components/application/cart-sheet-artwork";
import { Button } from "@/components/ui/button";
import { useCartSheet } from "@/contexts/cart-sheet-context";
import { formatPrice } from "@/lib/format-price";
import { useCheckoutPickup } from "../_context/checkout-pickup-context";
import { formatPickupSummaryDate } from "../_lib/checkout-pickup";
import { CheckoutCard } from "./checkout-card";

export function CheckoutOrderSummary() {
	const { hasItems, items, shipping, subtotal, total } = useCartSheet();
	const { pickupDate, pickupTime } = useCheckoutPickup();

	return (
		<aside className="xl:sticky xl:top-6 xl:self-start">
			<CheckoutCard className="border-rose-100/80 bg-[linear-gradient(180deg,#fffefe_0%,#fff7f8_100%)] shadow-[0_40px_90px_-56px_rgba(244,63,94,0.38)]">
				<div className="flex items-center gap-2 text-slate-900">
					<div className="flex size-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
						<ReceiptText className="size-4" />
					</div>
					<div>
						<h2 className="text-lg font-extrabold">Resumo do Pedido</h2>
						<p className="text-sm text-slate-500">
							Confira os itens antes de concluir.
						</p>
					</div>
				</div>

				{hasItems ? (
					<div className="mt-5 space-y-4">
						{items.map((item) => (
							<article
								className="flex items-center gap-3 rounded-[1.4rem] border border-white/80 bg-white/92 p-3 shadow-[0_20px_34px_-28px_rgba(15,23,42,0.3)]"
								key={item.id}
							>
								<CartSheetArtwork
									alt={`Imagem de ${item.name} no checkout`}
									className="size-16 rounded-[1.15rem]"
									src={item.image}
								/>

								<div className="min-w-0 flex-1">
									<h3 className="truncate text-sm font-extrabold text-slate-900">
										{item.name}
									</h3>
									<p className="text-xs font-semibold text-slate-400">
										Qtd. {item.quantity}
									</p>
									<p className="truncate text-xs font-semibold text-rose-400">
										{item.highlight}
									</p>
								</div>

								<strong className="text-sm font-extrabold text-rose-500">
									{formatPrice(item.quantity * item.unitPrice)}
								</strong>
							</article>
						))}
					</div>
				) : (
					<div className="mt-5 rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-500">
						<p className="font-semibold text-slate-700">
							Seu carrinho ainda está vazio.
						</p>
						<p className="mt-1">
							Adicione produtos ao carrinho para visualizar o resumo do pedido
							aqui.
						</p>
					</div>
				)}

				<div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
					<div className="flex items-center justify-between text-slate-500">
						<span>Subtotal</span>
						<span>{formatPrice(subtotal)}</span>
					</div>
					<div className="flex items-center justify-between text-slate-500">
						<span>Taxa de Retirada</span>
						<span className="font-bold text-emerald-500">
							{shipping === 0 ? "Grátis" : formatPrice(shipping)}
						</span>
					</div>
					<div className="mt-3 flex items-center justify-between rounded-[1.4rem] bg-slate-950 px-4 py-3.5 text-xl font-extrabold text-white shadow-[0_22px_38px_-28px_rgba(15,23,42,0.8)]">
						<span>Total</span>
						<span>{formatPrice(total)}</span>
					</div>
				</div>

				<div className="mt-5 rounded-[1.75rem] border border-rose-100/90 bg-[linear-gradient(135deg,#fff2f5_0%,#fff7fa_100%)] p-4 shadow-[0_24px_42px_-34px_rgba(244,63,94,0.35)]">
					<div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-rose-500 uppercase">
						<MapPin className="size-3.5" />
						Agendamento
					</div>
					<p
						className="mt-3 text-sm font-semibold text-slate-900"
						data-testid="pickup-date-summary"
					>
						{formatPickupSummaryDate(pickupDate)}
					</p>
					<p
						className="mt-1 text-sm font-semibold text-rose-500"
						data-testid="pickup-schedule-summary"
					>
						Às {pickupTime}
					</p>
				</div>

				<Button
					className="mt-5 h-11 w-full rounded-full bg-[linear-gradient(135deg,#ff4b61_0%,#ff7e6d_100%)] text-white shadow-[0_22px_34px_-20px_rgba(244,63,94,0.65)] hover:brightness-[0.98]"
					disabled={!hasItems}
					type="button"
				>
					Finalizar Pedido
				</Button>

				<p className="mt-3 text-center text-[11px] leading-4 text-slate-400">
					Ao finalizar, você concorda com nossos Termos de Serviço e Política de
					Cancelamento.
				</p>
			</CheckoutCard>
		</aside>
	);
}
