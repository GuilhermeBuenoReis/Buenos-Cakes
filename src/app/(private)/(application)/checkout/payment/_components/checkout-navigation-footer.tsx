import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CheckoutNavigationFooterProps {
	actionHref?: string;
	actionLabel?: string;
	backHref?: string;
	backLabel?: string;
}

export function CheckoutNavigationFooter({
	actionHref = "/checkout/review",
	actionLabel = "Continuar para revisão",
	backHref = "/checkout",
	backLabel = "Voltar para os dados",
}: CheckoutNavigationFooterProps) {
	return (
		<div className="flex flex-col gap-4 rounded-[1.75rem] border border-[#ebe3e3] bg-[#fffdfa] p-4 shadow-[0_20px_48px_-38px_rgba(15,23,42,0.16)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
			<Link
				className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-rose-500"
				href={backHref}
			>
				<ArrowLeft className="size-4" />
				{backLabel}
			</Link>

			<div className="space-y-2">
				<Button
					asChild
					className="h-11 rounded-full bg-[#d45470] px-6 text-white shadow-[0_18px_36px_-24px_rgba(212,84,112,0.45)] hover:bg-[#c74a65]"
				>
					<Link href={actionHref}>
						{actionLabel}
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</div>
		</div>
	);
}
