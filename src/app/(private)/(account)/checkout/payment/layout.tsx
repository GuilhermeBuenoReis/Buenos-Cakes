import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Pagamento | Buenos'Cakes",
};

export default function CheckoutPaymentLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
