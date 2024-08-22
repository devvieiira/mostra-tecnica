"use client";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { usePage } from "@/store/page";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const {
		actions: { insert },
	} = usePage();
	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-10">
			<NavBar />
			<div className="flex flex-col items-center px-4 py-6 space-y-6 istok-web-regular">
				<h1 className="text-2xl font-bold">Bem-vindo!</h1>
				<h3 className="text-center text-muted-foreground">
					Esta é a visão do administrador. Se deseja cadastrar um avaliador
					{"(a)"} apenas clique no botão a seguir:
				</h3>
				<Button
					onClick={() => {
						router.push("/avaliador");
						insert("avaliador");
					}}
				>
					Cadastrar
				</Button>
			</div>
		</main>
	);
}
