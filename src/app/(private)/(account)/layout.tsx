import { ApplicationShell } from "@/components/application/application-shell";

export default function AccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <ApplicationShell>{children}</ApplicationShell>;
}
