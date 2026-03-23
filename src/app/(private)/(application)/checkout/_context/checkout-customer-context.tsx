"use client";

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from "react";
import {
	type CheckoutPersonalInfoValues,
	defaultCheckoutPersonalInfoValues,
} from "../_lib/checkout-personal-info";

interface CheckoutCustomerContextValue {
	customerInfo: CheckoutPersonalInfoValues;
	setCustomerInfo: (nextCustomerInfo: CheckoutPersonalInfoValues) => void;
	updateCustomerInfo: (
		nextCustomerInfo: Partial<CheckoutPersonalInfoValues>,
	) => void;
}

const CheckoutCustomerContext =
	createContext<CheckoutCustomerContextValue | null>(null);

interface CheckoutCustomerProviderProps extends PropsWithChildren {
	initialCustomerInfo?: CheckoutPersonalInfoValues;
}

export function CheckoutCustomerProvider({
	children,
	initialCustomerInfo = defaultCheckoutPersonalInfoValues,
}: CheckoutCustomerProviderProps) {
	const [customerInfo, setCustomerInfoState] = useState(initialCustomerInfo);

	function setCustomerInfo(nextCustomerInfo: CheckoutPersonalInfoValues) {
		setCustomerInfoState(nextCustomerInfo);
	}

	function updateCustomerInfo(
		nextCustomerInfo: Partial<CheckoutPersonalInfoValues>,
	) {
		setCustomerInfoState((currentCustomerInfo) => ({
			...currentCustomerInfo,
			...nextCustomerInfo,
		}));
	}

	return (
		<CheckoutCustomerContext.Provider
			value={{
				customerInfo,
				setCustomerInfo,
				updateCustomerInfo,
			}}
		>
			{children}
		</CheckoutCustomerContext.Provider>
	);
}

export function useCheckoutCustomer() {
	const context = useContext(CheckoutCustomerContext);

	if (!context) {
		throw new Error(
			"useCheckoutCustomer must be used within CheckoutCustomerProvider.",
		);
	}

	return context;
}
