import { expect, type Page, test } from "@playwright/test";

async function goToCheckoutFromCart(page: Page) {
	const cartDialog = page.getByRole("dialog", { name: "Meu Carrinho" });
	const checkoutButton = cartDialog.getByRole("button", {
		exact: true,
		name: "Finalizar Pedido",
	});

	await expect(checkoutButton).toBeVisible();
	await expect(checkoutButton).toBeEnabled();

	await Promise.all([page.waitForURL(/\/checkout$/), checkoutButton.click()]);
}

async function goToCheckoutPayment(
	page: Page,
	customer: {
		email: string;
		fullName: string;
		phone: string;
	},
) {
	await page.goto("/products");

	await page
		.getByRole("button", {
			name: "Adicionar Bolo Red Velvet Premium ao carrinho",
		})
		.click();

	await goToCheckoutFromCart(page);
	await page.getByLabel("Nome Completo").fill(customer.fullName);
	await page.getByLabel("E-mail").fill(customer.email);
	await page.getByLabel("WhatsApp / Telefone").fill(customer.phone);
	await page.getByRole("button", { name: "Próximo Passo" }).click();

	await expect(page).toHaveURL(/\/checkout\/payment$/);
}

async function goToCheckoutReview(
	page: Page,
	customer: {
		email: string;
		fullName: string;
		phone: string;
	},
) {
	await goToCheckoutPayment(page, customer);
	await page.getByRole("link", { name: "Continuar para revisão" }).click();

	await expect(page).toHaveURL(/\/checkout\/review$/);
}

test.describe("Checkout additional flows", () => {
	test("preserves cash payment details when returning from review to payment", async ({
		page,
	}) => {
		await goToCheckoutPayment(page, {
			email: "beatriz@exemplo.com",
			fullName: "Beatriz Almeida",
			phone: "(11) 97777-1111",
		});

		await page.locator("label").filter({ hasText: "Dinheiro" }).click();
		await expect(page.getByLabel("Precisa de troco?")).toBeVisible();
		await page.getByLabel("Precisa de troco?").fill("100,00");
		await page.getByRole("link", { name: "Continuar para revisão" }).click();

		await expect(page).toHaveURL(/\/checkout\/review$/);
		await expect(page.getByText("Dinheiro", { exact: true })).toBeVisible();
		await expect(page.getByText("Troco solicitado para 100,00.")).toBeVisible();

		await page.getByRole("link", { name: "Voltar para pagamento" }).click();

		await expect(page).toHaveURL(/\/checkout\/payment$/);
		await expect(page.getByText("Forma selecionada")).toBeVisible();
		await expect(page.getByLabel("Precisa de troco?")).toHaveValue("100,00");
	});

	test("returns to products with the cart open when editing an item from review", async ({
		page,
	}) => {
		await goToCheckoutReview(page, {
			email: "camila@exemplo.com",
			fullName: "Camila Araujo",
			phone: "(11) 96666-2222",
		});

		await page.getByRole("link", { name: "Editar item" }).click();

		await expect(page).toHaveURL(/\/products\?cart=true$/);
		await expect(
			page.getByRole("heading", { name: "Meu Carrinho" }),
		).toBeVisible();
		await expect(
			page.getByRole("dialog").getByRole("heading", {
				name: "Bolo Red Velvet Premium",
			}),
		).toBeVisible();
	});
});
