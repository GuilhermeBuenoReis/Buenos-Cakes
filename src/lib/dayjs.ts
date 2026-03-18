import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const calendarDayKeyFormat = "YYYY-MM-DD";

export function getCalendarDayKey(date: Date) {
	return dayjs(date).format(calendarDayKeyFormat);
}

export { dayjs };
