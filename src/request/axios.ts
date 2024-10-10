import axios from "axios";

export const getFromLocalStorageAdmin = (): string | null => {
	if (typeof window === "undefined") {
		return null;
	}

	return localStorage.getItem("adminAuth");
};

export const getFromLocalStorageAvaliador = (): string | null => {
	if (typeof window === "undefined") {
		return null;
	}

	return localStorage.getItem("avaliadorAuth");
};
const storageAdmin = JSON.parse(getFromLocalStorageAdmin() as string);
const tokenAdmin = storageAdmin?.state?.state?.user?.token;

const storegeAvaliador = JSON.parse(getFromLocalStorageAvaliador() as string);
const tokenAvaliador = storegeAvaliador?.state?.state?.user?.token;
console.log("token localStorage", tokenAdmin);

export const axiosConfig = {
	headers: {
		"Content-Type": "multipart/form-data",
	},
};

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_URL || "192.168.103.124:4000",
	timeout: 1000,
	withCredentials: true,
	headers: {
		Authorization: tokenAdmin
			? `Bearer ${tokenAdmin}`
			: null || tokenAvaliador
				? `Bearer ${tokenAvaliador}`
				: null,
	},
});
