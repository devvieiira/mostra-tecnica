"use client";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAvaliacoes } from "@/request/avaliacao/find";
import { getOneWork } from "@/request/trabalho/find-one";
import { AuthStore } from "@/store/authAvaliador";
import { usePage } from "@/store/page";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const {
		state: { user },
	} = AuthStore();

	// Query para obter os trabalhos atribuídos ao avaliador
	const { data: trabalhos, refetch } = useQuery({
		queryKey: ["trabalhos"],
		queryFn: () => getOneWork(user.id),
	});

	// console.log(trabalhos);

	// Query para obter as avaliações feitas pelo avaliador
	const { data: avaliacoes } = useQuery({
		queryKey: ["avaliacoes"],
		queryFn: getAvaliacoes,
	});

	console.log("AQUIIIII", avaliacoes);

	// Extrair IDs dos trabalhos já avaliados
	const avaliacaoIds = avaliacoes?.map((item) => item.trabalhoId);

	console.log("SOMENTE IDS", avaliacaoIds);

	// Filtrar os trabalhos que ainda não foram avaliados
	const filtered = trabalhos?.filter(
		(item) => !avaliacaoIds?.includes(item.id),
	);

	// Debug para verificar os dados
	// console.log("Trabalhos atribuídos:", trabalhos);
	// console.log("IDs dos trabalhos já avaliados:", avaliacaoIds);
	// console.log("Trabalhos filtrados (não avaliados):", filtered);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		refetch();
	}, [avaliacaoIds, refetch, trabalhos, user.id]);

	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-10">
			<NavBar value="avaliador" />
			<div className="flex flex-col items-center px-4 py-6 space-y-6 istok-web-regular">
				{filtered && filtered.length > 0 ? (
					<>
						{filtered.map((item, index) => (
							<Card className="px-3 py-4 w-[580px] space-y-2 m-2" key={item.id}>
								<div className="flex space-x-1 items-center justify-center">
									<h1 className="font-semibold text-xl">
										TRABALHO {index + 1}
									</h1>
								</div>
								<Separator orientation="horizontal" className="w-full" />
								<div className="flex space-x-1 items-center">
									<p className="text-muted-foreground text-sm">
										<span className="font-semibold text-black">Título: </span>
										{item.titulo_trabalho}
									</p>
								</div>
								<div className="flex space-x-1 items-center">
									<p className="text-muted-foreground text-sm">
										<span className="font-semibold text-black">
											Nível de Ensino:{" "}
										</span>
										{item.nivel_ensino}
									</p>
								</div>
								<div className="flex space-x-1 items-center">
									<p className="text-muted-foreground text-sm">
										<span className="font-semibold text-black">
											Modalidade:{" "}
										</span>
										{item.modalidade}
									</p>
								</div>
								<div className="flex space-x-1 items-center">
									<p className="text-muted-foreground text-sm">
										<span className="font-semibold text-black">Área:</span>
										{item.area}
									</p>
								</div>
								<div className="flex space-x-1 items-center">
									<p className="text-muted-foreground text-sm">
										<span className="font-semibold text-black">Autor: </span>
										{item.autores[0].nome}
									</p>
								</div>
								<div className="flex space-x-1 justify-center items-center py-2">
									<Button
										className="w-3/12 font-semibold"
										onClick={() => router.push(`/avaliador/${item.id}/nota`)}
									>
										Adicionar Voto
									</Button>
								</div>
							</Card>
						))}
					</>
				) : (
					<span className="text-lg font-medium text-gray-400">
						Nenhum trabalho atribuído.
					</span>
				)}
			</div>
		</main>
	);
}
