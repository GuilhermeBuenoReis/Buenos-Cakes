import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckoutCustomerInfo } from "./checkout-customer-info";

describe("CheckoutCustomerInfo", () => {
	it("renders the collected customer information", () => {
		render(
			<CheckoutCustomerInfo
				customer={{
					email: "ana.souza@exemplo.com",
					fullName: "Ana Beatriz Souza",
					phone: "(11) 99876-5432",
				}}
			/>,
		);

		expect(screen.getByText("Dados do cliente")).toBeVisible();
		expect(screen.getByText("Ana Beatriz Souza")).toBeVisible();
		expect(screen.getByText("ana.souza@exemplo.com")).toBeVisible();
		expect(screen.getByText("(11) 99876-5432")).toBeVisible();
		expect(screen.getByRole("link", { name: "Editar" })).toHaveAttribute(
			"href",
			"/checkout",
		);
	});

	it("shows fallback labels when the customer data is missing", () => {
		render(
			<CheckoutCustomerInfo
				customer={{
					email: "",
					fullName: "",
					phone: "",
				}}
			/>,
		);

		expect(screen.getAllByText("Não informado")).toHaveLength(3);
	});
});
