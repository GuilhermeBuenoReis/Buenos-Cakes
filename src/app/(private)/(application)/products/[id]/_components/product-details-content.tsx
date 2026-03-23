import { getProductById, getProducts } from "@/api/products";
import { notFound } from "next/navigation";
import { ProductDetailsProvider } from "../_context/product-details-context";
import { ProductDetailsContentClient } from "./product-details-content-client";

interface ProductDetailsContentProps {
	productId: string;
}

const RELATED_IMAGES_LIMIT = 4;

export async function ProductDetailsContent({
	productId,
}: ProductDetailsContentProps) {
	const [product, products] = await Promise.all([
		getProductById({
			id: productId,
		}),
		getProducts(),
	]);

	if (!product) {
		notFound();
	}

	const relatedImages = products
		.filter(
			(item) => item.category === product.category && item.id !== product.id,
		)
		.slice(0, RELATED_IMAGES_LIMIT);

	return (
		<ProductDetailsProvider product={product} relatedImages={relatedImages}>
			<ProductDetailsContentClient />
		</ProductDetailsProvider>
	);
}
