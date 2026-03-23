"use client";

import type { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import type { PaymentMethod } from "./payment-methods";

interface PaymentDetailsCardProps {
	cashChange: string;
	handleCashChange: (value: string) => void;
	selectedPaymentMethod: PaymentMethod;
}

export function PaymentDetailsCard({
	cashChange,
	handleCashChange,
	selectedPaymentMethod,
}: PaymentDetailsCardProps) {
	function handleCashChangeInput(event: ChangeEvent<HTMLInputElement>) {
		handleCashChange(event.target.value);
	}

	if (selectedPaymentMethod.id === "cash") {
		return (
			<div className="rounded-[1.5rem] border border-[#ece4e4] bg-[#fffdfb] p-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.14)]">
				<label
					className="text-sm font-semibold text-slate-700"
					htmlFor="cash-change"
				>
					Precisa de troco?
				</label>
				<Input
					className="mt-3 h-12 rounded-[1.15rem] border-[#e8e1e1] bg-[#fffdfb] px-4 text-slate-700 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.18)] focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100/80"
					id="cash-change"
					inputMode="decimal"
					placeholder="Ex.: 100,00"
					value={cashChange}
					onChange={handleCashChangeInput}
				/>
				<p className="mt-3 text-xs leading-5 text-slate-500">
					Esse campo é útil para incluir o troco direto no resumo final.
				</p>
			</div>
		);
	}

	return (
		<div className="rounded-[1.5rem] border border-[#ece4e4] bg-[#fffdfb] p-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.14)]">
			<p className="text-sm font-semibold text-slate-600">
				Detalhes do pagamento
			</p>
			<p className="mt-2 text-base font-extrabold leading-7 text-slate-950">
				{selectedPaymentMethod.summaryLabel}
			</p>
			<p className="mt-2 text-xs leading-5 text-slate-500">
				Você ainda poderá revisar os dados do pedido antes da confirmação final.
			</p>
		</div>
	);
}
