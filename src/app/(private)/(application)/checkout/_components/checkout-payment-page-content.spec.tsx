import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CheckoutPickupProvider } from "../_context/checkout-pickup-context";

const useCartSheetMock = vi.fn();

vi.mock("@/contexts/cart-sheet-context", () => ({
	useCartSheet: () => useCartSheetMock(),
}));

import { CheckoutPaymentPageContent } from "../payment/_components/checkout-payment-page-content";

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
	],
	removeItem: vi.fn(),
	setIsOpen: vi.fn(),
	shipping: 0,
	subtotal: 85,
	total: 85,
};

function renderCheckoutPaymentPageContent() {
	return render(
		<CheckoutPickupProvider>
			<CheckoutPaymentPageContent />
		</CheckoutPickupProvider>,
	);
}

describe("CheckoutPaymentPageContent", () => {
	beforeEach(() => {
		useCartSheetMock.mockReset();
		useCartSheetMock.mockReturnValue(baseCartSheetValue);
	});

	it("renders the payment step and main payment methods", () => {
		renderCheckoutPaymentPageContent();

		expect(
			screen.getByRole("heading", { name: "Pagamento do Pedido" }),
		).toBeVisible();
		expect(screen.getAllByText("Pix").length).toBeGreaterThan(0);
		expect(screen.getByText("Cartão de crédito")).toBeVisible();
		expect(screen.getByText("Cartão de débito")).toBeVisible();
		expect(screen.getAllByText("Dinheiro").length).toBeGreaterThan(0);
		expect(
			screen.getByRole("link", { name: "Voltar para os dados" }),
		).toHaveAttribute("href", "/checkout");
		expect(screen.getByText("Antes de continuar")).toBeVisible();
	});

	it("shows the cash change input when selecting cash", async () => {
		const user = userEvent.setup();

		renderCheckoutPaymentPageContent();

		await user.click(screen.getByRole("radio", { name: /Dinheiro/i }));

		expect(screen.getByLabelText("Precisa de troco?")).toBeVisible();
		expect(screen.getByPlaceholderText("Ex.: 100,00")).toBeVisible();
	});
});
