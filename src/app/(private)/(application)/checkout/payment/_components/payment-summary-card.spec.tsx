import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { paymentMethods } from "./payment-methods";
import { PaymentSummaryCard } from "./payment-summary-card";

describe("PaymentSummaryCard", () => {
	it("renders the selected payment label and detail", () => {
		render(<PaymentSummaryCard selectedPaymentMethod={paymentMethods[2]} />);

		expect(screen.getByText("Forma selecionada")).toBeVisible();
		expect(screen.getByText("Cartão de débito")).toBeVisible();
		expect(screen.getByText(paymentMethods[2].detail)).toBeVisible();
	});
});
