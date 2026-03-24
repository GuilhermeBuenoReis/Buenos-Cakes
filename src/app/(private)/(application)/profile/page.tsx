import type { Metadata } from "next";
import { ProfilePageContent } from "./_components/profile-page-content";

export const metadata: Metadata = {
	title: "Meu Perfil | Buenos'Cakes",
};

export default function ProfilePage() {
	return <ProfilePageContent />;
}
