"use client";

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from "react";
import {
	defaultPickupTime,
	getInitialPickupDate,
} from "../_lib/checkout-pickup";

interface CheckoutPickupContextValue {
	pickupDate: Date;
	pickupTime: string;
	setPickupDate: (date: Date) => void;
	setPickupTime: (time: string) => void;
}

const CheckoutPickupContext = createContext<CheckoutPickupContextValue | null>(
	null,
);

export function CheckoutPickupProvider({ children }: PropsWithChildren) {
	const [pickupDate, setPickupDate] = useState(getInitialPickupDate);
	const [pickupTime, setPickupTime] = useState(defaultPickupTime);

	return (
		<CheckoutPickupContext.Provider
			value={{
				pickupDate,
				pickupTime,
				setPickupDate,
				setPickupTime,
			}}
		>
			{children}
		</CheckoutPickupContext.Provider>
	);
}

export function useCheckoutPickup() {
	const context = useContext(CheckoutPickupContext);

	if (!context) {
		throw new Error(
			"useCheckoutPickup must be used within CheckoutPickupProvider.",
		);
	}

	return context;
}
