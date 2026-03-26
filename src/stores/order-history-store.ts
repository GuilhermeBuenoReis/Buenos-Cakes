"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CheckoutPersonalInfoValues } from "@/app/(private)/(application)/checkout/_lib/checkout-personal-info";
import type { CartSheetItemData } from "@/contexts/cart-sheet-context";

export const orderHistoryStorageKey = "buenos-cakes.order-history";
const ORDER_NUMBER_BASE = 9481;

type OrderHistoryStatusTone = "confirmed";

interface OrderHistoryPickupSummary {
	address: string;
	dateLabel: string;
	locationName: string;
	timeLabel: string;
	typeLabel: string;
}

interface OrderHistoryPaymentSummary {
	cashChange: string;
	methodId: string;
	methodLabel: string;
}

export interface OrderHistoryItem {
	confirmedAt: string;
	customer: CheckoutPersonalInfoValues;
	dateLabel: string;
	id: string;
	items: CartSheetItemData[];
	number: string;
	payment: OrderHistoryPaymentSummary;
	pickup: OrderHistoryPickupSummary;
	status: string;
	statusTone: OrderHistoryStatusTone;
	subtotal: number;
	total: number;
}

interface CreateOrderHistoryItemInput {
	customer: CheckoutPersonalInfoValues;
	items: CartSheetItemData[];
	payment: OrderHistoryPaymentSummary;
	pickup: OrderHistoryPickupSummary;
	subtotal: number;
	total: number;
}

interface OrderHistoryStore {
	clearOrders: () => void;
	createOrder: (input: CreateOrderHistoryItemInput) => OrderHistoryItem;
	orders: OrderHistoryItem[];
	setOrders: (orders: OrderHistoryItem[]) => void;
}

function formatOrderDateLabel(date: Date) {
	const monthLabels = [
		"Jan",
		"Fev",
		"Mar",
		"Abr",
		"Mai",
		"Jun",
		"Jul",
		"Ago",
		"Set",
		"Out",
		"Nov",
		"Dez",
	] as const;

	return `${String(date.getDate()).padStart(2, "0")} ${monthLabels[date.getMonth()]}, ${date.getFullYear()}`;
}

function getOrderNumberValue(orderNumber: string) {
	const parsedOrderNumber = Number(orderNumber.replace(/\D/g, ""));

	return Number.isFinite(parsedOrderNumber)
		? parsedOrderNumber
		: ORDER_NUMBER_BASE;
}

export const useOrderHistoryStore = create<OrderHistoryStore>()(
	persist(
		(set, get) => ({
			clearOrders() {
				set({ orders: [] });
			},
			createOrder(input) {
				const orderNumberValue =
					get().orders.reduce((highestOrderNumber, order) => {
						return Math.max(
							highestOrderNumber,
							getOrderNumberValue(order.number),
						);
					}, ORDER_NUMBER_BASE) + 1;
				const confirmedAt = new Date();
				const nextOrder: OrderHistoryItem = {
					confirmedAt: confirmedAt.toISOString(),
					customer: input.customer,
					dateLabel: formatOrderDateLabel(confirmedAt),
					id: `order-${orderNumberValue}`,
					items: input.items,
					number: `#${orderNumberValue}`,
					payment: input.payment,
					pickup: input.pickup,
					status: "Confirmado",
					statusTone: "confirmed",
					subtotal: input.subtotal,
					total: input.total,
				};

				set((state) => ({
					orders: [nextOrder, ...state.orders],
				}));

				return nextOrder;
			},
			orders: [],
			setOrders(orders) {
				set({ orders });
			},
		}),
		{
			name: orderHistoryStorageKey,
			partialize(state) {
				return {
					orders: state.orders,
				};
			},
			storage: createJSONStorage(() => window.localStorage),
		},
	),
);

function writeOrdersToStorage(orders: OrderHistoryItem[]) {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem(
		orderHistoryStorageKey,
		JSON.stringify({
			state: {
				orders,
			},
			version: 0,
		}),
	);
}

export function seedOrderHistoryStore(orders: OrderHistoryItem[]) {
	useOrderHistoryStore.getState().setOrders(orders);
	writeOrdersToStorage(orders);
}

export function resetOrderHistoryStore() {
	useOrderHistoryStore.getState().clearOrders();

	if (typeof window !== "undefined") {
		window.localStorage.removeItem(orderHistoryStorageKey);
	}
}
