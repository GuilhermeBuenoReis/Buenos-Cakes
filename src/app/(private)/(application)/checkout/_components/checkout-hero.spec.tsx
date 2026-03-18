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
		expect(screen.getByText("Retirada")).toBeVisible();
		expect(screen.getByText("Revisão")).toBeVisible();
	});
});
