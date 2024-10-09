import type { tokenDataType, userDataType, userLogin } from "./avaliador";

export type ActionsProps = {
	login: (user: userLogin) => void;
	logout: () => void;
};

export type ActionEnrolProps = {
	insert: (enrollment: string) => void;
};

export type StoreProps = {
	state: {
		user: userDataType;
	};
	actions: ActionsProps;
};
