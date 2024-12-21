import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";

export interface Phase {
	id: string;
	title: string;
	sortBy: string;
	asc: boolean;
	createdAt: string;
	updatedAt: string;
}

export const defaultPhase = {
	id: uuidv4(),
	title: "",
	sortBy: "updatedTime",
	asc: false,
	createdAt: "",
	updatedAt: "",
};

interface Phases {
	items: Phase[];
}
const initialState: Phases = {
	items: [],
};
export const phasesSlice = createSlice({
	name: "phases",
	initialState,
	reducers: {
		addPhase: (state, action: PayloadAction<Phase>) => {
			const { title } = action.payload;
			const phase: Phase = defaultPhase;
			const createdAt = new Date().toLocaleTimeString();
			const updatedAt = new Date().toLocaleTimeString();

			state.items.push({ ...phase, title, createdAt, updatedAt });
		},
	},
});

export const { addPhase } = phasesSlice.actions;
export const selectPhases = (state: RootState) => state.phases.items;
export default phasesSlice.reducer;
