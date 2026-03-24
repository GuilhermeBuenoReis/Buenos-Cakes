import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutHero } from "./about-hero";

describe("AboutHero", () => {
	it("renders the hero badge, heading, description and image", () => {
		render(<AboutHero />);

		expect(screen.getByText("Sobre a Buenos'Cakes")).toBeVisible();
		expect(
			screen.getByRole("heading", { level: 1, name: "Nossa Doce História" }),
		).toBeVisible();
		expect(
			screen.getByText(
				"Uma jornada guiada pela paixão por confeitaria artesanal, cuidado humano e pela vontade de transformar encontros em memórias que permanecem.",
			),
		).toBeVisible();
		expect(
			screen.getByRole("img", {
				name: "Confeiteira da Buenos'Cakes em seu ateliê",
			}),
		).toHaveAttribute(
			"src",
			"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=80",
		);
	});
});
