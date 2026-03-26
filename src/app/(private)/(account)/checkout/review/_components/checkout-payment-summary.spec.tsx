import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { paymentMethods } from "../../payment/_components/payment-methods";
import { CheckoutPaymentSummary } from "./checkout-payment-summary";

describe("CheckoutPaymentSummary", () => {
	it("renders the selected non-cash payment method", () => {
		render(<CheckoutPaymentSummary paymentMethod={paymentMethods[2]} />);

		expect(screen.getByText("Forma de pagamento")).toBeVisible();
		expect(screen.getByText("Cartão de débito")).toBeVisible();
		expect(screen.getByText("Online")).toBeVisible();
		expect(screen.getByText(paymentMethods[2].detail)).toBeVisible();
		expect(screen.getByRole("link", { name: "Editar" })).toHaveAttribute(
			"href",
			"/checkout/payment",
		);
	});

	it("shows the requested change when the method is cash", () => {
		render(
			<CheckoutPaymentSummary
				cashChange="R$ 100,00"
				paymentMethod={paymentMethods[3]}
			/>,
		);

		expect(screen.getByText("Dinheiro")).toBeVisible();
		expect(screen.getByText("Troco solicitado para R$ 100,00.")).toBeVisible();
	});
});
