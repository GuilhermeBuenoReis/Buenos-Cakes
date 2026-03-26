import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PaymentMethodCard } from "./payment-method-card";
import { paymentMethods } from "./payment-methods";

describe("PaymentMethodCard", () => {
	it("renders the selected method as checked", () => {
		render(
			<PaymentMethodCard
				handleSelectMethod={vi.fn()}
				isSelected
				method={paymentMethods[0]}
			/>,
		);

		expect(screen.getByRole("radio", { name: /Pix/i })).toBeChecked();
		expect(screen.getByText("Rápido")).toBeVisible();
		expect(screen.getByText(paymentMethods[0].description)).toBeVisible();
	});

	it("calls onSelect when another payment method is chosen", async () => {
		const user = userEvent.setup();
		const handleSelectMethod = vi.fn();

		render(
			<PaymentMethodCard
				handleSelectMethod={handleSelectMethod}
				isSelected={false}
				method={paymentMethods[2]}
			/>,
		);

		await user.click(screen.getByRole("radio", { name: /Cartão de débito/i }));

		expect(handleSelectMethod).toHaveBeenCalledWith("debit-card");
	});
});
