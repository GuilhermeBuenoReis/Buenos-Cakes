import { expect, test } from "@playwright/test";

test.describe("Application smoke", () => {
	test("redirects the root route to dashboard", async ({ page }) => {
		await page.goto("/");

		await expect(page).toHaveURL(/\/dashboard$/);
		await expect(
			page.getByRole("heading", { name: "A doçura que sua vida merece." }),
		).toBeVisible();
	});

	test("navigates from the about page CTA to products", async ({ page }) => {
		await page.goto("/about");

		await page.getByRole("link", { name: "Ver Produtos" }).click();

		await expect(page).toHaveURL(/\/products$/);
		await expect(
			page.getByRole("heading", { name: "Catálogo de Doces" }),
		).toBeVisible();
	});
});
