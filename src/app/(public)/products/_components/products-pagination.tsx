"use client";

import type { MouseEvent } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useProductsCatalog } from "../_context/products-catalog-context";

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

export function ProductsPagination() {
	const { currentPage, setCurrentPage, totalPages } = useProductsCatalog();
	const pageItems = buildPageItems(currentPage, totalPages);

	function handlePreviousPageClick(event: MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	}

	function handleNextPageClick(event: MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	}

	function handlePageItemClick(event: MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();
		const nextPage = Number(event.currentTarget.dataset.page);
		if (!Number.isFinite(nextPage)) return;
		setCurrentPage(nextPage);
	}

	return (
		<Pagination className="pt-1.5">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						size="icon-sm"
						href="#"
						onClick={handlePreviousPageClick}
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
								data-page={item}
								isActive={item === currentPage}
								size="icon-sm"
								className={
									item === currentPage
										? "border-rose-500 bg-rose-500 text-white hover:bg-rose-500 hover:text-white shadow-sm"
										: "border-rose-100 bg-white hover:border-rose-200 hover:bg-rose-50"
								}
								onClick={handlePageItemClick}
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
						onClick={handleNextPageClick}
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
