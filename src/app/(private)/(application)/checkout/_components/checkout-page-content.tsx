"use client";

import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartSheet } from "@/contexts/cart-sheet-context";
import { checkoutPickupLocation } from "../_lib/checkout-pickup-location";
import { CheckoutCard } from "./checkout-card";
import { CheckoutHero } from "./checkout-hero";
import { CheckoutOrderSummary } from "./checkout-order-summary";
import { CheckoutPersonalInfoForm } from "./checkout-person-info-form";
import { CheckoutPickupLocationCard } from "./checkout-pickup-location-card";
import { CheckoutPickupScheduler } from "./checkout-pickup-scheduler";

export function CheckoutPageContent() {
	const { hasItems } = useCartSheet();

	return (
		<div className="relative space-y-7 pb-6">
			<div className="pointer-events-none absolute inset-x-0 top-4 -z-10 h-56 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(225,105,135,0.1),transparent_36%),radial-gradient(circle_at_left,rgba(148,163,184,0.08),transparent_26%)]" />
			<CheckoutHero />

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_23rem] xl:items-start">
				<div className="space-y-6">
					<CheckoutCard className="bg-[#fffdfa]">
						<div className="flex items-start gap-4">
							<div className="flex size-11 items-center justify-center rounded-[1.1rem] border border-[#f0e1e3] bg-[#fff4f5] text-rose-500">
								<UserRound className="size-4" />
							</div>
							<div className="space-y-1.5">
								<h2 className="text-lg font-extrabold tracking-tight text-slate-900">
									Seus Dados Pessoais
								</h2>
								<p className="max-w-lg text-sm leading-6 text-slate-600">
									Preencha os campos para identificação da retirada.
								</p>
							</div>
						</div>

						<CheckoutPersonalInfoForm />
					</CheckoutCard>

					<CheckoutCard className="bg-[#fffdfa]">
						<CheckoutPickupLocationCard location={checkoutPickupLocation} />
						<CheckoutPickupScheduler />
					</CheckoutCard>

					<div className="flex flex-col gap-4 rounded-[1.75rem] border border-[#ebe3e3] bg-[#fffdfa] p-4 shadow-[0_20px_48px_-38px_rgba(15,23,42,0.16)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
						<Link
							className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-rose-500"
							href="/products?cart=true"
						>
							<ArrowLeft className="size-4" />
							Voltar ao Carrinho
						</Link>

						{hasItems ? (
							<Button
								asChild
								className="h-11 rounded-full bg-[#d45470] px-6 text-white shadow-[0_18px_36px_-24px_rgba(212,84,112,0.45)] hover:bg-[#c74a65]"
							>
								<Link href="/checkout/payment">
									Próximo Passo
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						) : (
							<Button
								className="h-11 rounded-full bg-[#d45470] px-6 text-white shadow-[0_18px_36px_-24px_rgba(212,84,112,0.45)] hover:bg-[#c74a65]"
								disabled
								type="button"
							>
								Próximo Passo
								<ArrowRight className="size-4" />
							</Button>
						)}
					</div>
				</div>

				<CheckoutOrderSummary
					actionHref="/checkout/payment"
					actionLabel="Ir para Pagamento"
				/>
			</div>
		</div>
	);
}
