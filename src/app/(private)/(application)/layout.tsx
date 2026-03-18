import { ApplicationShell } from "@/components/application/application-shell";

export default function PrivateApplicationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <ApplicationShell>{children}</ApplicationShell>;
}
