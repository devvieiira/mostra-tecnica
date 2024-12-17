/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getOneAvaliable } from "@/request/avaliador/find-one";
import { connectWork } from "@/request/trabalho/connect-work";
import { disconnectWork } from "@/request/trabalho/disconnect-work";
import { getTrabalhos } from "@/request/trabalho/find";
import { getOneWork } from "@/request/trabalho/find-one";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, NotepadText, Plus, Trash, Trash2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Info({ params }: { params: { id: string } }) {
	const [isOpen, setIsOpen] = useState(false);


	const { data: avaliador } = useQuery({
		queryKey: ["get-one-avaliable", params.id],
		queryFn: () => getOneAvaliable(params.id),
	});

	const { data: trabalho, refetch } = useQuery({
		queryKey: ["get-trabalho", params.id],
		queryFn: () => getOneWork(params.id),
	});


	const { data: trabalhos } = useQuery({
		queryKey: ["get-trabalho"],
		queryFn: getTrabalhos,
	});

	const { mutate: connect, data } = useMutation({
		mutationKey: ["add-trabalho", params.id],
		mutationFn: (trabalho: string) => connectWork(params.id, trabalho),
		onSuccess: () => {
			refetch();
		},
	});
	const { mutate: disconnect } = useMutation({
		mutationKey: ["remove-trabalho", params.id],
		mutationFn: (trabalho: string) => disconnectWork(params.id, trabalho),
		onSuccess: () => {
			refetch();
		},
	});

	const [modalidade, setModalide] = useState("");

	const filtered = trabalhos?.filter((item) =>
		!item.autores.some((autor) => autor.id === params.id)
	);

	const onlyModalidade = filtered?.filter(
		(item) => item.modalidade === modalidade,
	);


	const toggleOpen = () => setIsOpen(!isOpen);

	const addWork = async (trabalho: string) => {
		const inviteForm = async () => {
			await connect(trabalho);
		};

		toast.promise(inviteForm, {
			success: () => {
				setIsOpen(false);
				return "Trabalho atribuido com sucesso!";
			},
			error: "Algo deu errado!",
		});
	};

	const removeWork = async (trabalho: string) => {
		const inviteForm = async () => {
			await disconnect(trabalho);
		};

		toast.promise(inviteForm, {
			success: () => {
				return "Trabalho removido com sucesso!";
			},
			error: "Algo deu errado!",
		});
	};

	return (
		<>
			<main className="bg-white flex flex-col items-center min-h-screen space-y-8 pb-4 mb-14">
				<NavBar value="admin" />
				<Card className="w-4/5 md:w-2/5 space-y-4">
					<div className="flex justify-center py-6">
						<span className="text-lg font-semibold istok-web-bold uppercase">
							Informações do Avaliador
						</span>
					</div>
					<Separator orientation="horizontal" className="w-full" />
					<div className="grid 2xl:grid-cols-2 py-4">
						<div className="px-4">
							<div className="flex space-x-1">
								<p>
									<span className="font-semibold">Nome:</span> {avaliador?.nome}
								</p>
							</div>
							<div className="flex space-x-1">
								<p>
									<span className="font-semibold">Email:</span>{" "}
									{avaliador?.email}
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
									<span className="font-semibold">Interesse:</span>{" "}
									{avaliador?.interesse}
								</p>
							</div>
							<div className="flex space-x-1">
								<p>
									<span className="font-semibold">Disponibilidade:</span>{" "}
									{avaliador?.disponilidade}
								</p>
							</div>
						</div>
					</div>
				</Card>
				<Suspense>
				{trabalho?.map((item, index) => (
					<Card className="w-4/5 md:w-2/5 space-y-4" key={item.id}>
						<div className="flex relative justify-center py-6">
							<p className="text-lg font-semibold istok-web-bold uppercase">
								TRABALHO <span>{index + 1}</span>
							</p>
							<Button
								variant="ghost"
								className="absolute right-4 top-4 text-red-400"
								onClick={() => removeWork(item.id)}
							>
								<Trash2 />
							</Button>
						</div>
						<Separator orientation="horizontal" className="w-full" />
						<div className="grid 2xl:grid-cols-2 py-4">
							<div className="px-4">
								<div className="flex space-x-1">
									<p>
										<span className="font-medium">Título:</span>{" "}
										{item.titulo_trabalho}
									</p>
								</div>
								<div className="flex space-x-1">
									<p>
										<span className="font-medium">Autor:</span>{" "}
										{item.autores.map((autor) => autor.role !== "AVALIADOR" && autor.nome)}
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
								<div className="flex space-x-1">
									<p>
										<span className="font-medium">Modalidade:</span>{" "}
										{item.modalidade}
									</p>
								</div>
							</div>
						</div>
					</Card>
				))}
				</Suspense>
				<Button onClick={toggleOpen}>
					<Plus />
				</Button>
			</main>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[725px] w-11/12 rounded-lg">
					<DialogHeader>
						<DialogTitle>Adicionar Trabalhos</DialogTitle>
						<DialogDescription>
							Por aqui você pode atribuir trabalhos para o avaliador dar sua
							nota. Basta selecionar a modalidade, área e selecionar algum dos
							trabalhos da lista abaixo.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4 space-y-3 px-2 2xl:px-6">
						<div className="grid 2xl:grid-cols-2 space-x-2">
							<Select
								onValueChange={(value) => {
									setModalide(value);
								}}
							>
								<SelectTrigger className="">
									<SelectValue placeholder="Modalidade" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Modalidades</SelectLabel>
										<SelectItem value="Ensino">Ensino</SelectItem>
										<SelectItem value="Pesquisa">Pesquisa</SelectItem>
										<SelectItem value="Extensão">Extensão</SelectItem>
										<SelectItem value="Indissociável">Indissociável</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<Separator orientation="horizontal" className="w-full" />

						<form className="space-y-6 flex flex-col">
							<Suspense>
							{modalidade !== "" && (
								<div className="space-y-16 2xl:space-y-2">
									<div>
										<h1>
											<span className="font-semibold">Modalidade: </span>
											{modalidade}
										</h1>
									</div>
									<div className="max-h-60 2xl:max-h-44 overflow-auto shadow-md bg-black/5 border-black/40 space-y-3 p-2 rounded-md">
										{onlyModalidade?.map((item) => (
											<Card
												className="space-y-3 grid grid-cols-3 p-2 hover:bg-primary-figma/5 cursor-pointer"
												key={item.id}
												onClick={() => {
													addWork(item.id);
												}}
											>
												<div className="col-span-2">
													<h3>
														<span className="font-semibold">Título:</span>{" "}
														{item.titulo_trabalho}
													</h3>
													
													<h3>
														<span className="font-semibold">Autor:</span>{" "}
														{item.autores.map((item) => item.role === "NORMAL" && item.nome)}
													</h3>

													<h3>
														<span className="font-semibold">Orientador:</span>{" "}
														{item.orientador}
													</h3>
													{item.coorientador !== "" && (
														<h3>
															<span className="font-semibold">Coorientador:</span>{" "}
															{item.coorientador}
														</h3>
													)}
													{item.area && (
														<h3>
															<span className="font-semibold">Área:</span>{" "}
															{item.area}
														</h3>
													)}
												</div>
												<div className="flex justify-end items-center px-3">
													<NotepadText className="h-9 w-9" />
												</div>
											</Card>
										))}
									</div>
								</div>
							)}
							</Suspense>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
