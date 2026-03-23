"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import {
	type CartSheetItemData,
	useCartSheet,
} from "@/contexts/cart-sheet-context";
import { formatPrice } from "@/lib/format-price";
import { CartSheetArtwork } from "./cart-sheet-artwork";

interface CartSheetItemProps {
	item: CartSheetItemData;
}

export function CartSheetItem({ item }: CartSheetItemProps) {
	const { decreaseQuantity, increaseQuantity, removeItem } = useCartSheet();
	const linePrice = item.quantity * item.unitPrice;

	function handleRemoveItemClick() {
		removeItem(item.id);
	}

	function handleDecreaseQuantityClick() {
		decreaseQuantity(item.id);
	}

	function handleIncreaseQuantityClick() {
		increaseQuantity(item.id);
	}

	return (
		<article className="flex items-start gap-3">
			<CartSheetArtwork
				alt={`Imagem de ${item.name} no carrinho`}
				src={item.image}
			/>

			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between gap-2">
					<div className="space-y-1">
						<h3 className="text-[13px] leading-[1.15rem] font-extrabold text-slate-800">
							{item.name}
						</h3>
						<p className="truncate text-[11px] font-semibold tracking-[0.02em] text-rose-400">
							{item.highlight}
						</p>
					</div>

					<button
						type="button"
						aria-label={`Remover ${item.name} do carrinho`}
						className="rounded-full p-0.5 text-slate-300 transition hover:bg-slate-50 hover:text-slate-500"
						onClick={handleRemoveItemClick}
					>
						<Trash2 className="size-3" />
					</button>
				</div>

				<div className="mt-3 flex items-end justify-between gap-3">
					<div className="inline-flex items-center rounded-full bg-rose-50 p-0.5 shadow-[inset_0_0_0_1px_rgba(251,113,133,0.08)]">
						<button
							type="button"
							aria-label={`Remover uma unidade de ${item.name}`}
							className="flex size-6 items-center justify-center rounded-full text-rose-400 transition hover:bg-white hover:text-rose-500 disabled:cursor-not-allowed disabled:text-rose-200"
							disabled={item.quantity === 1}
							onClick={handleDecreaseQuantityClick}
						>
							<Minus className="size-3" />
						</button>

						<span className="w-7 text-center text-[13px] font-bold text-slate-700">
							{item.quantity}
						</span>

						<button
							type="button"
							aria-label={`Adicionar uma unidade de ${item.name}`}
							className="flex size-6 items-center justify-center rounded-full text-rose-400 transition hover:bg-white hover:text-rose-500"
							onClick={handleIncreaseQuantityClick}
						>
							<Plus className="size-3" />
						</button>
					</div>

					<div className="text-right">
						{item.quantity > 1 ? (
							<p className="mb-0.5 text-[10px] font-medium text-slate-400">
								{formatPrice(item.unitPrice)} cada
							</p>
						) : null}
						<strong className="text-[13px] font-extrabold text-slate-900">
							{formatPrice(linePrice)}
						</strong>
					</div>
				</div>
			</div>
		</article>
	);
}
