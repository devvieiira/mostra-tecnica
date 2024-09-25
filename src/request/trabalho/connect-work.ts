import { api } from "../axios";

type connectProps = {
	idTrabalho: string;
	idAvaliador: string;
};

export async function connectWork({ idTrabalho, idAvaliador }: connectProps) {
	const response = await api.patch(
		`/trabalho/avaliador/${idAvaliador}/${idTrabalho}`,
	);
	return { response };
}
