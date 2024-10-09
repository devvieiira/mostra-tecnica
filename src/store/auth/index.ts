import type { StoreProps } from "@/types/store";
import type { userLogin } from "@/types/user";
import { api, axiosConfig } from "@/request/axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

export type jwtType = {
	id: string;
	email: string;
	name: string;
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
				},
			},
			actions: {
				login: async (user): Promise<string> => {
					const userData: userLogin = {
						email: user.email,
						senha: user.senha,
					};

					console.log(userData);
					const formdata = new FormData();
					formdata.append("email", userData.email);
					formdata.append("senha", userData.senha);
					console.log(formdata.values);

					const r = await api.post("/auth/signIn", formdata, axiosConfig);

					const { accessToken } = r.data;

					const { email, id, name }: jwtType = jwtDecode(accessToken);

					set({
						state: {
							user: {
								id,
								name,
								email,
								token: accessToken,
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
							},
						},
					});
				},
			},
		}),
		{
			name: "adminAuth",
			storage: createJSONStorage(() => localStorage),
			partialize: ({ state }) => ({ state }),
		},
	),
);
