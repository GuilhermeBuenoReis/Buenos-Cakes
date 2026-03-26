"use client";

import { PaymentMethodCard } from "./payment-method-card";
import type { PaymentMethod, PaymentMethodId } from "./payment-methods";

interface PaymentMethodListProps {
	handleSelectMethod: (methodId: PaymentMethodId) => void;
	methods: PaymentMethod[];
	selectedMethod: PaymentMethodId;
}

export function PaymentMethodList({
	handleSelectMethod,
	methods,
	selectedMethod,
}: PaymentMethodListProps) {
	return (
		<div
			aria-label="Métodos de pagamento"
			className="mt-6 grid gap-4 md:grid-cols-2"
			role="radiogroup"
		>
			{methods.map((method) => (
				<PaymentMethodCard
					handleSelectMethod={handleSelectMethod}
					isSelected={selectedMethod === method.id}
					key={method.id}
					method={method}
				/>
			))}
		</div>
	);
}
