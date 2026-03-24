import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Revisão do Pedido | Buenos'Cakes",
};

export default function CheckoutReviewLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
