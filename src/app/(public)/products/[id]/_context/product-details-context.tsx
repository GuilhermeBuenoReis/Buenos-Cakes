"use client";

import {
	parseAsInteger,
	parseAsString,
	parseAsStringEnum,
	useQueryStates,
} from "nuqs";
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useMemo,
} from "react";
import type { Product } from "@/api/products/types";

const sizeOptions = [
	{ id: "pequeno", label: "Pequeno", servings: "Serve 4-6" },
	{ id: "medio", label: "Medio", servings: "Serve 8-10" },
	{ id: "grande", label: "Grande", servings: "Serve 12-15" },
] as const;

type SizeOptionId = (typeof sizeOptions)[number]["id"];

const sizeOptionIds = sizeOptions.map((size) => size.id) as SizeOptionId[];

function clampQuantity(quantity: number) {
	return Math.max(1, quantity);
}

function clampMessage(message: string) {
	return message.slice(0, 50);
}

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

interface ProductDetailsContextValue {
	fillings: string[];
	fullStars: number;
	message: string;
	product: Product;
	quantity: number;
	selectedFilling: string;
	selectedSize: SizeOptionId;
	selectedSizeLabel: string;
	setFilling: (nextFilling: string) => void;
	setMessage: (nextMessage: string) => void;
	setQuantity: (nextQuantity: number) => void;
	setSize: (nextSize: SizeOptionId) => void;
	sizeOptions: readonly (typeof sizeOptions)[number][];
	thumbnailProducts: Product[];
}

const ProductDetailsContext = createContext<ProductDetailsContextValue | null>(
	null,
);

interface ProductDetailsProviderProps extends PropsWithChildren {
	product: Product;
	relatedImages: Product[];
}

export function ProductDetailsProvider({
	children,
	product,
	relatedImages,
}: ProductDetailsProviderProps) {
	const fillings = useMemo(
		() => getFillingsForCategory(product.category),
		[product.category],
	);
	const defaultFilling = fillings[0] ?? "";
	const [customization, setCustomization] = useQueryStates({
		filling: parseAsStringEnum(fillings).withDefault(defaultFilling),
		message: parseAsString.withDefault(""),
		quantity: parseAsInteger.withDefault(1),
		size: parseAsStringEnum(sizeOptionIds).withDefault("pequeno"),
	});

	const thumbnailProducts =
		relatedImages.length > 0 ? relatedImages : [product];
	const fullStars = Math.round(product.rating);
	const selectedSizeOption =
		sizeOptions.find((size) => size.id === customization.size) ??
		sizeOptions[0];
	const quantity = clampQuantity(customization.quantity);
	const message = clampMessage(customization.message);

	function setSize(nextSize: SizeOptionId) {
		if (nextSize === customization.size) {
			return;
		}

		setCustomization({ size: nextSize });
	}

	function setFilling(nextFilling: string) {
		if (nextFilling === customization.filling) {
			return;
		}

		setCustomization({ filling: nextFilling });
	}

	function setMessage(nextMessage: string) {
		const clampedMessage = clampMessage(nextMessage);

		if (clampedMessage === message) {
			return;
		}

		setCustomization({ message: clampedMessage });
	}

	function setQuantity(nextQuantity: number) {
		const clampedQuantity = clampQuantity(nextQuantity);

		if (clampedQuantity === quantity) {
			return;
		}

		setCustomization({ quantity: clampedQuantity });
	}

	const value: ProductDetailsContextValue = {
		fillings,
		fullStars,
		message,
		product,
		quantity,
		selectedFilling: customization.filling,
		selectedSize: customization.size,
		selectedSizeLabel: selectedSizeOption.label,
		setFilling,
		setMessage,
		setQuantity,
		setSize,
		sizeOptions,
		thumbnailProducts,
	};

	return (
		<ProductDetailsContext.Provider value={value}>
			{children}
		</ProductDetailsContext.Provider>
	);
}

export function useProductDetails() {
	const context = useContext(ProductDetailsContext);

	if (!context) {
		throw new Error(
			"useProductDetails must be used within ProductDetailsProvider.",
		);
	}

	return context;
}
