import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CheckoutPersonalInfoForm } from "./checkout-person-info-form";

describe("CheckoutPersonalInfoForm", () => {
	it("renders the personal information fields with expected labels and placeholders", () => {
		render(<CheckoutPersonalInfoForm />);

		expect(screen.getByLabelText("Nome Completo")).toHaveAttribute(
			"placeholder",
			"Ex: Ana Silva",
		);
		expect(screen.getByLabelText("E-mail")).toHaveAttribute(
			"placeholder",
			"ana.silva@exemplo.com",
		);
		expect(screen.getByLabelText("E-mail")).toHaveAttribute("type", "email");
		expect(screen.getByLabelText("WhatsApp / Telefone")).toHaveAttribute(
			"placeholder",
			"(11) 99999-9999",
		);
		expect(screen.getByLabelText("WhatsApp / Telefone")).toHaveAttribute(
			"type",
			"tel",
		);
	});

	it("validates the fields with zod messages and clears them after valid input", async () => {
		const user = userEvent.setup();

		render(<CheckoutPersonalInfoForm />);

		const fullNameInput = screen.getByLabelText("Nome Completo");
		const emailInput = screen.getByLabelText("E-mail");
		const phoneInput = screen.getByLabelText("WhatsApp / Telefone");

		await user.click(fullNameInput);
		await user.tab();
		await user.type(emailInput, "ana");
		await user.tab();
		await user.type(phoneInput, "12345");
		await user.tab();

		expect(screen.getByText("Informe seu nome completo.")).toBeVisible();
		expect(screen.getByText("Informe um e-mail válido.")).toBeVisible();
		expect(screen.getByText("Informe um telefone válido.")).toBeVisible();
		expect(fullNameInput).toHaveAttribute("aria-invalid", "true");
		expect(emailInput).toHaveAttribute("aria-invalid", "true");
		expect(phoneInput).toHaveAttribute("aria-invalid", "true");

		await user.type(fullNameInput, "Ana Silva");
		await user.clear(emailInput);
		await user.type(emailInput, "ana.silva@exemplo.com");
		await user.clear(phoneInput);
		await user.type(phoneInput, "(11) 99999-9999");
		await user.tab();

		expect(
			screen.queryByText("Informe seu nome completo."),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText("Informe um e-mail válido."),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText("Informe um telefone válido."),
		).not.toBeInTheDocument();
		expect(fullNameInput).toHaveAttribute("aria-invalid", "false");
		expect(emailInput).toHaveAttribute("aria-invalid", "false");
		expect(phoneInput).toHaveAttribute("aria-invalid", "false");
	});
});
