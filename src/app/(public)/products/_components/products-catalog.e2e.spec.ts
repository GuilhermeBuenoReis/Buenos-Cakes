import { expect, test } from "@playwright/test";

function getQueryParam(url: string, key: string) {
	return new URL(url).searchParams.get(key);
}

function isFirstPageParam(value: string | null) {
	return value === "1" || value === null;
}

test.describe("Products catalog filters", () => {
	test("applies sidebar filters only after clicking apply", async ({ page }) => {
		await page.goto("/products?page=2&rating=4");

		await expect(page.getByText("Mostrando 4 de 12 produtos")).toBeVisible();

		await page.getByLabel("Avaliação mínima de 3 estrelas").check();

		await expect.poll(() => getQueryParam(page.url(), "rating")).toBe("4");
		await expect(page.getByText("Mostrando 4 de 12 produtos")).toBeVisible();

		await page.getByRole("button", { name: "Aplicar Filtros" }).click();

		await expect.poll(() => getQueryParam(page.url(), "rating")).toBe("3");
		await expect
			.poll(() => isFirstPageParam(getQueryParam(page.url(), "page")))
			.toBeTruthy();
		await expect(page.getByText("Mostrando 8 de 12 produtos")).toBeVisible();
	});

	test("applies sort immediately and resets pagination", async ({ page }) => {
		await page.goto("/products?page=2&sort=popular");

		await expect(page.getByText("Mostrando 4 de 12 produtos")).toBeVisible();

		await page.getByRole("combobox").click();
		await page.getByRole("option", { name: "Menor Preço" }).click();

		await expect.poll(() => getQueryParam(page.url(), "sort")).toBe("price-asc");
		await expect
			.poll(() => isFirstPageParam(getQueryParam(page.url(), "page")))
			.toBeTruthy();
		await expect(page.getByText("Mostrando 8 de 12 produtos")).toBeVisible();
		await expect(page.getByRole("heading", { name: "Cupcake Berry Bliss" })).toBeVisible();
	});
});
