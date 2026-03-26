import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckoutReviewHeader } from "./checkout-review-header";

describe("CheckoutReviewHeader", () => {
	it("renders the review hero copy and active step", () => {
		render(<CheckoutReviewHeader />);

		expect(
			screen.getByRole("heading", { name: "Revisão do Pedido" }),
		).toBeVisible();
		expect(screen.getByText("Etapa 3 de 3")).toBeVisible();
		expect(screen.getByRole("link", { name: "Checkout" })).toHaveAttribute(
			"href",
			"/checkout",
		);
		expect(screen.getAllByText("Revisão").length).toBeGreaterThan(0);
	});
});
