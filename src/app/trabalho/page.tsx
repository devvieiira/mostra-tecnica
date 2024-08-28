"use client";
import NavBar from "@/components/NavBar";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createAvaliador } from "@/request/avaliador/create";
import { deleteAvaliador } from "@/request/avaliador/delete";
import { getAvaliadores } from "@/request/avaliador/find";
import { createTrabalho } from "@/request/trabalho/create";
import { deleteTrabalhos } from "@/request/trabalho/delete";
import { getTrabalhos } from "@/request/trabalho/find";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderCircle, Trash2, Upload } from "lucide-react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	file: z.any(),
});

type formProps = z.infer<typeof schema>;

export default function Trabalho() {
	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			file: "",
		},
	});

	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [isDelete, setDelete] = useState(false);

	const file = watch("file");
	const {
		data: trabalhos,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["get-trabalhos"],
		queryFn: getTrabalhos,
	});

	const { mutateAsync: create, isPending } = useMutation({
		mutationKey: ["create-trabalho"],
		mutationFn: createTrabalho,
	});

	const { mutateAsync: del } = useMutation({
		mutationKey: ["delete-trabalhos"],
		mutationFn: deleteTrabalhos,
	});

	const handleClick = () => {
		setIsOpen(!isOpen);

		refetch();
	};

	const handleDelete = async () => {
		setDelete(!isDelete);
		await del();
		refetch();
	};

	const filteredTrabalho = trabalhos?.filter((item) => {
		if (search !== "") {
			return item.titulo_trabalho.toLowerCase().includes(search.toLowerCase());
		}
	});

	const handleForm = async () => {
		await create({
			file: file[0],
		});
		refetch();
	};
	return (
		<>
			<main className="bg-white flex flex-col items-center min-h-screen">
				<NavBar />

				<div className="flex mt-6 space-x-1 items-center">
					<Input
						className="h-9"
						placeholder="Pesquisar..."
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button className="" size="sm" onClick={handleClick}>
						<Upload />
					</Button>
					<Button
						className="bg-red-500 hover:bg-red-300"
						size="sm"
						onClick={() => setDelete(!isDelete)}
					>
						<Trash2 />
					</Button>
				</div>
				<div className="grid py-8 space-y-3 my-10">
					<Suspense fallback={<Spinner />}>
						{!isLoading ? (
							<>
								{filteredTrabalho !== undefined &&
								filteredTrabalho.length > 0 ? (
									<>
										{filteredTrabalho.map((item) => (
											<Card
												className="px-3 py-4 w-[400px] space-y-2"
												key={item.id}
											>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">Título:</span>
													<p className="text-muted-foreground text-sm">
														{item.titulo_trabalho}
													</p>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">Instituição:</span>
													<p className="text-muted-foreground text-sm">
														{item.instituicao}
													</p>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">
														Nível de ensino:
													</span>
													<p className="text-muted-foreground text-sm">
														{item.nivel_ensino}
													</p>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">Autor:</span>
													<p className="text-muted-foreground text-sm">
														{item.autor.nome}
													</p>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">CPF do autor:</span>
													<p className="text-muted-foreground text-sm">
														{item.autor.cpf}
													</p>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">Email do autor:</span>
													<p className="text-muted-foreground text-sm">
														{item.autor.email}
													</p>
												</div>
											</Card>
										))}
									</>
								) : (
									<>
										{trabalhos && trabalhos.length > 0 ? (
											<>
												{trabalhos?.map((item) => (
													<Card
														className="px-3 py-4 w-[400px] space-y-2"
														key={item.id}
													>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">Título:</span>
															<p className="text-muted-foreground text-sm">
																{item.titulo_trabalho}
															</p>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">
																Instituição:
															</span>
															<p className="text-muted-foreground text-sm">
																{item.instituicao}
															</p>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">
																Nível de ensino:
															</span>
															<p className="text-muted-foreground text-sm">
																{item.nivel_ensino}
															</p>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">Autor:</span>
															<p className="text-muted-foreground text-sm">
																{item.autor.nome}
															</p>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">
																CPF do autor:
															</span>
															<p className="text-muted-foreground text-sm">
																{item.autor.cpf}
															</p>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">
																Email do autor:
															</span>
															<p className="text-muted-foreground text-sm">
																{item.autor.email}
															</p>
														</div>
													</Card>
												))}
											</>
										) : (
											<p className="text-muted-foreground">
												Nenhum avaliador encontrado
											</p>
										)}
									</>
								)}
							</>
						) : (
							<Spinner />
						)}
					</Suspense>
				</div>
			</main>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[425px] w-11/12 rounded-lg">
					<DialogHeader>
						<DialogTitle>Adicionar trabalhos</DialogTitle>
						<DialogDescription>
							Como funciona? Clique no botão e selecione sua planilha do excel{" "}
							{"(arquivo no formato .xlsx)"}. Após isto basta clicar no botão e
							me deixe fazer o resto por você.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<form
							className="space-y-6 flex flex-col items-end"
							onSubmit={handleSubmit(handleForm)}
						>
							<Input
								type="file"
								accept="file/xlsx"
								placeholder="Adicione seu arquivo..."
								{...register("file")}
							/>
							<Button type="submit" onClick={handleClick}>
								{isPending ? (
									<LoaderCircle className="animate-spin" />
								) : (
									"Enviar"
								)}
							</Button>
						</form>
					</div>
				</DialogContent>
			</Dialog>
			<Dialog open={isDelete} onOpenChange={setDelete}>
				<DialogContent className="sm:max-w-[425px] w-11/12 rounded-lg">
					<DialogHeader>
						<DialogTitle>Remover avaliadores</DialogTitle>
						<DialogDescription>
							Você está prestes a remover todos os trabalhos desta lista, se
							deseja continuar apenas clique no botão
						</DialogDescription>
					</DialogHeader>
					<div className="grid grid-cols-2 gap-2 py-4">
						<Button
							variant="outline"
							type="submit"
							onClick={() => setDelete(!isDelete)}
						>
							Cancelar
						</Button>
						<Button
							className="bg-red-500 hover:bg-red-300"
							type="submit"
							onClick={handleDelete}
						>
							Deletar
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
