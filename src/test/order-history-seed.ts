import type { OrderHistoryItem } from "@/stores/order-history-store";
import { createCartItemFromCatalog } from "./catalog-seed";

export function createConfirmedOrderSeed(): OrderHistoryItem {
	return {
		confirmedAt: "2026-03-24T12:00:00.000Z",
		customer: {
			email: "ana.souza@exemplo.com",
			fullName: "Ana Beatriz Souza",
			phone: "(11) 99876-5432",
		},
		dateLabel: "24 Mar, 2026",
		id: "order-9482",
		items: [
			createCartItemFromCatalog("prd_8f3a92c1"),
			createCartItemFromCatalog("prd_b71de54f", 2),
		],
		number: "#9482",
		payment: {
			cashChange: "",
			methodId: "pix",
			methodLabel: "Pix",
		},
		pickup: {
			address: "Rua das Flores, 123 - Jardim Doce, São Paulo - SP",
			dateLabel: "24 Mar, 2026",
			locationName: "DoceGestão Matriz",
			timeLabel: "14:00",
			typeLabel: "Retirada no local",
		},
		status: "Confirmado",
		statusTone: "confirmed",
		subtotal: 253.9,
		total: 253.9,
	};
}
