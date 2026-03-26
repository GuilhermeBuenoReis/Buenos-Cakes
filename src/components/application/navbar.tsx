"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavbarCart } from "./navbar-cart";

const navItems = [
	{ label: "Início", href: "/dashboard" },
	{ label: "Produtos", href: "/products" },
	{ label: "Sobre Nós", href: "/about" },
];

function isNavItemActive(pathname: string, href: string) {
	if (href === "/dashboard") {
		return pathname === "/" || pathname === href;
	}

	return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
	const pathname = usePathname();
	const isProfileActive = isNavItemActive(pathname, "/profile");

	return (
		<header className="rounded-2xl bg-white px-6 py-5 shadow-sm sm:px-8">
			<div className="flex items-center justify-between gap-4">
				<Link href="/dashboard" className="flex items-center gap-2.5">
					<div className="text-lg leading-none font-bold tracking-tight">
						<span className="text-[#1f2937]">Doce</span>
						<span className="text-[#ff4b61]">Gestão</span>
					</div>
				</Link>

				<nav className="hidden items-center gap-11 md:flex">
					{navItems.map(function renderNavItem(item) {
						const isActive = isNavItemActive(pathname, item.href);

						return (
							<Link
								key={item.label}
								href={item.href}
								aria-current={isActive ? "page" : undefined}
								className={
									isActive
										? "text-base font-semibold text-[#ff4b61]"
										: "text-base font-semibold text-[#586274] transition hover:text-[#ff4b61]"
								}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-5 text-[#4b5563]">
					<NavbarCart />

					<Link
						aria-label="Perfil"
						aria-current={isProfileActive ? "page" : undefined}
						className={cn(
							"flex size-10 items-center justify-center rounded-full border border-[#f2e7ea] bg-[#fff6f7] text-[#4b5563] transition hover:border-rose-200 hover:text-[#ff4b61]",
							isProfileActive && "border-rose-200 text-[#ff4b61]",
						)}
						href="/profile"
					>
						<User className="h-5 w-5" />
					</Link>
				</div>
			</div>
		</header>
	);
}
