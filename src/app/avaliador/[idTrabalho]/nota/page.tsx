"use client";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { nota } from "@/request/avaliacao/vote";
import { AuthStore } from "@/store/authAvaliador";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	nota1: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
	nota2: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
	nota3: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
	nota4: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
	nota5: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
	inclusao: z.string(),
});

type formProps = z.infer<typeof schema>;

export default function Nota({ params }: { params: { idTrabalho: string } }) {
	const [selectValue, setSelectValue] = useState("");
	const router = useRouter();
	const {
		state: { user },
	} = AuthStore();
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
	});

	const { mutateAsync } = useMutation({
		mutationKey: ["create-avaliacao"],
		mutationFn: nota,
	});

	const numbers = [
		{ value: "5" },
		{ value: "6" },
		{ value: "7" },
		{ value: "8" },
		{ value: "9" },
		{ value: "10" },
	];

	const handleForm = async (data: formProps) => {
		console.log(data);

		// Exemplo de payload
		const inviteForm = async () => {
			if (data.inclusao === "false") {
				const { response } = await mutateAsync({
					idAvaliador: user.id,
					idTrabalho: params.idTrabalho,
					nota1: Number(data.nota1),
					nota3: Number(data.nota2),
					nota4: Number(data.nota3),
					nota2: Number(data.nota4),
					nota5: Number(data.nota5),
					inclusao: "",
				});

				if (response) {
					return true;
				}
			}

			const { response } = await mutateAsync({
				idAvaliador: user.id,
				idTrabalho: params.idTrabalho,
				nota1: Number(data.nota1),
				nota3: Number(data.nota2),
				nota4: Number(data.nota3),
				nota2: Number(data.nota4),
				nota5: Number(data.nota5),
				inclusao: data.inclusao,
			});
			if (response) {
				return true;
			}
		};

		toast.promise(inviteForm, {
			loading: "Enviando...",
			success: () => {
				router.back();
				return "Nota Atribuida!";
			},
			error: "Erro ao atribuir a nota!",
		});
	};

	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-4">
			<NavBar value="noHamburguer" />
			<Card className="w-[560px] flex flex-col px-4 py-6 space-y-6 istok-web-regular">
				<div>
					<h1 className="font-semibold text-xl">Avalie o trabalho</h1>
				</div>
				<Separator orientation="horizontal" className="w-full" />
				<form className="space-y-8 w-full" onSubmit={handleSubmit(handleForm)}>
					<div className="space-y-4">
						<span>A linguagem é adequada e clara?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota1", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota1")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota1 && (
							<p className="text-red-500 text-sm">{errors.nota1.message}</p>
						)}
					</div>
					<Separator className="w-full" orientation="horizontal" />
					<div className="space-y-4">
						<span>
							A introdução apresenta de forma clara o assunto e aborda o
							problema a ser solucionado?
						</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota2", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota2")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota2 && (
							<p className="text-red-500 text-sm">{errors.nota2.message}</p>
						)}
					</div>

					<Separator className="w-full" orientation="horizontal" />

					<div className="space-y-4">
						<span>
							O(s) objetivo(s) está(ão) claro(s) e contempla(m) a(s)
							finalidade(s) e o(s) propósito(s) do trabalho?
						</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota3", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota3")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota3 && (
							<p className="text-red-500 text-sm">{errors.nota3.message}</p>
						)}
					</div>

					<Separator className="w-full" orientation="horizontal" />

					<div className="space-y-4">
						<span>
							A metodologia empregada está adequada ao objetivo proposto?
						</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota4", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota4")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota4 && (
							<p className="text-red-500 text-sm">{errors.nota4.message}</p>
						)}
					</div>

					<Separator className="w-full" orientation="horizontal" />

					<div className="space-y-4">
						<span>Os resultados estão coerentes com o objetivo proposto?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota5", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota5")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota5 && (
							<p className="text-red-500 text-sm">{errors.nota5.message}</p>
						)}
					</div>

					<div className="space-y-4">
						<Select
							onValueChange={(value) => {
								setValue("inclusao", value);
								setSelectValue(value);
							}}
							value={selectValue}
							{...register("inclusao")}
						>
							<SelectTrigger className="" id="select1">
								<SelectValue className="" placeholder="Selecione uma área..." />
							</SelectTrigger>
							<SelectContent className="">
								<SelectGroup className="">
									<SelectLabel className="2xl:text-xl">Trabalhos</SelectLabel>
									<SelectItem className="" value="true">
										Sim
									</SelectItem>
									<SelectItem className="" value="false">
										nao
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="flex justify-end">
						<Button type="submit">Atribuir</Button>
					</div>
				</form>
			</Card>
		</main>
	);
}
