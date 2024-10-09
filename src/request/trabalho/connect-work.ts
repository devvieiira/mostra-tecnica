import { api } from "../axios";

export async function connectWork(idAvaliador: string, idTrabalho: string) {
	const response = await api.patch(
		`/trabalho/avaliador/connect/${idAvaliador}/${idTrabalho}`,
	);
	return { response };
}
