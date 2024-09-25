"use client";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOneAvaliable } from "@/request/avaliador/find-one";
import { getOneWork } from "@/request/trabalho/find-one";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export default function Info({ params }: { params: { id: string } }) {
	console.log(params.id);

	const { data: avaliador } = useQuery({
		queryKey: ["get-one-avaliable", params.id],
		queryFn: () => getOneAvaliable(params.id),
	});

	const { data: trabalho } = useQuery({
		queryKey: ["get-trabalho", params.id],
		queryFn: () => getOneWork(params.id),
	});

	console.log(trabalho);

	const disponibilidade = avaliador?.disponibilidade
		? avaliador.disponibilidade
		: "";

	console.log(disponibilidade);
	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-8 pb-4">
			<NavBar />
			<Card className="w-2/5 space-y-4">
				<div className="flex justify-center py-6">
					<span className="text-lg font-semibold istok-web-bold uppercase">
						Informações do Avaliador
					</span>
				</div>
				<Separator orientation="horizontal" className="w-full" />
				<div className="grid grid-cols-2 py-4">
					<div className="px-4">
						<div className="flex space-x-1">
							<p>
								<span className="font-semibold">Nome:</span> {avaliador?.nome}
							</p>
						</div>
						<div className="flex space-x-1">
							<p>
								<span className="font-semibold">Email:</span> {avaliador?.email}
							</p>
						</div>
						<div className="flex space-x-1">
							<p>
								<span className="font-semibold">CPF:</span> {avaliador?.cpf}
							</p>
						</div>
					</div>
					<div className="px-4">
						<div className="flex space-x-1">
							<p>
								<span className="font-semibold">Telefone:</span>{" "}
								{avaliador?.telefone}
							</p>
						</div>
						<div className="flex space-x-1">
							<p>
								<span className="font-semibold">Disponibilidade:</span>{" "}
								{avaliador?.disponibilidade}
							</p>
						</div>
					</div>
				</div>
			</Card>
			{trabalho?.map((item, index) => (
				<Card className="w-2/5 space-y-4" key={item.id}>
					<div className="flex justify-center py-6">
						<p className="text-lg font-semibold istok-web-bold uppercase">
							TRABALHO <span>{index + 1}</span>
						</p>
					</div>
					<Separator orientation="horizontal" className="w-full" />
					<div className="grid grid-cols-2 py-4">
						<div className="px-4">
							<div className="flex space-x-1">
								<p>
									<span className="font-medium">Título:</span>{" "}
									{item.titulo_trabalho}
								</p>
							</div>
							<div className="flex space-x-1">
								<p>
									<span className="font-medium">Autor:</span> {item.autor.nome}
								</p>
							</div>
							<div className="flex space-x-1">
								<p>
									<span className="font-medium">Instituição:</span>{" "}
									{item.instituicao}
								</p>
							</div>
						</div>
						<div className="px-4">
							<div className="flex space-x-1">
								<p>
									<span className="font-medium">Área:</span> {item.area}
								</p>
							</div>
							<div className="flex space-x-1">
								<p>
									<span className="font-medium">Ensino:</span>{" "}
									{item.nivel_ensino}
								</p>
							</div>
						</div>
					</div>
				</Card>
			))}
			<Button>
				<Plus />
			</Button>
		</main>
	);
}
