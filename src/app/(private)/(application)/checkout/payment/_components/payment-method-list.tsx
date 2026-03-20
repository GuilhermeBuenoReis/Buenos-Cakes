"use client";

import { PaymentMethodCard } from "./payment-method-card";
import type { PaymentMethod, PaymentMethodId } from "./payment-methods";

interface PaymentMethodListProps {
	methods: PaymentMethod[];
	selectedMethod: PaymentMethodId;
	onSelect: (methodId: PaymentMethodId) => void;
}

export function PaymentMethodList({
	methods,
	selectedMethod,
	onSelect,
}: PaymentMethodListProps) {
	return (
		<div
			aria-label="Métodos de pagamento"
			className="mt-6 grid gap-4 md:grid-cols-2"
			role="radiogroup"
		>
			{methods.map((method) => (
				<PaymentMethodCard
					isSelected={selectedMethod === method.id}
					key={method.id}
					method={method}
					onSelect={onSelect}
				/>
			))}
		</div>
	);
}
