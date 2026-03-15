import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroActions() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button
				asChild
				className="cursor-pointer rounded-full shadow-lg shadow-rose-500/20"
				size="lg"
			>
				<Link href="/application/products">
					Comprar Agora
					<ArrowRight className="h-4 w-4" />
				</Link>
			</Button>

			<Button
				asChild
				className="cursor-pointer rounded-full bg-white"
				size="lg"
				variant="outline"
			>
				<Link href="/application/products">Ver Catálogo</Link>
			</Button>
		</div>
	);
}
