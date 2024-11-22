import { api, axiosConfig } from "../axios";

type avaliadorProps = {
	id: string;
	nome: string;
	email: string;
	cpf: string;
	telefone: string;
	interesse: string;
	disponilidade: string;
	trabalhos?: string;
};

export async function getOneAvaliable(id: string): Promise<avaliadorProps> {
	const data = (await api.get(`/avaliador/${id}`)).data.data;
	return data;
}
