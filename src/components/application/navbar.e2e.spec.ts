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
		await expect(page).toHaveURL(/\/products#?$/);

		await homeLink.click();
		await expect(page).toHaveURL(/\/dashboard$/);

		await logoLink.click();
		await expect(page).toHaveURL(/\/dashboard$/);
	});

	test("simulates clicks on navbar action buttons", async ({ page }) => {
		await page.goto("/dashboard");

		const cartButton = page.getByRole("button", { name: "Carrinho" });
		const profileButton = page.getByRole("button", { name: "Perfil" });

		await expect(cartButton).toBeVisible();
		await expect(profileButton).toBeVisible();
		await expect(cartButton.getByText("4")).toBeVisible();

		const currentUrl = page.url();

		await cartButton.click();
		await expect(
			page.getByRole("heading", { name: "Meu Carrinho" }),
		).toBeVisible();
		await expect.poll(() => page.url()).toBe(currentUrl);

		await page.getByRole("button", { name: "Fechar carrinho" }).click();
		await expect(
			page.getByRole("heading", { name: "Meu Carrinho" }),
		).not.toBeVisible();

		await profileButton.click();
		await expect(profileButton).toBeFocused();
		await expect.poll(() => page.url()).toBe(currentUrl);
	});
});
