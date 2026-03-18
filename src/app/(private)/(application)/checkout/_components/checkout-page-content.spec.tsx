import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { dayjs, getCalendarDayKey } from "@/lib/dayjs";

const useCartSheetMock = vi.fn();

vi.mock("@/contexts/cart-sheet-context", () => ({
	useCartSheet: () => useCartSheetMock(),
}));

import { CheckoutPageContent } from "./checkout-page-content";
import {
	formatPickupSummaryDate,
	getInitialPickupDate,
} from "./checkout-pickup-scheduler";

const baseCartSheetValue = {
	addItem: vi.fn(),
	decreaseQuantity: vi.fn(),
	hasItems: true,
	increaseQuantity: vi.fn(),
	isOpen: false,
	itemCount: 3,
	items: [
		{
			highlight: "Bolos",
			id: "prd_1",
			image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62",
			name: "Bolo de Chocolate Belga",
			quantity: 1,
			unitPrice: 85,
		},
		{
			highlight: "Doces Finos",
			id: "prd_2",
			image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
			name: "Kit Macarons",
			quantity: 2,
			unitPrice: 35,
		},
	],
	removeItem: vi.fn(),
	setIsOpen: vi.fn(),
	shipping: 0,
	subtotal: 155,
	total: 155,
};

describe("CheckoutPageContent", () => {
	beforeEach(() => {
		useCartSheetMock.mockReset();
		useCartSheetMock.mockReturnValue(baseCartSheetValue);
	});

	it("renders the checkout form and the order summary from cart items", () => {
		render(<CheckoutPageContent />);

		expect(
			screen.getByRole("heading", { name: "Finalizar Pedido" }),
		).toBeVisible();
		expect(
			screen.getByRole("heading", { name: "Seus Dados Pessoais" }),
		).toBeVisible();
		expect(
			screen.getByRole("heading", { name: "Resumo do Pedido" }),
		).toBeVisible();
		expect(screen.getByText("Bolo de Chocolate Belga")).toBeVisible();
		expect(screen.getByText("Kit Macarons")).toBeVisible();
		expect(screen.getAllByText("R$ 155,00")).toHaveLength(2);
		expect(screen.getByText("Semana de retirada")).toBeVisible();
		expect(screen.getByLabelText("Horário da retirada")).toHaveValue("14:00");
		expect(
			screen.getByRole("link", { name: "Voltar ao Carrinho" }),
		).toHaveAttribute("href", "/products?cart=true");
		expect(
			screen.getByRole("button", { name: "Finalizar Pedido" }),
		).toBeEnabled();
	});

	it("updates the pickup summary when selecting another date in the calendar and a time", async () => {
		const user = userEvent.setup();
		const nextWeekDate = dayjs(getInitialPickupDate()).add(9, "day").toDate();

		render(<CheckoutPageContent />);

		fireEvent.change(screen.getByLabelText("Horário da retirada"), {
			target: { value: "17:00" },
		});
		await user.click(
			screen.getByRole("button", { name: "Escolher no calendário" }),
		);

		const calendarPanel = screen.getByTestId("pickup-calendar-panel");
		const nextWeekButton = calendarPanel.querySelector<HTMLButtonElement>(
			`button[data-day="${getCalendarDayKey(nextWeekDate)}"]`,
		);

		expect(nextWeekButton).not.toBeNull();
		if (!nextWeekButton) {
			throw new Error("Expected a calendar button for the next week date.");
		}

		await user.click(nextWeekButton);

		expect(screen.getByTestId("pickup-date-summary")).toHaveTextContent(
			formatPickupSummaryDate(nextWeekDate),
		);
		expect(screen.getByTestId("pickup-schedule-summary")).toHaveTextContent(
			"Às 17:00",
		);
	});

	it("shows an empty state and disables progression without cart items", () => {
		useCartSheetMock.mockReturnValue({
			...baseCartSheetValue,
			hasItems: false,
			itemCount: 0,
			items: [],
			subtotal: 0,
			total: 0,
		});

		render(<CheckoutPageContent />);

		expect(screen.getByText("Seu carrinho ainda está vazio.")).toBeVisible();
		expect(
			screen.getByRole("button", { name: "Próximo Passo" }),
		).toBeDisabled();
		expect(
			screen.getByRole("button", { name: "Finalizar Pedido" }),
		).toBeDisabled();
	});
});
