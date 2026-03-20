"use client";

import { CalendarDays, Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ptBR } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { dayjs, getCalendarDayKey } from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { useCheckoutPickup } from "../_context/checkout-pickup-context";
import {
	formatPickupSummaryDate,
	getInitialPickupDate,
} from "../_lib/checkout-pickup";

const pickupEndTime = "18:30";
const pickupStartTime = "09:00";
const pickupStepInSeconds = 1800;
const quickPickDays = 7;

export {
	defaultPickupTime,
	formatPickupSummaryDate,
	getInitialPickupDate,
} from "../_lib/checkout-pickup";

function capitalize(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

function getQuickPickDates(baseDate: Date) {
	return Array.from({ length: quickPickDays }, (_, index) =>
		dayjs(baseDate).add(index, "day").toDate(),
	);
}

function getPickupCalendarRange(baseDate: Date) {
	const nextWeekBaseDate = dayjs(baseDate).add(1, "week");
	const daysUntilWeekEnd =
		nextWeekBaseDate.day() === 0 ? 0 : 7 - nextWeekBaseDate.day();

	return {
		from: baseDate,
		to: nextWeekBaseDate.add(daysUntilWeekEnd, "day").endOf("day").toDate(),
	};
}

function formatWeekButtonLabel(date: Date) {
	if (dayjs(date).isSame(dayjs(), "day")) {
		return "Hoje";
	}

	return capitalize(dayjs(date).format("ddd").replace(".", ""));
}

function formatMonthLabel(date: Date) {
	return dayjs(date).format("MMM").replace(".", "").toUpperCase();
}

export function CheckoutPickupScheduler() {
	const { pickupDate, pickupTime, setPickupDate, setPickupTime } =
		useCheckoutPickup();
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [timeZone, setTimeZone] = useState<string>();

	useEffect(() => {
		setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
	}, []);

	const baseDate = useMemo(() => getInitialPickupDate(), []);

	const quickPickDates = useMemo(() => getQuickPickDates(baseDate), [baseDate]);

	const pickupRange = useMemo(
		() => getPickupCalendarRange(baseDate),
		[baseDate],
	);

	const isDateInQuickList = quickPickDates.some((date) =>
		dayjs(date).isSame(pickupDate, "day"),
	);

	return (
		<div className="mt-6 space-y-6">
			<div className="space-y-4">
				<div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
					<CalendarDays className="size-4 text-rose-500" />
					<span>Semana de retirada</span>
				</div>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
					{quickPickDates.map((date) => {
						const isSelected = dayjs(date).isSame(pickupDate, "day");

						return (
							<button
								type="button"
								aria-label={`Selecionar retirada em ${formatPickupSummaryDate(date)}`}
								aria-pressed={isSelected}
								className={cn(
									"min-h-30 rounded-[1.4rem] border px-3 py-3.5 text-center transition-all",
									isSelected
										? "border-rose-300 bg-[#fff2f4] text-slate-900 shadow-[0_18px_30px_-26px_rgba(216,98,126,0.28)]"
										: "border-[#ece4e4] bg-[#fffdfb] text-slate-600 hover:border-rose-200 hover:bg-[#fff8f8]",
								)}
								key={getCalendarDayKey(date)}
								onClick={() => {
									setPickupDate(date);
									setIsCalendarOpen(false);
								}}
							>
								<div
									className={cn(
										"text-[10px] font-bold tracking-[0.16em] uppercase",
										isSelected ? "text-rose-500" : "text-slate-400",
									)}
								>
									{formatWeekButtonLabel(date)}
								</div>
								<div
									className={cn(
										"mx-auto mt-3 flex size-11 items-center justify-center rounded-full text-lg font-extrabold leading-none",
										isSelected
											? "bg-rose-500 text-white"
											: "bg-[#f5f0f0] text-slate-700",
									)}
								>
									{dayjs(date).format("DD")}
								</div>
								<div
									className={cn(
										"mt-3 text-[11px] font-semibold uppercase",
										isSelected ? "text-slate-700" : "text-slate-400",
									)}
								>
									{formatMonthLabel(date)}
								</div>
							</button>
						);
					})}
				</div>

				<div className="rounded-[1.6rem] border border-[#efe2e3] bg-[#fff9f8] p-4 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.14)] sm:p-5">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="space-y-1">
							<p className="text-sm font-bold text-slate-900">
								Precisa escolher outra data?
							</p>
							<p className="text-sm leading-6 text-slate-600">
								Você pode agendar qualquer dia até{" "}
								{formatPickupSummaryDate(pickupRange.to).toLowerCase()}.
							</p>
						</div>

						{isDateInQuickList ? null : (
							<span className="inline-flex rounded-full border border-[#eedbde] bg-white px-3 py-1 text-xs font-bold text-rose-500">
								{formatPickupSummaryDate(pickupDate)}
							</span>
						)}
					</div>

					<Button
						className="mt-4 h-11 rounded-full border-[#e7dfdf] bg-white px-5 text-slate-700 shadow-[0_12px_26px_-24px_rgba(15,23,42,0.18)] hover:border-rose-200 hover:bg-white hover:text-rose-500"
						type="button"
						variant="outline"
						onClick={() => setIsCalendarOpen((current) => !current)}
					>
						Escolher no calendário
					</Button>
				</div>

				{isCalendarOpen ? (
					<div
						className="rounded-[1.75rem] border border-[#ebe3e3] bg-[#fffdfb] p-3 shadow-[0_20px_42px_-36px_rgba(15,23,42,0.16)]"
						data-testid="pickup-calendar-panel"
					>
						<Calendar
							mode="single"
							selected={pickupDate}
							onSelect={(date) => {
								if (!date) {
									return;
								}

								setPickupDate(dayjs(date).startOf("day").toDate());
								setIsCalendarOpen(false);
							}}
							buttonVariant="ghost"
							className="w-full rounded-[1.4rem] bg-[#fffdfa] p-4 [--cell-size:2.65rem] sm:[--cell-size:2.85rem]"
							disabled={(date) =>
								dayjs(date).isBefore(pickupRange.from, "day") ||
								dayjs(date).isAfter(pickupRange.to, "day")
							}
							locale={ptBR}
							timeZone={timeZone}
						/>

						<p className="px-2 pb-2 text-xs font-medium text-slate-500">
							Disponível somente entre hoje e a próxima semana.
						</p>
					</div>
				) : null}
			</div>

			<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
				<div className="rounded-[1.5rem] border border-[#ece4e4] bg-[#fffdfb] p-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.14)]">
					<p className="text-sm font-semibold text-slate-600">
						Data escolhida para retirada
					</p>
					<p className="mt-2 text-base font-extrabold leading-7 text-slate-950">
						{formatPickupSummaryDate(pickupDate)}
					</p>
				</div>

				<div className="rounded-[1.5rem] border border-[#ece4e4] bg-[#fffdfb] p-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.14)]">
					<label
						className="flex items-center gap-2 text-sm font-semibold text-slate-700"
						htmlFor="pickup-time"
					>
						<Clock3 className="size-4 text-rose-500" />
						Horário da retirada
					</label>

					<div className="relative mt-3">
						<Clock3 className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
						<Input
							className="h-12 rounded-[1.15rem] border-[#e8e1e1] bg-[#fffdfb] px-4 pl-11 text-slate-700 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.18)] focus-visible:border-rose-300 focus-visible:ring-4 focus-visible:ring-rose-100/80"
							id="pickup-time"
							max={pickupEndTime}
							min={pickupStartTime}
							step={pickupStepInSeconds}
							type="time"
							value={pickupTime}
							onChange={(event) => setPickupTime(event.target.value)}
						/>
					</div>

					<p className="mt-3 text-xs leading-5 text-slate-500">
						Horários disponíveis entre 09:00 e 18:30, com intervalos de 30
						minutos.
					</p>
				</div>
			</div>
		</div>
	);
}
