import { cn } from "@/lib/utils";

interface CheckoutStepProps {
	isActive: boolean;
	label: string;
	number: string;
	status?: "active" | "completed" | "upcoming";
}

export function CheckoutStep({
	isActive,
	label,
	number,
	status = isActive ? "active" : "upcoming",
}: CheckoutStepProps) {
	return (
		<li
			className={cn(
				"flex items-center gap-3 rounded-[1.45rem] border px-4 py-4 text-sm transition-all",
				status === "active"
					? "border-rose-200 bg-[#fff8f8] text-slate-900 shadow-[0_18px_36px_-32px_rgba(216,98,126,0.32)]"
					: status === "completed"
						? "border-[#f2d9de] bg-white text-slate-800 shadow-[0_14px_32px_-30px_rgba(216,98,126,0.24)]"
						: "border-[#ece4e4] bg-[#fffdfc] text-slate-500",
			)}
		>
			<span
				className={cn(
					"flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
					status === "active"
						? "bg-rose-500 text-white shadow-[0_14px_28px_-18px_rgba(216,98,126,0.7)]"
						: status === "completed"
							? "border border-rose-200 bg-[#fff7f8] text-rose-500"
							: "bg-[#f4efee] text-slate-500",
				)}
			>
				{number}
			</span>
			<div className="space-y-0.5">
				<p
					className={cn(
						"text-[11px] font-semibold tracking-[0.16em] uppercase",
						status === "active"
							? "text-rose-500"
							: status === "completed"
								? "text-rose-400"
								: "text-slate-400",
					)}
				>
					Etapa {number}
				</p>
				<p className="font-semibold text-slate-800">{label}</p>
			</div>
		</li>
	);
}
