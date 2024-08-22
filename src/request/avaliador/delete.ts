import { api } from "../axios";

export async function deleteAvaliador() {
	const response = await api.delete("/avaliadores");
	return { response };
}
