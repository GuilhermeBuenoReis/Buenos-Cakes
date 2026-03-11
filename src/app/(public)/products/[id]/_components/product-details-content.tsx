"use client";

import {
	Minus,
	Plus,
	ShieldCheck,
	ShoppingBasket,
	Star,
	Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/api/products/types";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/format-price";

interface ProductDetailsContentProps {
	product: Product;
	relatedImages: Product[];
}

const sizeOptions = [
	{ id: "pequeno", label: "Pequeno", servings: "Serve 4-6" },
	{ id: "medio", label: "Medio", servings: "Serve 8-10" },
	{ id: "grande", label: "Grande", servings: "Serve 12-15" },
] as const;

function getFillingsForCategory(category: string) {
	if (category === "Bolos") {
		return [
			"Creme de Baunilha (Padrao)",
			"Brigadeiro Cremoso",
			"Morango com Chantilly",
		];
	}

	if (category === "Tortas") {
		return ["Creme Citrico (Padrao)", "Ganache Leve", "Frutas Vermelhas"];
	}

	if (category === "Cookies") {
		return ["Chocolate Intenso", "Doce de Leite", "Pistache"];
	}

	return ["Receita da Casa", "Chocolate Belga", "Baunilha Premium"];
}

export function ProductDetailsContent({
	product,
	relatedImages,
}: ProductDetailsContentProps) {
	const [selectedSize, setSelectedSize] =
		useState<(typeof sizeOptions)[number]["id"]>("pequeno");
	const fillings = useMemo(
		() => getFillingsForCategory(product.category),
		[product.category],
	);

	const [selectedFilling, setSelectedFilling] = useState(fillings[0] ?? "");
	const [message, setMessage] = useState("");
	const [quantity, setQuantity] = useState(1);

	const thumbnailProducts =
		relatedImages.length > 0 ? relatedImages : [product];
	const fullStars = Math.round(product.rating);

	return (
		<div className="relative space-y-5">
			<Breadcrumb>
				<BreadcrumbList className="gap-1 text-sm text-rose-400">
					<BreadcrumbItem>
						<BreadcrumbLink
							asChild
							className="text-rose-400 hover:text-rose-500"
						>
							<Link href="/">Inicio</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="text-rose-300" />
					<BreadcrumbItem>
						<BreadcrumbLink
							asChild
							className="text-rose-400 hover:text-rose-500"
						>
							<Link href="/products">{product.category}</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="text-rose-300" />
					<BreadcrumbItem>
						<BreadcrumbPage className="font-semibold text-rose-500">
							{product.name}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
				<div className="space-y-4">
					<div className="relative aspect-[1/1.04] overflow-hidden rounded-[28px] border border-rose-100/70 bg-white shadow-[0_24px_45px_-32px_rgba(15,23,42,0.35)]">
						<Image
							alt={product.name}
							className="object-cover"
							fill
							priority
							sizes="(max-width: 1024px) 100vw, 50vw"
							src={product.image}
						/>
					</div>

					<div className="grid grid-cols-4 gap-3">
						{thumbnailProducts.slice(0, 4).map((item) => (
							<div
								key={item.id}
								className="relative aspect-square overflow-hidden rounded-2xl border border-rose-100/70 bg-white shadow-[0_18px_35px_-32px_rgba(15,23,42,0.35)]"
							>
								<Image
									alt={item.name}
									className="object-cover"
									fill
									sizes="(max-width: 1024px) 25vw, 12vw"
									src={item.image}
								/>
							</div>
						))}
					</div>

					<div className="space-y-4 rounded-[26px] border border-white/70 bg-white/70 p-5 shadow-[0_18px_45px_-38px_rgba(15,23,42,0.35)]">
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
								Sobre este {product.category === "Bolos" ? "bolo" : "produto"}
							</h2>
							<p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
								{product.description}
							</p>
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
								<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500">
									<ShieldCheck className="h-4 w-4" />
								</span>
								<div className="text-sm leading-tight">
									<p className="font-semibold text-slate-900">Ingredientes</p>
									<p className="text-slate-500">Selecao premium da casa</p>
								</div>
							</div>

							<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
								<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500">
									<Truck className="h-4 w-4" />
								</span>
								<div className="text-sm leading-tight">
									<p className="font-semibold text-slate-900">Preparo em 24h</p>
									<p className="text-slate-500">Retirada ou entrega agendada</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-5 rounded-[30px] border border-white/70 bg-white/76 p-5 shadow-[0_22px_48px_-34px_rgba(190,24,93,0.28)] backdrop-blur-sm sm:p-6">
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
							<div className="flex items-center gap-0.5 text-rose-500">
								{["star-1", "star-2", "star-3", "star-4", "star-5"].map(
									(starId, index) => (
										<Star
											key={starId}
											className={`h-4 w-4 ${
												index < fullStars ? "fill-current" : "text-rose-200"
											}`}
										/>
									),
								)}
							</div>
							<span>({product.reviews} avaliacoes)</span>
						</div>

						<div className="space-y-1">
							<h1 className="max-w-lg text-4xl font-black leading-none tracking-tight text-[#23161b] sm:text-5xl">
								{product.name}
							</h1>
							<p className="text-4xl font-black tracking-tight text-rose-500">
								{formatPrice(product.price)}
							</p>
						</div>
					</div>

					<div className="space-y-3">
						<p className="text-sm font-extrabold tracking-[0.12em] text-rose-400 uppercase">
							Escolha o tamanho
						</p>
						<div className="grid gap-3 sm:grid-cols-3">
							{sizeOptions.map((size) => {
								const isActive = size.id === selectedSize;

								return (
									<button
										type="button"
										key={size.id}
										aria-pressed={isActive}
										onClick={() => setSelectedSize(size.id)}
										className={`rounded-2xl border px-4 py-3 text-left transition ${
											isActive
												? "border-rose-400 bg-rose-50 shadow-[0_14px_30px_-24px_rgba(244,63,94,0.8)]"
												: "border-slate-200 bg-slate-50/80 hover:border-rose-200 hover:bg-white"
										}`}
									>
										<p className="text-lg font-bold text-slate-800">
											{size.label}
										</p>
										<p className="text-xs font-medium text-slate-500">
											{size.servings}
										</p>
									</button>
								);
							})}
						</div>
					</div>

					<div className="space-y-3">
						<p className="text-sm font-extrabold tracking-[0.12em] text-rose-400 uppercase">
							Recheio extra
						</p>
						<Select value={selectedFilling} onValueChange={setSelectedFilling}>
							<SelectTrigger
								aria-label="Selecionar recheio extra"
								className="h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 text-left text-base text-slate-700"
							>
								<SelectValue placeholder="Selecione um recheio" />
							</SelectTrigger>
							<SelectContent className="rounded-2xl border-slate-200">
								{fillings.map((filling) => (
									<SelectItem key={filling} value={filling}>
										{filling}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-between gap-3">
							<p className="text-sm font-extrabold tracking-[0.12em] text-rose-400 uppercase">
								Mensagem personalizada
							</p>
							<span className="text-xs font-medium text-slate-400">
								{message.length}/50
							</span>
						</div>
						<textarea
							aria-label="Mensagem personalizada"
							value={message}
							onChange={(event) => setMessage(event.target.value.slice(0, 50))}
							placeholder="Ex: Feliz aniversario, Maria!"
							className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
						/>
					</div>

					<div className="space-y-3 pt-2">
						<div className="flex flex-col gap-3 sm:flex-row">
							<div className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:w-28">
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									aria-label="Diminuir quantidade"
									className="h-8 w-8 rounded-full text-rose-500 hover:bg-rose-50 hover:text-rose-500"
									onClick={() =>
										setQuantity((current) => Math.max(1, current - 1))
									}
								>
									<Minus className="h-4 w-4" />
								</Button>
								<Input
									aria-label="Quantidade"
									readOnly
									value={quantity}
									className="h-auto border-0 bg-transparent px-0 text-center text-base font-bold text-slate-900 shadow-none focus-visible:ring-0"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									aria-label="Aumentar quantidade"
									className="h-8 w-8 rounded-full text-rose-500 hover:bg-rose-50 hover:text-rose-500"
									onClick={() => setQuantity((current) => current + 1)}
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>

							<Button className="h-14 flex-1 rounded-2xl text-base shadow-[0_18px_35px_-24px_rgba(244,63,94,0.8)]">
								<ShoppingBasket className="h-5 w-5" />
								Adicionar ao Carrinho
							</Button>
						</div>

						<p className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 sm:justify-start">
							<Truck className="h-3.5 w-3.5" />
							Entrega gratis para pedidos acima de {formatPrice(200)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
