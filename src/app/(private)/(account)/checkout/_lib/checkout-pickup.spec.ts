import { describe, expect, it, vi } from "vitest";
import { dayjs } from "@/lib/dayjs";
import {
	defaultPickupTime,
	formatPickupSummaryDate,
	getInitialPickupDate,
} from "./checkout-pickup";

describe("checkout pickup helpers", () => {
	it("returns the default pickup time", () => {
		expect(defaultPickupTime).toBe("14:00");
	});

	it("returns the current day at start of day", () => {
		vi.useFakeTimers();
		vi.setSystemTime(dayjs("2026-03-18T15:42:00.000Z").toDate());

		const initialPickupDate = dayjs(getInitialPickupDate());

		expect(initialPickupDate.year()).toBe(2026);
		expect(initialPickupDate.month()).toBe(2);
		expect(initialPickupDate.date()).toBe(18);
		expect(initialPickupDate.hour()).toBe(0);
		expect(initialPickupDate.minute()).toBe(0);
		expect(initialPickupDate.second()).toBe(0);
		expect(initialPickupDate.millisecond()).toBe(0);

		vi.useRealTimers();
	});

	it("formats the pickup summary date in Portuguese with capitalization", () => {
		expect(
			formatPickupSummaryDate(dayjs("2026-03-18T12:00:00.000Z").toDate()),
		).toBe("Quarta-feira, 18 de março");
	});
});
