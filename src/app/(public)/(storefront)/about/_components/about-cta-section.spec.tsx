import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutCtaSection } from "./about-cta-section";

describe("AboutCtaSection", () => {
	it("renders the CTA copy and the products link", () => {
		render(<AboutCtaSection />);

		expect(screen.getByText("Vamos celebrar juntos")).toBeVisible();
		expect(
			screen.getByRole("heading", {
				level: 2,
				name: "Se a ocasião merece carinho, ela também merece um doce com presença.",
			}),
		).toBeVisible();
		expect(
			screen.getByText(
				"Explore nosso catálogo, descubra sabores autorais e encontre a criação ideal para o seu próximo momento especial.",
			),
		).toBeVisible();
		expect(screen.getByRole("link", { name: "Ver Produtos" })).toHaveAttribute(
			"href",
			"/products",
		);
	});
});
