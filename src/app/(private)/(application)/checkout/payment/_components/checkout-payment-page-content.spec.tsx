import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { describe, expect, it } from "vitest";
import { CartSheetProvider } from "@/contexts/cart-sheet-context";
import { createCartItemFromCatalog } from "@/test/catalog-seed";
import { CheckoutPaymentProvider } from "../../_context/checkout-payment-context";
import { CheckoutPickupProvider } from "../../_context/checkout-pickup-context";
import { CheckoutPaymentPageContent } from "./checkout-payment-page-content";

function renderCheckoutPaymentPageContent() {
	return render(
		<NuqsTestingAdapter hasMemory>
			<CartSheetProvider
				initialItems={[createCartItemFromCatalog("prd_8f3a92c1")]}
			>
				<CheckoutPickupProvider>
					<CheckoutPaymentProvider>
						<CheckoutPaymentPageContent />
					</CheckoutPaymentProvider>
				</CheckoutPickupProvider>
			</CartSheetProvider>
		</NuqsTestingAdapter>,
	);
}

describe("CheckoutPaymentPageContent", () => {
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
		expect(
			screen.getByRole("link", { name: "Continuar para revisão" }),
		).toHaveAttribute("href", "/checkout/review");
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
