import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NavbarCart } from "./navbar-cart";

describe("NavbarCart", () => {
	it("opens the sheet, updates the mock totals and allows closing", async () => {
		const user = userEvent.setup();

		render(<NavbarCart />);

		await user.click(screen.getByRole("button", { name: "Carrinho" }));

		expect(screen.getByRole("heading", { name: "Meu Carrinho" })).toBeVisible();
		expect(screen.getByText("Cento de Brigadeiros Gourmet")).toBeVisible();
		expect(screen.getAllByText("R$ 158,00")).toHaveLength(2);

		await user.click(
			screen.getByRole("button", {
				name: "Adicionar uma unidade de Cento de Brigadeiros Gourmet",
			}),
		);

		expect(screen.getAllByText("R$ 278,00")).toHaveLength(2);
		expect(screen.getAllByText("5")).toHaveLength(2);

		await user.click(screen.getByRole("button", { name: "Fechar carrinho" }));

		expect(
			screen.queryByRole("heading", { name: "Meu Carrinho" }),
		).not.toBeInTheDocument();
	});
});
