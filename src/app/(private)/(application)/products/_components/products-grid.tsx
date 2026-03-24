"use client";

import { useProductsCatalog } from "../_context/products-catalog-context";
import { ProductCard } from "./product-card";

export function ProductsGrid() {
	const { paginatedProducts } = useProductsCatalog();

	return (
		<div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
			{paginatedProducts.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
