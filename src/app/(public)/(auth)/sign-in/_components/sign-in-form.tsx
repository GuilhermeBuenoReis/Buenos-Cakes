"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { GoogleSvg } from "../../../../../components/google-svg";

const signInSchema = z.object({
	email: z.email("Informe um e-mail válido."),
	password: z.string().trim().min(1, "Informe sua senha."),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const defaultSignInFormValues: SignInFormValues = {
	email: "",
	password: "",
};

export function SignInForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<SignInFormValues>({
		defaultValues: defaultSignInFormValues,
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: zodResolver(signInSchema),
	});

	function handleSignInSubmit(_values: SignInFormValues) {}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
					<CardDescription>Entre com sua conta ou com o Google</CardDescription>
				</CardHeader>
				<CardContent>
					<form noValidate onSubmit={handleSubmit(handleSignInSubmit)}>
						<FieldGroup>
							<Field>
								<Button variant="outline" type="button">
									<GoogleSvg />
									Entrar com Google
								</Button>
							</Field>
							<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
								Ou continue com
							</FieldSeparator>
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
								<FieldError errors={[errors.email]} />
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Senha</FieldLabel>
									<Link
										href="#"
										className="ml-auto text-sm underline-offset-4 hover:underline"
									>
										Esqueceu sua senha?
									</Link>
								</div>
								<Input
									aria-invalid={Boolean(errors.password)}
									autoComplete="current-password"
									id="password"
									type="password"
									{...register("password")}
									required
								/>
								<FieldError errors={[errors.password]} />
							</Field>
							<Field>
								<Button type="submit">Entrar</Button>
								<FieldDescription className="text-center">
									Não tem uma conta? <Link href="/sign-up">Criar conta</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				Ao continuar, você concorda com nossos{" "}
				<Link href="#">Termos de Serviço</Link> e{" "}
				<Link href="#">Política de Privacidade</Link>.
			</FieldDescription>
		</div>
	);
}
