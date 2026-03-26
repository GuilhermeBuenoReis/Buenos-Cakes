import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { dayjs } from "@/lib/dayjs";
import {
	CheckoutPickupProvider,
	useCheckoutPickup,
} from "./checkout-pickup-context";

function CheckoutPickupConsumer() {
	const { pickupDate, pickupTime, setPickupDate, setPickupTime } =
		useCheckoutPickup();

	return (
		<div>
			<p data-testid="pickup-date">{dayjs(pickupDate).toISOString()}</p>
			<p data-testid="pickup-time">{pickupTime}</p>
			<button
				type="button"
				onClick={() =>
					setPickupDate(dayjs("2026-03-25T00:00:00.000Z").toDate())
				}
			>
				Atualizar data
			</button>
			<button type="button" onClick={() => setPickupTime("17:30")}>
				Atualizar hora
			</button>
		</div>
	);
}

describe("CheckoutPickupContext", () => {
	it("provides the default pickup state and allows updates", async () => {
		const user = userEvent.setup();

		render(
			<CheckoutPickupProvider>
				<CheckoutPickupConsumer />
			</CheckoutPickupProvider>,
		);

		const initialPickupDate = dayjs(
			screen.getByTestId("pickup-date").textContent ?? "",
		);

		expect(screen.getByTestId("pickup-time")).toHaveTextContent("14:00");
		expect(initialPickupDate.isValid()).toBe(true);
		expect(initialPickupDate.hour()).toBe(0);
		expect(initialPickupDate.minute()).toBe(0);
		expect(initialPickupDate.second()).toBe(0);
		expect(initialPickupDate.millisecond()).toBe(0);

		await user.click(screen.getByRole("button", { name: "Atualizar data" }));
		await user.click(screen.getByRole("button", { name: "Atualizar hora" }));

		expect(screen.getByTestId("pickup-date")).toHaveTextContent(
			"2026-03-25T00:00:00.000Z",
		);
		expect(screen.getByTestId("pickup-time")).toHaveTextContent("17:30");
	});

	it("throws when the hook is used outside the provider", () => {
		expect(() => render(<CheckoutPickupConsumer />)).toThrow(
			"useCheckoutPickup must be used within CheckoutPickupProvider.",
		);
	});
});
