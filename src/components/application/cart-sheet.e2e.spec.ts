import { expect, test } from "@playwright/test";

test.describe("Cart sheet", () => {
	test("opens directly from the cart query param", async ({ page }) => {
		await page.goto("/products?cart=true");

		await expect(
			page.getByRole("heading", { name: "Meu Carrinho" }),
		).toBeVisible();
		await expect(page.getByText("Seu carrinho esta vazio")).toBeVisible();
	});

	test("updates quantity, totals, and empty state while editing cart items", async ({
		page,
	}) => {
		await page.goto("/products");

		await page
			.getByRole("button", {
				name: "Adicionar Bolo Red Velvet Premium ao carrinho",
			})
			.click();

		const cartDialog = page.getByRole("dialog");
		const cartButton = page.locator('button[aria-label="Carrinho"]');
		const cartItem = cartDialog
			.locator("article")
			.filter({ hasText: "Bolo Red Velvet Premium" });

		await expect(
			cartDialog.getByRole("heading", { name: "Meu Carrinho" }),
		).toBeVisible();
		await expect(cartButton).toContainText("1");
		await expect(cartItem.getByText(/145,90/)).toBeVisible();

		await cartDialog
			.getByRole("button", {
				name: "Adicionar uma unidade de Bolo Red Velvet Premium",
			})
			.click();

		await expect(cartButton).toContainText("2");
		await expect(cartItem.getByText(/291,80/)).toBeVisible();
		await expect(
			cartDialog.getByRole("button", {
				name: "Remover uma unidade de Bolo Red Velvet Premium",
			}),
		).toBeEnabled();

		await cartDialog
			.getByRole("button", {
				name: "Remover uma unidade de Bolo Red Velvet Premium",
			})
			.click();

		await expect(cartButton).toContainText("1");
		await expect(cartItem.getByText(/145,90/)).toBeVisible();
		await expect(
			cartDialog.getByRole("button", {
				name: "Remover uma unidade de Bolo Red Velvet Premium",
			}),
		).toBeDisabled();

		await cartDialog
			.getByRole("button", {
				name: "Remover Bolo Red Velvet Premium do carrinho",
			})
			.click();

		await expect(cartButton).toContainText("0");
		await expect(cartDialog.getByText("Seu carrinho esta vazio")).toBeVisible();
		await expect(
			cartDialog.getByRole("button", { name: "Finalizar Pedido" }),
		).toBeDisabled();
	});
});
