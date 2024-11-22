import {jwtDecode} from "jwt-decode"; // Corrigindo o import
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface DecodedToken {
	id: string;
	email: string;
	name: string;
	cpf?: string;
	role: string;
}

export async function middleware(request: NextRequest) {
	try {
		const token = request.cookies.get("token")?.value;

		if (!token) {
			// Redireciona para login se não houver token
			return NextResponse.redirect(new URL("/login/admin", request.url));
		}

		// Decodifica o token JWT
		const decodedToken: DecodedToken = jwtDecode(token);
		const url = new URL(request.url);

		if (!decodedToken.cpf) {
			// Usuário sem CPF
			if (url.pathname.startsWith("/admin")) {
				// Permitido acesso à rota de admin
				return NextResponse.next();
			} else {
				// Redireciona para /admin se CPF não estiver presente
				return NextResponse.redirect(new URL("/admin", request.url));
			}
		} else {
			// Usuário com CPF
			if (url.pathname.startsWith("/avaliador")) {
				// Permitido acesso à rota de avaliador
				return NextResponse.next();
			} else {
				// Redireciona para /avaliador se tentar acessar rota de admin
				return NextResponse.redirect(new URL("/avaliador", request.url));
			}
		}
	} catch (error) {
		// Tratamento de erro no token
		console.error("Erro ao decodificar token:", error);
		return NextResponse.redirect(new URL("/login/admin", request.url));
	}
}

export const config = {
	matcher: ["/admin/:path*", "/avaliador/:path*"],
};