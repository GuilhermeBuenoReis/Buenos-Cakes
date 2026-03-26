import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

	it("calls the confirm handler when clicking the action", () => {
		const handleConfirm = vi.fn();

		render(<CheckoutConfirmActions onConfirm={handleConfirm} />);

		fireEvent.click(screen.getByRole("button", { name: "Confirmar Pedido" }));

		expect(handleConfirm).toHaveBeenCalledTimes(1);
	});
});
