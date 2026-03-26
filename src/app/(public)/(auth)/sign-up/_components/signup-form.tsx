import Link from "next/link";
import { GoogleSvg } from "@/components/google-svg";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	return (
		<form className={cn("flex flex-col gap-6", className)} {...props}>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Crie sua conta</h1>
					<p className="text-sm text-balance text-muted-foreground">
						Preencha os dados abaixo para criar sua conta
					</p>
				</div>
				<Field>
					<FieldLabel htmlFor="name">Nome completo</FieldLabel>
					<Input id="name" type="text" placeholder="João da Silva" required />
				</Field>
				<Field>
					<FieldLabel htmlFor="email">E-mail</FieldLabel>
					<Input
						id="email"
						type="email"
						placeholder="voce@exemplo.com"
						required
					/>
					<FieldDescription>
						Usaremos este e-mail para entrar em contato com você. Não
						compartilharemos seu e-mail com terceiros.
					</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor="password">Senha</FieldLabel>
					<Input id="password" type="password" required />
					<FieldDescription>
						Deve ter pelo menos 8 caracteres.
					</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor="confirm-password">Confirmar senha</FieldLabel>
					<Input id="confirm-password" type="password" required />
					<FieldDescription>Confirme sua senha.</FieldDescription>
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
						Já tem uma conta? <Link href="#">Entrar</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
