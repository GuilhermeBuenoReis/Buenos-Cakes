import { Diamond } from "lucide-react";
import Link from "next/link";

const footerLinks = [
	{ href: "#", label: "Privacidade" },
	{ href: "#", label: "Termos de Uso" },
	{ href: "#", label: "Ajuda" },
	{ href: "#", label: "Instagram" },
];

export function Footer() {
	return (
		<footer className="px-4 py-8 sm:py-9">
			<div className="mx-auto max-w-3xl space-y-5 text-center">
				<Link
					href="/"
					className="inline-flex items-center gap-1.5 text-xl font-bold tracking-tight"
				>
					<Diamond className="h-4 w-4 fill-rose-500 text-rose-500" />
					<span className="text-rose-500">DoceGestão</span>
				</Link>

				<p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
					Transformando ingredientes em memórias inesquecíveis através da
					confeitaria artesanal de boutique.
				</p>

				<nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600 sm:text-base">
					{footerLinks.map((link) => (
						<Link
							key={link.label}
							className="transition hover:text-rose-500"
							href={link.href}
						>
							{link.label}
						</Link>
					))}
				</nav>

				<p className="text-xs font-semibold text-slate-400 sm:text-sm">
					© 2024 DoceGestão. Todos os direitos reservados.
				</p>
			</div>
		</footer>
	);
}
