import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createCartItemFromCatalog } from "@/test/catalog-seed";
import { CheckoutOrderItems } from "./checkout-order-items";

const reviewItems = [
	createCartItemFromCatalog("prd_8f3a92c1"),
	createCartItemFromCatalog("prd_b71de54f", 2),
];

describe("CheckoutOrderItems", () => {
	it("renders the catalog items and links to adjust the cart", () => {
		render(<CheckoutOrderItems items={reviewItems} />);

		expect(screen.getByText("Itens do pedido")).toBeVisible();
		expect(screen.getByText("Bolo Red Velvet Premium")).toBeVisible();
		expect(screen.getByText("Caixa Brigadeiro Belga")).toBeVisible();
		expect(screen.getByText("3 unidades")).toBeVisible();
		expect(screen.getAllByRole("link", { name: "Editar item" })).toHaveLength(
			2,
		);
		expect(screen.getByText("R$ 145,90")).toBeVisible();
		expect(screen.getByText("R$ 108,00")).toBeVisible();
	});

	it("shows the empty cart state when there are no items", () => {
		render(<CheckoutOrderItems items={[]} />);

		expect(screen.getByText("Seu carrinho ainda está vazio.")).toBeVisible();
		expect(
			screen.getByRole("link", { name: "Ir para produtos" }),
		).toHaveAttribute("href", "/products");
	});
});
