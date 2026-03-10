"use client";

import { formatPrice } from "@/lib/format-price";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";
import { useMemo } from "react";
import { CatalogHeader } from "./_components/catalog-header";
import { ProductCard } from "./_components/product-card";
import { ProductsPagination } from "./_components/products-pagination";
import { Sidebar } from "./_components/sidebar";

type SortValue = "popular" | "price-asc" | "price-desc" | "rating";
interface Product {
	category: string;
	image: string;
	name: string;
	popularity: number;
	price: number;
	rating: number;
	reviews: number;
}

interface SidebarCategory {
	count: number;
	label: string;
}

const sortOptions = [
	{ label: "Mais Populares", value: "popular" },
	{ label: "Menor Preço", value: "price-asc" },
	{ label: "Maior Preço", value: "price-desc" },
	{ label: "Melhor Avaliados", value: "rating" },
] as const;

const sortValues: SortValue[] = sortOptions.map(
	(option) => option.value as SortValue,
);

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

const ITEMS_PER_PAGE = 8;

function buildPageItems(currentPage: number, totalPages: number) {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	if (currentPage <= 3) {
		return [1, 2, 3, null, totalPages - 1, totalPages];
	}

	if (currentPage >= totalPages - 2) {
		return [1, 2, null, totalPages - 2, totalPages - 1, totalPages];
	}

	return [
		1,
		null,
		currentPage - 1,
		currentPage,
		currentPage + 1,
		null,
		totalPages,
	];
}

export default function ProductsPage() {
	const [sortValue, setSortValue] = useQueryState(
		"sort",
		parseAsStringEnum<SortValue>(sortValues).withDefault("popular"),
	);
	const [currentPage, setCurrentPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1),
	);
	const [selectedCategory] = useQueryState("category", {
		defaultValue: "Todos",
		parse: (value) => value ?? "Todos",
		serialize: (value) => value,
	});

	const [maxPrice] = useQueryState("maxPrice", parseAsInteger.withDefault(250));
	const [rating] = useQueryState("rating", parseAsInteger.withDefault(4));

	const sidebarCategories = useMemo<SidebarCategory[]>(() => {
		const counts = new Map<string, number>();

		for (const product of products) {
			counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
		}

		return [
			{ count: products.length, label: "Todos" },
			...Array.from(counts, ([label, count]) => ({ count, label })),
		];
	}, []);

	const filteredProducts = useMemo(() => {
		const filtered = products.filter((product) => {
			const matchesCategory =
				selectedCategory === "Todos" || product.category === selectedCategory;
			const matchesPrice = product.price <= maxPrice;
			const matchesRating = product.rating >= rating;

			return matchesCategory && matchesPrice && matchesRating;
		});

		return filtered.sort((a, b) => {
			if (sortValue === "price-asc") return a.price - b.price;
			if (sortValue === "price-desc") return b.price - a.price;
			if (sortValue === "rating") return b.rating - a.rating;
			return b.popularity - a.popularity;
		});
	}, [maxPrice, rating, selectedCategory, sortValue]);

	const totalProducts = filteredProducts.length;
	const totalPages = Math.max(1, Math.ceil(totalProducts / ITEMS_PER_PAGE));
	const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
	const initialIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

	const paginatedProducts = filteredProducts.slice(
		initialIndex,
		initialIndex + ITEMS_PER_PAGE,
	);

	const pageItems = buildPageItems(safeCurrentPage, totalPages);

	return (
		<section className="relative min-h-140 overflow-hidden rounded-2xl bg-linear-to-br from-rose-50 via-[#fffaf6] to-amber-50 p-2.5 sm:p-3">
			<div className="pointer-events-none absolute -top-16 -left-12 h-44 w-44 rounded-full bg-rose-200/30 blur-3xl" />
			<div className="pointer-events-none absolute right-0 -bottom-20 h-52 w-52 rounded-full bg-amber-200/30 blur-3xl" />

			<div className="relative grid gap-2.5 lg:grid-cols-[220px_minmax(0,1fr)]">
				<Sidebar categories={sidebarCategories} />

				<div className="space-y-3 rounded-2xl border border-rose-100/70 bg-white/90 p-3 shadow-[0_14px_36px_-26px_rgba(190,24,93,0.35)] backdrop-blur-sm sm:p-4">
					<CatalogHeader
						shownCount={paginatedProducts.length}
						totalProducts={totalProducts}
						sortOptions={sortOptions}
						sortValue={sortValue}
						onSortChange={(nextValue) => {
							setSortValue(nextValue as SortValue);
							setCurrentPage(1);
						}}
					/>

					<div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
						{paginatedProducts.map((product) => (
							<ProductCard
								key={product.name}
								category={product.category}
								image={product.image}
								name={product.name}
								priceLabel={formatPrice(product.price)}
								reviews={product.reviews}
							/>
						))}
					</div>

					<ProductsPagination
						currentPage={safeCurrentPage}
						totalPages={totalPages}
						pageItems={pageItems}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>
		</section>
	);
}
