"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useProductsCatalog } from "../_context/products-catalog-context";

const catalogSortSchema = z.object({
	sortValue: z.enum(["popular", "price-asc", "price-desc", "rating"]),
});

type CatalogSort = z.infer<typeof catalogSortSchema>;

export function CatalogHeader() {
	const {
		setCurrentPage,
		setSortValue,
		shownCount,
		sortOptions,
		sortValue,
		totalProducts,
	} = useProductsCatalog();

	const { control, reset } = useForm<CatalogSort>({
		defaultValues: { sortValue },
		resolver: zodResolver(catalogSortSchema),
	});

	useEffect(() => {
		reset({ sortValue });
	}, [reset, sortValue]);

	return (
		<header className="flex flex-wrap items-end justify-between gap-2">
			<div>
				<span className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-rose-500 uppercase">
					Colecao Boutique
				</span>
				<h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
					Catálogo de Doces
				</h1>
				<p className="text-xs text-slate-500 sm:text-sm">
					Mostrando {shownCount} de {totalProducts} produtos
				</p>
			</div>

			<div className="flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
				<span className="whitespace-nowrap">Ordenar por:</span>
				<Controller
					name="sortValue"
					control={control}
					render={({ field }) => (
						<Select
							value={field.value}
							onValueChange={(nextValue) => {
								const parsedValue =
									catalogSortSchema.shape.sortValue.safeParse(nextValue);
								if (!parsedValue.success) return;

								field.onChange(parsedValue.data);
								setSortValue(parsedValue.data);
								setCurrentPage(1);
							}}
						>
							<SelectTrigger
								size="sm"
								className="rounded-md border-rose-200 bg-rose-50 px-2.5 text-xs font-medium text-slate-700 focus-visible:border-rose-300 focus-visible:ring-rose-100 sm:text-sm"
							>
								<SelectValue />
							</SelectTrigger>
							<SelectContent className="border-rose-100">
								{sortOptions.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
			</div>
		</header>
	);
}
