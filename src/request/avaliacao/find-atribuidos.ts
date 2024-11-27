import { api, axiosConfig } from "../axios";

type atribuidos = {
  trabalhoId: string;
  titulo_trabalho: string;
  instituicao: string;
  areaTrabalho: string;
  autores: [
    {
      id: string;
      nome: string;
      role: string;

    }
  ];
  avaliado: boolean
  nivel_ensino: string;
};

export async function getAtribuidos(id : string): Promise<atribuidos[]> {
	const data = (await api.get(`/trabalhos-usuario/${id}`)).data.data;
	return data;
}
