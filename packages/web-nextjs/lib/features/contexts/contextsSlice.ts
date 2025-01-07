import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { v4 } from "uuid";
export interface ContextProps {
	id: string;
	title: string;
	sortBy: string;
	order: string;
	createdAt: string;
	updatedAt: string;
}

export interface ContextsProps {
	items: ContextProps[];
}

export const defaultContext: ContextProps = {
	id: v4(),
	title: "",
	sortBy: "updatedAt",
	order: "asc",
	createdAt: Date.now().toString(),
	updatedAt: Date.now().toString(),
};

export const initializeContexts: ContextsProps = {
	items: [],
};
export const contextsSlice = createSlice({
	name: "contexts",
	initialState: initializeContexts,
	reducers: {
		addContext: (state, action: PayloadAction<ContextProps>) => {
			state.items.push(action.payload);
		},
	},
});

export const { addContext } = contextsSlice.actions;
export const selectcontexts = (state: RootState) => state.contexts.items;
export default contextsSlice.reducer;
