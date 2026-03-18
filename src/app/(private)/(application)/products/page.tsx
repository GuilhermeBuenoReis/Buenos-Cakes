import { getProducts } from "@/api/products";
import { ProductsCatalogShell } from "./_components/products-catalog-shell";

export const revalidate = 300;

export default async function ProductsPage() {
	const products = await getProducts({ revalidateInSeconds: revalidate });

	return <ProductsCatalogShell products={products} />;
}
