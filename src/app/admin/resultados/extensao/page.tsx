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
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold">Comunicação</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push("/admin/resultados/extensao/comunicacao")
						}
					>
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">Cultura</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() => router.push("/admin/resultados/extensao/cultura")}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						{" "}
						Direitos humanos e justiça
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push(
								"/admin/resultados/extensao/direitos-humanos-e-justica",
							)
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold">Educação</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() => router.push("/admin/resultados/extensao/educacao")}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Meio ambiente
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push("/admin/resultados/extensao/meio-ambiente")
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">Saúde</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() => router.push("/admin/resultados/extensao/saude")}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Tecnologia e produção
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push("/admin/resultados/extensao/tecnologia-e-producao")
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-1 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">Trabalho</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() => router.push("/admin/resultados/extensao/trabalho")}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
			</div>
		</main>
	);
}
