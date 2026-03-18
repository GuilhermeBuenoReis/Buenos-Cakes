import type { Metadata } from "next";
import { CheckoutPageContent } from "./_components/checkout-page-content";

export const metadata: Metadata = {
	title: "Finalizar Pedido | Buenos'Cakes",
};

export default function CheckoutPage() {
	return <CheckoutPageContent />;
}
