import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Product } from "@/api/products/types";

const mocks = vi.hoisted(() => ({
	getProductById: vi.fn(),
	getProducts: vi.fn(),
	notFound: vi.fn(() => {
		throw new Error("NEXT_NOT_FOUND");
	}),
	productDetailsProvider: vi.fn(),
	productDetailsContentClient: vi.fn(),
}));

vi.mock("@/api/products", () => ({
	getProductById: mocks.getProductById,
	getProducts: mocks.getProducts,
}));

vi.mock("next/navigation", () => ({
	notFound: mocks.notFound,
}));

vi.mock("../_context/product-details-context", () => ({
	ProductDetailsProvider: ({
		children,
		...props
	}: {
		children: React.ReactNode;
	}) => {
		mocks.productDetailsProvider(props);
		return <div data-testid="product-details-provider">{children}</div>;
	},
}));

vi.mock("./product-details-content-client", () => ({
	ProductDetailsContentClient: (props: unknown) => {
		mocks.productDetailsContentClient(props);
		return <div data-testid="product-details-content-client" />;
	},
}));

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

describe("ProductDetailsContent", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches the product data inside the component and filters related images", async () => {
		const relatedProducts: Product[] = [
			{
				...baseProduct,
				id: "prd_rel_1",
				name: "Cupcake Berry Bliss",
			},
			{
				...baseProduct,
				id: "prd_rel_2",
				name: "Bolo de Cenoura Vovo",
			},
			{
				...baseProduct,
				id: "prd_rel_3",
				name: "Bolo Chocolate Supremo",
			},
			{
				...baseProduct,
				id: "prd_rel_4",
				name: "Bolo Brigadeiro Intenso",
			},
			{
				...baseProduct,
				id: "prd_rel_5",
				name: "Bolo de Leite Ninho",
			},
			{
				...baseProduct,
				category: "Cookies",
				id: "prd_cookie_1",
				name: "Double Choc Cookie",
			},
		];

		mocks.getProductById.mockResolvedValue(baseProduct);
		mocks.getProducts.mockResolvedValue([baseProduct, ...relatedProducts]);

		render(await ProductDetailsContent({ productId: baseProduct.id }));

		expect(screen.getByTestId("product-details-provider")).toBeVisible();
		expect(screen.getByTestId("product-details-content-client")).toBeVisible();
		expect(mocks.getProductById).toHaveBeenCalledWith({
			id: baseProduct.id,
		});
		expect(mocks.getProducts).toHaveBeenCalledWith();
		expect(mocks.productDetailsProvider).toHaveBeenCalledWith({
			product: baseProduct,
			relatedImages: relatedProducts.slice(0, 4),
		});
		expect(mocks.productDetailsContentClient).toHaveBeenCalledWith({});
	});

	it("calls notFound when the requested product does not exist", async () => {
		mocks.getProductById.mockResolvedValue(null);
		mocks.getProducts.mockResolvedValue([]);

		await expect(
			ProductDetailsContent({
				productId: "prd_nao_existe",
			}),
		).rejects.toThrow("NEXT_NOT_FOUND");

		expect(mocks.notFound).toHaveBeenCalledTimes(1);
	});
});
