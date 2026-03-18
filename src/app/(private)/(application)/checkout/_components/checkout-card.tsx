import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CheckoutCard({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<section
			className={cn(
				"rounded-[2rem] border border-[#ece3e3] bg-[#fffdfa] p-5 shadow-[0_26px_60px_-48px_rgba(15,23,42,0.22)] sm:p-6",
				className,
			)}
		>
			{children}
		</section>
	);
}
