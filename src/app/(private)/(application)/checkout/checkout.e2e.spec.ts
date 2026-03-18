import { expect, test } from "@playwright/test";

test.describe("Checkout", () => {
	test("navigates from the cart to checkout and preserves the order summary", async ({
		page,
	}) => {
		await page.goto("/products");

		await page
			.getByRole("button", {
				name: "Adicionar Bolo Red Velvet Premium ao carrinho",
			})
			.click();

		await expect(
			page.getByRole("heading", { name: "Meu Carrinho" }),
		).toBeVisible();

		await page.getByRole("button", { name: "Finalizar Pedido" }).click();

		await expect(page).toHaveURL(/\/checkout$/);
		await expect(
			page.getByRole("heading", { name: "Finalizar Pedido" }),
		).toBeVisible();
		await expect(page.getByText("Bolo Red Velvet Premium")).toBeVisible();
		await expect(page.getByText("Qtd. 1")).toBeVisible();
	});
});
