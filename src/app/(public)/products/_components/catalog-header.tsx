interface SortOption {
	label: string;
	value: string;
}

interface CatalogHeaderProps {
	shownCount: number;
	totalProducts: number;
	sortOptions: readonly SortOption[];
	sortValue: string;
	onSortChange: (nextValue: string) => void;
}

export function CatalogHeader({
	shownCount,
	totalProducts,
	sortOptions,
	sortValue,
	onSortChange,
}: CatalogHeaderProps) {
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

			<label className="flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
				<span className="whitespace-nowrap">Ordenar por:</span>
				<select
					value={sortValue}
					onChange={(event) => onSortChange(event.target.value)}
					className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-slate-700 outline-none transition focus:border-rose-300 sm:text-sm"
				>
					{sortOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</label>
		</header>
	);
}
