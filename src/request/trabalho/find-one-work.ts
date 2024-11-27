import { api, axiosConfig } from "../axios";

type trabalhoProps = {
	id: string;
	instituicao: string;
	titulo_trabalho: string;
	nivel_ensino: string;
	modalidade: string;
	autores: {
		id: string;
		nome: string;
		email: string;
		cpf: string;
		role: string;
	}[];
	area: string;
};

export async function getUniqueWork(id: string): Promise<trabalhoProps> {
	const data = (await api.get(`/trabalho/unique/${id}`)).data.data;
	return data;
}
