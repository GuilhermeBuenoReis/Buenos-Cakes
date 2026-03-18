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
				"rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-[0_36px_90px_-58px_rgba(15,23,42,0.5)] backdrop-blur-sm sm:p-6",
				className,
			)}
		>
			{children}
		</section>
	);
}
