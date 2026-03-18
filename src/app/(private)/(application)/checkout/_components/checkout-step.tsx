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
				"relative overflow-hidden rounded-[1.6rem] border px-4 py-3.5 text-sm font-semibold transition-all",
				isActive
					? "border-rose-200 bg-white text-rose-500 shadow-[0_24px_48px_-36px_rgba(244,63,94,0.7)]"
					: "border-white/70 bg-white/70 text-slate-400",
			)}
		>
			{isActive ? (
				<div className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-[linear-gradient(90deg,#ff4b61_0%,#ff8f6b_100%)]" />
			) : null}
			<span
				className={cn(
					"flex size-7 items-center justify-center rounded-full text-xs font-extrabold",
					isActive ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-400",
				)}
			>
				{number}
			</span>
			<span>{label}</span>
		</li>
	);
}
