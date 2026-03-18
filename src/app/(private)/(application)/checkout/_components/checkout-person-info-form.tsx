import { Input } from "@/components/ui/input";

export function CheckoutPersonalInfoForm() {
	return (
		<div className="mt-5 grid gap-4 sm:grid-cols-2">
			<div className="space-y-2 sm:col-span-2">
				<label
					className="text-sm font-semibold text-slate-700"
					htmlFor="checkout-name"
				>
					Nome Completo
				</label>
				<Input
					className="h-12 rounded-[1.15rem] border-white bg-white px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_18px_34px_-30px_rgba(15,23,42,0.3)]"
					id="checkout-name"
					placeholder="Ex: Ana Silva"
				/>
			</div>

			<div className="space-y-2">
				<label
					className="text-sm font-semibold text-slate-700"
					htmlFor="checkout-email"
				>
					E-mail
				</label>
				<Input
					className="h-12 rounded-[1.15rem] border-white bg-white px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_18px_34px_-30px_rgba(15,23,42,0.3)]"
					id="checkout-email"
					placeholder="ana.silva@exemplo.com"
					type="email"
				/>
			</div>

			<div className="space-y-2">
				<label
					className="text-sm font-semibold text-slate-700"
					htmlFor="checkout-phone"
				>
					WhatsApp / Telefone
				</label>
				<Input
					className="h-12 rounded-[1.15rem] border-white bg-white px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_18px_34px_-30px_rgba(15,23,42,0.3)]"
					id="checkout-phone"
					placeholder="(11) 99999-9999"
					type="tel"
				/>
			</div>
		</div>
	);
}
