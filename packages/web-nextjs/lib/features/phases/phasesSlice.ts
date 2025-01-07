import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { v4 } from "uuid";

export interface PhaseProps {
	id: string;
	title: string;
	sortBy: string;
	order: string;
	createdAt: string;
	updatedAt: string;
}

export const defaultPhase = {
	id: v4(),
	title: "",
	sortBy: "createdAt",
	order: "desc",
	createdAt: "",
	updatedAt: "",
};

export interface PhasesProps {
	items: PhaseProps[];
}
export const defaultPhases: PhasesProps = {
	items: [],
};
export const phasesSlice = createSlice({
	name: "phases",
	initialState: defaultPhases,
	reducers: {
		addPhaseSlice: (state, action: PayloadAction<PhaseProps>) => {
			const { title } = action.payload;
			const phase: PhaseProps = defaultPhase;
			const createdAt = new Date().toLocaleTimeString();
			const updatedAt = new Date().toLocaleTimeString();

			state.items.push({ ...phase, title, createdAt, updatedAt });
		},
		deletePhaseSlice: (state) => {
			return defaultPhases;
		},
	},
});

export const { addPhaseSlice, deletePhaseSlice } = phasesSlice.actions;
export const selectPhasesSlice = (state: RootState) => state.phases.items;
export default phasesSlice.reducer;
