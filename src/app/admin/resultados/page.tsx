"use client";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import wallpaper from "@/img/image.png";
import { usePage } from "@/store/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const {
		actions: { insert },
	} = usePage();
	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-10">
			<NavBar value="admin" />
			<div className="grid md:grid-cols-2 lg:grid-cols-3 items-center px-4 istok-web-regular pb-14">
				<Card
					className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4"
					onClick={() => router.push("/admin/resultados/ensino")}
				>
					<h1 className="text-2xl font-semibold">Ensino</h1>
					<span className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer">
						Visualizar Resultados
					</span>
				</Card>
				<Card
					className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4"
					onClick={() => router.push("/admin/resultados/extensao")}
				>
					<h1 className="text-2xl font-semibold">Extensão</h1>
					<span className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer">
						Visualizar Resultados
					</span>
				</Card>
				<Card
					className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4"
					onClick={() => router.push("/admin/resultados/pesquisa")}
				>
					<h1 className="text-2xl font-semibold">Pesquisa</h1>
					<span className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer">
						Visualizar Resultados
					</span>
				</Card>
				<Card
					className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4"
					onClick={() => router.push("/admin/resultados/inclusao")}
				>
					<h1 className="text-2xl font-semibold">Inclusão</h1>
					<span className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer">
						Visualizar Resultados
					</span>
				</Card>
			</div>
		</main>
	);
}
