"use client";

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from "react";

export type CartSheetArtworkVariant = "brigadeiros" | "pote" | "ursinho";

export interface CartSheetItemData {
	artwork: CartSheetArtworkVariant;
	highlight: string;
	id: string;
	name: string;
	quantity: number;
	unitPrice: number;
}

interface CartSheetContextValue {
	decreaseQuantity: (itemId: string) => void;
	hasItems: boolean;
	increaseQuantity: (itemId: string) => void;
	itemCount: number;
	items: CartSheetItemData[];
	removeItem: (itemId: string) => void;
	shipping: number;
	subtotal: number;
	total: number;
}

const SHIPPING_COST = 0;

const INITIAL_CART_ITEMS: CartSheetItemData[] = [
	{
		artwork: "brigadeiros",
		highlight: "Chocolate Belga & Pistache",
		id: "brigadeiro-gourmet",
		name: "Cento de Brigadeiros Gourmet",
		quantity: 1,
		unitPrice: 120,
	},
	{
		artwork: "pote",
		highlight: "Edicao Limitada",
		id: "bolo-de-pote-ninho",
		name: "Bolo de Pote Ninho com Nutella",
		quantity: 2,
		unitPrice: 15,
	},
	{
		artwork: "ursinho",
		highlight: "Artesanal",
		id: "brownie-doce-de-leite",
		name: "Brownie de Doce de Leite",
		quantity: 1,
		unitPrice: 8,
	},
];

const CartSheetContext = createContext<CartSheetContextValue | null>(null);

export function CartSheetProvider({ children }: PropsWithChildren) {
	const [items, setItems] = useState(INITIAL_CART_ITEMS);

	function increaseQuantity(itemId: string) {
		setItems((currentItems) =>
			currentItems.map((item) =>
				item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
			),
		);
	}

	function decreaseQuantity(itemId: string) {
		setItems((currentItems) =>
			currentItems.map((item) =>
				item.id === itemId
					? { ...item, quantity: Math.max(1, item.quantity - 1) }
					: item,
			),
		);
	}

	function removeItem(itemId: string) {
		setItems((currentItems) =>
			currentItems.filter((item) => item.id !== itemId),
		);
	}

	const itemCount = items.reduce((total, item) => total + item.quantity, 0);
	const subtotal = items.reduce(
		(total, item) => total + item.unitPrice * item.quantity,
		0,
	);
	const total = subtotal + SHIPPING_COST;

	return (
		<CartSheetContext.Provider
			value={{
				decreaseQuantity,
				hasItems: items.length > 0,
				increaseQuantity,
				itemCount,
				items,
				removeItem,
				shipping: SHIPPING_COST,
				subtotal,
				total,
			}}
		>
			{children}
		</CartSheetContext.Provider>
	);
}

export function useCartSheet() {
	const context = useContext(CartSheetContext);

	if (!context) {
		throw new Error("useCartSheet must be used within CartSheetProvider.");
	}

	return context;
}
