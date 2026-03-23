import { CalendarClock, MapPin } from "lucide-react";
import { CheckoutCard } from "../../_components/checkout-card";

interface CheckoutDeliveryInfoProps {
	address: string;
	dateLabel: string;
	locationName: string;
	note?: string;
	timeLabel: string;
	typeLabel: string;
	compact?: boolean;
}

export function CheckoutDeliveryInfo({
	address,
	dateLabel,
	locationName,
	note,
	timeLabel,
	typeLabel,
	compact = false,
}: CheckoutDeliveryInfoProps) {
	if (compact) {
		return (
			<CheckoutCard className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
				<div className="flex items-start gap-4">
					<div className="flex size-11 items-center justify-center rounded-[1.1rem] border border-[#f0e1e3] bg-[#fff4f5] text-rose-500 shadow-[0_14px_26px_-22px_rgba(212,84,112,0.35)]">
						<CalendarClock className="size-4" />
					</div>
					<div className="space-y-1.5">
						<h2 className="text-lg font-extrabold tracking-tight text-slate-900">
							Agendamento
						</h2>
						<p className="text-sm leading-6 text-slate-600">
							Confira o dia e o horário reservados para a retirada.
						</p>
					</div>
				</div>

				<div className="mt-6 rounded-[1.6rem] border border-[#efe2e3] bg-[#fff8f8] p-4 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.15)]">
					<p className="text-[11px] font-bold tracking-[0.16em] text-rose-500 uppercase">
						{typeLabel}
					</p>
					<p className="mt-3 text-base font-extrabold leading-7 text-slate-950">
						{dateLabel}
					</p>
					<p className="mt-1 text-sm font-semibold text-rose-500">
						Às {timeLabel}
					</p>
					<p className="mt-4 text-xs leading-5 text-slate-500">
						{locationName}
					</p>
				</div>
			</CheckoutCard>
		);
	}

	return (
		<CheckoutCard className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
			<div className="flex items-start gap-4">
				<div className="flex size-11 items-center justify-center rounded-[1.1rem] border border-[#f0e1e3] bg-[#fff4f5] text-rose-500 shadow-[0_14px_26px_-22px_rgba(212,84,112,0.35)]">
					<MapPin className="size-4" />
				</div>
				<div className="space-y-1.5">
					<h2 className="text-lg font-extrabold tracking-tight text-slate-900">
						Entrega ou retirada
					</h2>
					<p className="max-w-2xl text-sm leading-6 text-slate-600">
						Todos os detalhes do atendimento estão confirmados para a próxima
						etapa.
					</p>
				</div>
			</div>

			<div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
				<div className="rounded-[1.5rem] border border-[#ece4e4] bg-[#fffdfb] p-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.14)]">
					<p className="text-sm font-semibold text-slate-600">Modalidade</p>
					<p className="mt-2 text-base font-extrabold leading-7 text-slate-950">
						{typeLabel}
					</p>
					<p className="mt-2 text-sm leading-6 text-slate-600">{note}</p>
				</div>

				<div className="rounded-[1.5rem] border border-[#ece4e4] bg-[#fffdfb] p-4 shadow-[0_16px_32px_-28px_rgba(15,23,42,0.14)]">
					<p className="text-sm font-semibold text-slate-600">Agendamento</p>
					<p className="mt-2 text-base font-extrabold leading-7 text-slate-950">
						{dateLabel}
					</p>
					<p className="mt-2 text-sm font-semibold text-rose-500">
						Às {timeLabel}
					</p>
				</div>
			</div>

			<div className="mt-4 rounded-[1.6rem] border border-[#ece4e4] bg-[linear-gradient(135deg,rgba(255,249,248,0.98)_0%,rgba(255,253,251,1)_100%)] p-4 shadow-[0_18px_34px_-30px_rgba(15,23,42,0.12)]">
				<p className="text-[11px] font-bold tracking-[0.16em] text-rose-500 uppercase">
					Local de retirada
				</p>
				<p className="mt-2 text-sm font-extrabold text-slate-900">
					{locationName}
				</p>
				<p className="mt-2 text-sm leading-6 text-slate-600">{address}</p>
			</div>
		</CheckoutCard>
	);
}
