import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoreProps = {
	state: {
		pages: string;
	};
	actions: {
		insert: (item: string) => void;
	};
};

// enrollment: "",
// 		insert: (item) => set({ enrollment: item }),

export const usePage = create<StoreProps>()(
	persist(
		(set) => ({
			state: {
				pages: "home",
			},
			actions: {
				insert: (item: string) => set({ state: { pages: item } }),
			},
		}),
		{
			name: "enrollment",
			storage: createJSONStorage(() => localStorage),
			partialize: ({ state }) => ({ state }),
		},
	),
);
