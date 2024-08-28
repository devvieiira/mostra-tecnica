import { api, axiosConfig } from "../axios";

type trabalhoProps = {
	id: string;
	instituicao: string;
	titulo_trabalho: string;
	nivel_ensino: string;
	autor: {
		nome: string;
		email: string;
		cpf: string;
	};
};

export async function getTrabalhos(): Promise<trabalhoProps[]> {
	const data = (await api.get("/trabalhos")).data.data;
	return data;
}
