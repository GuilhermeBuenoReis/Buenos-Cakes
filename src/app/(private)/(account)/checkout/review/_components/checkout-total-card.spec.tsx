import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckoutTotalCard } from "./checkout-total-card";

describe("CheckoutTotalCard", () => {
	it("renders the reviewed totals and free fees state", () => {
		render(
			<CheckoutTotalCard
				discount={0}
				fees={0}
				itemCount={3}
				subtotal={253.9}
				total={253.9}
			/>,
		);

		expect(screen.getByText("Resumo financeiro")).toBeVisible();
		expect(screen.getByText("3 items revisados")).toBeVisible();
		expect(screen.getAllByText("R$ 253,90")).toHaveLength(2);
		expect(screen.getByText("Grátis")).toBeVisible();
		expect(screen.getByText("Sem desconto")).toBeVisible();
	});

	it("renders discounts and paid fees when available", () => {
		render(
			<CheckoutTotalCard
				discount={15}
				fees={12}
				itemCount={1}
				subtotal={80}
				total={77}
			/>,
		);

		expect(screen.getByText("1 item revisado")).toBeVisible();
		expect(screen.getByText("R$ 12,00")).toBeVisible();
		expect(screen.getByText("- R$ 15,00")).toBeVisible();
		expect(screen.getByText("R$ 77,00")).toBeVisible();
	});
});
