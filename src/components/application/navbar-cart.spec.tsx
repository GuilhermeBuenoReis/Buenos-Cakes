import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter, type UrlUpdateEvent } from "nuqs/adapters/testing";
import { describe, expect, it, vi } from "vitest";
import { CartSheetProvider } from "@/contexts/cart-sheet-context";
import { NavbarCart } from "./navbar-cart";

describe("NavbarCart", () => {
	it("opens the empty sheet and allows closing", async () => {
		const user = userEvent.setup();
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		render(
			<NuqsTestingAdapter hasMemory onUrlUpdate={onUrlUpdate}>
				<CartSheetProvider>
					<NavbarCart />
				</CartSheetProvider>
			</NuqsTestingAdapter>,
		);

		const cartButton = screen.getByRole("button", { name: "Carrinho" });

		expect(cartButton).toHaveTextContent("0");

		await user.click(cartButton);

		expect(screen.getByRole("heading", { name: "Meu Carrinho" })).toBeVisible();
		expect(screen.getByText("Seu carrinho esta vazio")).toBeVisible();
		expect(screen.getAllByText("R$ 0,00")).toHaveLength(2);
		expect(onUrlUpdate.mock.lastCall?.[0].searchParams.get("cart")).toBe(
			"true",
		);

		await user.click(screen.getByRole("button", { name: "Fechar carrinho" }));

		expect(
			screen.queryByRole("heading", { name: "Meu Carrinho" }),
		).not.toBeInTheDocument();
		expect(onUrlUpdate.mock.lastCall?.[0].searchParams.get("cart")).toBeNull();
	});
});
