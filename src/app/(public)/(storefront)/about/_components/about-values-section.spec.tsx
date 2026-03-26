import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutValuesSection } from "./about-values-section";

describe("AboutValuesSection", () => {
	it("renders the pillars, stats and highlight list", () => {
		render(<AboutValuesSection />);

		expect(screen.getByText("Nosso jeito de fazer")).toBeVisible();
		expect(
			screen.getByRole("heading", {
				level: 2,
				name: "Três pilares que guiam cada criação.",
			}),
		).toBeVisible();
		expect(
			screen.getByRole("heading", {
				level: 3,
				name: "Confeitaria com assinatura",
			}),
		).toBeVisible();
		expect(
			screen.getByRole("heading", {
				level: 3,
				name: "Atendimento verdadeiramente próximo",
			}),
		).toBeVisible();
		expect(
			screen.getByRole("heading", {
				level: 3,
				name: "Processo artesanal com rigor profissional",
			}),
		).toBeVisible();
		expect(screen.getByText("Em números")).toBeVisible();
		expect(
			screen.getByText("Marcos que contam nossa trajetória."),
		).toBeVisible();
		expect(screen.getByText("8+")).toBeVisible();
		expect(screen.getByText("anos adoçando histórias")).toBeVisible();
		expect(screen.getByText("40")).toBeVisible();
		expect(screen.getByText("receitas autorais em rotação")).toBeVisible();
		expect(screen.getByText("1.2k")).toBeVisible();
		expect(screen.getByText("eventos celebrados com clientes")).toBeVisible();
		expect(screen.getByText("Por que escolhem nossa cozinha")).toBeVisible();
		expect(
			screen.getByText(
				"Ingredientes selecionados com prioridade para frescor e sabor limpo.",
			),
		).toBeVisible();
		expect(
			screen.getByText(
				"Design de doces e bolos pensado para combinar com a estética da sua celebração.",
			),
		).toBeVisible();
		expect(
			screen.getByText(
				"Produção boutique em pequenos lotes, sem perder o calor do feito à mão.",
			),
		).toBeVisible();
	});
});
