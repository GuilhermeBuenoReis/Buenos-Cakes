import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckoutHero } from "./checkout-hero";

describe("CheckoutHero", () => {
	it("renders the breadcrumb, heading and checkout steps", () => {
		render(<CheckoutHero />);

		expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute(
			"href",
			"/dashboard",
		);
		expect(screen.getByRole("link", { name: "Carrinho" })).toHaveAttribute(
			"href",
			"/products?cart=true",
		);
		expect(
			screen.getByRole("heading", { name: "Finalizar Pedido" }),
		).toBeVisible();
		expect(screen.getByText("Etapa 1 de 3")).toBeVisible();
		expect(screen.getByText("Identificação")).toBeVisible();
		expect(screen.getByText("Pagamento")).toBeVisible();
		expect(screen.getByText("Revisão")).toBeVisible();
	});

	it("renders the payment step as active with the payment breadcrumb", () => {
		render(<CheckoutHero currentStep="pagamento" />);

		expect(
			screen.getByRole("heading", { name: "Pagamento do Pedido" }),
		).toBeVisible();
		expect(screen.getByText("Etapa 2 de 3")).toBeVisible();
		expect(screen.getByRole("link", { name: "Checkout" })).toHaveAttribute(
			"href",
			"/checkout",
		);
		expect(screen.getAllByText("Pagamento").length).toBeGreaterThan(0);
	});
});
