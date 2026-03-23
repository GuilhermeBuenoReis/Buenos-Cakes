import { z } from "zod";

export const checkoutPersonalInfoSchema = z.object({
	email: z.email("Informe um e-mail válido."),
	fullName: z
		.string()
		.trim()
		.min(1, "Informe seu nome completo.")
		.refine((value) => value.split(/\s+/).length >= 2, {
			message: "Digite nome e sobrenome.",
		}),
	phone: z
		.string()
		.trim()
		.min(1, "Informe seu telefone.")
		.refine((value) => {
			const digits = value.replace(/\D/g, "");
			return digits.length >= 10 && digits.length <= 11;
		}, "Informe um telefone válido."),
});

export type CheckoutPersonalInfoValues = z.infer<
	typeof checkoutPersonalInfoSchema
>;

export const defaultCheckoutPersonalInfoValues: CheckoutPersonalInfoValues = {
	email: "",
	fullName: "",
	phone: "",
};
