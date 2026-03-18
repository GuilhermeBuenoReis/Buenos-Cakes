"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

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

export function CheckoutPersonalInfoForm() {
	const { control, handleSubmit } = useForm<CheckoutPersonalInfoValues>({
		defaultValues: {
			email: "",
			fullName: "",
			phone: "",
		},
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: zodResolver(checkoutPersonalInfoSchema),
	});

	function handlePersonalInfoSubmit({
		email,
		fullName,
		phone,
	}: CheckoutPersonalInfoValues) {
		console.log("Checkout personal info:", email, fullName, phone);
	}

	return (
		<form
			className="mt-6 grid gap-4 sm:grid-cols-2"
			noValidate
			onSubmit={handleSubmit(handlePersonalInfoSubmit)}
		>
			<div className="space-y-2.5 sm:col-span-2">
				<label
					className="text-[13px] font-semibold tracking-[0.01em] text-slate-700"
					htmlFor="checkout-name"
				>
					Nome Completo
				</label>
				<Controller
					control={control}
					name="fullName"
					render={({ field, fieldState }) => (
						<>
							<Input
								aria-describedby={
									fieldState.error ? "checkout-name-error" : undefined
								}
								aria-invalid={fieldState.invalid}
								autoComplete="name"
								id="checkout-name"
								placeholder="Ex: Ana Silva"
								value={field.value}
								variant="subtle"
								onBlur={field.onBlur}
								onChange={field.onChange}
							/>
							{fieldState.error ? (
								<p
									className="text-sm font-medium text-red-500"
									id="checkout-name-error"
								>
									{fieldState.error.message}
								</p>
							) : null}
						</>
					)}
				/>
			</div>

			<div className="space-y-2.5">
				<label
					className="text-[13px] font-semibold tracking-[0.01em] text-slate-700"
					htmlFor="checkout-email"
				>
					E-mail
				</label>
				<Controller
					control={control}
					name="email"
					render={({ field, fieldState }) => (
						<>
							<Input
								aria-describedby={
									fieldState.error ? "checkout-email-error" : undefined
								}
								aria-invalid={fieldState.invalid}
								autoComplete="email"
								id="checkout-email"
								placeholder="ana.silva@exemplo.com"
								type="email"
								value={field.value}
								variant="subtle"
								onBlur={field.onBlur}
								onChange={field.onChange}
							/>
							{fieldState.error ? (
								<p
									className="text-sm font-medium text-red-500"
									id="checkout-email-error"
								>
									{fieldState.error.message}
								</p>
							) : null}
						</>
					)}
				/>
			</div>

			<div className="space-y-2.5">
				<label
					className="text-[13px] font-semibold tracking-[0.01em] text-slate-700"
					htmlFor="checkout-phone"
				>
					WhatsApp / Telefone
				</label>
				<Controller
					control={control}
					name="phone"
					render={({ field, fieldState }) => (
						<>
							<Input
								aria-describedby={
									fieldState.error ? "checkout-phone-error" : undefined
								}
								aria-invalid={fieldState.invalid}
								autoComplete="tel"
								id="checkout-phone"
								placeholder="(11) 99999-9999"
								type="tel"
								value={field.value}
								variant="subtle"
								onBlur={field.onBlur}
								onChange={field.onChange}
							/>
							{fieldState.error ? (
								<p
									className="text-sm font-medium text-red-500"
									id="checkout-phone-error"
								>
									{fieldState.error.message}
								</p>
							) : null}
						</>
					)}
				/>
			</div>
		</form>
	);
}
