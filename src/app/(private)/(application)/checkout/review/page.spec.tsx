import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	checkoutReviewPageContent: vi.fn(),
}));

vi.mock("./_components/checkout-review-page-content", () => ({
	CheckoutReviewPageContent: () => {
		mocks.checkoutReviewPageContent();
		return <div data-testid="checkout-review-page-content" />;
	},
}));

import CheckoutReviewPage, { metadata } from "./page";

describe("CheckoutReviewPage", () => {
	it("exports the review metadata", () => {
		expect(metadata).toEqual({
			title: "Revisão do Pedido | Buenos'Cakes",
		});
	});

	it("renders the review page content", () => {
		render(<CheckoutReviewPage />);

		expect(screen.getByTestId("checkout-review-page-content")).toBeVisible();
		expect(mocks.checkoutReviewPageContent).toHaveBeenCalledTimes(1);
	});
});
