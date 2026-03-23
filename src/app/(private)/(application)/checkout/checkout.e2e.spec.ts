import { expect, test } from "@playwright/test";
import dayjs from "dayjs";
import {
	formatPickupSummaryDate,
	getInitialPickupDate,
} from "./_components/checkout-pickup-scheduler";

test.describe("Checkout", () => {
	test("navigates from the cart to checkout and preserves the order summary", async ({
		page,
	}) => {
		await page.goto("/products");

		await page
			.getByRole("button", {
				name: "Adicionar Bolo Red Velvet Premium ao carrinho",
			})
			.click();

		await expect(
			page.getByRole("heading", { name: "Meu Carrinho" }),
		).toBeVisible();

		await page.getByRole("button", { name: "Finalizar Pedido" }).click();

		await expect(page).toHaveURL(/\/checkout$/);
		await expect(
			page.getByRole("heading", { name: "Finalizar Pedido" }),
		).toBeVisible();
		await expect(page.getByText("Bolo Red Velvet Premium")).toBeVisible();
		await expect(page.getByText("Qtd. 1")).toBeVisible();
		await expect(page.getByText("1 item")).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Ir para Pagamento" }),
		).toBeVisible();
	});

	test("shows the empty state and disabled actions when opening checkout without cart items", async ({
		page,
	}) => {
		await page.goto("/checkout");

		await expect(
			page.getByText("Seu carrinho ainda está vazio."),
		).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Próximo Passo" }),
		).toBeDisabled();
		await expect(
			page.getByRole("button", { name: "Ir para Pagamento" }),
		).toBeDisabled();
		await expect(page.getByTestId("pickup-schedule-summary")).toHaveText(
			"Às 14:00",
		);
	});

	test("updates the pickup summary after changing the pickup date directly on checkout", async ({
		page,
	}) => {
		await page.goto("/checkout");
		await page.getByRole("button", { name: "Escolher no calendário" }).click();

		const calendarPanel = page.getByTestId("pickup-calendar-panel");
		await expect(calendarPanel).toBeVisible();

		const calendarOnlyDate = dayjs(getInitialPickupDate())
			.add(7, "day")
			.toDate();

		await calendarPanel
			.locator(
				`button[data-day="${dayjs(calendarOnlyDate).format("YYYY-MM-DD")}"]`,
			)
			.click();

		await expect(calendarPanel).not.toBeVisible();
		await expect(page.getByTestId("pickup-date-summary")).toHaveText(
			formatPickupSummaryDate(calendarOnlyDate),
		);
		await expect(page.getByTestId("pickup-schedule-summary")).toHaveText(
			"Às 14:00",
		);
	});

	test("returns to products with cart query when clicking back to cart", async ({
		page,
	}) => {
		await page.goto("/checkout");

		await page.getByRole("link", { name: "Voltar ao Carrinho" }).click();

		await expect(page).toHaveURL(/\/products\?cart=true$/);
	});

	test("moves to the payment step when clicking next step", async ({
		page,
	}) => {
		await page.goto("/products");

		await page
			.getByRole("button", {
				name: "Adicionar Bolo Red Velvet Premium ao carrinho",
			})
			.click();

		await page.getByRole("button", { name: "Finalizar Pedido" }).click();
		await page.getByLabel("Nome Completo").fill("Ana Beatriz Souza");
		await page.getByLabel("E-mail").fill("ana.souza@exemplo.com");
		await page.getByLabel("WhatsApp / Telefone").fill("(11) 99876-5432");
		await page.getByRole("button", { name: "Próximo Passo" }).click();

		await expect(page).toHaveURL(/\/checkout\/payment$/);
		await expect(
			page.getByRole("heading", { name: "Pagamento do Pedido" }),
		).toBeVisible();
		await expect(page.getByText("Escolha como deseja pagar")).toBeVisible();
	});

	test("stays on checkout and shows validation errors when personal info is missing", async ({
		page,
	}) => {
		await page.goto("/products");

		await page
			.getByRole("button", {
				name: "Adicionar Bolo Red Velvet Premium ao carrinho",
			})
			.click();

		await page.getByRole("button", { name: "Finalizar Pedido" }).click();
		await page.getByRole("button", { name: "Próximo Passo" }).click();

		await expect(page).toHaveURL(/\/checkout$/);
		await expect(page.getByText("Informe seu nome completo.")).toBeVisible();
		await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
		await expect(page.getByText("Informe seu telefone.")).toBeVisible();
	});

	test("reviews the collected order data before confirmation", async ({
		page,
	}) => {
		await page.goto("/products");

		await page
			.getByRole("button", {
				name: "Adicionar Bolo Red Velvet Premium ao carrinho",
			})
			.click();

		await page.getByRole("button", { name: "Finalizar Pedido" }).click();

		await page.getByLabel("Nome Completo").fill("Ana Beatriz Souza");
		await page.getByLabel("E-mail").fill("ana.souza@exemplo.com");
		await page.getByLabel("WhatsApp / Telefone").fill("(11) 99876-5432");

		await page.getByRole("button", { name: "Próximo Passo" }).click();
		await expect(page).toHaveURL(/\/checkout\/payment$/);

		await page.locator("label").filter({ hasText: "Cartão de débito" }).click();
		await page.getByRole("link", { name: "Continuar para revisão" }).click();

		await expect(page).toHaveURL(/\/checkout\/review$/);
		await expect(
			page.getByRole("heading", { name: "Revisão do Pedido" }),
		).toBeVisible();
		await expect(page.getByText("Bolo Red Velvet Premium")).toBeVisible();
		await expect(page.getByText("Ana Beatriz Souza")).toBeVisible();
		await expect(page.getByText("ana.souza@exemplo.com")).toBeVisible();
		await expect(page.getByText("(11) 99876-5432")).toBeVisible();
		await expect(
			page.getByText("Cartão de débito", { exact: true }),
		).toBeVisible();
		await expect(page.getByText("Às 14:00").first()).toBeVisible();
		await expect(
			page.getByRole("link", { name: "Voltar para pagamento" }),
		).toHaveAttribute("href", "/checkout/payment");
		await expect(
			page.getByRole("button", { name: "Confirmar Pedido" }),
		).toBeEnabled();
	});
});
