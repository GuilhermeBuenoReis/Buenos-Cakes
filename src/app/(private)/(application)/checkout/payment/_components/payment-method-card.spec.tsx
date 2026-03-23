import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PaymentMethodCard } from "./payment-method-card";
import { paymentMethods } from "./payment-methods";

describe("PaymentMethodCard", () => {
	it("renders the selected method as checked", () => {
		render(
			<PaymentMethodCard
				isSelected
				method={paymentMethods[0]}
				onSelect={vi.fn()}
			/>,
		);

		expect(screen.getByRole("radio", { name: /Pix/i })).toBeChecked();
		expect(screen.getByText("Rápido")).toBeVisible();
		expect(screen.getByText(paymentMethods[0].description)).toBeVisible();
	});

	it("calls onSelect when another payment method is chosen", async () => {
		const user = userEvent.setup();
		const onSelect = vi.fn();

		render(
			<PaymentMethodCard
				isSelected={false}
				method={paymentMethods[2]}
				onSelect={onSelect}
			/>,
		);

		await user.click(screen.getByRole("radio", { name: /Cartão de débito/i }));

		expect(onSelect).toHaveBeenCalledWith("debit-card");
	});
});
