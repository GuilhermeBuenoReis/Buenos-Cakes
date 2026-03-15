import { Footer } from "@/components/application/footer";
import { Navbar } from "@/components/application/navbar";

export default function ApplicationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-[#f5f5f7] pb-8">
			<div className="mx-auto w-full max-w-6xl px-4 pt-3 sm:px-5">
				<Navbar />
			</div>
			<main className="mx-auto mt-3 w-full max-w-6xl px-4 sm:px-5">
				{children}
			</main>
			<div className="mx-auto mt-3 w-full max-w-6xl px-4 sm:px-5">
				<Footer />
			</div>
		</div>
	);
}
