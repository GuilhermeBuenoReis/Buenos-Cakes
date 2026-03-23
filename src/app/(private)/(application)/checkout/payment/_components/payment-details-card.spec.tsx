import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PaymentDetailsCard } from "./payment-details-card";
import { paymentMethods } from "./payment-methods";

describe("PaymentDetailsCard", () => {
	it("renders the selected payment summary for non-cash methods", () => {
		render(
			<PaymentDetailsCard
				cashChange=""
				onCashChange={vi.fn()}
				selectedPaymentMethod={paymentMethods[1]}
			/>,
		);

		expect(screen.getByText("Detalhes do pagamento")).toBeVisible();
		expect(screen.getByText("Pagamento com cartão de crédito")).toBeVisible();
		expect(
			screen.getByText(
				"Você ainda poderá revisar os dados do pedido antes da confirmação final.",
			),
		).toBeVisible();
	});

	it("shows the cash change input and updates it", async () => {
		const onCashChange = vi.fn();

		render(
			<PaymentDetailsCard
				cashChange=""
				onCashChange={onCashChange}
				selectedPaymentMethod={paymentMethods[3]}
			/>,
		);

		fireEvent.change(screen.getByLabelText("Precisa de troco?"), {
			target: { value: "120,00" },
		});

		expect(screen.getByPlaceholderText("Ex.: 100,00")).toBeVisible();
		expect(onCashChange).toHaveBeenLastCalledWith("120,00");
	});
});
