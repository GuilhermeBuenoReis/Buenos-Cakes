import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductsPaginationProps {
	currentPage: number;
	onPageChange: (nextPage: number) => void;
	pageItems: Array<number | null>;
	totalPages: number;
}

export function ProductsPagination({
	currentPage,
	onPageChange,
	pageItems,
	totalPages,
}: ProductsPaginationProps) {
	return (
		<Pagination className="pt-1.5">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						size="icon-sm"
						href="#"
						onClick={(event) => {
							event.preventDefault();
							if (currentPage > 1) onPageChange(currentPage - 1);
						}}
						className={`[&>span]:hidden ${
							currentPage === 1 ? "pointer-events-none opacity-40" : ""
						}`}
						aria-label="Página anterior"
					/>
				</PaginationItem>

				{pageItems.map((item, index) => (
					<PaginationItem key={`${item ?? "ellipsis"}-${index}`}>
						{item === null ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								href="#"
								isActive={item === currentPage}
								size="icon-sm"
								className={
									item === currentPage
										? "border-rose-500 bg-rose-500 text-white hover:bg-rose-500 hover:text-white shadow-sm"
										: "border-rose-100 bg-white hover:border-rose-200 hover:bg-rose-50"
								}
								onClick={(event) => {
									event.preventDefault();
									onPageChange(item);
								}}
							>
								{item}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						size="icon-sm"
						href="#"
						onClick={(event) => {
							event.preventDefault();
							if (currentPage < totalPages) onPageChange(currentPage + 1);
						}}
						className={`[&>span]:hidden ${
							currentPage === totalPages ? "pointer-events-none opacity-40" : ""
						}`}
						aria-label="Próxima página"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
