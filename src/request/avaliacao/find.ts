import { api, axiosConfig } from "../axios";

type avalicoes = {
	trabalhoId: string;
	titulo_trabalho: string;
	instituicao: string;
	nota: number;
	avaliador: string;
	avaliadorEmail: string;
};

export async function getAvaliacoes(): Promise<avalicoes[]> {
	const data = (await api.get("/trabalhos-votados")).data.data;
	return data;
}
