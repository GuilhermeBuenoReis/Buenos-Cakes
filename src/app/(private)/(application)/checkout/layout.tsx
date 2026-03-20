import type { ReactNode } from "react";
import { CheckoutPickupProvider } from "./_context/checkout-pickup-context";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
	return <CheckoutPickupProvider>{children}</CheckoutPickupProvider>;
}
