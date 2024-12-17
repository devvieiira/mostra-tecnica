import ReactQueryClientProvider from "@/lib/ReactQueryClientProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "IFRS - Campus Feliz | Mostra Técnica",
	description: "Mostra Técnica",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Suspense>
				<ReactQueryClientProvider>{children}</ReactQueryClientProvider>
				<Toaster richColors />
				</Suspense>
			</body>
		</html>
	);
}
