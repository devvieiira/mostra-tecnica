import { api, axiosConfig } from "../axios";

type voteProps = {
	nota1: number;
	nota2: number;
	nota3: number;
	nota4: number;
	nota5: number;
	inclusao?: string;
	idTrabalho: string;
	idAvaliador: string;
};

export async function nota({
	nota1,
	nota2,
	nota3,
	nota4,
	nota5,
	inclusao,
	idAvaliador,
	idTrabalho,
}: voteProps) {
	const formdata = new FormData();

	formdata.append("nota1", nota1.toString());
	formdata.append("nota2", nota2.toString());
	formdata.append("nota3", nota3.toString());
	formdata.append("nota4", nota4.toString());
	formdata.append("nota5", nota5.toString());
	if (inclusao) formdata.append("inclusao", inclusao);

	const response = await api.post(
		`/avaliacao/${idAvaliador}/${idTrabalho}`,
		formdata,
		axiosConfig,
	);

	return { response };
}
