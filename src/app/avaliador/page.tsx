"use client";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/lib/queryClient";
import { getAtribuidos } from "@/request/avaliacao/find-atribuidos";
import { AuthStore } from "@/store/authAvaliador";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const { state: { user } } = AuthStore(); // Obter usuário logado

	// Query para buscar os trabalhos atribuídos ao avaliador
	const { data: trabalhos, refetch: refetchTrabalhos } = useQuery({
		queryKey: ["trabalhos", user.id],
		queryFn: () => getAtribuidos(user.id),
		enabled: !!user.id
	});


	// Filtrar apenas os trabalhos com `avaliado: false`
	const trabalhosNaoAvaliados = trabalhos?.filter((item) => !item.avaliado);

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ["trabalhos"] });
	}, [])

	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-10">
			<NavBar value="avaliador" />
			<div className="flex flex-col items-center px-4 py-6 space-y-6 istok-web-regular">
				<Suspense>
				{trabalhosNaoAvaliados && trabalhosNaoAvaliados.length > 0 ? (
					trabalhosNaoAvaliados.map((item, index) => (
						<Card className="px-3 py-4 w-[360px] md:w-[580px] space-y-2 m-2" key={item.trabalhoId}>
							<div className="flex space-x-1 items-center justify-center">
								<h1 className="font-semibold text-xl">TRABALHO {index + 1}</h1>
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
									<span className="font-semibold text-black">Autor: </span>
									{item.autores
										.filter((autor) => autor.role === "NORMAL")
										.map((autor) => autor.nome)
										.join(", ")}
								</p>
							</div>
							<div className="flex space-x-1 items-center">
								<p className="text-muted-foreground text-sm">
									<span className="font-semibold text-black">Instituição: </span>
									{item.instituicao}
								</p>
							</div>
							<div className="flex space-x-1 items-center">
								<p className="text-muted-foreground text-sm">
									<span className="font-semibold text-black">Nível de ensino: </span>
									{item.nivel_ensino}
								</p>
							</div>
							<div className="flex space-x-1 items-center">
								<p className="text-muted-foreground text-sm">
									<span className="font-semibold text-black">Área: </span>
									{item.areaTrabalho}
								</p>
							</div>
							<div className="flex space-x-1 justify-center items-center py-2">
								<Button
									className="w-3/12 font-semibold"
									onClick={() => router.push(`/avaliador/${item.trabalhoId}/nota`)}
								>
									Avaliar
								</Button>
							</div>
						</Card>
					))
				) : (
					<span className="text-lg font-medium text-gray-400">
						Nenhum trabalho pendente de avaliação.
					</span>
				)}
				</Suspense>
			</div>
		</main>
	);
}
