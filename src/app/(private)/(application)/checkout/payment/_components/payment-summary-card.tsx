import type { PaymentMethod } from "./payment-methods";

interface PaymentSummaryCardProps {
	selectedPaymentMethod: PaymentMethod;
}

export function PaymentSummaryCard({
	selectedPaymentMethod,
}: PaymentSummaryCardProps) {
	return (
		<div className="rounded-[1.5rem] border border-[#ece4e4] bg-[#fffdfb] p-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.14)]">
			<p className="text-sm font-semibold text-slate-600">Forma selecionada</p>
			<p className="mt-2 text-base font-extrabold leading-7 text-slate-950">
				{selectedPaymentMethod.label}
			</p>
			<p className="mt-2 text-sm leading-6 text-slate-600">
				{selectedPaymentMethod.detail}
			</p>
		</div>
	);
}
