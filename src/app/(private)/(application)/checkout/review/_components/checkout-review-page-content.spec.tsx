import { render, screen } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { describe, expect, it } from "vitest";
import { CartSheetProvider } from "@/contexts/cart-sheet-context";
import { createCartItemFromCatalog } from "@/test/catalog-seed";
import { CheckoutCustomerProvider } from "../../_context/checkout-customer-context";
import { CheckoutPaymentProvider } from "../../_context/checkout-payment-context";
import { CheckoutPickupProvider } from "../../_context/checkout-pickup-context";
import { defaultCheckoutPersonalInfoValues } from "../../_lib/checkout-personal-info";
import { CheckoutReviewPageContent } from "./checkout-review-page-content";

function renderCheckoutReviewPageContent({
	customerInfo = {
		email: "ana.souza@exemplo.com",
		fullName: "Ana Beatriz Souza",
		phone: "(11) 99876-5432",
	},
	initialItems = [
		createCartItemFromCatalog("prd_8f3a92c1"),
		createCartItemFromCatalog("prd_b71de54f", 2),
	],
}: {
	customerInfo?: {
		email: string;
		fullName: string;
		phone: string;
	};
	initialItems?: ReturnType<typeof createCartItemFromCatalog>[];
} = {}) {
	return render(
		<NuqsTestingAdapter hasMemory>
			<CartSheetProvider initialItems={initialItems}>
				<CheckoutPickupProvider>
					<CheckoutCustomerProvider initialCustomerInfo={customerInfo}>
						<CheckoutPaymentProvider initialSelectedMethod="debit-card">
							<CheckoutReviewPageContent />
						</CheckoutPaymentProvider>
					</CheckoutCustomerProvider>
				</CheckoutPickupProvider>
			</CartSheetProvider>
		</NuqsTestingAdapter>,
	);
}

describe("CheckoutReviewPageContent", () => {
	it("renders the final review step with catalog items and collected checkout data", () => {
		renderCheckoutReviewPageContent();

		expect(
			screen.getByRole("heading", { name: "Revisão do Pedido" }),
		).toBeVisible();
		expect(screen.getByText("Etapa 3 de 3")).toBeVisible();
		expect(screen.getByText("Bolo Red Velvet Premium")).toBeVisible();
		expect(screen.getByText("Caixa Brigadeiro Belga")).toBeVisible();
		expect(screen.getAllByText("Cartão de débito").length).toBeGreaterThan(0);
		expect(screen.getByText("Ana Beatriz Souza")).toBeVisible();
		expect(screen.getByText("ana.souza@exemplo.com")).toBeVisible();
		expect(screen.getByText("(11) 99876-5432")).toBeVisible();
		expect(screen.getAllByText("R$ 253,90").length).toBeGreaterThan(0);
		expect(
			screen.getByRole("link", { name: "Voltar para pagamento" }),
		).toHaveAttribute("href", "/checkout/payment");
		expect(
			screen.getByRole("button", { name: "Confirmar Pedido" }),
		).toBeEnabled();
	});

	it("shows the empty state and disables confirmation when the checkout data is incomplete", () => {
		renderCheckoutReviewPageContent({
			customerInfo: defaultCheckoutPersonalInfoValues,
			initialItems: [],
		});

		expect(screen.getByText("Seu carrinho ainda está vazio.")).toBeVisible();
		expect(
			screen.getByRole("button", { name: "Confirmar Pedido" }),
		).toBeDisabled();
	});
});
