import "server-only";

import { cache } from "react";
import db from "../../../db.json";
import type {
	GetProductByIdRequest,
	GetProductByIdResponse,
	GetProductsRequest,
	GetProductsResponse,
	Product,
} from "./types";

const productsSeed = db.products as Product[];
const PRODUCTS_API_BASE_URL =
	process.env.PRODUCTS_API_URL ?? "http://127.0.0.1:3333/products";
const DEFAULT_REVALIDATE_SECONDS = 300;

interface RequestProductsOptions {
	path?: `/${string}` | "";
	revalidateInSeconds?: number;
}

async function requestProducts<Response>({
	path = "",
	revalidateInSeconds = DEFAULT_REVALIDATE_SECONDS,
}: RequestProductsOptions): Promise<Response> {
	try {
		const response = await fetch(`${PRODUCTS_API_BASE_URL}${path}`, {
			next: {
				revalidate: revalidateInSeconds,
				tags: ["products"],
			},
		});

		if (!response.ok) {
			throw new Error(`Mock API returned ${response.status}`);
		}

		return (await response.json()) as Response;
	} catch {
		if (!path) {
			return productsSeed as Response;
		}

		const productId = path.replace("/", "");
		const product = productsSeed.find((item) => item.id === productId) ?? null;
		return product as Response;
	}
}

export const getProducts = cache(
	async ({
		revalidateInSeconds = DEFAULT_REVALIDATE_SECONDS,
	}: GetProductsRequest = {}): Promise<GetProductsResponse> =>
		requestProducts<GetProductsResponse>({
			revalidateInSeconds,
		}),
);

export const getProductById = cache(
	async ({
		id,
		revalidateInSeconds = DEFAULT_REVALIDATE_SECONDS,
	}: GetProductByIdRequest): Promise<GetProductByIdResponse> =>
		requestProducts<GetProductByIdResponse>({
			path: `/${id}`,
			revalidateInSeconds,
		}),
);

export function getProductIds(): Product["id"][] {
	return productsSeed.map((product) => product.id);
}
