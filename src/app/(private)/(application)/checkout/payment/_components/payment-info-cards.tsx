import { ShieldCheck } from "lucide-react";
import { CheckoutCard } from "../../_components/checkout-card";

const paymentInfoCards = [
	{
		description:
			"Ideal para quem quer pagar rápido e seguir com o pedido sem demora.",
		label: "Pix",
		textColorClassName: "text-emerald-500",
		title: "Confirmação ágil",
	},
	{
		description:
			"Uma opção prática para pagar online e manter a finalização mais direta.",
		label: "Cartões",
		textColorClassName: "text-sky-500",
		title: "Crédito ou débito",
	},
	{
		description:
			"Você pode acertar no balcão e informar um valor de troco para deixar tudo combinado.",
		label: "Dinheiro",
		textColorClassName: "text-amber-600",
		title: "Troco se precisar",
	},
] as const;

export function PaymentInfoCards() {
	return (
		<CheckoutCard className="overflow-hidden border-[#eadfe2] bg-[linear-gradient(135deg,rgba(255,248,247,0.98)_0%,rgba(255,252,250,1)_48%,rgba(247,250,252,0.96)_100%)]">
			<div className="flex items-start gap-4">
				<div className="flex size-11 items-center justify-center rounded-[1.1rem] border border-[#f0e1e3] bg-white text-rose-500 shadow-[0_14px_26px_-22px_rgba(212,84,112,0.35)]">
					<ShieldCheck className="size-4" />
				</div>
				<div className="space-y-1.5">
					<h2 className="text-lg font-extrabold tracking-tight text-slate-900">
						Antes de continuar
					</h2>
					<p className="max-w-2xl text-sm leading-6 text-slate-600">
						Confira os pontos principais de cada forma de pagamento e siga com a
						opção que mais combina com você.
					</p>
				</div>
			</div>

			<div className="mt-6 grid gap-4 md:grid-cols-3">
				{paymentInfoCards.map((card) => (
					<div
						className="rounded-[1.35rem] border border-white/80 bg-white/90 p-4 shadow-[0_16px_32px_-30px_rgba(15,23,42,0.16)]"
						key={card.label}
					>
						<p
							className={`text-[11px] font-bold tracking-[0.16em] uppercase ${card.textColorClassName}`}
						>
							{card.label}
						</p>
						<p className="mt-2 text-sm font-extrabold text-slate-900">
							{card.title}
						</p>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							{card.description}
						</p>
					</div>
				))}
			</div>
		</CheckoutCard>
	);
}
