"use client";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCPF } from "@/lib/format";
import { AuthStore } from "@/store/authAvaliador";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	cpf: z.string().min(11, "*CPF inválido"),
});

type formProps = z.infer<typeof schema>;

export default function Login() {
	const [cpf, setCpf] = useState("");
	const [formattedCpf, setFormattedCpf] = useState("");
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
	});

	const {
		actions: { login },
	} = AuthStore();

	const router = useRouter();

	const handleForm = async (data: formProps) => {
		const executeLogin = async () => {
			const cookie = await login({
				cpf: data.cpf,
			});

			if (cookie !== undefined) {
				return cookie;
			}
			throw new Error("CPF incorreto!");
		};
		toast.promise(executeLogin, {
			loading: "Loading...",
			duration: 3000,

			success: (cookie) => {
				router.push(`/auth/login?access_token=${cookie}`);
				return "Login efetuado";
			},
			error: (error) => {
				return "Email e/ou senha incorretos";
			},

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});

	};

	useEffect(() => {
		setFormattedCpf(formatCPF(cpf));
	}, [cpf]);
	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-10">
			<NavBar value="noHamburguer" />
			<div className="py-20 space-y-6">
				<Card className="px-3 py-4 w-[360px] md:w-[460px] 2xl:w-[580px]">
					<div className="flex space-x-1 items-center justify-center">
						<h1 className="font-semibold text-xl uppercase">entrar</h1>
					</div>
					<form className="space-y-4 pt-10" onSubmit={handleSubmit(handleForm)}>
						<div className="flex flex-col space-y-2">
							<label htmlFor="email">CPF</label>
							<Input
								type="text"
								id="cpf"
								placeholder="CPF"
								className="w-full p-2 border border-gray-300 rounded-md"
								value={formattedCpf}
								maxLength={14}
								{...register("cpf")}
								onChange={(e) => setCpf(e.target.value)}
							/>
							{errors.cpf && (
								<p className="text-red-500">{errors.cpf.message}</p>
							)}
						</div>

						<div className="flex flex-col py-6">
							<Button>Entrar</Button>
						</div>
					</form>
				</Card>
				<Card className="px-3 py-4 w-[360px] md:w-[460px] 2xl:w-[580px] space-y-2">
					<h1 className="font-semibold text-base">
						Você é um membro da comissão?
					</h1>
					<div>
						<p className="text-sm">
							Caso seja um membro da comissão, redirecione-se para sua página de
							login clicando{" "}
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<span
								className="font-semibold text-primary-figma border-b border-b-primary-figma cursor-pointer"
								onClick={() => router.push("/login/admin")}
							>
								aqui
							</span>
						</p>
					</div>
				</Card>
			</div>
		</main>
	);
}
