import { api, axiosConfig } from "../axios";

type avaliadorProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	file: any;
};

export async function createAvaliador({ file }: avaliadorProps) {
	const formdata = new FormData();
	formdata.append("file", file);

	const response = await api.post("/avaliador/import", formdata, axiosConfig);
	return { response };
}
