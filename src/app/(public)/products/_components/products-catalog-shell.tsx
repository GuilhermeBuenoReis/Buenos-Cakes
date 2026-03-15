"use client";

import type { Product } from "@/api/products/types";
import { ProductsCatalogProvider } from "../_context/products-catalog-context";
import { ProductsCatalogLayout } from "./products-catalog-layout";

interface ProductsCatalogShellProps {
	products: Product[];
}

export function ProductsCatalogShell({ products }: ProductsCatalogShellProps) {
	return (
		<ProductsCatalogProvider products={products}>
			<ProductsCatalogLayout />
		</ProductsCatalogProvider>
	);
}
