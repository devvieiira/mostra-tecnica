/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import logo from "@/img/logo.svg";
import { usePage } from "@/store/page";
import { Home, Layers, Menu, NotebookText, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "./ui/sheet";

type pages = "home" | "avaliador" | "trabalho" | "usuario";

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const [page, setPage] = useState<pages>("home");

	const {
		state: { pages },
		actions: { insert },
	} = usePage();

	const pathname = usePathname();

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		switch (pathname) {
			case "/":
				insert("home");
				break;
			case "/avaliador":
				insert("avaliador");
				break;
			case "/trabalho":
				insert("trabalho");
				break;
			case "/usuario":
				insert("usuario");
				break;
			default:
				insert("home");
		}
	}, [pathname]);

	return (
		<>
			<nav className="min-h-20 w-full px-4 bg-primary-figma flex items-center justify-between istok-web-regular">
				<Image src={logo} alt="Logo" />
				<Link
					onClick={handleClick}
					href="#"
					className="hover:bg-white/20 p-1 rounded-md cursor-pointer"
				>
					<Menu className="text-white h-8 w-8" />
				</Link>
			</nav>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
						<SheetDescription>
							Mostra Técnica IFRS - Campus Feliz
						</SheetDescription>
					</SheetHeader>
					<div className="grid py-10">
						<Link
							href="/"
							onClick={() => insert("home")}
							className={`flex px-2 space-x-2 items-center ${
								pages === "home" && "bg-primary-figma/20"
							} p-2 rounded-md`}
						>
							<Home
								className={`h-7 w-7 ${
									pages === "home"
										? "text-primary-figma"
										: "text-muted-foreground"
								}`}
							/>
							<Separator
								orientation="vertical"
								className={`${
									pages === "home"
										? "bg-primary-figma/50"
										: "bg-muted-foreground"
								} w-[2px] h-3/4`}
							/>
							<h2
								className={`${
									pages === "home"
										? "text-primary-figma"
										: "text-muted-foreground"
								} font-medium`}
							>
								Página Inicial
							</h2>
						</Link>
						<Link
							href="/avaliador"
							onClick={() => insert("avaliador")}
							className={`flex px-2 space-x-2 items-center ${
								pages === "avaliador" && "bg-primary-figma/20"
							} p-2 rounded-md`}
						>
							<NotebookText
								className={`h-7 w-7 ${
									pages === "avaliador"
										? "text-primary-figma"
										: "text-muted-foreground"
								}`}
							/>
							<Separator
								orientation="vertical"
								className={`${
									pages === "avaliador"
										? "bg-primary-figma/50"
										: "bg-muted-foreground"
								} w-[2px] h-3/4`}
							/>
							<h2
								className={`${
									pages === "avaliador"
										? "text-primary-figma"
										: "text-muted-foreground"
								} font-medium`}
							>
								Avaliadores
							</h2>
						</Link>
						<Link
							href="/trabalho"
							className={`flex px-2 space-x-2 items-center ${
								pages === "trabalho" && "bg-primary-figma/20"
							} p-2 rounded-md`}
						>
							<Layers
								className={`h-7 w-7 ${
									pages === "trabalho"
										? "text-primary-figma"
										: "text-muted-foreground"
								}`}
							/>
							<Separator
								orientation="vertical"
								className={`${
									pages === "trabalho"
										? "bg-primary-figma/50"
										: "bg-muted-foreground"
								} w-[2px] h-3/4`}
							/>
							<h2
								className={`${
									pages === "trabalho"
										? "text-primary-figma"
										: "text-muted-foreground"
								} font-medium`}
							>
								Trabalhos
							</h2>
						</Link>
						<Link
							href="/usuario"
							className={`flex px-2 space-x-2 items-center ${
								pages === "usuario" && "bg-primary-figma/20"
							} p-2 rounded-md`}
						>
							<User
								className={`h-7 w-7 ${
									pages === "usuario"
										? "text-primary-figma"
										: "text-muted-foreground"
								}`}
							/>
							<Separator
								orientation="vertical"
								className={`${
									pages === "usuario"
										? "bg-primary-figma/50"
										: "bg-muted-foreground"
								} w-[2px] h-3/4`}
							/>
							<h2
								className={`${
									pages === "usuario"
										? "text-primary-figma"
										: "text-muted-foreground"
								} font-medium`}
							>
								Usuários
							</h2>
						</Link>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}
