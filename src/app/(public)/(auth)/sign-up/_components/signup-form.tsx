"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GoogleSvg } from "@/components/google-svg";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const signUpSchema = z
	.object({
		confirmPassword: z.string().trim().min(1, "Confirme sua senha."),
		email: z.email("Informe um e-mail válido."),
		name: z
			.string()
			.trim()
			.min(1, "Informe seu nome completo.")
			.refine((value) => value.split(/\s+/).length >= 2, {
				message: "Digite nome e sobrenome.",
			}),
		password: z
			.string()
			.trim()
			.min(8, "A senha deve ter pelo menos 8 caracteres."),
	})
	.superRefine((values, context) => {
		if (values.password !== values.confirmPassword) {
			context.addIssue({
				code: "custom",
				message: "As senhas não coincidem.",
				path: ["confirmPassword"],
			});
		}
	});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const defaultSignUpFormValues: SignUpFormValues = {
	confirmPassword: "",
	email: "",
	name: "",
	password: "",
};

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<SignUpFormValues>({
		defaultValues: defaultSignUpFormValues,
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: zodResolver(signUpSchema),
	});

	function handleSignUpSubmit(_values: SignUpFormValues) {}

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			noValidate
			onSubmit={handleSubmit(handleSignUpSubmit)}
			{...props}
		>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Crie sua conta</h1>
					<p className="text-sm text-balance text-muted-foreground">
						Preencha os dados abaixo para criar sua conta
					</p>
				</div>
				<Field>
					<FieldLabel htmlFor="name">Nome completo</FieldLabel>
					<Input
						aria-invalid={Boolean(errors.name)}
						autoComplete="name"
						id="name"
						placeholder="João da Silva"
						type="text"
						{...register("name")}
						required
					/>
					<FieldError errors={[errors.name]} />
				</Field>
				<Field>
					<FieldLabel htmlFor="email">E-mail</FieldLabel>
					<Input
						aria-invalid={Boolean(errors.email)}
						autoComplete="email"
						id="email"
						placeholder="voce@exemplo.com"
						type="email"
						{...register("email")}
						required
					/>
					<FieldDescription>
						Usaremos este e-mail para entrar em contato com você. Não
						compartilharemos seu e-mail com terceiros.
					</FieldDescription>
					<FieldError errors={[errors.email]} />
				</Field>
				<Field>
					<FieldLabel htmlFor="password">Senha</FieldLabel>
					<Input
						aria-invalid={Boolean(errors.password)}
						autoComplete="new-password"
						id="password"
						type="password"
						{...register("password")}
						required
					/>
					<FieldDescription>Deve ter pelo menos 8 caracteres.</FieldDescription>
					<FieldError errors={[errors.password]} />
				</Field>
				<Field>
					<FieldLabel htmlFor="confirm-password">Confirmar senha</FieldLabel>
					<Input
						aria-invalid={Boolean(errors.confirmPassword)}
						autoComplete="new-password"
						id="confirm-password"
						type="password"
						{...register("confirmPassword")}
						required
					/>
					<FieldDescription>Confirme sua senha.</FieldDescription>
					<FieldError errors={[errors.confirmPassword]} />
				</Field>
				<Field>
					<Button type="submit">Criar conta</Button>
				</Field>
				<FieldSeparator>Ou continue com</FieldSeparator>
				<Field>
					<Button variant="outline" type="button">
						<GoogleSvg />
						Criar conta com Google
					</Button>
					<FieldDescription className="px-6 text-center">
						Já tem uma conta? <Link href="/sign-in">Entrar</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
