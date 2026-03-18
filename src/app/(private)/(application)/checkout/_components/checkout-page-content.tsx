"use client";

import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartSheet } from "@/contexts/cart-sheet-context";
import { CheckoutPickupProvider } from "../_context/checkout-pickup-context";
import { CheckoutCard } from "./checkout-card";
import { CheckoutHero } from "./checkout-hero";
import { CheckoutOrderSummary } from "./checkout-order-summary";
import { CheckoutPersonalInfoForm } from "./checkout-person-info-form";
import { CheckoutPickupLocationCard } from "./checkout-pickup-location-card";
import { CheckoutPickupScheduler } from "./checkout-pickup-scheduler";

const pickupLocation = {
	address: "Rua das Flores, 123 - Jardim Doce, São Paulo - SP",
	name: "DoceGestão Matriz",
	note: "Aberto hoje até as 19:00",
};

export function CheckoutPageContent() {
	const { hasItems } = useCartSheet();

	return (
		<CheckoutPickupProvider>
			<div className="space-y-6 pb-4">
				<CheckoutHero />

				<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
					<div className="space-y-5">
						<CheckoutCard className="bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,250,250,0.92)_100%)]">
							<div className="flex items-center gap-3">
								<div className="flex size-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
									<UserRound className="size-4" />
								</div>
								<div>
									<h2 className="text-lg font-extrabold text-slate-900">
										Seus Dados Pessoais
									</h2>
									<p className="text-sm text-slate-500">
										Preencha os campos para identificação da retirada.
									</p>
								</div>
							</div>

							<CheckoutPersonalInfoForm />
						</CheckoutCard>

						<CheckoutCard className="bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,248,249,0.94)_100%)]">
							<CheckoutPickupLocationCard location={pickupLocation} />
							<CheckoutPickupScheduler />
						</CheckoutCard>

						<div className="flex flex-col gap-3 rounded-[1.8rem] border border-white/80 bg-white/78 p-3 shadow-[0_28px_54px_-42px_rgba(15,23,42,0.35)] sm:flex-row sm:items-center sm:justify-between sm:p-4">
							<Link
								className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-rose-500"
								href="/products?cart=true"
							>
								<ArrowLeft className="size-4" />
								Voltar ao Carrinho
							</Link>

							<Button
								className="h-11 rounded-full bg-[linear-gradient(135deg,#ff4b61_0%,#ff7e6d_100%)] px-6 text-white shadow-[0_22px_34px_-20px_rgba(244,63,94,0.65)] hover:brightness-[0.98]"
								disabled={!hasItems}
								type="button"
							>
								Próximo Passo
								<ArrowRight className="size-4" />
							</Button>
						</div>
					</div>

					<CheckoutOrderSummary />
				</div>
			</div>
		</CheckoutPickupProvider>
	);
}
