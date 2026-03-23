import Link from "next/link";
import { CheckoutCard } from "../../_components/checkout-card";
import type { PaymentMethod } from "../../payment/_components/payment-methods";

interface CheckoutPaymentSummaryProps {
	cashChange?: string;
	paymentMethod: PaymentMethod;
}

export function CheckoutPaymentSummary({
	cashChange,
	paymentMethod,
}: CheckoutPaymentSummaryProps) {
	const PaymentIcon = paymentMethod.icon;
	const paymentDetail =
		paymentMethod.id === "cash" && cashChange
			? `Troco solicitado para ${cashChange}.`
			: paymentMethod.detail;

	return (
		<CheckoutCard className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-100">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="flex items-start gap-4">
					<div className="flex size-11 items-center justify-center rounded-[1.1rem] border border-[#f0e1e3] bg-[#fff4f5] text-rose-500 shadow-[0_14px_26px_-22px_rgba(212,84,112,0.35)]">
						<PaymentIcon className="size-4" />
					</div>
					<div className="space-y-1.5">
						<h2 className="text-lg font-extrabold tracking-tight text-slate-900">
							Forma de pagamento
						</h2>
						<p className="max-w-xl text-sm leading-6 text-slate-600">
							A revisão final mostra a opção escolhida e o contexto do
							pagamento.
						</p>
					</div>
				</div>

				<Link
					className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-rose-500"
					href="/checkout/payment"
				>
					Editar
				</Link>
			</div>

			<div className="mt-6 rounded-[1.6rem] border border-[#ece4e4] bg-[#fffdfb] p-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.14)]">
				<div className="flex items-center justify-between gap-4">
					<div>
						<p className="text-[11px] font-bold tracking-[0.16em] text-rose-500 uppercase">
							Selecionado
						</p>
						<p className="mt-2 text-base font-extrabold leading-7 text-slate-950">
							{paymentMethod.label}
						</p>
					</div>
					<span className="inline-flex rounded-full border border-[#eee0e2] bg-[#fff7f8] px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-rose-500 uppercase">
						{paymentMethod.badge}
					</span>
				</div>

				<p className="mt-3 text-sm leading-6 text-slate-600">
					{paymentMethod.summaryLabel}
				</p>
				<p className="mt-2 text-sm leading-6 text-slate-500">{paymentDetail}</p>
			</div>
		</CheckoutCard>
	);
}
