import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PaymentInfoCards } from "./payment-info-cards";

describe("PaymentInfoCards", () => {
	it("renders the payment guidance cards", () => {
		render(<PaymentInfoCards />);

		expect(screen.getByText("Antes de continuar")).toBeVisible();
		expect(screen.getAllByText("Pix").length).toBeGreaterThan(0);
		expect(screen.getByText("Crédito ou débito")).toBeVisible();
		expect(screen.getByText("Troco se precisar")).toBeVisible();
	});
});
