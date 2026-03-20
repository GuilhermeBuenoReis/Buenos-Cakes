import {
	Banknote,
	CreditCard,
	type LucideIcon,
	QrCode,
	WalletCards,
} from "lucide-react";

export type PaymentMethodId = "cash" | "credit-card" | "debit-card" | "pix";

export interface PaymentMethod {
	badge: string;
	description: string;
	detail: string;
	icon: LucideIcon;
	id: PaymentMethodId;
	label: string;
	summaryLabel: string;
}

export const paymentMethods: PaymentMethod[] = [
	{
		badge: "Rápido",
		description:
			"Pagamento ágil para quem quer confirmar o pedido em poucos instantes.",
		detail:
			"Uma ótima escolha para quem busca praticidade e rapidez na finalização.",
		icon: QrCode,
		id: "pix",
		label: "Pix",
		summaryLabel: "Pagamento instantâneo",
	},
	{
		badge: "Online",
		description:
			"Ideal para pagar com limite disponível e manter tudo organizado.",
		detail:
			"Bom para quem prefere concentrar a compra no crédito e seguir com comodidade.",
		icon: CreditCard,
		id: "credit-card",
		label: "Cartão de crédito",
		summaryLabel: "Pagamento com cartão de crédito",
	},
	{
		badge: "Online",
		description: "Uma opção direta para quem prefere pagar à vista no cartão.",
		detail: "Funciona bem para uma confirmação simples e objetiva do pedido.",
		icon: WalletCards,
		id: "debit-card",
		label: "Cartão de débito",
		summaryLabel: "Pagamento com cartão de débito",
	},
	{
		badge: "Na retirada",
		description: "Pagamento presencial para quem prefere acertar no balcão.",
		detail:
			"Uma boa alternativa para quem quer pagar na retirada e informar troco, se precisar.",
		icon: Banknote,
		id: "cash",
		label: "Dinheiro",
		summaryLabel: "Pagamento na retirada",
	},
];
