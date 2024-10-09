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

export default function Home() {
	const router = useRouter();
	const {
		actions: { insert },
	} = usePage();
	const { data: avaliacoes } = useQuery({
		queryKey: ["get-works-notes"],
		queryFn: getAvaliacoes,
	});

	console.log(avaliacoes);

	const filtered = avaliacoes?.filter(
		(item) => item.areaTrabalho === "Engenharias",
	);

	console.log(filtered?.map((item) => item.autor));
	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-10">
			<NavBar value="admin" />
			<div className="flex items-center justify-center px-4 istok-web-regular pb-14 w-full">
				<Card className="w-1/2 px-4 py-2 justify-center items-center space-y-5 bg-[#F9F9F9] mx-4 my-4">
					<div className="w-full grid grid-cols-3 space-x-4">
						<span className="font-semibold">Título:</span>
						<span className="font-semibold">Autor:</span>
						<span className="font-semibold text-center">Nota:</span>
					</div>
					<Separator className="w-full" orientation="horizontal" />
					{filtered?.map((item) => (
						<div
							className="w-full grid grid-cols-3 space-x-4"
							key={item.trabalhoId}
						>
							<span className="text-gray-700 text-sm">
								{item.titulo_trabalho}
							</span>
							<span className="text-gray-700 text-sm">{item.autor}</span>
							<span className="text-center text-primary font-semibold ">
								{item.nota}
							</span>
						</div>
					))}
				</Card>
			</div>
		</main>
	);
}
