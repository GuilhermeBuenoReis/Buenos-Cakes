import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export function getCalendarDayKey(date: Date) {
	return dayjs(date).format("YYYY-MM-DD");
}

export { dayjs };
