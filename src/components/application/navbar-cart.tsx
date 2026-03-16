"use client";

import { ShoppingCart } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { CartSheetContent } from "./cart-sheet-content";
import { CartSheetProvider, useCartSheet } from "./cart-sheet-context";

function NavbarCartTrigger() {
	const { itemCount } = useCartSheet();

	return (
		<SheetTrigger asChild>
			<button
				type="button"
				aria-label="Carrinho"
				className="relative cursor-pointer text-[#4b5563] transition hover:text-[#ff4b61]"
			>
				<ShoppingCart className="h-5 w-5" />
				<span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff4b61] px-1 text-[10px] font-semibold leading-none text-white">
					{itemCount}
				</span>
			</button>
		</SheetTrigger>
	);
}

export function NavbarCart() {
	return (
		<CartSheetProvider>
			<Sheet>
				<NavbarCartTrigger />
				<CartSheetContent />
			</Sheet>
		</CartSheetProvider>
	);
}
