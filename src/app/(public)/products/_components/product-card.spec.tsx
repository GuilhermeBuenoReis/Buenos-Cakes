import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Product } from "@/api/products/types";
import { ProductCard } from "./product-card";

const product: Product = {
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

describe("ProductCard", () => {
	it("renders the product data, details link and action buttons", () => {
		render(<ProductCard product={product} />);

		expect(
			screen.getByRole("link", {
				name: `Ver detalhes de ${product.name}`,
			}),
		).toHaveAttribute("href", `/products/${product.id}`);
		expect(screen.getByAltText(product.name)).toBeVisible();
		expect(screen.getByText(product.category)).toBeVisible();
		expect(
			screen.getByText(/145,90/, {
				selector: "strong",
			}),
		).toBeVisible();
		expect(
			screen.getByRole("button", {
				name: `Favoritar ${product.name}`,
			}),
		).toBeVisible();
		expect(
			screen.getByRole("button", {
				name: `Adicionar ${product.name} ao carrinho`,
			}),
		).toBeVisible();
	});
});
