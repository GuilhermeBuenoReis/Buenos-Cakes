import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CheckoutPickupProvider } from "../_context/checkout-pickup-context";

const useCartSheetMock = vi.fn();

vi.mock("@/contexts/cart-sheet-context", () => ({
	useCartSheet: () => useCartSheetMock(),
}));

import { CheckoutOrderSummary } from "./checkout-order-summary";

const baseCartSheetValue = {
	addItem: vi.fn(),
	decreaseQuantity: vi.fn(),
	hasItems: true,
	increaseQuantity: vi.fn(),
	isOpen: false,
	itemCount: 3,
	items: [
		{
			highlight: "Bolos",
			id: "prd_1",
			image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62",
			name: "Bolo de Chocolate Belga",
			quantity: 1,
			unitPrice: 85,
		},
		{
			highlight: "Doces Finos",
			id: "prd_2",
			image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
			name: "Kit Macarons",
			quantity: 2,
			unitPrice: 35,
		},
	],
	removeItem: vi.fn(),
	setIsOpen: vi.fn(),
	shipping: 0,
	subtotal: 155,
	total: 155,
};

function renderCheckoutOrderSummary() {
	return render(
		<CheckoutPickupProvider>
			<CheckoutOrderSummary />
		</CheckoutPickupProvider>,
	);
}

describe("CheckoutOrderSummary", () => {
	beforeEach(() => {
		useCartSheetMock.mockReset();
		useCartSheetMock.mockReturnValue(baseCartSheetValue);
	});

	it("renders cart items, totals and the pickup summary", () => {
		renderCheckoutOrderSummary();

		expect(
			screen.getByRole("heading", { name: "Resumo do Pedido" }),
		).toBeVisible();
		expect(screen.getByText("2 items")).toBeVisible();
		expect(screen.getByText("Bolo de Chocolate Belga")).toBeVisible();
		expect(screen.getByText("Kit Macarons")).toBeVisible();
		expect(screen.getByText("Qtd. 1")).toBeVisible();
		expect(screen.getByText("Qtd. 2")).toBeVisible();
		expect(screen.getByText("R$ 85,00")).toBeVisible();
		expect(screen.getAllByText("R$ 70,00")).toHaveLength(1);
		expect(screen.getAllByText("R$ 155,00")).toHaveLength(2);
		expect(screen.getByText("Grátis")).toBeVisible();
		expect(screen.getByTestId("pickup-date-summary")).toBeVisible();
		expect(screen.getByTestId("pickup-schedule-summary")).toHaveTextContent(
			"Às 14:00",
		);
		expect(
			screen.getByRole("button", { name: "Finalizar Pedido" }),
		).toBeEnabled();
	});

	it("renders the empty state and disables checkout when there are no items", () => {
		useCartSheetMock.mockReturnValue({
			...baseCartSheetValue,
			hasItems: false,
			itemCount: 0,
			items: [],
			subtotal: 0,
			total: 0,
		});

		renderCheckoutOrderSummary();

		expect(screen.getByText("Seu carrinho ainda está vazio.")).toBeVisible();
		expect(screen.queryByText("items")).not.toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Finalizar Pedido" }),
		).toBeDisabled();
		expect(screen.getAllByText("R$ 0,00")).toHaveLength(2);
	});
});
