import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
	resetOrderHistoryStore,
	seedOrderHistoryStore,
} from "@/stores/order-history-store";
import { createConfirmedOrderSeed } from "@/test/order-history-seed";
import { ProfileRecentOrders } from "./profile-recent-orders";

describe("ProfileRecentOrders", () => {
	beforeEach(() => {
		resetOrderHistoryStore();
	});

	it("renders the orders table with totals, statuses and actions", () => {
		seedOrderHistoryStore([createConfirmedOrderSeed()]);
		render(<ProfileRecentOrders />);

		expect(
			screen.getByRole("heading", { name: "Pedidos Recentes" }),
		).toBeVisible();
		expect(screen.getByRole("link", { name: "Ver todos" })).toHaveAttribute(
			"href",
			"#profile-orders",
		);
		expect(screen.getByText("#9482")).toBeVisible();
		expect(screen.getByText("Bolo Red Velvet Premium + 1 item")).toBeVisible();
		expect(screen.getByText("Confirmado")).toBeVisible();
		expect(screen.getByText("R$ 253,90")).toBeVisible();
		expect(screen.getAllByRole("link", { name: "Detalhes" })).toHaveLength(1);
	});

	it("renders an empty state before any checkout confirmation", () => {
		render(<ProfileRecentOrders />);

		expect(
			screen.getByText("Você ainda não confirmou nenhum pedido."),
		).toBeVisible();
		expect(
			screen.getByRole("link", { name: "Explorar catálogo" }),
		).toHaveAttribute("href", "/products");
		expect(
			screen.queryByRole("link", { name: "Ver todos" }),
		).not.toBeInTheDocument();
	});
});
