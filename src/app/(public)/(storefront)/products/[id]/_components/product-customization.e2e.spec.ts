import { expect, test } from "@playwright/test";

function getQueryParam(url: string, key: string) {
	return new URL(url).searchParams.get(key);
}

test.describe("Product customization", () => {
	test("persists customization in the URL and rehydrates after reload", async ({
		page,
	}) => {
		await page.goto("/products/prd_8f3a92c1");

		await page.getByRole("button", { name: "Grande" }).click();
		await page.getByLabel("Selecionar recheio extra").click();
		await page.getByRole("option", { name: "Morango com Chantilly" }).click();
		await page.getByLabel("Mensagem personalizada").fill("Feliz aniversario!");
		await page.getByRole("button", { name: "Aumentar quantidade" }).click();

		await expect.poll(() => getQueryParam(page.url(), "size")).toBe("grande");
		await expect.poll(() => getQueryParam(page.url(), "filling")).toBe(
			"Morango com Chantilly",
		);
		await expect.poll(() => getQueryParam(page.url(), "message")).toBe(
			"Feliz aniversario!",
		);
		await expect.poll(() => getQueryParam(page.url(), "quantity")).toBe("2");

		await page.reload();

		await expect(
			page.getByRole("button", { name: "Grande", pressed: true }),
		).toBeVisible();
		await expect(page.getByLabel("Selecionar recheio extra")).toContainText(
			"Morango com Chantilly",
		);
		await expect(page.getByLabel("Mensagem personalizada")).toHaveValue(
			"Feliz aniversario!",
		);
		await expect(
			page.getByRole("textbox", { name: "Quantidade" }),
		).toHaveValue("2");
	});

	test("aggregates identical customizations and keeps different ones separated", async ({
		page,
	}) => {
		await page.goto("/products/prd_8f3a92c1");

		await page.getByRole("button", { name: "Grande" }).click();
		await page.getByLabel("Selecionar recheio extra").click();
		await page.getByRole("option", { name: "Morango com Chantilly" }).click();
		await page.getByLabel("Mensagem personalizada").fill("Parabens!");
		await page.getByRole("button", { name: "Aumentar quantidade" }).click();
		await page.getByRole("button", { name: "Adicionar ao Carrinho" }).click();

		const cartDialog = page.getByRole("dialog");
		const cartButton = page.locator('button[aria-label="Carrinho"]');
		const customizedCartItem = cartDialog
			.locator("article")
			.filter({ hasText: "Grande • Morango com Chantilly • Com mensagem" });

		await expect(customizedCartItem).toContainText(
			"Grande • Morango com Chantilly • Com mensagem",
		);
		await expect(cartDialog.locator("article")).toHaveCount(1);
		await expect(
			cartDialog.getByRole("button", {
				name: "Adicionar uma unidade de Bolo Red Velvet Premium",
			}),
		).toBeVisible();

		await page.getByRole("button", { name: "Fechar carrinho" }).click();
		await page.getByRole("button", { name: "Adicionar ao Carrinho" }).click();

		await expect(cartDialog.locator("article")).toHaveCount(1);
		await expect(cartButton).toContainText("4");
		await expect(customizedCartItem.getByText(/583,60/)).toBeVisible();

		await page.getByRole("button", { name: "Fechar carrinho" }).click();
		await page.getByRole("button", { name: "Pequeno" }).click();
		await page.getByLabel("Mensagem personalizada").fill("");
		await page.getByRole("button", { name: "Diminuir quantidade" }).click();
		await page.getByRole("button", { name: "Adicionar ao Carrinho" }).click();

		await expect(cartDialog.locator("article")).toHaveCount(2);
		await expect(cartDialog.getByText("Pequeno • Morango com Chantilly")).toBeVisible();
		await expect(cartButton).toContainText("5");
	});
});
