/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import logo from "@/img/logo.svg";
import { AuthStore } from "@/store/auth";
import { usePage } from "@/store/page";
import {
	Home,
	Layers,
	Menu,
	Newspaper,
	NotebookText,
	User,
} from "lucide-react";
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

type navBarProps = {
	value: string;
};

export default function NavBar({ value }: navBarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [page, setPage] = useState<pages>("home");

	const {
		actions: { logout },
		state: { user },
	} = AuthStore();

	const {
		state: { pages },
		actions: { insert },
	} = usePage();

	const handleClick = () => {
		setIsOpen(!isOpen);
	};
	const pathname = usePathname();

	const getPathType = (pathname: string) => {
		if (pathname.startsWith("/admin/avaliador/")) return "avaliador";
		if (pathname.startsWith("/admin/trabalho/")) return "trabalho";
		if (pathname.startsWith("/admin/usuario/")) return "usuario";
		if (pathname === "/") return "home";
		return "home";
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log(getPathType(pathname));

		insert(getPathType(pathname));
	}, [pathname]);

	return (
		<>
			<nav
				className={
					value === "noHamburguer"
						? "min-h-20 w-full px-4 bg-primary-figma flex items-center justify-start istok-web-regular"
						: "min-h-20 w-full px-4 bg-primary-figma flex items-center justify-between istok-web-regular"
				}
			>
				<Image src={logo} alt="Logo" />
				{value !== "noHamburguer" && (
					<Link
						onClick={handleClick}
						href="#"
						className="hover:bg-white/20 p-1 rounded-md cursor-pointer"
					>
						<Menu className="text-white h-8 w-8" />
					</Link>
				)}
			</nav>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
						<SheetDescription className="flex flex-col">
							Mostra Técnica IFRS - Campus Feliz
							<div className="py-2 flex justify-start">
								<Link
									href="/auth/logout"
									className="text-red-400 font-semibold text-sm hover:border-b hover:border-red-400"
									onClick={logout}
								>
									Sair
								</Link>
							</div>
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
						{value !== "avaliador" && (
							<>
								<Link
									href="/admin/avaliador"
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
									href="/admin/trabalho"
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
									href="/admin/resultados"
									className={`flex px-2 space-x-2 items-center ${
										pages === "usuario" && "bg-primary-figma/20"
									} p-2 rounded-md`}
								>
									<Newspaper
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
										Resultados
									</h2>
								</Link>
							</>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}
