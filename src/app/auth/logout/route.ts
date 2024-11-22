import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(res: Request) {
	const cookieStore = cookies();
	cookieStore.delete("token");

	// Redireciona para a URL completa do backend
	return NextResponse.redirect("https://backendmostratecnica.online/login/admin");
}
