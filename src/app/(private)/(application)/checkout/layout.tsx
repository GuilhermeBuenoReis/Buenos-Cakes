import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CheckoutCustomerProvider } from "./_context/checkout-customer-context";
import { CheckoutPaymentProvider } from "./_context/checkout-payment-context";
import { CheckoutPickupProvider } from "./_context/checkout-pickup-context";

export const metadata: Metadata = {
	title: "Finalizar Pedido | Buenos'Cakes",
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
	return (
		<CheckoutPickupProvider>
			<CheckoutCustomerProvider>
				<CheckoutPaymentProvider>{children}</CheckoutPaymentProvider>
			</CheckoutCustomerProvider>
		</CheckoutPickupProvider>
	);
}
