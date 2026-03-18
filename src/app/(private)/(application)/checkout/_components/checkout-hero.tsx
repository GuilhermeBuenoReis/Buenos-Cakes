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
		<section className="relative overflow-hidden rounded-[2.15rem] border border-[#ece2e1] bg-[linear-gradient(180deg,rgba(255,253,251,0.98)_0%,rgba(255,248,246,0.96)_100%)] px-6 py-6 shadow-[0_28px_72px_-58px_rgba(15,23,42,0.26)] sm:px-7 sm:py-7">
			<div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_right,rgba(225,105,135,0.12),transparent_38%),radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_28%)]" />

			<div className="relative space-y-7">
				<Breadcrumb>
					<BreadcrumbList className="text-sm font-medium text-slate-400">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link
									className="transition hover:text-slate-700"
									href="/dashboard"
								>
									Início
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link
									className="transition hover:text-slate-700"
									href="/products?cart=true"
								>
									Carrinho
								</Link>
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

				<section className="space-y-4">
					<span className="inline-flex rounded-full border border-[#eed8dc] bg-[#fff8f7] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-rose-500 uppercase">
						Etapa 1 de 3
					</span>
					<div className="space-y-2.5">
						<h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-[2.5rem]">
							Finalizar Pedido
						</h1>
						<p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">
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
