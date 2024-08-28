import { api } from "../axios";

export async function deleteTrabalhos() {
	const response = await api.delete("/trabalhos");
	return { response };
}
