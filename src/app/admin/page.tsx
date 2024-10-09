"use client";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import wallpaper from "@/img/image.png";
import { usePage } from "@/store/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const {
		actions: { insert },
	} = usePage();
	return (
		<main className="bg-white flex flex-col items-center min-h-screen space-y-10">
			<NavBar value="admin" />
			<div className="flex flex-col items-center px-4 py-6 space-y-6 istok-web-regular">
				<h1 className="text-2xl font-bold">Bem-vindos(as)!</h1>
				<div className="w-[340px] h-[339px] 2xl:w-[500px] 2xl:h-[499px] relative">
					<Image
						src={wallpaper}
						alt="Wallpaper Mostra Técnica"
						className=""
						fill
					/>
				</div>
			</div>
		</main>
	);
}
