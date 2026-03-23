import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter, type UrlUpdateEvent } from "nuqs/adapters/testing";
import { describe, expect, it, vi } from "vitest";
import { CartSheetProvider, useCartSheet } from "@/contexts/cart-sheet-context";
import { NavbarCart } from "./navbar-cart";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: pushMock,
	}),
}));

function AddTestCartItemButton() {
	const { addItem } = useCartSheet();

	return (
		<button
			type="button"
			onClick={() =>
				addItem({
					highlight: "Bolos",
					id: "prd_8f3a92c1",
					image:
						"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=80",
					name: "Bolo Red Velvet Premium",
					unitPrice: 145.9,
				})
			}
		>
			Adicionar item de teste
		</button>
	);
}

describe("NavbarCart", () => {
	it("opens the empty sheet and allows closing", async () => {
		const user = userEvent.setup();
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		pushMock.mockReset();

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

	it("renders the checkout link when the cart has items", async () => {
		const user = userEvent.setup();

		pushMock.mockReset();

		render(
			<NuqsTestingAdapter hasMemory>
				<CartSheetProvider>
					<AddTestCartItemButton />
					<NavbarCart />
				</CartSheetProvider>
			</NuqsTestingAdapter>,
		);

		await user.click(
			screen.getByRole("button", { name: "Adicionar item de teste" }),
		);
		await user.click(
			await screen.findByRole("button", { name: "Finalizar Pedido" }),
		);

		expect(pushMock).toHaveBeenCalledWith("/checkout");
	});
});
