"use client";

import {
	addDays,
	addWeeks,
	endOfWeek,
	format,
	isSameDay,
	isToday,
	startOfDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
const weekStartsOn = 1 as const;

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
		addDays(baseDate, index),
	);
}

function getPickupCalendarRange(baseDate: Date) {
	return {
		from: baseDate,
		to: endOfWeek(addWeeks(baseDate, 1), {
			weekStartsOn,
		}),
	};
}

function formatWeekButtonLabel(date: Date) {
	if (isToday(date)) {
		return "Hoje";
	}

	return capitalize(
		format(date, "EEE", {
			locale: ptBR,
		}).replace(".", ""),
	);
}

function formatMonthLabel(date: Date) {
	return format(date, "MMM", {
		locale: ptBR,
	})
		.replace(".", "")
		.toUpperCase();
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
		isSameDay(date, pickupDate),
	);

	return (
		<div className="mt-5 space-y-5">
			<div className="space-y-3">
				<div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
					<CalendarDays className="size-4 text-rose-500" />
					<span>Semana de retirada</span>
				</div>

				<div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
					{quickPickDates.map((date) => {
						const isSelected = isSameDay(date, pickupDate);

						return (
							<button
								type="button"
								aria-label={`Selecionar retirada em ${formatPickupSummaryDate(date)}`}
								aria-pressed={isSelected}
								className={cn(
									"min-h-29 rounded-[1.45rem] border px-3 py-3 text-center transition-all",
									isSelected
										? "border-rose-400 bg-[linear-gradient(135deg,#ff4b61_0%,#ff7e6d_100%)] text-white shadow-[0_18px_34px_-22px_rgba(244,63,94,0.85)]"
										: "border-white bg-white/92 text-slate-700 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.35)] hover:border-rose-100 hover:text-rose-500",
								)}
								key={date.toISOString()}
								onClick={() => {
									setPickupDate(date);
									setIsCalendarOpen(false);
								}}
							>
								<div className="text-[10px] font-bold tracking-[0.18em] uppercase">
									{formatWeekButtonLabel(date)}
								</div>
								<div className="mt-1 text-xl font-extrabold leading-none">
									{format(date, "dd")}
								</div>
								<div className="mt-1 text-[11px] font-semibold uppercase">
									{formatMonthLabel(date)}
								</div>
							</button>
						);
					})}
				</div>

				<div className="rounded-[1.6rem] border border-rose-100/80 bg-[linear-gradient(135deg,#fff5f7_0%,#ffffff_100%)] p-4 shadow-[0_24px_40px_-34px_rgba(244,63,94,0.32)]">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="space-y-1">
							<p className="text-sm font-bold text-slate-900">
								Precisa escolher outra data?
							</p>
							<p className="text-sm leading-5 text-slate-500">
								Você pode agendar qualquer dia até{" "}
								{formatPickupSummaryDate(pickupRange.to).toLowerCase()}.
							</p>
						</div>

						{isDateInQuickList ? null : (
							<span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-500 shadow-[0_18px_30px_-24px_rgba(244,63,94,0.5)]">
								{formatPickupSummaryDate(pickupDate)}
							</span>
						)}
					</div>

					<Button
						className="mt-4 h-11 rounded-full border-white bg-white px-5 text-slate-700 shadow-[0_18px_30px_-24px_rgba(15,23,42,0.28)] hover:border-rose-100 hover:bg-white hover:text-rose-500"
						type="button"
						variant="outline"
						onClick={() => setIsCalendarOpen((current) => !current)}
					>
						Escolher no calendário
					</Button>
				</div>

				{isCalendarOpen ? (
					<div
						className="rounded-[1.75rem] border border-white/90 bg-white/92 p-3 shadow-[0_28px_52px_-38px_rgba(15,23,42,0.34)]"
						data-testid="pickup-calendar-panel"
					>
						<Calendar
							mode="single"
							selected={pickupDate}
							onSelect={(date) => {
								if (!date) {
									return;
								}

								setPickupDate(startOfDay(date));
								setIsCalendarOpen(false);
							}}
							buttonVariant="ghost"
							className="w-full rounded-[1.4rem] bg-white p-4 [--cell-size:2.65rem] sm:[--cell-size:2.85rem]"
							disabled={(date) =>
								date < pickupRange.from || date > pickupRange.to
							}
							fromDate={pickupRange.from}
							locale={ptBR}
							timeZone={timeZone}
							toDate={pickupRange.to}
						/>

						<p className="px-2 pb-2 text-xs font-medium text-slate-400">
							Disponível somente entre hoje e a próxima semana.
						</p>
					</div>
				) : null}
			</div>

			<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
				<div className="rounded-[1.6rem] border border-white/80 bg-white/88 p-4 shadow-[0_22px_34px_-28px_rgba(15,23,42,0.28)]">
					<p className="text-sm font-semibold text-slate-700">
						Data escolhida para retirada
					</p>
					<p className="mt-2 text-base font-extrabold text-slate-950">
						{formatPickupSummaryDate(pickupDate)}
					</p>
				</div>

				<div className="space-y-2">
					<label
						className="flex items-center gap-2 text-sm font-semibold text-slate-700"
						htmlFor="pickup-time"
					>
						<Clock3 className="size-4 text-rose-500" />
						Horário da retirada
					</label>

					<div className="relative">
						<Clock3 className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
						<Input
							className="h-12 rounded-[1.15rem] border-white bg-white px-4 pl-11 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_18px_34px_-30px_rgba(15,23,42,0.3)]"
							id="pickup-time"
							max={pickupEndTime}
							min={pickupStartTime}
							step={pickupStepInSeconds}
							type="time"
							value={pickupTime}
							onChange={(event) => setPickupTime(event.target.value)}
						/>
					</div>

					<p className="text-xs leading-5 text-slate-400">
						Horários disponíveis entre 09:00 e 18:30, com intervalos de 30
						minutos.
					</p>
				</div>
			</div>
		</div>
	);
}
