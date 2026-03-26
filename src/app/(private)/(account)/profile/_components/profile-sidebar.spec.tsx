import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
	resetOrderHistoryStore,
	seedOrderHistoryStore,
} from "@/stores/order-history-store";
import { createConfirmedOrderSeed } from "@/test/order-history-seed";
import { ProfileSidebar } from "./profile-sidebar";

describe("ProfileSidebar", () => {
	beforeEach(() => {
		resetOrderHistoryStore();
	});

	it("renders the customer summary and sidebar navigation", () => {
		seedOrderHistoryStore([createConfirmedOrderSeed()]);
		render(<ProfileSidebar />);

		expect(screen.getByText("Ana Beatriz")).toBeVisible();
		expect(screen.getByText("Cliente desde 2023")).toBeVisible();
		expect(
			screen.getByRole("img", { name: "Foto de perfil de Ana Beatriz" }),
		).toBeVisible();
		expect(screen.getByRole("link", { name: "Meu Perfil" })).toHaveAttribute(
			"href",
			"#profile-personal-info",
		);
		expect(screen.getByRole("link", { name: "Meus Pedidos" })).toHaveAttribute(
			"href",
			"#profile-orders",
		);
		expect(screen.getByRole("link", { name: "Endereços" })).toHaveAttribute(
			"href",
			"#profile-addresses",
		);
		expect(screen.getByRole("button", { name: "Sair" })).toBeDisabled();
	});
});
