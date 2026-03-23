import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PaymentMethodList } from "./payment-method-list";
import { paymentMethods } from "./payment-methods";

describe("PaymentMethodList", () => {
	it("renders the payment methods inside a radiogroup", () => {
		render(
			<PaymentMethodList
				methods={paymentMethods}
				onSelect={vi.fn()}
				selectedMethod="pix"
			/>,
		);

		expect(
			screen.getByRole("radiogroup", { name: "Métodos de pagamento" }),
		).toBeVisible();
		expect(screen.getAllByRole("radio")).toHaveLength(paymentMethods.length);
		expect(screen.getByRole("radio", { name: /Pix/i })).toBeChecked();
	});

	it("notifies the selected payment method", async () => {
		const user = userEvent.setup();
		const onSelect = vi.fn();

		render(
			<PaymentMethodList
				methods={paymentMethods}
				onSelect={onSelect}
				selectedMethod="pix"
			/>,
		);

		await user.click(screen.getByRole("radio", { name: /Dinheiro/i }));

		expect(onSelect).toHaveBeenCalledWith("cash");
	});
});
