import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckoutNavigationFooter } from "./checkout-navigation-footer";

describe("CheckoutNavigationFooter", () => {
	it("renders the default checkout navigation links", () => {
		render(<CheckoutNavigationFooter />);

		expect(
			screen.getByRole("link", { name: "Voltar para os dados" }),
		).toHaveAttribute("href", "/checkout");
		expect(
			screen.getByRole("link", { name: "Continuar para revisão" }),
		).toHaveAttribute("href", "/checkout/review");
	});

	it("supports custom labels and destinations", () => {
		render(
			<CheckoutNavigationFooter
				actionHref="/checkout/confirm"
				actionLabel="Seguir para confirmação"
				backHref="/checkout/cart"
				backLabel="Voltar para o carrinho"
			/>,
		);

		expect(
			screen.getByRole("link", { name: "Voltar para o carrinho" }),
		).toHaveAttribute("href", "/checkout/cart");
		expect(
			screen.getByRole("link", { name: "Seguir para confirmação" }),
		).toHaveAttribute("href", "/checkout/confirm");
	});
});
