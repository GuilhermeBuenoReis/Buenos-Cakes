import { CheckoutHero } from "../../_components/checkout-hero";

export function CheckoutReviewHeader() {
	return (
		<CheckoutHero
			currentPageLabel="Revisão"
			currentStep="revisao"
			description="Confira os itens, a retirada e a forma de pagamento antes de confirmar o pedido."
			title="Revisão do Pedido"
		/>
	);
}
