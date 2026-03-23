import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { CartSheetProvider } from "@/contexts/cart-sheet-context";
import "./globals.css";

export const metadata: Metadata = {
	title: "Buenos'Cakes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<NuqsAdapter>
					<CartSheetProvider>{children}</CartSheetProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
