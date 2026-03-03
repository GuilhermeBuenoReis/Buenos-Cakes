import type { Metadata } from "next";
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
			<body style={{ backgroundColor: "#111", color: "#fff" }}>{children}</body>
		</html>
	);
}
