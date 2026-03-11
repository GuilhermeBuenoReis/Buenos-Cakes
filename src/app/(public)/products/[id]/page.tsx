import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getProductIds, getProducts } from "@/api/products";
import { ProductDetailsContent } from "./_components/product-details-content";

interface ProductDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}

export const revalidate = 300;

export async function generateStaticParams() {
	return getProductIds().map((id) => ({ id }));
}

export async function generateMetadata({
	params,
}: ProductDetailsPageProps): Promise<Metadata> {
	const { id } = await params;
	const product = await getProductById({
		id,
		revalidateInSeconds: revalidate,
	});

	if (!product) {
		return {
			title: "Produto nao encontrado",
		};
	}

	return {
		title: `${product.name} | Buenos Cakes`,
	};
}

export default async function ProductDetailsPage({
	params,
}: ProductDetailsPageProps) {
	const { id } = await params;
	const [product, products] = await Promise.all([
		getProductById({
			id,
			revalidateInSeconds: revalidate,
		}),
		getProducts({
			revalidateInSeconds: revalidate,
		}),
	]);

	if (!product) {
		notFound();
	}

	const relatedImages = products
		.filter(
			(item) => item.category === product.category && item.id !== product.id,
		)
		.slice(0, 4);

	return (
		<section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-50 via-[#fffaf6] to-amber-50 p-4 sm:p-6">
			<div className="pointer-events-none absolute -top-20 -left-16 h-48 w-48 rounded-full bg-rose-200/30 blur-3xl" />
			<div className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-amber-200/35 blur-3xl" />

			<div className="relative">
				<ProductDetailsContent
					product={product}
					relatedImages={relatedImages}
				/>
			</div>
		</section>
	);
}
