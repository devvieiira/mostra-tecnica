"use client";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import wallpaper from "@/img/image.png";
import { getAvaliacoes } from "@/request/avaliacao/find";
import { usePage } from "@/store/page";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
	const router = useRouter();
	const {
		actions: { insert },
	} = usePage();
	const { data: avaliacoes } = useQuery({
		queryKey: ["get-works-notes"],
		queryFn: getAvaliacoes,
	});


	const filtered = avaliacoes?.filter(
		(item) => item.areaTrabalho === "Multidisciplinar",
	);


	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-10">
			<NavBar value="admin" />
			<div className="flex items-center justify-center px-4 istok-web-regular pb-14 w-full">
				{filtered && filtered.length > 0 ? (
					<Card className="w-5/6 md:w-1/2 px-4 py-2 justify-center items-center space-y-5 bg-[#F9F9F9] mx-4 my-4">
					<div className="w-full grid grid-cols-1 md:grid-cols-5 md:space-x-4">
						<span className="font-semibold hidden md:inline md:col-span-2">Título:</span>
						<span className="font-semibold hidden md:inline">Autor:</span>
						<span className="font-semibold hidden md:inline">Ensino:</span>
						<span className="font-semibold hidden md:inline md:text-center">Nota:</span>
					</div>
					<Separator className="w-full hidden md:inline" orientation="horizontal" />
					{filtered?.map((item, index, array) => (
						<>
							<div
								className="w-full grid grid-cols-1 md:grid-cols-5 md:space-x-4"
								key={item.trabalhoId}
							>
								<p className="text-gray-700 text-sm md:col-span-2">
									<span className="font-semibold text-black md:hidden">Título: </span>
									{item.titulo_trabalho}
								</p>
								<p className="text-gray-700 text-sm">
									<span className="font-semibold text-black md:hidden">Autor: </span>
									{item.autores.map((autor) => autor.role === "NORMAL" && autor.nome)}
								</p>
								<p className="text-gray-700 text-sm">
									<span className="font-semibold text-black md:hidden">Ensino: </span>
									{item.nivelEnsino}
								</p>
								<p className="md:text-center text-sm text-primary font-semibold ">
									<span className="font-semibold text-black md:hidden">Nota: </span>
									{Number(item.notaTotal).toFixed(2)}
								</p>
							</div>
							<div className="space-y-2">
								<p><span className="font-semibold">Carimbo:</span> {item.carimbo}</p>
								<p>
									<span className="font-semibold">Avaliado por:</span>{" "}
									{item.autores
										.filter((autor) => autor.role === "AVALIADOR" && autor.votou)
										.map((autor, index, array) =>
											index === array.length - 1
												? `${autor.nome} (${Number(item.notas[index]).toFixed(2)})`
												: `${autor.nome} (${Number(item.notas[index]).toFixed(2)}), `
										)}
								</p>
							</div>
							{index === array.length - 1 ? "" : <Separator className="w-full" />}
						</>
					))}
				</Card>
				) : (
					<span>Nenhum trabalho encontrado</span>
				)}
			</div>
		</main>
	);
}
