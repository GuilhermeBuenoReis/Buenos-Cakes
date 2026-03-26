import { expect, test } from "@playwright/test";

test.describe("Navbar", () => {
	test("simulates clicks on navbar links", async ({ page }) => {
		await page.goto("/dashboard");

		const navbar = page.getByRole("banner");
		const homeLink = navbar.getByRole("link", { name: "Início" });
		const productsLink = navbar.getByRole("link", { name: "Produtos" });
		const aboutLink = navbar.getByRole("link", { name: "Sobre Nós" });
		const logoLink = navbar.getByRole("link", { name: "DoceGestão" });

		await expect(homeLink).toBeVisible();
		await expect(productsLink).toBeVisible();
		await expect(aboutLink).toBeVisible();
		await expect(logoLink).toBeVisible();

		await productsLink.click();
		await expect(page).toHaveURL(/\/products$/);

		await aboutLink.click();
		await expect(page).toHaveURL(/\/about$/);

		await homeLink.click();
		await expect(page).toHaveURL(/\/dashboard$/);

		await logoLink.click();
		await expect(page).toHaveURL(/\/dashboard$/);
	});

	test("simulates clicks on navbar action controls", async ({ page }) => {
		await page.goto("/dashboard");

		const navbar = page.getByRole("banner");
		const cartButton = page.getByRole("button", { name: "Carrinho" });
		const profileLink = navbar.getByRole("link", {
			exact: true,
			name: "Perfil",
		});

		await expect(cartButton).toBeVisible();
		await expect(profileLink).toBeVisible();
		await expect(cartButton.getByText("0")).toBeVisible();

		const currentPathname = new URL(page.url()).pathname;

		await cartButton.click();
		await expect(
			page.getByRole("heading", { name: "Meu Carrinho" }),
		).toBeVisible();
		await expect(page.getByText("Seu carrinho esta vazio")).toBeVisible();
		await expect
			.poll(() => {
				const url = new URL(page.url());

				return {
					cart: url.searchParams.get("cart"),
					pathname: url.pathname,
				};
			})
			.toEqual({
				cart: "true",
				pathname: currentPathname,
			});

		await page.getByRole("button", { name: "Fechar carrinho" }).click();
		await expect(
			page.getByRole("heading", { name: "Meu Carrinho" }),
		).not.toBeVisible();
		await expect
			.poll(() => {
				const url = new URL(page.url());

				return {
					cart: url.searchParams.get("cart"),
					pathname: url.pathname,
				};
			})
			.toEqual({
				cart: null,
				pathname: currentPathname,
			});

		await profileLink.click();
		await expect(page).toHaveURL(/\/profile$/);
		await expect(profileLink).toHaveAttribute("aria-current", "page");
	});
});
