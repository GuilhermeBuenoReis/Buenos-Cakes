import { expect, test } from "@playwright/test";

test.describe("HeroActions", () => {
	test("navigates both dashboard CTAs to the products catalog", async ({
		page,
	}) => {
		await page.goto("/dashboard");

		await page.getByRole("link", { name: "Comprar Agora" }).click();
		await expect(page).toHaveURL(/\/products$/);
		await expect(
			page.getByRole("heading", { name: "Catálogo de Doces" }),
		).toBeVisible();

		await page.goto("/dashboard");

		await page.getByRole("link", { name: "Ver Catálogo" }).click();
		await expect(page).toHaveURL(/\/products$/);
		await expect(
			page.getByRole("heading", { name: "Catálogo de Doces" }),
		).toBeVisible();
	});
});
