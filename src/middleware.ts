import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface DecodedToken {
	id: string;
	email: string;
	name: string;
	cpf: string;
	role: string;
}

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;

	if (!token) {
		// Se não houver token, redireciona para a tela de login
		return NextResponse.redirect(new URL("/login/admin", request.url));
	}

	// Decodifica o token JWT
	const decodedToken: DecodedToken = jwtDecode(token);
	const url = new URL(request.url);

	if (!decodedToken.cpf) {
		// Usuário sem CPF
		if (url.pathname.startsWith("/admin")) {
			// Usuário sem CPF acessando rota do admin -> permitido
			return NextResponse.next();
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			// Usuário sem CPF tentando acessar a rota de avaliador -> redireciona para admin
			return NextResponse.redirect(new URL("/admin", request.url));
		}
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		// Usuário com CPF
		if (url.pathname.startsWith("/avaliador")) {
			// Usuário com CPF acessando rota de avaliador -> permitido
			return NextResponse.next();
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			// Usuário com CPF tentando acessar a rota de admin -> redireciona para avaliador
			return NextResponse.redirect(new URL("/avaliador", request.url));
		}
	}
}

export const config = {
	matcher: ["/admin/:path*", "/avaliador/:path*"],
};
