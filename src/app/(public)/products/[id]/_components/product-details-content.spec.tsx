import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Product } from "@/api/products/types";
import { formatPrice } from "@/lib/format-price";
import { ProductDetailsContent } from "./product-details-content";

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
	product = baseProduct,
	relatedImages = relatedProducts,
}: {
	product?: Product;
	relatedImages?: Product[];
} = {}) {
	return render(
		<ProductDetailsContent product={product} relatedImages={relatedImages} />,
	);
}

describe("ProductDetailsContent", () => {
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
		expect(screen.getByAltText(relatedProducts[0].name)).toBeVisible();
		expect(screen.getByAltText(relatedProducts[1].name)).toBeVisible();
	});

	it("updates size and quantity while keeping the minimum quantity as one", async () => {
		const user = userEvent.setup();

		renderComponent();

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
		await user.click(increaseButton);
		await user.click(increaseButton);
		await user.click(decreaseButton);
		await user.click(decreaseButton);
		await user.click(decreaseButton);

		expect(largeSizeButton).toHaveAttribute("aria-pressed", "true");
		expect(smallSizeButton).toHaveAttribute("aria-pressed", "false");
		expect(quantityInput).toHaveValue("1");
	});

	it("limits the personalized message and derives the default filling from the category", async () => {
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
		});

		const messageInput = screen.getByLabelText("Mensagem personalizada");
		const fillingTrigger = screen.getByRole("combobox", {
			name: "Selecionar recheio extra",
		});

		await user.type(messageInput, "a".repeat(55));

		expect(messageInput).toHaveValue("a".repeat(50));
		expect(screen.getByText("50/50")).toBeVisible();
		expect(screen.getAllByAltText(cookieProduct.name)).toHaveLength(2);
		expect(fillingTrigger).toHaveTextContent("Chocolate Intenso");
	});
});
