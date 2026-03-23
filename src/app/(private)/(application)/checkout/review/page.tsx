import type { Metadata } from "next";
import { CheckoutReviewPageContent } from "./_components/checkout-review-page-content";

export const metadata: Metadata = {
	title: "Revisão do Pedido | Buenos'Cakes",
};

export default function CheckoutReviewPage() {
	return <CheckoutReviewPageContent />;
}
