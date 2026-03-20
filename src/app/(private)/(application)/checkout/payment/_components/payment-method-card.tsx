"use client";

import { cn } from "@/lib/utils";
import type { PaymentMethod, PaymentMethodId } from "./payment-methods";

interface PaymentMethodCardProps {
	isSelected: boolean;
	method: PaymentMethod;
	onSelect: (methodId: PaymentMethodId) => void;
}

export function PaymentMethodCard({
	isSelected,
	method,
	onSelect,
}: PaymentMethodCardProps) {
	const Icon = method.icon;

	return (
		<label
			className={cn(
				"cursor-pointer rounded-[1.6rem] border p-4 transition-all",
				isSelected
					? "border-rose-300 bg-[#fff3f5] shadow-[0_20px_40px_-34px_rgba(212,84,112,0.4)]"
					: "border-[#ece4e4] bg-[#fffdfc] hover:border-rose-200 hover:bg-[#fff8f8]",
			)}
		>
			<input
				checked={isSelected}
				className="sr-only"
				name="payment-method"
				type="radio"
				value={method.id}
				onChange={() => onSelect(method.id)}
			/>

			<div className="flex items-start justify-between gap-3">
				<div
					className={cn(
						"flex size-11 items-center justify-center rounded-[1rem] border",
						isSelected
							? "border-rose-200 bg-white text-rose-500"
							: "border-[#eee4e4] bg-[#fff7f7] text-slate-600",
					)}
				>
					<Icon className="size-4" />
				</div>

				<span
					className={cn(
						"inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase",
						isSelected
							? "bg-white text-rose-500"
							: "bg-[#f5eeee] text-slate-500",
					)}
				>
					{method.badge}
				</span>
			</div>

			<div className="mt-4 space-y-2">
				<h3 className="text-base font-extrabold text-slate-900">
					{method.label}
				</h3>
				<p className="text-sm leading-6 text-slate-600">{method.description}</p>
			</div>
		</label>
	);
}
