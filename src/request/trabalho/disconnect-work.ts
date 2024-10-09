import { api } from "../axios";

export async function disconnectWork(idAvaliador: string, idTrabalho: string) {
	const response = await api.patch(
		`/trabalho/avaliador/disconnect/${idAvaliador}/${idTrabalho}`,
	);
	return { response };
}
