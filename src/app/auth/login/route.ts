import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(req: Request) {
	const cookieStore = cookies();

	const url = new URL(req.url);

	const accessToken = url.searchParams.get("access_token") as string;

	cookieStore.set("token", accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 12, // (segundos) * (minutos) * (horas) * (dias)
	});

	return NextResponse.redirect(new URL("/admin", req.url));
}
