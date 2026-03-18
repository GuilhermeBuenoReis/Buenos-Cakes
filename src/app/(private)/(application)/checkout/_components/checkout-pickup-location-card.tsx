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
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-1.5">
					<h2 className="text-lg font-extrabold tracking-tight text-slate-900">
						Detalhes da Retirada
					</h2>
					<p className="max-w-lg text-sm leading-6 text-slate-600">
						Escolha o melhor dia e horário para buscar o pedido.
					</p>
				</div>

				<span className="inline-flex w-fit items-center rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-emerald-700 uppercase">
					Retirada no local
				</span>
			</div>
			<div className="mt-6 rounded-[1.75rem] border border-[#efe2e3] bg-[#fff8f7] p-4 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.18)] sm:p-5">
				<div className="flex items-start gap-4">
					<div className="flex size-11 items-center justify-center rounded-[1.1rem] border border-[#efe4e4] bg-white text-rose-500 shadow-[0_14px_30px_-28px_rgba(15,23,42,0.2)]">
						<Store className="size-4" />
					</div>

					<div className="space-y-1.5">
						<h3 className="text-sm font-extrabold tracking-[0.01em] text-slate-900">
							{location.name}
						</h3>
						<p className="text-sm leading-6 text-slate-600">
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
