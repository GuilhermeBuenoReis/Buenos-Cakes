import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const navItems = [
	{ label: "Início", href: "/dashboard" },
	{ label: "Produtos", href: "#" },
	{ label: "Sobre Nós", href: "#" },
];

export function Navbar() {
	return (
		<header className="rounded-2xl border-2 border-[#6b63ff] bg-white px-6 py-5 shadow-sm sm:px-8">
			<div className="flex items-center justify-between gap-4">
				<Link href="/" className="flex items-center gap-2.5">
					<div className="text-lg leading-none font-bold tracking-tight">
						<span className="text-[#1f2937]">Doce</span>
						<span className="text-[#ff4b61]">Gestão</span>
					</div>
				</Link>

				<nav className="hidden items-center gap-11 md:flex">
					{navItems.map((item, index) => (
						<Link
							key={item.label}
							href={item.href}
							className={
								index === 0
									? "text-base font-semibold text-[#ff4b61]"
									: "text-base font-semibold text-[#586274] transition hover:text-[#ff4b61]"
							}
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-5 text-[#4b5563]">
					<button
						type="button"
						aria-label="Carrinho"
						className="relative transition hover:text-[#ff4b61] cursor-pointer"
					>
						<ShoppingCart className="h-5 w-5" />
						<span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff4b61] px-1 text-[10px] font-semibold leading-none text-white">
							3
						</span>
					</button>

					<button
						type="button"
						aria-label="Perfil"
						className="transition hover:text-[#ff4b61] cursor-pointer"
					>
						<User className="h-5 w-5" />
					</button>
				</div>
			</div>
		</header>
	);
}
