import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckoutPickupLocationCard } from "./checkout-pickup-location-card";

describe("CheckoutPickupLocationCard", () => {
	it("renders the pickup location details", () => {
		render(
			<CheckoutPickupLocationCard
				location={{
					address: "Rua das Flores, 123 - Jardim Doce, São Paulo - SP",
					name: "DoceGestão Matriz",
					note: "Aberto hoje até as 19:00",
				}}
			/>,
		);

		expect(
			screen.getByRole("heading", { name: "Detalhes da Retirada" }),
		).toBeVisible();
		expect(screen.getByText("Retirada no local")).toBeVisible();
		expect(
			screen.getByRole("heading", { name: "DoceGestão Matriz" }),
		).toBeVisible();
		expect(
			screen.getByText("Rua das Flores, 123 - Jardim Doce, São Paulo - SP"),
		).toBeVisible();
		expect(screen.getByText("Aberto hoje até as 19:00")).toBeVisible();
	});
});
