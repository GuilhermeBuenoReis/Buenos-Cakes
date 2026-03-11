import { expect, test } from "@playwright/test";

test.describe("Product details route", () => {
	test("navigates to product detail when clicking a product card", async ({
		page,
	}) => {
		await page.goto("/products");

		await page
			.getByLabel("Ver detalhes de Bolo Red Velvet Premium")
			.first()
			.click();

		await expect(page).toHaveURL(/\/products\/prd_8f3a92c1$/);
		await expect(
			page.getByRole("heading", { name: "Bolo Red Velvet Premium" }),
		).toBeVisible();
		await expect(page.getByRole("link", { name: "Bolos" })).toBeVisible();
		await expect(
			page.getByText(
				"Massa aveludada de cacau suave com recheio cremoso e acabamento sofisticado para ocasioes especiais.",
			),
		).toBeVisible();
	});

	test("renders custom not found state for an unknown product id", async ({
		page,
	}) => {
		await page.goto("/products/prd_nao_existe", {
			waitUntil: "networkidle",
		});

		await expect(
			page.getByRole("heading", { name: "Produto nao encontrado" }),
		).toBeVisible();
		await page.getByRole("link", { name: "Voltar para o catalogo" }).click();

		await expect(page).toHaveURL(/\/products$/);
		await expect(
			page.getByRole("heading", { name: "Catálogo de Doces" }),
		).toBeVisible();
	});
});
