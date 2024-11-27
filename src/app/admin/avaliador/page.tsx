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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createAvaliador } from "@/request/avaliador/create";
import { deleteAvaliador } from "@/request/avaliador/delete";
import { getAvaliadores } from "@/request/avaliador/find";
import { getTrabalhos } from "@/request/trabalho/find";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderCircle, Plus, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	file: z.any(),
});

type formProps = z.infer<typeof schema>;

export default function Avaliador() {
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
	const [isEdit, setEdit] = useState(false);

	const [selectValue, setSelectValue] = useState("");

	const file = watch("file");
	const {
		data: avaliadores,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["get-avaliador"],
		queryFn: getAvaliadores,
	});

	const { data: trabalhos } = useQuery({
		queryKey: ["get-trabalhos"],
		queryFn: getTrabalhos,
	});

	const { mutateAsync: create, isPending } = useMutation({
		mutationKey: ["create-avaliador"],
		mutationFn: createAvaliador,
	});

	const { mutateAsync: del } = useMutation({
		mutationKey: ["delete-avaliador"],
		mutationFn: deleteAvaliador,
	});

	const handleClick = () => {
		setIsOpen(!isOpen);

		refetch();
	};

	const handleEdit = () => {
		setEdit(!isEdit);

		refetch();
	};

	const handleDelete = async () => {
		setDelete(!isDelete);
		const inviteForm = async () => {
			const { response } = await del();
			if (response) {
				return true;
			}
		};
		toast.promise(inviteForm(), {
			loading: "Carregando...",
			duration: 2000,

			success: () => {
				refetch();
				return "Avaliador deletado com sucesso!";
			},
			error: "Algo deu errado!",
		});
	};

	const filterAvaliadores = avaliadores?.filter((item) => {
		if (search !== "") {
			return item.nome.toLowerCase().includes(search.toLowerCase());
		}
	});

	const handleForm = async () => {
		const inviteForm = async () => {
			const { response } = await create({
				file: file[0],
			});
			if (response) {
				return true;
			}
		};
		toast.promise(inviteForm(), {
			loading: "Carregando...",
			duration: 2000,

			success: () => {
				refetch();
				return "Avaliador criado com sucesso!";
			},
			error: "Algo deu errado!",
		});
	};
	

	return (
		<>
			<main className="bg-white flex flex-col items-center min-h-screen">
				<NavBar value="admin" />

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
				<div className="grid md:grid-cols-2 xl:grid-cols-3 py-8 my-10">
					<Suspense fallback={<Spinner />}>
						{!isLoading ? (
							<>
								{filterAvaliadores !== undefined &&
								filterAvaliadores.length > 0 ? (
									<>
										{filterAvaliadores.map((item) => (
											<Card
												className="px-3 py-4 w-[380px] space-y-1 m-2"
												key={item.id}
											>
												<div className="flex space-x-1 px-2 justify-end items-center">
													<Link href={`/admin/avaliador/${item.id}/info`}>
														<Plus />
													</Link>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">Nome:</span>
													<p className="text-muted-foreground text-sm">
														{item.nome}
													</p>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">Email:</span>
													<p className="text-muted-foreground text-sm">
														{item.email}
													</p>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">CPF:</span>
													<p className="text-muted-foreground text-sm">
														{item.cpf}
													</p>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">Telefone:</span>
													<p className="text-muted-foreground text-sm">
														{item.telefone}
													</p>
												</div>
												<div className="flex space-x-1 items-center">
													<span className="font-semibold">Área:</span>
													<p className="text-muted-foreground text-sm">
														{item.interesse}
													</p>
												</div>
											</Card>
										))}
									</>
								) : (
									<>
										{avaliadores && avaliadores.length > 0 ? (
											<>
												{avaliadores?.map((item) => (
													<Card
														className="px-3 py-4 w-[380px] space-y-1 m-2"
														key={item.id}
													>
														<div className="flex space-x-1 px-2 justify-end items-center">
															<Link href={`/admin/avaliador/${item.id}/info`}>
																<Plus />
															</Link>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">Nome:</span>
															<p className="text-muted-foreground text-sm">
																{item.nome}
															</p>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">Email:</span>
															<p className="text-muted-foreground text-sm">
																{item.email}
															</p>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">CPF:</span>
															<p className="text-muted-foreground text-sm">
																{item.cpf}
															</p>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">Telefone:</span>
															<p className="text-muted-foreground text-sm">
																{item.telefone}
															</p>
														</div>
														<div className="flex space-x-1 items-center">
															<span className="font-semibold">Área:</span>
															<p className="text-muted-foreground text-sm">
																{item.interesse}
															</p>
														</div>
													</Card>
												))}
											</>
										) : (
											<p className="text-muted-foreground md:col-span-2 xl:col-span-3">
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
			{/* Adiciona avaliadores */}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[425px] w-11/12 rounded-lg">
					<DialogHeader>
						<DialogTitle>Adicionar avaliadores</DialogTitle>
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
			{/* Remove Avaliadores */}
			<Dialog open={isDelete} onOpenChange={setDelete}>
				<DialogContent className="sm:max-w-[425px] w-11/12 rounded-lg">
					<DialogHeader>
						<DialogTitle>Remover avaliadores</DialogTitle>
						<DialogDescription>
							Você está prestes a remover todos os avaliadores desta lista, se
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
			{/* Adiciona trabalhos */}
			<Dialog open={isEdit} onOpenChange={setEdit}>
				<DialogContent className="sm:max-w-[425px] w-11/12 rounded-lg">
					<DialogHeader>
						<DialogTitle>Atribuição de Trabalhos</DialogTitle>
						<DialogDescription>
							Aqui você pode atribuir trabalhos para os avaliadores futuramente
							adicionaram uma nota ao mesmo.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<form
							className="space-y-6 flex flex-col items-end"
							onSubmit={handleSubmit(handleForm)}
						>
							<Select
								onValueChange={(value) => {
									setSelectValue(value);
								}}
								value={selectValue}
							>
								<SelectTrigger className="" id="select1">
									<SelectValue
										className=""
										placeholder="Selecione uma área..."
									/>
								</SelectTrigger>
								<SelectContent className="">
									<SelectGroup className="">
										<SelectLabel className="2xl:text-xl">Trabalhos</SelectLabel>
										{trabalhos?.map((item) => (
											<SelectItem className="" key={item.id} value={item.id}>
												{item.titulo_trabalho}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<Button type="submit" onClick={handleEdit}>
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
		</>
	);
}
