import { api, axiosConfig } from "../axios";

type trabalhoProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	file: any;
};

export async function createTrabalho({ file }: trabalhoProps) {
	const formdata = new FormData();
	formdata.append("file", file);

	await api.post("/trabalho/import", formdata, axiosConfig);
}
