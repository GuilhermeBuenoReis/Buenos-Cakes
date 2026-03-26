import { expect, test } from "@playwright/test";

test.describe("Auth", () => {
	test("validates sign-in and navigates to sign-up", async ({ page }) => {
		await page.goto("/sign-in");

		await expect(page.getByText("Bem-vindo de volta")).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Entrar com Google" }),
		).toBeVisible();

		await page.getByRole("button", { exact: true, name: "Entrar" }).click();

		await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
		await expect(page.getByText("Informe sua senha.")).toBeVisible();

		await page.getByRole("link", { name: "Criar conta" }).click();

		await expect(page).toHaveURL(/\/sign-up$/);
		await expect(page.getByText("Crie sua conta")).toBeVisible();
	});

	test("validates sign-up and navigates back to sign-in", async ({ page }) => {
		await page.goto("/sign-up");

		await expect(page.getByText("Crie sua conta")).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Criar conta com Google" }),
		).toBeVisible();

		await page.getByLabel("Nome completo").fill("João");
		await page.getByLabel("E-mail").fill("joao");
		await page.getByLabel("Senha", { exact: true }).fill("123");
		await page.getByLabel("Confirmar senha", { exact: true }).fill("456");
		await page
			.getByRole("button", { exact: true, name: "Criar conta" })
			.click();

		await expect(page.getByText("Digite nome e sobrenome.")).toBeVisible();
		await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
		await expect(
			page.getByText("A senha deve ter pelo menos 8 caracteres."),
		).toBeVisible();
		await expect(page.getByText("As senhas não coincidem.")).toBeVisible();

		await page.getByRole("link", { name: "Entrar" }).click();

		await expect(page).toHaveURL(/\/sign-in$/);
		await expect(page.getByText("Bem-vindo de volta")).toBeVisible();
	});
});
