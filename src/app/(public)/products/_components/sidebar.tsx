"use client";

import {
	CircleDollarSign,
	Cookie,
	CupSoda,
	Gift,
	LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

interface SidebarCategory {
	count: number;
	label: string;
}

interface SidebarProps {
	categories: SidebarCategory[];
}

export function Sidebar({ categories }: SidebarProps) {
	const categoryOptions = useMemo(
		() => categories.map((category) => category.label),
		[categories],
	);
	const [selectedCategory, setSelectedCategory] = useQueryState(
		"category",
		parseAsStringEnum(categoryOptions).withDefault("Todos"),
	);
	const [priceValue, setPriceValue] = useQueryState(
		"maxPrice",
		parseAsInteger.withDefault(250),
	);
	const [ratingValue, setRatingValue] = useQueryState(
		"rating",
		parseAsInteger.withDefault(4),
	);
	const [, setCurrentPage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1),
	);

	const maxPriceLabel = useMemo(() => `R$ ${priceValue}+`, [priceValue]);

	function getCategoryIcon(label: string) {
		if (label === "Bolos") return CupSoda;
		if (label === "Cookies") return Cookie;
		if (label === "Doces Finos") return Gift;
		if (label === "Padaria") return Gift;
		return LayoutGrid;
	}

	return (
		<aside className="h-full min-w-[210px] rounded-2xl border border-rose-100/70 bg-gradient-to-b from-white to-rose-50/35 p-3 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.45)]">
			<div className="flex h-full flex-col gap-3.5">
				<div className="space-y-1.5 border-b border-slate-100 pb-2.5">
					<Link
						href="/dashboard"
						className="inline-flex items-center gap-2 text-sm font-bold tracking-tight"
					>
						<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-[9px] font-extrabold text-white">
							DG
						</span>
						<span className="text-slate-900">DoceGestão</span>
					</Link>
				</div>

				<section className="space-y-2 rounded-lg border border-rose-100/70 bg-white/75 p-2">
					<h2 className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
						<LayoutGrid className="h-4 w-4 text-rose-500" />
						Categorias
					</h2>

					<div className="space-y-0.5">
						{categories.map((category) => {
							const Icon = getCategoryIcon(category.label);
							const isActive = selectedCategory === category.label;

							return (
								<button
									type="button"
									key={category.label}
									onClick={() => {
										setSelectedCategory(category.label);
										setCurrentPage(1);
									}}
									className="flex w-full items-center justify-between rounded-md px-1.5 py-1 text-left text-xs transition hover:bg-slate-50"
								>
									<span
										className={`inline-flex items-center gap-2 ${
											isActive
												? "font-bold text-slate-800"
												: "font-medium text-slate-500"
										}`}
									>
										<Icon className="h-3 w-3 text-slate-400" />
										{category.label}
									</span>
									<span
										className={`text-[10px] ${isActive ? "font-bold text-slate-600" : "text-slate-400"}`}
									>
										{category.count}
									</span>
								</button>
							);
						})}
					</div>
				</section>

				<section className="space-y-2 rounded-lg border border-rose-100/70 bg-white/75 p-2">
					<h2 className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
						<CircleDollarSign className="h-3.5 w-3.5 text-rose-500" />
						Faixa de Preço
					</h2>

					<input
						type="range"
						min={0}
						max={250}
						step={10}
						value={priceValue}
						onChange={(event) => {
							setPriceValue(Number(event.target.value));
							setCurrentPage(1);
						}}
						className="h-1 w-full cursor-pointer appearance-none rounded-full bg-rose-100 accent-rose-500"
					/>

					<div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
						<span>R$ 0</span>
						<span>{maxPriceLabel}</span>
					</div>
				</section>

				<section className="space-y-2 rounded-lg border border-rose-100/70 bg-white/75 p-2">
					<h2 className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
						<span className="text-rose-500">★</span>
						Avaliação
					</h2>

					<div className="space-y-1 text-xs">
						<label className="flex cursor-pointer items-center gap-1.5">
							<input
								type="radio"
								name="rating"
								value={4}
								checked={ratingValue === 4}
								onChange={() => {
									setRatingValue(4);
									setCurrentPage(1);
								}}
								className="h-3 w-3 accent-rose-500"
							/>
							<span className="text-rose-500">★★★★★</span>
							<span className="text-[11px] text-slate-600">4.0 ou mais</span>
						</label>

						<label className="flex cursor-pointer items-center gap-1.5">
							<input
								type="radio"
								name="rating"
								value={3}
								checked={ratingValue === 3}
								onChange={() => {
									setRatingValue(3);
									setCurrentPage(1);
								}}
								className="h-3 w-3 accent-rose-500"
							/>
							<span className="text-rose-500">★★★★☆</span>
							<span className="text-[11px] text-slate-600">3.0 ou mais</span>
						</label>
					</div>
				</section>

				<Button
					className="mt-auto w-full rounded-lg text-xs"
					size="sm"
					onClick={() => setCurrentPage(1)}
				>
					Aplicar Filtros
				</Button>
			</div>
		</aside>
	);
}
