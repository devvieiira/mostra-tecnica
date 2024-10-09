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
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-3 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Ciências Sociais Aplicadas
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push(
								"/admin/resultados/pesquisa/ciencias-sociais-aplicadas",
							)
						}
					>
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-3 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Ciências Exatas e da Terra
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push(
								"/admin/resultados/pesquisa/ciencias-exatas-e-da-terra",
							)
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-3 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Ciências Humanas
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push("/admin/resultados/pesquisa/ciencias-humanas")
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-3 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Linguística, Letras e Artes
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push(
								"/admin/resultados/pesquisa/linguistica-letras-e-artes",
							)
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-3 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Engenharias
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push("/admin/resultados/pesquisa/engenharias")
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-3 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Ciências Biológicas
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push("/admin/resultados/pesquisa/ciencias-biologicas")
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-3 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Ciências da Saúde
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push("/admin/resultados/pesquisa/ciencias-da-saude")
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-3 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Ciências Agrárias
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push("/admin/resultados/pesquisa/ciencias-agrarias")
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
				<Card className="w-[320px] h-[240px] flex flex-col justify-center items-center space-y-3 bg-[#F3F5F7] mx-4 my-4">
					<h1 className="text-2xl font-semibold px-4 text-center">
						Multidisciplinar
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-primary font-semibold hover:border-b hover:border-b-primary cursor-pointer"
						onClick={() =>
							router.push("/admin/resultados/pesquisa/multidisciplinar")
						}
					>
						{" "}
						Visualizar Resultados
					</span>
				</Card>
			</div>
		</main>
	);
}
