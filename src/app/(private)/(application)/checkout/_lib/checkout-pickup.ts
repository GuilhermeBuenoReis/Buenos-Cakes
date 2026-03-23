import { dayjs } from "@/lib/dayjs";

export const defaultPickupTime = "14:00";

function capitalize(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getInitialPickupDate() {
	return dayjs().startOf("day").toDate();
}

export function formatPickupSummaryDate(date: Date) {
	return capitalize(dayjs(date).format("dddd, DD [de] MMMM"));
}
