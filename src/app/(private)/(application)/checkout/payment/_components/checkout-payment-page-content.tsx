"use client";

import { WalletCards } from "lucide-react";
import { useState } from "react";
import { CheckoutCard } from "../../_components/checkout-card";
import { CheckoutHero } from "../../_components/checkout-hero";
import { CheckoutOrderSummary } from "../../_components/checkout-order-summary";
import { CheckoutNavigationFooter } from "./checkout-navigation-footer";
import { PaymentDetailsCard } from "./payment-details-card";
import { PaymentInfoCards } from "./payment-info-cards";
import { PaymentMethodList } from "./payment-method-list";
import { PaymentSummaryCard } from "./payment-summary-card";
import { paymentMethods, type PaymentMethodId } from "./payment-methods";

export function CheckoutPaymentPageContent() {
	const [cashChange, setCashChange] = useState("");
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>("pix");

	const selectedPaymentMethod =
		paymentMethods.find((method) => method.id === selectedMethod) ??
		paymentMethods[0];

	return (
		<div className="relative space-y-7 pb-6">
			<div className="pointer-events-none absolute inset-x-0 top-4 -z-10 h-56 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(225,105,135,0.1),transparent_36%),radial-gradient(circle_at_left,rgba(148,163,184,0.08),transparent_26%)]" />
			<CheckoutHero currentStep="pagamento" />

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_23rem] xl:items-start">
				<div className="space-y-6">
					<CheckoutCard className="bg-[#fffdfa]">
						<div className="flex items-start gap-4">
							<div className="flex size-11 items-center justify-center rounded-[1.1rem] border border-[#f0e1e3] bg-[#fff4f5] text-rose-500">
								<WalletCards className="size-4" />
							</div>
							<div className="space-y-1.5">
								<h2 className="text-lg font-extrabold tracking-tight text-slate-900">
									Escolha como deseja pagar
								</h2>
								<p className="max-w-2xl text-sm leading-6 text-slate-600">
									Selecione a forma de pagamento que faz mais sentido para este
									pedido.
								</p>
							</div>
						</div>

						<PaymentMethodList
							methods={paymentMethods}
							selectedMethod={selectedMethod}
							onSelect={setSelectedMethod}
						/>

						<div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
							<PaymentSummaryCard
								selectedPaymentMethod={selectedPaymentMethod}
							/>
							<PaymentDetailsCard
								cashChange={cashChange}
								selectedPaymentMethod={selectedPaymentMethod}
								onCashChange={setCashChange}
							/>
						</div>
					</CheckoutCard>

					<PaymentInfoCards />
					<CheckoutNavigationFooter />
				</div>

				<CheckoutOrderSummary hideAction />
			</div>
		</div>
	);
}
