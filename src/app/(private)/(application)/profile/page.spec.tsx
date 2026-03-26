import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
	resetOrderHistoryStore,
	seedOrderHistoryStore,
} from "@/stores/order-history-store";
import { createConfirmedOrderSeed } from "@/test/order-history-seed";
import ProfilePage, { metadata } from "./page";

describe("ProfilePage", () => {
	beforeEach(() => {
		resetOrderHistoryStore();
	});

	it("exports the profile metadata", () => {
		expect(metadata).toEqual({
			title: "Meu Perfil | Buenos'Cakes",
		});
	});

	it("renders the empty orders state before any checkout confirmation", () => {
		render(<ProfilePage />);

		expect(screen.getByText("Mariana Silva")).toBeVisible();
		expect(
			screen.getByRole("heading", { name: "Informações Pessoais" }),
		).toBeVisible();
		expect(
			screen.getByRole("heading", { name: "Pedidos Recentes" }),
		).toBeVisible();
		expect(
			screen.getByRole("heading", { name: "Endereços salvos" }),
		).toBeVisible();
		expect(
			screen.getByText("Você ainda não confirmou nenhum pedido."),
		).toBeVisible();
		expect(screen.getByText("Rua das Camélias, 184")).toBeVisible();
	});

	it("renders confirmed orders and reflects the latest checkout customer data", () => {
		seedOrderHistoryStore([createConfirmedOrderSeed()]);
		render(<ProfilePage />);

		expect(screen.getByText("Ana Beatriz Souza")).toBeVisible();
		expect(screen.getByText("Ana Beatriz")).toBeVisible();
		expect(screen.getByText("ana.souza@exemplo.com")).toBeVisible();
		expect(screen.getByText("(11) 99876-5432")).toBeVisible();
		expect(screen.getByText("#9482")).toBeVisible();
		expect(screen.getByText("Bolo Red Velvet Premium + 1 item")).toBeVisible();
	});
});
