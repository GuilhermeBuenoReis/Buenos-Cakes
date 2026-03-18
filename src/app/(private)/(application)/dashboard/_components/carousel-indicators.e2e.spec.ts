import { expect, test } from "@playwright/test";

function getQueryParam(url: string, key: string) {
	return new URL(url).searchParams.get(key);
}

test.describe("nuqs useQueryState", () => {
	test("reads activeIndex from URL and falls back on invalid value", async ({
		page,
	}) => {
		await page.goto("/dashboard?activeIndex=2");

		await expect.poll(() => getQueryParam(page.url(), "activeIndex")).toBe("2");
		await expect(
			page.getByRole("button", { name: "Ir para imagem 3" }),
		).toHaveClass(/w-5/);

		await page.goto("/dashboard?activeIndex=abc");

		await expect(
			page.getByRole("button", { name: "Ir para imagem 1" }),
		).toHaveClass(/w-5/);

		await page.goto("/dashboard?activeIndex=");

		await expect(
			page.getByRole("button", { name: "Ir para imagem 1" }),
		).toHaveClass(/w-5/);
	});

	test("preserves existing query params when updating activeIndex", async ({
		page,
	}) => {
		await page.goto("/dashboard?foo=bar&activeIndex=1");

		await page.getByRole("button", { name: "Ir para imagem 3" }).click();

		await expect.poll(() => getQueryParam(page.url(), "foo")).toBe("bar");
		await expect.poll(() => getQueryParam(page.url(), "activeIndex")).toBe("2");
	});
});
