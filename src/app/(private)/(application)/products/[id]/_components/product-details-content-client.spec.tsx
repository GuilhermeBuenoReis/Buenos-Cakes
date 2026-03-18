import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter, type UrlUpdateEvent } from "nuqs/adapters/testing";
import { describe, expect, it, vi } from "vitest";
import type { Product } from "@/api/products/types";
import { NavbarCart } from "@/components/application/navbar-cart";
import { CartSheetProvider } from "@/contexts/cart-sheet-context";
import { formatPrice } from "@/lib/format-price";
import { ProductDetailsProvider } from "../_context/product-details-context";
import { ProductDetailsContentClient } from "./product-details-content-client";

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

const baseProduct: Product = {
	category: "Bolos",
	description:
		"Massa aveludada de cacau suave com recheio cremoso e acabamento sofisticado para ocasioes especiais.",
	id: "prd_8f3a92c1",
	image:
		"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=80",
	name: "Bolo Red Velvet Premium",
	popularity: 95,
	price: 145.9,
	rating: 4.8,
	reviews: 48,
};

const relatedProducts: Product[] = [
	{
		...baseProduct,
		id: "prd_f03dc9b7",
		image:
			"https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80",
		name: "Cupcake Berry Bliss",
		price: 9.5,
	},
	{
		...baseProduct,
		id: "prd_g52a18ed",
		image:
			"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=1200&q=80",
		name: "Bolo de Cenoura Vovo",
		price: 42,
	},
];

function renderComponent({
	onUrlUpdate,
	product = baseProduct,
	relatedImages = relatedProducts,
	searchParams = "",
}: {
	onUrlUpdate?: (event: UrlUpdateEvent) => void;
	product?: Product;
	relatedImages?: Product[];
	searchParams?: string;
} = {}) {
	return render(
		<NuqsTestingAdapter
			hasMemory={Boolean(onUrlUpdate)}
			onUrlUpdate={onUrlUpdate}
			searchParams={searchParams}
		>
			<CartSheetProvider>
				<NavbarCart />
				<ProductDetailsProvider product={product} relatedImages={relatedImages}>
					<ProductDetailsContentClient />
				</ProductDetailsProvider>
			</CartSheetProvider>
		</NuqsTestingAdapter>,
	);
}

describe("ProductDetailsContentClient", () => {
	it("renders the product information, breadcrumb links and related images", () => {
		renderComponent();

		expect(
			screen.getByRole("heading", { name: baseProduct.name }),
		).toBeVisible();
		expect(
			screen.getByText(
				(_, node) => node?.textContent === formatPrice(baseProduct.price),
			),
		).toBeVisible();
		expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute(
			"href",
			"/",
		);
		expect(screen.getByRole("link", { name: "Bolos" })).toHaveAttribute(
			"href",
			"/products",
		);
		expect(screen.getByText(`${baseProduct.name} - Pequeno`)).toBeVisible();
		expect(screen.getByAltText(relatedProducts[0].name)).toBeVisible();
		expect(screen.getByAltText(relatedProducts[1].name)).toBeVisible();
	});

	it("syncs size and quantity with the URL while keeping the minimum quantity as one", async () => {
		const user = userEvent.setup();
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		renderComponent({ onUrlUpdate });

		const smallSizeButton = screen.getByRole("button", {
			name: /Pequeno/i,
		});
		const largeSizeButton = screen.getByRole("button", {
			name: /Grande/i,
		});
		const decreaseButton = screen.getByRole("button", {
			name: "Diminuir quantidade",
		});
		const increaseButton = screen.getByRole("button", {
			name: "Aumentar quantidade",
		});
		const quantityInput = screen.getByLabelText("Quantidade");

		expect(smallSizeButton).toHaveAttribute("aria-pressed", "true");

		await user.click(largeSizeButton);
		await waitFor(() =>
			expect(screen.getByText(`${baseProduct.name} - Grande`)).toBeVisible(),
		);
		await user.click(increaseButton);
		await user.click(increaseButton);
		await user.click(decreaseButton);
		await user.click(decreaseButton);
		await user.click(decreaseButton);

		expect(largeSizeButton).toHaveAttribute("aria-pressed", "true");
		expect(smallSizeButton).toHaveAttribute("aria-pressed", "false");
		expect(quantityInput).toHaveValue("1");

		const lastUrlUpdate = onUrlUpdate.mock.lastCall?.[0];

		expect(lastUrlUpdate?.searchParams.get("size")).toBe("grande");
		expect(lastUrlUpdate?.searchParams.get("quantity")).toBeNull();
	});

	it("restores url state and limits the personalized message", async () => {
		const user = userEvent.setup();
		const cookieProduct: Product = {
			...baseProduct,
			category: "Cookies",
			id: "prd_i77ef1a2",
			name: "Cookie Pistache Crunch",
		};

		renderComponent({
			product: cookieProduct,
			relatedImages: [],
			searchParams:
				"?size=grande&quantity=3&filling=Doce+de+Leite&message=Parabens+Maria",
		});

		const messageInput = screen.getByLabelText("Mensagem personalizada");
		const fillingTrigger = screen.getByRole("combobox", {
			name: "Selecionar recheio extra",
		});
		const quantityInput = screen.getByLabelText("Quantidade");

		await user.type(messageInput, "a".repeat(55));

		expect(screen.getByText(`${cookieProduct.name} - Grande`)).toBeVisible();
		expect(messageInput).toHaveValue(`Parabens Maria${"a".repeat(36)}`);
		expect(screen.getByText("50/50")).toBeVisible();
		expect(screen.getAllByAltText(cookieProduct.name)).toHaveLength(2);
		expect(fillingTrigger).toHaveTextContent("Doce de Leite");
		expect(quantityInput).toHaveValue("3");
	});

	it("adds the configured product to the shared cart and updates the navbar counter", async () => {
		const user = userEvent.setup();
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		renderComponent({ onUrlUpdate });

		await user.click(
			screen.getByRole("button", {
				name: /Grande/i,
			}),
		);
		await waitFor(() =>
			expect(screen.getByText(`${baseProduct.name} - Grande`)).toBeVisible(),
		);
		await user.click(
			screen.getByRole("button", {
				name: "Aumentar quantidade",
			}),
		);
		await user.click(
			screen.getByRole("button", {
				name: "Aumentar quantidade",
			}),
		);
		await user.click(
			screen.getByRole("button", {
				name: "Adicionar ao Carrinho",
			}),
		);

		const cartButton = document.body.querySelector(
			'button[aria-label="Carrinho"]',
		);
		const cartDialog = screen.getByRole("dialog");

		expect(cartButton).toHaveTextContent("3");
		expect(within(cartDialog).getByText(baseProduct.name)).toBeVisible();
		expect(
			within(cartDialog).getByAltText(
				`Imagem de ${baseProduct.name} no carrinho`,
			),
		).toBeVisible();
		expect(
			within(cartDialog).getByText("Grande • Creme de Baunilha (Padrao)"),
		).toBeVisible();
		expect(within(cartDialog).getAllByText(/437,70/)).toHaveLength(3);
	});
});
