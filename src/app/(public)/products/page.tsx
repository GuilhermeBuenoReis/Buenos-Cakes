"use client";

import { CatalogHeader } from "./_components/catalog-header";
import { ProductCard } from "./_components/product-card";
import { ProductsPagination } from "./_components/products-pagination";
import { Sidebar } from "./_components/sidebar";
import {
	type Product,
	ProductsCatalogProvider,
	useProductsCatalog,
} from "./_context/products-catalog-context";

const products: Product[] = [
	{
		category: "Bolos",
		image:
			"https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=80",
		name: "Bolo Red Velvet Premium",
		popularity: 95,
		price: 145.9,
		rating: 4.8,
		reviews: 48,
	},
	{
		category: "Doces Finos",
		image:
			"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
		name: "Caixa Brigadeiro Belga",
		popularity: 92,
		price: 54,
		rating: 4.4,
		reviews: 124,
	},
	{
		category: "Cookies",
		image:
			"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80",
		name: "Double Choc Cookie",
		popularity: 89,
		price: 12.5,
		rating: 4.1,
		reviews: 89,
	},
	{
		category: "Tortas",
		image:
			"https://images.unsplash.com/photo-1461009312844-e80697a81cc7?auto=format&fit=crop&w=1200&q=80",
		name: "Torta de Limão Siciliano",
		popularity: 90,
		price: 89,
		rating: 4.2,
		reviews: 31,
	},
	{
		category: "Doces Finos",
		image:
			"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
		name: "Donut Glaceado Mix",
		popularity: 88,
		price: 15.9,
		rating: 4.1,
		reviews: 22,
	},
	{
		category: "Bolos",
		image:
			"https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80",
		name: "Cupcake Berry Bliss",
		popularity: 85,
		price: 9.5,
		rating: 4.0,
		reviews: 67,
	},
	{
		category: "Bolos",
		image:
			"https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=1200&q=80",
		name: "Bolo de Cenoura Vovó",
		popularity: 94,
		price: 42,
		rating: 4.6,
		reviews: 156,
	},
	{
		category: "Padaria",
		image:
			"https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=80",
		name: "Brioche de Manteiga",
		popularity: 80,
		price: 28,
		rating: 4.2,
		reviews: 42,
	},
	{
		category: "Cookies",
		image:
			"https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80",
		name: "Cookie Pistache Crunch",
		popularity: 84,
		price: 17,
		rating: 4.3,
		reviews: 51,
	},
	{
		category: "Doces Finos",
		image:
			"https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?auto=format&fit=crop&w=1200&q=80",
		name: "Mini Tarteletes Frutas",
		popularity: 81,
		price: 36,
		rating: 4.0,
		reviews: 64,
	},
	{
		category: "Tortas",
		image:
			"https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1200&q=80",
		name: "Torta de Frutas Vermelhas",
		popularity: 86,
		price: 95,
		rating: 4.5,
		reviews: 58,
	},
	{
		category: "Bolos",
		image:
			"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
		name: "Bolo Chocolate Supremo",
		popularity: 93,
		price: 119.9,
		rating: 4.7,
		reviews: 113,
	},
];

function ProductsGrid() {
	const { paginatedProducts } = useProductsCatalog();

	return (
		<div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
			{paginatedProducts.map((product) => (
				<ProductCard key={product.name} product={product} />
			))}
		</div>
	);
}

function ProductsCatalogLayout() {
	return (
		<section className="relative min-h-140 overflow-hidden rounded-2xl bg-linear-to-br from-rose-50 via-[#fffaf6] to-amber-50 p-2.5 sm:p-3">
			<div className="pointer-events-none absolute -top-16 -left-12 h-44 w-44 rounded-full bg-rose-200/30 blur-3xl" />
			<div className="pointer-events-none absolute right-0 -bottom-20 h-52 w-52 rounded-full bg-amber-200/30 blur-3xl" />

			<div className="relative grid gap-2.5 lg:grid-cols-[220px_minmax(0,1fr)]">
				<Sidebar />

				<div className="space-y-3 rounded-2xl border border-rose-100/70 bg-white/90 p-3 shadow-[0_14px_36px_-26px_rgba(190,24,93,0.35)] backdrop-blur-sm sm:p-4">
					<CatalogHeader />
					<ProductsGrid />
					<ProductsPagination />
				</div>
			</div>
		</section>
	);
}

export default function ProductsPage() {
	return (
		<ProductsCatalogProvider products={products}>
			<ProductsCatalogLayout />
		</ProductsCatalogProvider>
	);
}
