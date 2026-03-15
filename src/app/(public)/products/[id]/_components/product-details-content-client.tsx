"use client";

import { ProductAboutCard } from "./product-about-card";
import { ProductBreadcrumb } from "./product-breadcrumb";
import { ProductGallery } from "./product-gallery";
import { ProductPurchasePanel } from "./product-purchase-panel";

export function ProductDetailsContentClient() {
	return (
		<div className="relative space-y-4">
			<ProductBreadcrumb />

			<div className="grid gap-5 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
				<div className="space-y-3">
					<ProductGallery />
					<ProductAboutCard />
				</div>

				<ProductPurchasePanel />
			</div>
		</div>
	);
}
