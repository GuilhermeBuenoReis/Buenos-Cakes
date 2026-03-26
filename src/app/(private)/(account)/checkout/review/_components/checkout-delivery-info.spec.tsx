import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckoutDeliveryInfo } from "./checkout-delivery-info";

const baseProps = {
	address: "Rua das Flores, 123 - Jardim Doce, São Paulo - SP",
	dateLabel: "sábado, 22 de março",
	locationName: "DoceGestão Matriz",
	note: "Retirada confirmada no balcão principal da loja.",
	timeLabel: "14:00",
	typeLabel: "Retirada no local",
};

describe("CheckoutDeliveryInfo", () => {
	it("renders the full delivery information card", () => {
		render(<CheckoutDeliveryInfo {...baseProps} />);

		expect(screen.getByText("Entrega ou retirada")).toBeVisible();
		expect(screen.getByText("Modalidade")).toBeVisible();
		expect(
			screen.getByText("Retirada confirmada no balcão principal da loja."),
		).toBeVisible();
		expect(screen.getByText("Local de retirada")).toBeVisible();
		expect(screen.getByText(baseProps.address)).toBeVisible();
		expect(screen.getByText("Às 14:00")).toBeVisible();
	});

	it("renders the compact schedule version", () => {
		render(<CheckoutDeliveryInfo {...baseProps} compact />);

		expect(screen.getByText("Agendamento")).toBeVisible();
		expect(screen.getByText(baseProps.dateLabel)).toBeVisible();
		expect(screen.getByText(baseProps.locationName)).toBeVisible();
	});
});
