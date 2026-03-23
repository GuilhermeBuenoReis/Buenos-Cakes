import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CheckoutCustomerProvider } from "../_context/checkout-customer-context";
import { CheckoutPersonalInfoForm } from "./checkout-person-info-form";

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

function renderCheckoutPersonalInfoForm() {
	return render(
		<CheckoutCustomerProvider>
			<CheckoutPersonalInfoForm />
		</CheckoutCustomerProvider>,
	);
}

describe("CheckoutPersonalInfoForm", () => {
	it("renders the personal information fields with expected labels and placeholders", () => {
		renderCheckoutPersonalInfoForm();

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
		renderCheckoutPersonalInfoForm();

		const fullNameInput = screen.getByLabelText("Nome Completo");
		const emailInput = screen.getByLabelText("E-mail");
		const phoneInput = screen.getByLabelText("WhatsApp / Telefone");

		fireEvent.blur(fullNameInput);
		fireEvent.change(emailInput, { target: { value: "ana" } });
		fireEvent.blur(emailInput);
		fireEvent.change(phoneInput, { target: { value: "12345" } });
		fireEvent.blur(phoneInput);

		expect(await screen.findByText("Informe seu nome completo.")).toBeVisible();
		expect(screen.getByText("Informe um e-mail válido.")).toBeVisible();
		expect(screen.getByText("Informe um telefone válido.")).toBeVisible();
		expect(fullNameInput).toHaveAttribute("aria-invalid", "true");
		expect(emailInput).toHaveAttribute("aria-invalid", "true");
		expect(phoneInput).toHaveAttribute("aria-invalid", "true");

		fireEvent.change(fullNameInput, { target: { value: "Ana Silva" } });
		fireEvent.blur(fullNameInput);
		fireEvent.change(emailInput, {
			target: { value: "ana.silva@exemplo.com" },
		});
		fireEvent.blur(emailInput);
		fireEvent.change(phoneInput, {
			target: { value: "(11) 99999-9999" },
		});
		fireEvent.blur(phoneInput);

		await waitFor(() => {
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
});
