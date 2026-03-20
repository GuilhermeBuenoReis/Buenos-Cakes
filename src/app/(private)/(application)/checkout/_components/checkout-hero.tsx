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
		number: 1,
	},
	{ id: "pagamento", label: "Pagamento", number: 2 },
	{ id: "revisao", label: "Revisão", number: 3 },
] as const;

type CheckoutStepId = (typeof checkoutSteps)[number]["id"];

const checkoutHeroCopy: Record<
	CheckoutStepId,
	{ currentPageLabel: string; description: string; title: string }
> = {
	identificacao: {
		currentPageLabel: "Checkout",
		description:
			"Complete as informações para retirar seu pedido no local com tudo já alinhado para uma retirada rápida e sem surpresas.",
		title: "Finalizar Pedido",
	},
	pagamento: {
		currentPageLabel: "Pagamento",
		description:
			"Escolha a forma de pagamento ideal para o seu pedido e siga com a opção que fizer mais sentido para a retirada.",
		title: "Pagamento do Pedido",
	},
	revisao: {
		currentPageLabel: "Revisão",
		description:
			"Revise os dados do pedido, confirme a forma de pagamento e finalize tudo com segurança.",
		title: "Revisar Pedido",
	},
};

interface CheckoutHeroProps {
	currentStep?: CheckoutStepId;
	currentPageLabel?: string;
	description?: string;
	title?: string;
}

export function CheckoutHero({
	currentStep = "identificacao",
	currentPageLabel,
	description,
	title,
}: CheckoutHeroProps) {
	const currentStepIndex = checkoutSteps.findIndex(
		(step) => step.id === currentStep,
	);
	const currentStepNumber = currentStepIndex + 1;
	const heroCopy = checkoutHeroCopy[currentStep];
	const resolvedCurrentPageLabel =
		currentPageLabel ?? heroCopy.currentPageLabel;

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
						{resolvedCurrentPageLabel === "Checkout" ? (
							<BreadcrumbItem>
								<BreadcrumbPage className="font-semibold text-slate-700">
									Checkout
								</BreadcrumbPage>
							</BreadcrumbItem>
						) : (
							<>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link
											className="transition hover:text-slate-700"
											href="/checkout"
										>
											Checkout
										</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage className="font-semibold text-slate-700">
										{resolvedCurrentPageLabel}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</>
						)}
					</BreadcrumbList>
				</Breadcrumb>

				<section className="space-y-4">
					<span className="inline-flex rounded-full border border-[#eed8dc] bg-[#fff8f7] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-rose-500 uppercase">
						Etapa {currentStepNumber} de {checkoutSteps.length}
					</span>
					<div className="space-y-2.5">
						<h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-[2.5rem]">
							{title ?? heroCopy.title}
						</h1>
						<p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">
							{description ?? heroCopy.description}
						</p>
					</div>
				</section>

				<ol className="grid gap-3 sm:grid-cols-3">
					{checkoutSteps.map((step, index) => (
						<CheckoutStep
							isActive={step.id === currentStep}
							key={step.id}
							label={step.label}
							number={step.number.toString()}
							status={
								index < currentStepIndex
									? "completed"
									: step.id === currentStep
										? "active"
										: "upcoming"
							}
						/>
					))}
				</ol>
			</div>
		</section>
	);
}
