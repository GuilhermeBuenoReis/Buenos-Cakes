import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductsPagination } from "./products-pagination";

const useProductsCatalogMock = vi.fn();

vi.mock("../_context/products-catalog-context", () => ({
	useProductsCatalog: () => useProductsCatalogMock(),
}));

function mockCatalogContext({
	currentPage = 1,
	totalPages = 3,
}: {
	currentPage?: number;
	totalPages?: number;
} = {}) {
	const setCurrentPage = vi.fn();

	useProductsCatalogMock.mockReturnValue({
		currentPage,
		setCurrentPage,
		totalPages,
	});

	return { setCurrentPage };
}

describe("ProductsPagination", () => {
	it("does not go below the first page and advances to the next page", async () => {
		const user = userEvent.setup();
		const { setCurrentPage } = mockCatalogContext();

		render(<ProductsPagination />);

		await user.click(screen.getByLabelText("Página anterior"));
		await user.click(screen.getByLabelText("Próxima página"));

		expect(setCurrentPage).toHaveBeenCalledTimes(1);
		expect(setCurrentPage).toHaveBeenCalledWith(2);
	});

	it("renders ellipsis for long paginations and navigates to an explicit page", async () => {
		const user = userEvent.setup();
		const { setCurrentPage } = mockCatalogContext({
			currentPage: 5,
			totalPages: 10,
		});
		const { container } = render(<ProductsPagination />);

		await user.click(screen.getByRole("link", { name: "6" }));

		expect(
			container.querySelectorAll('[data-slot="pagination-ellipsis"]'),
		).toHaveLength(2);
		expect(screen.getByRole("link", { name: "1" })).toBeVisible();
		expect(screen.getByRole("link", { name: "10" })).toBeVisible();
		expect(setCurrentPage).toHaveBeenCalledWith(6);
	});
});
