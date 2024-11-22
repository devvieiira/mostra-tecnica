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
import { Button } from "./ui/button";

type pages = "home" | "avaliador" | "trabalho" | "usuario" | "resultados";

type navBarProps = {
  value: string;
};

export default function NavBar({ value }: navBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    actions: { logout },
    state: {user},
  } = AuthStore();

  const {
    state: { pages: currentPage },
    actions: { insert },
  } = usePage();

  const pathname = usePathname();

  // Função para determinar o tipo de página com base no pathname
  const getPathType = (pathname: string): pages => {
    if (pathname.startsWith("/admin/avaliador")) return "avaliador";
    if (pathname.startsWith("/admin/trabalho")) return "trabalho";
    if (pathname.startsWith("/admin/usuario")) return "usuario";
    if (pathname.startsWith("/admin/resultados")) return "resultados";
    return "home";
  };

  const router = useRouter()

  // Atualizar página atual no estado com base no pathname
  useEffect(() => {
    insert(getPathType(pathname));
  }, [pathname]);

  // Alternar abertura do menu lateral
  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        className={
          value === "noHamburguer"
            ? "min-h-20 w-full px-4 bg-primary-figma flex items-center justify-start istok-web-regular"
            : "min-h-20 w-full px-4 bg-primary-figma flex items-center justify-between istok-web-regular"
        }
      >
        {/* className="hover:bg-white/20 p-1 rounded-md cursor-pointer" */}
        {/* <Menu className="text-white h-8 w-8" /> */}
        <Image src={logo} alt="Logo" />
        {value !== "noHamburguer" && (
          <Button className="hover:bg-white/20 p-1 rounded-md cursor-pointer" onClick={handleMenuToggle}>
          <Menu className="text-white h-8 w-8" />
        </Button>
        )}
      </nav>

      {/* Menu lateral */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription className="flex flex-col">
              Mostra Técnica IFRS - Campus Feliz
              <div className="py-2 flex justify-end">
                <Button
                  className="text-red-400 font-semibold text-sm hover:bg-red-200 hover:text-red-700"
                  variant="ghost"
                  onClick={() => {
                    logout()
                    router.push("/auth/logout")
                  }}
                >
                  Sair
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>

          <div className="grid py-10">
            {value === "admin" ? (
              <Link
              href="/admin"
              onClick={() => insert("home")}
              className={`flex px-2 space-x-2 items-center ${
                currentPage === "home" && "bg-primary-figma/20"
              } p-2 rounded-md`}
            >
              <Home
                className={`h-7 w-7 ${
                  currentPage === "home"
                    ? "text-primary-figma"
                    : "text-muted-foreground"
                }`}
              />
              <Separator
                orientation="vertical"
                className={`${
                  currentPage === "home"
                    ? "bg-primary-figma/50"
                    : "bg-muted-foreground"
                } w-[2px] h-3/4`}
              />
              <h2
                className={`${
                  currentPage === "home"
                    ? "text-primary-figma"
                    : "text-muted-foreground"
                } font-medium`}
              >
                Página Inicial
              </h2>
            </Link>
            ) : (
              <Link
              href="/avaliador"
              onClick={() => insert("home")}
              className={`flex px-2 space-x-2 items-center ${
                currentPage === "home" && "bg-primary-figma/20"
              } p-2 rounded-md`}
            >
              <Home
                className={`h-7 w-7 ${
                  currentPage === "home"
                    ? "text-primary-figma"
                    : "text-muted-foreground"
                }`}
              />
              <Separator
                orientation="vertical"
                className={`${
                  currentPage === "home"
                    ? "bg-primary-figma/50"
                    : "bg-muted-foreground"
                } w-[2px] h-3/4`}
              />
              <h2
                className={`${
                  currentPage === "home"
                    ? "text-primary-figma"
                    : "text-muted-foreground"
                } font-medium`}
              >
                Página Inicial
              </h2>
            </Link>
            )}

            {/* Avaliadores */}
            {value === "admin" && (
              <>
                <Link
              href="/admin/avaliador"
              onClick={() => insert("avaliador")}
              className={`flex px-2 space-x-2 items-center ${
                currentPage === "avaliador" && "bg-primary-figma/20"
              } p-2 rounded-md`}
            >
              <NotebookText
                className={`h-7 w-7 ${
                  currentPage === "avaliador"
                    ? "text-primary-figma"
                    : "text-muted-foreground"
                }`}
              />
              <Separator
                orientation="vertical"
                className={`${
                  currentPage === "avaliador"
                    ? "bg-primary-figma/50"
                    : "bg-muted-foreground"
                } w-[2px] h-3/4`}
              />
              <h2
                className={`${
                  currentPage === "avaliador"
                    ? "text-primary-figma"
                    : "text-muted-foreground"
                } font-medium`}
              >
                Avaliadores
              </h2>
            </Link>

            {/* Trabalhos */}
            <Link
              href="/admin/trabalho"
              onClick={() => insert("trabalho")}
              className={`flex px-2 space-x-2 items-center ${
                currentPage === "trabalho" && "bg-primary-figma/20"
              } p-2 rounded-md`}
            >
              <Layers
                className={`h-7 w-7 ${
                  currentPage === "trabalho"
                    ? "text-primary-figma"
                    : "text-muted-foreground"
                }`}
              />
              <Separator
                orientation="vertical"
                className={`${
                  currentPage === "trabalho"
                    ? "bg-primary-figma/50"
                    : "bg-muted-foreground"
                } w-[2px] h-3/4`}
              />
              <h2
                className={`${
                  currentPage === "trabalho"
                    ? "text-primary-figma"
                    : "text-muted-foreground"
                } font-medium`}
              >
                Trabalhos
              </h2>
            </Link>

            {/* Resultados */}
            <Link
              href="/admin/resultados"
              onClick={() => insert("resultados")}
              className={`flex px-2 space-x-2 items-center ${
                currentPage === "resultados" && "bg-primary-figma/20"
              } p-2 rounded-md`}
            >
              <Newspaper
                className={`h-7 w-7 ${
                  currentPage === "resultados"
                    ? "text-primary-figma"
                    : "text-muted-foreground"
                }`}
              />
              <Separator
                orientation="vertical"
                className={`${
                  currentPage === "resultados"
                    ? "bg-primary-figma/50"
                    : "bg-muted-foreground"
                } w-[2px] h-3/4`}
              />
              <h2
                className={`${
                  currentPage === "resultados"
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
