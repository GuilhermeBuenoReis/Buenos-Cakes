import { expect, test, type Page } from "@playwright/test";

async function confirmOrder(page: Page, customer: {
	email: string;
	fullName: string;
	phone: string;
}) {
	await page.goto("/products");

	await page
		.getByRole("button", {
			name: "Adicionar Bolo Red Velvet Premium ao carrinho",
		})
		.click();

	await page.getByRole("button", { name: "Finalizar Pedido" }).click();
	await page.getByLabel("Nome Completo").fill(customer.fullName);
	await page.getByLabel("E-mail").fill(customer.email);
	await page.getByLabel("WhatsApp / Telefone").fill(customer.phone);
	await page.getByRole("button", { name: "Próximo Passo" }).click();
	await page.getByRole("link", { name: "Continuar para revisão" }).click();
	await page.getByRole("button", { name: "Confirmar Pedido" }).click();

	await expect(page).toHaveURL(/\/profile#order-\d+$/);
}

test.describe("Profile", () => {
	test("shows the empty state and leads back to products", async ({ page }) => {
		await page.goto("/profile");

		await expect(
			page.getByText("Você ainda não confirmou nenhum pedido."),
		).toBeVisible();
		await page.getByRole("link", { name: "Explorar catálogo" }).click();

		await expect(page).toHaveURL(/\/products$/);
		await expect(
			page.getByRole("heading", { name: "Catálogo de Doces" }),
		).toBeVisible();
	});

	test("uses the newest order as the profile source and keeps newest orders first", async ({
		page,
	}) => {
		await confirmOrder(page, {
			email: "primeira@exemplo.com",
			fullName: "Ana Costa Lima",
			phone: "(11) 95555-1111",
		});

		await confirmOrder(page, {
			email: "segunda@exemplo.com",
			fullName: "Bruna Souza Alves",
			phone: "(11) 94444-2222",
		});

		await expect(page.getByText("Bruna Souza Alves")).toBeVisible();
		await expect(page.getByText("segunda@exemplo.com")).toBeVisible();
		await expect(page.getByText("(11) 94444-2222")).toBeVisible();
		await expect(
			page.getByRole("heading", { name: "Bruna Souza" }),
		).toBeVisible();

		const orderRows = page.locator("tbody tr");

		await expect(orderRows).toHaveCount(2);
		await expect(orderRows.nth(0)).toContainText("#9483");
		await expect(orderRows.nth(1)).toContainText("#9482");
	});
});
