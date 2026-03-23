import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckoutConfirmActions } from "./checkout-confirm-actions";

describe("CheckoutConfirmActions", () => {
	it("renders the review actions with an enabled confirmation button", () => {
		render(<CheckoutConfirmActions />);

		expect(
			screen.getByRole("link", { name: "Voltar para pagamento" }),
		).toHaveAttribute("href", "/checkout/payment");
		expect(
			screen.getByRole("button", { name: "Confirmar Pedido" }),
		).toBeEnabled();
	});

	it("disables the confirm action when requested", () => {
		render(<CheckoutConfirmActions confirmDisabled />);

		expect(
			screen.getByRole("button", { name: "Confirmar Pedido" }),
		).toBeDisabled();
	});
});
