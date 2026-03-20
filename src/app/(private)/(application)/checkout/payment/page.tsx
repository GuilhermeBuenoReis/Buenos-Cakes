import type { Metadata } from "next";
import { CheckoutPaymentPageContent } from "./_components/checkout-payment-page-content";

export const metadata: Metadata = {
	title: "Pagamento | Buenos'Cakes",
};

export default function CheckoutPaymentPage() {
	return <CheckoutPaymentPageContent />;
}
