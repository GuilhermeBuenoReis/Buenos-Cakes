import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CartSheetProvider } from "@/contexts/cart-sheet-context";
import { NavbarCart } from "./navbar-cart";

describe("NavbarCart", () => {
	it("opens the empty sheet and allows closing", async () => {
		const user = userEvent.setup();

		render(
			<CartSheetProvider>
				<NavbarCart />
			</CartSheetProvider>,
		);

		const cartButton = screen.getByRole("button", { name: "Carrinho" });

		expect(cartButton).toHaveTextContent("0");

		await user.click(cartButton);

		expect(screen.getByRole("heading", { name: "Meu Carrinho" })).toBeVisible();
		expect(screen.getByText("Seu carrinho esta vazio")).toBeVisible();
		expect(screen.getAllByText("R$ 0,00")).toHaveLength(2);

		await user.click(screen.getByRole("button", { name: "Fechar carrinho" }));

		expect(
			screen.queryByRole("heading", { name: "Meu Carrinho" }),
		).not.toBeInTheDocument();
	});
});
