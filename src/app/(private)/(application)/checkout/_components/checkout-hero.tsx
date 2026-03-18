import Link from "next/link";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CheckoutStep } from "./checkout-step";

const checkoutSteps = [
	{
		id: "identificacao",
		label: "Identificação",
		number: "1",
		status: "active",
	},
	{ id: "retirada", label: "Retirada", number: "2", status: "upcoming" },
	{ id: "revisao", label: "Revisão", number: "3", status: "upcoming" },
] as const;

export function CheckoutHero() {
	return (
		<section className="relative overflow-hidden rounded-[2.25rem] border border-rose-100/80 bg-[linear-gradient(135deg,#fffdfd_0%,#fff6f7_38%,#f7fbff_100%)] p-6 shadow-[0_40px_90px_-62px_rgba(244,63,94,0.45)] sm:p-7">
			<div className="absolute -right-16 -top-20 size-56 rounded-full bg-rose-200/25 blur-3xl" />
			<div className="absolute -left-12 bottom-0 size-44 rounded-full bg-sky-100/45 blur-3xl" />

			<div className="relative space-y-6">
				<Breadcrumb>
					<BreadcrumbList className="text-sm font-medium text-slate-400">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/dashboard">Início</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/products?cart=true">Carrinho</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold text-slate-700">
								Checkout
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<section className="space-y-3">
					<span className="inline-flex rounded-full bg-white/85 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-rose-500 uppercase shadow-[0_18px_30px_-24px_rgba(244,63,94,0.6)]">
						Etapa 1 de 3
					</span>
					<div className="space-y-2">
						<h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-[2.4rem]">
							Finalizar Pedido
						</h1>
						<p className="max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
							Complete as informações para retirar seu pedido no local com tudo
							já alinhado para uma retirada rápida e sem surpresas.
						</p>
					</div>
				</section>

				<ol className="grid gap-3 sm:grid-cols-3">
					{checkoutSteps.map((step) => (
						<CheckoutStep
							isActive={step.status === "active"}
							key={step.id}
							label={step.label}
							number={step.number}
						/>
					))}
				</ol>
			</div>
		</section>
	);
}
