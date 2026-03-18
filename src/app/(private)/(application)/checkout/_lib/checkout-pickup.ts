import { format, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

export const defaultPickupTime = "14:00";

function capitalize(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getInitialPickupDate() {
	return startOfDay(new Date());
}

export function formatPickupSummaryDate(date: Date) {
	return capitalize(
		format(date, "EEEE, dd 'de' MMMM", {
			locale: ptBR,
		}),
	);
}
