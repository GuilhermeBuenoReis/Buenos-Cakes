import Link from "next/link";
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
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GoogleSvg } from "../../../../../components/google-svg";

export function SignInForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
					<CardDescription>Entre com sua conta ou com o Google</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
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
									id="email"
									type="email"
									placeholder="voce@exemplo.com"
									required
								/>
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
								<Input id="password" type="password" required />
							</Field>
							<Field>
								<Button type="submit">Entrar</Button>
								<FieldDescription className="text-center">
									Não tem uma conta? <Link href="#">Criar conta</Link>
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
