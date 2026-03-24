import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const usePathnameMock = vi.fn();

vi.mock("next/navigation", () => ({
	usePathname: () => usePathnameMock(),
}));

vi.mock("./navbar-cart", () => ({
	NavbarCart: () => <div data-testid="navbar-cart" />,
}));

import { Navbar } from "./navbar";

describe("Navbar", () => {
	beforeEach(() => {
		usePathnameMock.mockReset();
	});

	it("highlights the dashboard link on the dashboard route", () => {
		usePathnameMock.mockReturnValue("/dashboard");

		render(<Navbar />);

		expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute(
			"aria-current",
			"page",
		);
		expect(screen.getByRole("link", { name: "Produtos" })).not.toHaveAttribute(
			"aria-current",
		);
	});

	it("highlights the products link across product routes", () => {
		usePathnameMock.mockReturnValue("/products/prd_8f3a92c1");

		render(<Navbar />);

		expect(screen.getByRole("link", { name: "Produtos" })).toHaveAttribute(
			"aria-current",
			"page",
		);
		expect(screen.getByRole("link", { name: "Início" })).not.toHaveAttribute(
			"aria-current",
		);
	});

	it("highlights the about link on the about route", () => {
		usePathnameMock.mockReturnValue("/about");

		render(<Navbar />);

		expect(screen.getByRole("link", { name: "Sobre Nós" })).toHaveAttribute(
			"aria-current",
			"page",
		);
		expect(screen.getByRole("link", { name: "Sobre Nós" })).toHaveAttribute(
			"href",
			"/about",
		);
	});
});
