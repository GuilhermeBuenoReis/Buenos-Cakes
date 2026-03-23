import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	checkoutPaymentPageContent: vi.fn(),
}));

vi.mock("./_components/checkout-payment-page-content", () => ({
	CheckoutPaymentPageContent: () => {
		mocks.checkoutPaymentPageContent();
		return <div data-testid="checkout-payment-page-content" />;
	},
}));

import CheckoutPaymentPage, { metadata } from "./page";

describe("CheckoutPaymentPage", () => {
	it("exports the payment metadata", () => {
		expect(metadata).toEqual({
			title: "Pagamento | Buenos'Cakes",
		});
	});

	it("renders the payment page content", () => {
		render(<CheckoutPaymentPage />);

		expect(screen.getByTestId("checkout-payment-page-content")).toBeVisible();
		expect(mocks.checkoutPaymentPageContent).toHaveBeenCalledTimes(1);
	});
});
