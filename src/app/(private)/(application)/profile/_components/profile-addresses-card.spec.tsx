import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfileAddressesCard } from "./profile-addresses-card";

describe("ProfileAddressesCard", () => {
	it("renders the saved addresses and support copy", () => {
		render(<ProfileAddressesCard />);

		expect(
			screen.getByRole("heading", { name: "Endereços salvos" }),
		).toBeVisible();
		expect(
			screen.getByText(
				"Referências prontas para agilizar novas entregas e retiradas.",
			),
		).toBeVisible();
		expect(screen.getByText("Casa")).toBeVisible();
		expect(screen.getByText("Boutique")).toBeVisible();
		expect(screen.getByText("Principal")).toBeVisible();
		expect(screen.getByText("Retirada")).toBeVisible();
		expect(screen.getByText("Rua das Camélias, 184")).toBeVisible();
		expect(
			screen.getByText("Ateliê Buenos'Cakes • Rua das Amoras, 52"),
		).toBeVisible();
	});
});
