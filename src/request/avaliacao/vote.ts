import { api, axiosConfig } from "../axios";

type voteProps = {
	nota1: number;
	nota2: number;
	nota3: number;
	nota4: number;
	nota5: number;
	nota6: number;
	nota7: number;
	nota8: number;
	nota9: number;
	nota10: number;
	nota11: number;
	nota12: number;
	nota13: number;
	nota14: number;
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
	nota6,
	nota7,
	nota8,
	nota9,
	nota10,
	nota11,
	nota12,
	nota13,
	nota14,
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
	formdata.append("nota6", nota6.toString());
	formdata.append("nota7", nota7.toString());
	formdata.append("nota8", nota8.toString());
	formdata.append("nota9", nota9.toString());
	formdata.append("nota10", nota10.toString());
	formdata.append("nota11", nota11.toString());
	formdata.append("nota12", nota12.toString());
	formdata.append("nota13", nota13.toString());
	formdata.append("nota14", nota14.toString());
	if (inclusao) formdata.append("inclusao", inclusao);

	const response = await api.post(
		`/avaliacao/${idAvaliador}/${idTrabalho}`,
		formdata,
		axiosConfig,
	);

	return { response };
}
