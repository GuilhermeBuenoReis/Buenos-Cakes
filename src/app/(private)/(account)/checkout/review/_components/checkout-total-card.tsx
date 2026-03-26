import { ReceiptText, TicketPercent } from "lucide-react";
import { formatPrice } from "@/lib/format-price";
import { CheckoutCard } from "../../_components/checkout-card";

interface CheckoutTotalCardProps {
	discount: number;
	fees: number;
	itemCount: number;
	subtotal: number;
	total: number;
}

export function CheckoutTotalCard({
	discount,
	fees,
	itemCount,
	subtotal,
	total,
}: CheckoutTotalCardProps) {
	return (
		<CheckoutCard className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-200">
			<div className="flex items-start gap-4">
				<div className="flex size-11 items-center justify-center rounded-[1.1rem] border border-[#f0e1e3] bg-[#fff4f5] text-rose-500 shadow-[0_14px_26px_-22px_rgba(212,84,112,0.35)]">
					<ReceiptText className="size-4" />
				</div>
				<div className="space-y-1.5">
					<h2 className="text-lg font-extrabold tracking-tight text-slate-900">
						Resumo financeiro
					</h2>
					<p className="text-sm leading-6 text-slate-600">
						Visualize o total antes da confirmação final do pedido.
					</p>
				</div>
			</div>

			<div className="mt-6 inline-flex rounded-full border border-[#eee0e2] bg-[#fff7f8] px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-rose-500 uppercase">
				{itemCount} item{itemCount > 1 ? "s" : ""} revisado
				{itemCount > 1 ? "s" : ""}
			</div>

			<div className="mt-6 space-y-3.5 text-sm">
				<div className="flex items-center justify-between text-slate-600">
					<span>Subtotal</span>
					<span className="font-semibold text-slate-800">
						{formatPrice(subtotal)}
					</span>
				</div>
				<div className="flex items-center justify-between text-slate-600">
					<span>Taxas</span>
					<span className="font-semibold text-slate-800">
						{fees === 0 ? "Grátis" : formatPrice(fees)}
					</span>
				</div>
				<div className="flex items-center justify-between text-slate-600">
					<span className="inline-flex items-center gap-2">
						<TicketPercent className="size-4 text-rose-400" />
						Desconto
					</span>
					<span className="font-semibold text-slate-800">
						{discount > 0 ? `- ${formatPrice(discount)}` : "Sem desconto"}
					</span>
				</div>
			</div>

			<div className="mt-5 rounded-[1.65rem] bg-[#202632] px-4 py-4 text-white shadow-[0_22px_36px_-30px_rgba(15,23,42,0.45)]">
				<div className="flex items-center justify-between gap-4">
					<div>
						<p className="text-xs font-semibold tracking-[0.16em] text-slate-300 uppercase">
							Total final
						</p>
						<p className="mt-1 text-sm text-slate-200">
							Pronto para seguir para a confirmação.
						</p>
					</div>
					<p className="text-2xl font-extrabold">{formatPrice(total)}</p>
				</div>
			</div>
		</CheckoutCard>
	);
}
