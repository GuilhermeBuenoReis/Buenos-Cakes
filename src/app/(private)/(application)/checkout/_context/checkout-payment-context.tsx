"use client";

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from "react";
import type { PaymentMethodId } from "../payment/_components/payment-methods";

export const defaultCheckoutPaymentMethodId: PaymentMethodId = "pix";

interface CheckoutPaymentContextValue {
	cashChange: string;
	selectedMethod: PaymentMethodId;
	setCashChange: (nextCashChange: string) => void;
	setSelectedMethod: (nextMethod: PaymentMethodId) => void;
}

const CheckoutPaymentContext =
	createContext<CheckoutPaymentContextValue | null>(null);

interface CheckoutPaymentProviderProps extends PropsWithChildren {
	initialCashChange?: string;
	initialSelectedMethod?: PaymentMethodId;
}

export function CheckoutPaymentProvider({
	children,
	initialCashChange = "",
	initialSelectedMethod = defaultCheckoutPaymentMethodId,
}: CheckoutPaymentProviderProps) {
	const [cashChange, setCashChange] = useState(initialCashChange);
	const [selectedMethod, setSelectedMethod] = useState(initialSelectedMethod);

	return (
		<CheckoutPaymentContext.Provider
			value={{
				cashChange,
				selectedMethod,
				setCashChange,
				setSelectedMethod,
			}}
		>
			{children}
		</CheckoutPaymentContext.Provider>
	);
}

export function useCheckoutPayment() {
	const context = useContext(CheckoutPaymentContext);

	if (!context) {
		throw new Error(
			"useCheckoutPayment must be used within CheckoutPaymentProvider.",
		);
	}

	return context;
}
