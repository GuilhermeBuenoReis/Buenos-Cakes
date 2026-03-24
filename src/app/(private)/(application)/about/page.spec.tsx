import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage, { metadata } from "./page";

describe("AboutPage", handleAboutPageDescription);

function handleAboutPageDescription() {
	it("exports the about metadata", handleMetadataAssertion);
	it("renders the hero, story and primary actions", handlePageRenderAssertion);
}

function handleMetadataAssertion() {
	expect(metadata).toEqual({
		title: "Sobre Nós | Buenos'Cakes",
	});
}

function handlePageRenderAssertion() {
	render(<AboutPage />);

	expect(
		screen.getByRole("heading", { level: 1, name: "Nossa Doce História" }),
	).toBeVisible();
	expect(screen.getByText("Onde tudo começou")).toBeVisible();
	expect(
		screen.getByText("Três pilares que guiam cada criação."),
	).toBeVisible();
	expect(screen.getByRole("link", { name: "Ver Produtos" })).toHaveAttribute(
		"href",
		"/products",
	);
	expect(
		screen.getByRole("link", { name: "Começar um pedido" }),
	).toHaveAttribute("href", "/checkout");
}
