export interface Product {
	category: string;
	description: string;
	id: string;
	image: string;
	name: string;
	popularity: number;
	price: number;
	rating: number;
	reviews: number;
}

export interface GetProductsRequest {
	revalidateInSeconds?: number;
}

export type GetProductsResponse = Product[];

export interface GetProductByIdRequest {
	id: Product["id"];
	revalidateInSeconds?: number;
}

export type GetProductByIdResponse = Product | null;

export interface ProductsApiErrorResponse {
	message: string;
	status: number;
}
