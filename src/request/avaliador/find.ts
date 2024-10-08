import { api, axiosConfig } from "../axios";

type avaliadorProps = {
	id: string;
	nome: string;
	email: string;
	cpf: string;
	telefone: string;
	interesse: string;
	disponibilidade: string;
	trabalhos?: string;
};

export async function getAvaliadores(): Promise<avaliadorProps[]> {
	const data = (await api.get("/avaliadores")).data.data;
	return data;
}
