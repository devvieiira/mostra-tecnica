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
import { getTrabalhos } from "@/request/trabalho/find";
import { getUniqueWork } from "@/request/trabalho/find-one-work";
import { AuthStore } from "@/store/authAvaliador";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
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
		nota6: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
		nota7: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
		nota8: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
		nota9: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
		nota10: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
		nota11: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
		nota12: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
		nota13: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
		nota14: z
		.string()
		.min(1, "O campo deve ser maior que zero.")
		.max(10, "O campo deve ser menor ou igual a dez."),
});

type formProps = z.infer<typeof schema>;

export default function Nota({ params }: { params: { id: string } }) {
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

	const {data: trabalho} = useQuery({
		queryKey: ["trabalho", params.id],
		queryFn: () => getUniqueWork(params.id)
	})

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

		// Exemplo de payload
		const inviteForm = async () => {
			// if (data.inclusao === "false") {
			// 	const { response } = await mutateAsync({
			// 		idAvaliador: user.id,
			// 		idTrabalho: params.id,
			// 		nota1: Number(data.nota1),
			// 		nota2: Number(data.nota2),
			// 		nota3: Number(data.nota3),
			// 		nota4: Number(data.nota4),
			// 		nota5: Number(data.nota5),
			// 		nota6: Number(data.nota6),
			// 		nota7: Number(data.nota7),
			// 		nota8: Number(data.nota8),
			// 		nota9: Number(data.nota9),
			// 		nota10: Number(data.nota10),
			// 		nota11: Number(data.nota11),
			// 		nota12: Number(data.nota12),
			// 		nota13: Number(data.nota13),
			// 		nota14: Number(data.nota14),
			// 		inclusao: "",
			// 	});

			// 	if (response) {
			// 		return true;
			// 	}
			// }

			const { response } = await mutateAsync({
				idAvaliador: user.id,
				idTrabalho: params.id,
				nota1: Number(data.nota1),
					nota2: Number(data.nota2),
					nota3: Number(data.nota3),
					nota4: Number(data.nota4),
					nota5: Number(data.nota5),
					nota6: Number(data.nota6),
					nota7: Number(data.nota7),
					nota8: Number(data.nota8),
					nota9: Number(data.nota9),
					nota10: Number(data.nota10),
					nota11: Number(data.nota11),
					nota12: Number(data.nota12),
					nota13: Number(data.nota13),
					nota14: Number(data.nota14),
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
		<main className="bg-white flex flex-col items-center min-h-screen space-y-4 mb-10">
			<NavBar value="noHamburguer" />
			<Card className="w-[360px] md:w-[560px] flex flex-col px-4 py-6 space-y-6 istok-web-regular">
				<div className="space-y-2">
					<h1 className="font-semibold text-xl">Avalie o trabalho</h1>
					<p className="font-semibold">Nome do trabalho: <span className="font-normal">{trabalho?.titulo_trabalho}</span></p>
					<p className="font-semibold">Autor: <span className="font-normal">{trabalho?.autores.map((item) => item.role === "NORMAL" ? item.nome : "")}</span></p>
				</div>
				
				<Separator orientation="horizontal" className="w-full" />
				<form className="space-y-8 w-full" onSubmit={handleSubmit(handleForm)}>
				<div className="space-y-4 flex justify-center items-center">
					<h1 className="font-semibold text-black text-xl">Resumo:</h1>
				</div>
				<Separator className="w-full" orientation="horizontal" />
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
					
					<Separator orientation="horizontal" />

					<div className="space-y-4 flex justify-center items-center">
					<h1 className="font-semibold text-black text-xl">Apresentação:</h1>
				</div>

				<Separator orientation="horizontal" />

				<div className="space-y-4">
						<span>Todos os elementos textuais estão presentes?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota6", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota6")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota6 && (
							<p className="text-red-500 text-sm">{errors.nota6.message}</p>
						)}
					</div>

					<Separator orientation="horizontal" />

					<div className="space-y-4">
						<span>A introdução apresenta de forma clara o assunto e aborda o problema a ser solucionado?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota7", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota7")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota7 && (
							<p className="text-red-500 text-sm">{errors.nota7.message}</p>
						)}
					</div>

					<Separator orientation="horizontal" />

					<div className="space-y-4">
						<span>O(s) objetivo(s) está(ão) claro(s) e contempla(m) a(s) finalidade(s) e o(s) propósito(s) do
						trabalho?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota8", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota8")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota8 && (
							<p className="text-red-500 text-sm">{errors.nota8.message}</p>
						)}
					</div>

					<Separator orientation="horizontal" />

					<div className="space-y-4">
						<span>A metodologia empregada está adequada ao objetivo proposto?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota9", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota9")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota9 && (
							<p className="text-red-500 text-sm">{errors.nota9.message}</p>
						)}
					</div>

					<Separator orientation="horizontal" />

					<div className="space-y-4">
						<span>Os resultados estão coerentes com o objetivo proposto?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota10", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota10")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota10 && (
							<p className="text-red-500 text-sm">{errors.nota10.message}</p>
						)}
					</div>

					<Separator orientation="horizontal" />

					<div className="space-y-4">
						<span>O trabalho apresenta elementos/recursos (imagens, tabelas, gráficos, etc) importantes
						deste?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota11", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota11")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota11 && (
							<p className="text-red-500 text-sm">{errors.nota11.message}</p>
						)}
					</div>

					<Separator orientation="horizontal" />

					<div className="space-y-4">
						<span>Demonstra a relevância social, ambiental, cultural, tecnológica ou científica do trabalho?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota12", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota12")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota12 && (
							<p className="text-red-500 text-sm">{errors.nota12.message}</p>
						)}
					</div>

					<Separator orientation="horizontal" />

					<div className="space-y-4">
						<span>O(a) apresentador(a) demonstrou domínio do conteúdo, da capacidade de síntese, correção
						e adequação de linguagem?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota13", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota13")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota13 && (
							<p className="text-red-500 text-sm">{errors.nota13.message}</p>
						)}
					</div>

					<Separator orientation="horizontal" />

					<div className="space-y-4">
						<span>O(a) apresentador(a) demonstrou postura e capacidade de argumentação na arguição?</span>
						<RadioGroup
							onValueChange={(value) => setValue("nota14", value)}
							className="space-x-2 flex items-center justify-center"
						>
							{numbers.map((item) => (
								<div className="flex items-center space-x-2" key={item.value}>
									<RadioGroupItem
										value={item.value}
										id={item.value}
										{...register("nota14")}
									/>
									<Label htmlFor={item.value}>{item.value}</Label>
								</div>
							))}
						</RadioGroup>

						{errors.nota14 && (
							<p className="text-red-500 text-sm">{errors.nota14.message}</p>
						)}
					</div>

					<Separator orientation="horizontal" />

					{/* <div className="space-y-4">	
						<span>O trabalho é de inclusão?</span>
						<Select
							onValueChange={(value) => {
								setValue("inclusao", value);
								setSelectValue(value);
							}}
							value={selectValue}
							{...register("inclusao")}
						>
							<SelectTrigger className="" id="select1">
								<SelectValue className="" placeholder="O trabalho é de inclusão?" />
							</SelectTrigger>
							<SelectContent className="">
								<SelectGroup className="">
									<SelectLabel className="2xl:text-xl">Inclusão</SelectLabel>
									<SelectItem className="" value="true">
										Sim
									</SelectItem>
									<SelectItem className="" value="false">
										Não
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div> */}

					<div className="flex justify-end">
						<Button type="submit">Atribuir</Button>
					</div>
				</form>
			</Card>
		</main>
	);
}
