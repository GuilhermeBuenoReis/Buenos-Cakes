import { CategoriesShowcase } from "./_components/categories-showcase";
import { Hero } from "./_components/hero";
import { MostWantedProducts } from "./_components/most-wanted-products";

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<Hero />
			<CategoriesShowcase />
			<MostWantedProducts />
		</div>
	);
}
