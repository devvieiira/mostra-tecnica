import type { StoreProps } from "@/types/storeAvaliador";
import type { userLogin } from "@/types/avaliador";
import { api, axiosConfig } from "@/request/axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

export type jwtType = {
	id: string;
	email: string;
	name: string;
	cpf: string;
};

export const AuthStore = create<StoreProps>()(
	persist(
		(set) => ({
			state: {
				user: {
					email: "",
					name: "",
					id: "",
					token: "",
					cpf: "",
				},
			},
			actions: {
				login: async (user): Promise<string> => {
					const userData: userLogin = {
						cpf: user.cpf,
					};

					const formdata = new FormData();
					formdata.append("cpf", userData.cpf);

					const r = await api.post(
						"/auth/avaliador/signIn",
						formdata,
						axiosConfig,
					);

					const { accessToken } = r.data;

					const { id, cpf: cpfDecoded }: jwtType = jwtDecode(accessToken);

					set({
						state: {
							user: {
								id,
								cpf: cpfDecoded,
								token: accessToken,
								email: "",
								name: "",
							},
						},
					});
					return accessToken;
				},
				logout: () => {
					set({
						state: {
							user: {
								email: "",
								id: "",
								name: "",
								token: "",
								cpf: "",
							},
						},
					});
				},
			},
		}),
		{
			name: "avaliadorAuth",
			storage: createJSONStorage(() => localStorage),
			partialize: ({ state }) => ({ state }),
		},
	),
);
