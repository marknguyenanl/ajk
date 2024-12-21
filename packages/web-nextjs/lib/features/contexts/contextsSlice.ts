import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
export interface Context {
	id: string;
	title: string;
	sortBy: string;
	asc: boolean;
}

export interface Contexts {
	items: Context[];
}
export const initializeContexts: Contexts = {
	items: [],
};
export const contextsSlice = createSlice({
	name: "contexts",
	initialState: initializeContexts,
	reducers: {
		addContext: (state, action: PayloadAction<Context>) => {
			state.items.push(action.payload);
		},
	},
});

export const { addContext } = contextsSlice.actions;
export const selectcontexts = (state: RootState) => state.contexts.items;
export default contextsSlice.reducer;
