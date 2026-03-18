import { Store } from "lucide-react";

interface CheckoutPickupLocationCardProps {
	location: {
		address: string;
		name: string;
		note: string;
	};
}

export function CheckoutPickupLocationCard({
	location,
}: CheckoutPickupLocationCardProps) {
	return (
		<>
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-lg font-extrabold text-slate-900">
						Detalhes da Retirada
					</h2>
					<p className="text-sm text-slate-500">
						Escolha o melhor dia e horário para buscar o pedido.
					</p>
				</div>

				<span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-emerald-600 uppercase">
					Retirada no local
				</span>
			</div>
			<div className="mt-5 rounded-[1.75rem] border border-rose-100/90 bg-[linear-gradient(135deg,#fff4f6_0%,#fffafa_100%)] p-4 shadow-[0_24px_42px_-34px_rgba(244,63,94,0.35)]">
				<div className="flex items-start gap-3">
					<div className="flex size-11 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-[0_18px_26px_-20px_rgba(244,63,94,0.6)]">
						<Store className="size-4" />
					</div>

					<div className="space-y-1">
						<h3 className="text-sm font-extrabold text-slate-900">
							{location.name}
						</h3>
						<p className="text-sm leading-5 text-slate-500">
							{location.address}
						</p>
						<p className="text-sm font-semibold text-rose-500">
							{location.note}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
