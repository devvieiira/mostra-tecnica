import { api, axiosConfig } from "../axios";

type avalicoes = {
	trabalhoId: string;
	titulo_trabalho: string;
	instituicao: string;
	areaTrabalho: string;
	nivelEnsino: string;
	modalidade: string;
	carimbo: string;
	autores: [
		{
			id: string;
			nome: string;
			role: string;
			votou: boolean;
		}
	];
	autoresIds: string[];
	notas: number[];
	notaTotal: number;
	usuarioId: string;
	inclusao: boolean
};

export async function 	getAvaliacoes(): Promise<avalicoes[]> {
	const data = (await api.get("/trabalhos-votados")).data.data;
	console.log(data)
	return data;
}
