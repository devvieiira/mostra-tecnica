"use client";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("*O campo deve ser um email"),
	senha: z.string().min(6, "*Informe uma senha válida."),
});

type formProps = z.infer<typeof schema>;

export default function Login() {
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
		console.log(data);
		const executeLogin = async () => {
			const cookie = await login({ ...data });

			if (cookie !== undefined) {
				return cookie;
			}
			throw new Error("Email e/ou senha incorretos!");
		};
		toast.promise(executeLogin, {
			loading: "Loading...",
			duration: 3000,

			success: (cookie) => {
				router.push(`/auth/login?access_token=${cookie}`);
				return "Login efetuado";
			},
			error: (error) => {
				console.log(error.message);
				return "Email e/ou senha incorretos";
			},

			style: {
				boxShadow: "1px 2px 20px 6px #555",
			},
		});

		// console.log(data)
	};
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
							<label htmlFor="email">Email</label>
							<Input
								type="email"
								id="email"
								placeholder="Email"
								className="w-full p-2 border border-gray-300 rounded-md"
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div className="flex flex-col space-y-2">
							<label htmlFor="password">Senha</label>
							<Input
								type="password"
								id="password"
								placeholder="Senha"
								className="w-full p-2 border border-gray-300 rounded-md"
								{...register("senha")}
							/>
							{errors.senha && (
								<p className="text-red-500">{errors.senha.message}</p>
							)}
						</div>
						<div className="flex flex-col py-6">
							<Button>Entrar</Button>
						</div>
					</form>
				</Card>
				<Card className="px-3 py-4 w-[360px] md:w-[460px] 2xl:w-[580px] space-y-2">
					<h1 className="font-semibold text-base">Você é um avalidor?</h1>
					<div>
						<p className="text-sm">
							Caso seja um avaliador, redirecione-se para sua página de login
							clicando{" "}
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<span
								className="font-semibold text-primary-figma border-b border-b-primary-figma cursor-pointer"
								onClick={() => router.push("/login/avaliador")}
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
