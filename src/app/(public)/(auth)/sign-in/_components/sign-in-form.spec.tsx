import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SignInForm } from "./sign-in-form";

describe("SignInForm", () => {
	it("renders the expected fields and navigation links", () => {
		render(<SignInForm />);

		expect(screen.getByLabelText("E-mail")).toHaveAttribute(
			"placeholder",
			"voce@exemplo.com",
		);
		expect(screen.getByLabelText("E-mail")).toHaveAttribute("type", "email");
		expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
		expect(
			screen.getByRole("button", { name: "Entrar com Google" }),
		).toBeVisible();
		expect(screen.getByRole("link", { name: "Criar conta" })).toHaveAttribute(
			"href",
			"/sign-up",
		);
	});

	it("validates the fields and clears the messages after valid input", async () => {
		const user = userEvent.setup();

		render(<SignInForm />);

		const emailInput = screen.getByLabelText("E-mail");
		const passwordInput = screen.getByLabelText("Senha");
		const submitButton = screen.getByRole("button", { name: "Entrar" });

		await user.click(submitButton);

		expect(await screen.findByText("Informe um e-mail válido.")).toBeVisible();
		expect(screen.getByText("Informe sua senha.")).toBeVisible();
		expect(emailInput).toHaveAttribute("aria-invalid", "true");
		expect(passwordInput).toHaveAttribute("aria-invalid", "true");

		await user.type(emailInput, "ana.silva@exemplo.com");
		await user.type(passwordInput, "segredo123");
		await user.click(submitButton);

		await waitFor(() => {
			expect(
				screen.queryByText("Informe um e-mail válido."),
			).not.toBeInTheDocument();
			expect(screen.queryByText("Informe sua senha.")).not.toBeInTheDocument();
			expect(emailInput).toHaveAttribute("aria-invalid", "false");
			expect(passwordInput).toHaveAttribute("aria-invalid", "false");
		});
	});
});
