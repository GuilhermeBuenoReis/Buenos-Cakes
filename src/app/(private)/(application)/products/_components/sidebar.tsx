"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CircleDollarSign,
	Cookie,
	CupSoda,
	Gift,
	LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useProductsCatalog } from "../_context/products-catalog-context";

const sidebarFiltersSchema = z.object({
	maxPrice: z.number().int().min(0).max(250),
	rating: z.union([z.literal(3), z.literal(4)]),
});

type SidebarFilters = z.infer<typeof sidebarFiltersSchema>;

function getCategoryIcon(label: string) {
	if (label === "Bolos") return CupSoda;
	if (label === "Cookies") return Cookie;
	if (label === "Doces Finos") return Gift;
	if (label === "Padaria") return Gift;
	return LayoutGrid;
}

export function Sidebar() {
	const {
		categories,
		maxPrice,
		rating,
		selectedCategory,
		setCurrentPage,
		setMaxPrice,
		setRating,
		setSelectedCategory,
	} = useProductsCatalog();
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm<SidebarFilters>({
		defaultValues: {
			maxPrice,
			rating: rating === 3 ? 3 : 4,
		},
		resolver: zodResolver(sidebarFiltersSchema),
	});
	const watchedMaxPrice = watch("maxPrice");
	const maxPriceLabel = useMemo(
		() => `R$ ${watchedMaxPrice ?? maxPrice}+`,
		[maxPrice, watchedMaxPrice],
	);

	useEffect(() => {
		reset({
			maxPrice,
			rating: rating === 3 ? 3 : 4,
		});
	}, [maxPrice, rating, reset]);

	function handleCategoryButtonClick(event: MouseEvent<HTMLButtonElement>) {
		const nextCategory = event.currentTarget.dataset.category;
		if (!nextCategory) return;
		setSelectedCategory(nextCategory);
		setCurrentPage(1);
	}

	const handleApplyFiltersSubmit: SubmitHandler<SidebarFilters> = (values) => {
		setMaxPrice(values.maxPrice);
		setRating(values.rating);
		setCurrentPage(1);
	};

	return (
		<aside className="h-full min-w-52.5 rounded-2xl border border-rose-100/70 bg-linear-to-b from-white to-rose-50/35 p-3 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.45)]">
			<form
				className="flex h-full flex-col gap-3.5"
				onSubmit={handleSubmit(handleApplyFiltersSubmit)}
			>
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
									data-category={category.label}
									onClick={handleCategoryButtonClick}
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

					<Input
						type="range"
						min={0}
						max={250}
						step={10}
						{...register("maxPrice", { valueAsNumber: true })}
						className="h-1 w-full cursor-pointer appearance-none rounded-full border-0 bg-rose-100 px-0 py-0 accent-rose-500 shadow-none focus-visible:ring-0"
					/>
					{errors.maxPrice ? (
						<p className="text-[11px] text-red-500">
							{errors.maxPrice.message}
						</p>
					) : null}

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
						<div className="flex items-center gap-1.5">
							<Input
								type="radio"
								name="rating"
								value={4}
								checked={watch("rating") === 4}
								onChange={() =>
									setValue("rating", 4, {
										shouldDirty: true,
										shouldTouch: true,
										shouldValidate: true,
									})
								}
								aria-label="Avaliação mínima de 4 estrelas"
								className="h-3 w-3 appearance-auto border-0 bg-transparent p-0 accent-rose-500 shadow-none focus-visible:ring-0"
							/>
							<span className="text-rose-500">★★★★★</span>
							<span className="text-[11px] text-slate-600">4.0 ou mais</span>
						</div>

						<div className="flex items-center gap-1.5">
							<Input
								type="radio"
								name="rating"
								value={3}
								checked={watch("rating") === 3}
								onChange={() =>
									setValue("rating", 3, {
										shouldDirty: true,
										shouldTouch: true,
										shouldValidate: true,
									})
								}
								aria-label="Avaliação mínima de 3 estrelas"
								className="h-3 w-3 appearance-auto border-0 bg-transparent p-0 accent-rose-500 shadow-none focus-visible:ring-0"
							/>
							<span className="text-rose-500">★★★★☆</span>
							<span className="text-[11px] text-slate-600">3.0 ou mais</span>
						</div>
					</div>
				</section>

				<Button
					className="mt-auto w-full rounded-lg text-xs"
					size="sm"
					type="submit"
				>
					Aplicar Filtros
				</Button>
			</form>
		</aside>
	);
}
