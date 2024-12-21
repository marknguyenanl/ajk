import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";

export interface Layer {
	id: string;
	title: string;
	alias: string;
	sortBy: string;
	asc: boolean;
	createdAt: string;
	updatedAt: string;
}

export const defaultLayer = {
	id: uuidv4(),
	title: "",
	alias: "",
	sortBy: "updatedTime",
	asc: false,
	createdAt: "",
	updatedAt: "",
};

interface Layers {
	items: Layer[];
}
const initialState: Layers = {
	items: [],
};
export const layersSlice = createSlice({
	name: "layers",
	initialState,
	reducers: {
		addLayer: (state, action: PayloadAction<Layer>) => {
			const { title } = action.payload;
			const layer: Layer = defaultLayer;
			const createdAt = new Date().toLocaleTimeString();
			const updatedAt = new Date().toLocaleTimeString();

			state.items.push({ ...layer, title, createdAt, updatedAt });
		},
	},
});

export const { addLayer } = layersSlice.actions;
export const selectLayers = (state: RootState) => state.layers.items;
export default layersSlice.reducer;
