import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
	resetOrderHistoryStore,
	seedOrderHistoryStore,
} from "@/stores/order-history-store";
import { createConfirmedOrderSeed } from "@/test/order-history-seed";
import { ProfilePersonalInfoCard } from "./profile-personal-info-card";

describe("ProfilePersonalInfoCard", () => {
	beforeEach(() => {
		resetOrderHistoryStore();
	});

	it("renders the personal data fields and edit action", () => {
		seedOrderHistoryStore([createConfirmedOrderSeed()]);
		render(<ProfilePersonalInfoCard />);

		expect(
			screen.getByRole("heading", { name: "Informações Pessoais" }),
		).toBeVisible();
		expect(screen.getByText("Ana Beatriz Souza")).toBeVisible();
		expect(screen.getByText("ana.souza@exemplo.com")).toBeVisible();
		expect(screen.getByText("(11) 99876-5432")).toBeVisible();
		expect(screen.getByText("***.456.789-**")).toBeVisible();
		expect(
			screen.getByRole("button", { name: "Editar perfil" }),
		).toBeDisabled();
	});
});
