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
	area: string;
};

export async function getOneWork(id: string): Promise<trabalhoProps[]> {
	const data = (await api.get(`/trabalhos/${id}`)).data.data;
	// console.log(data);
	return data;
}
