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
import { getAvaliadores } from "@/request/avaliador/find";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

	const file = watch("file");
	const { data: avaliadores, isLoading } = useQuery({
		queryKey: ["create-avaliador"],
		queryFn: getAvaliadores,
	});

	const { mutateAsync, isError, isSuccess } = useMutation({
		mutationKey: ["create-avaliador"],
		mutationFn: createAvaliador,
	});

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const filterAvaliadores = avaliadores?.filter((item) => {
		if (search !== "") {
			return item.nome.toLowerCase().includes(search.toLowerCase());
		}
	});

	const handleForm = async () => {
		console.log(file);
		await mutateAsync({
			file: file[0],
		});
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
				</div>
				<div className="grid py-8 space-y-3 my-10">
					{!isLoading ? (
						<>
							{filterAvaliadores !== undefined &&
							filterAvaliadores.length > 0 ? (
								<>
									{filterAvaliadores.map((item) => (
										<Card
											className="px-3 py-4 w-[380px] space-y-1"
											key={item.id}
										>
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
										</Card>
									))}
								</>
							) : (
								<>
									{avaliadores?.map((item) => (
										<Card
											className="px-3 py-4 w-[380px] space-y-1"
											key={item.id}
										>
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
										</Card>
									))}
								</>
							)}
						</>
					) : (
						<Spinner />
					)}
				</div>
			</main>
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
							className=" py-10 space-y-6 flex flex-col items-end"
							onSubmit={handleSubmit(handleForm)}
						>
							<Input
								type="file"
								accept="file/xlsx"
								placeholder="Adicione seu arquivo..."
								{...register("file")}
							/>
							<Button type="submit" onClick={handleClick}>
								Enviar
							</Button>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
