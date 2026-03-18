import { cn } from "@/lib/utils";

interface CheckoutStepProps {
	isActive: boolean;
	label: string;
	number: string;
}

export function CheckoutStep({ isActive, label, number }: CheckoutStepProps) {
	return (
		<li
			className={cn(
				"flex items-center gap-3 rounded-[1.45rem] border px-4 py-4 text-sm transition-all",
				isActive
					? "border-rose-200 bg-[#fff8f8] text-slate-900 shadow-[0_18px_36px_-32px_rgba(216,98,126,0.32)]"
					: "border-[#ece4e4] bg-[#fffdfc] text-slate-500",
			)}
		>
			<span
				className={cn(
					"flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
					isActive
						? "bg-rose-500 text-white shadow-[0_14px_28px_-18px_rgba(216,98,126,0.7)]"
						: "bg-[#f4efee] text-slate-500",
				)}
			>
				{number}
			</span>
			<div className="space-y-0.5">
				<p
					className={cn(
						"text-[11px] font-semibold tracking-[0.16em] uppercase",
						isActive ? "text-rose-500" : "text-slate-400",
					)}
				>
					Etapa {number}
				</p>
				<p className="font-semibold text-slate-800">{label}</p>
			</div>
		</li>
	);
}
