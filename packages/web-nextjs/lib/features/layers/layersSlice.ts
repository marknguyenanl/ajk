import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { v4 } from "uuid";

export interface LayerProps {
	id: string;
	title: string;
	alias: string;
	sortBy: string;
	order: string;
	createdAt: string;
	updatedAt: string;
}

export const defaultLayer: LayerProps = {
	id: v4(),
	title: "Projects",
	alias: "",
	sortBy: "createdAt",
	order: "asc",
	createdAt: Date.now().toString(),
	updatedAt: Date.now().toString(),
};
export const defaultLayers: LayersProps = {
	items: [],
};
export interface LayersProps {
	items: LayerProps[];
}
export const initialState: LayersProps = {
	items: [],
};
export const layersSlice = createSlice({
	name: "layers",
	initialState,
	reducers: {
		addLayerSlice: (state, action: PayloadAction<LayerProps>) => {
			const { title } = action.payload;
			const layer: LayerProps = defaultLayer;
			const createdAt = new Date().toLocaleTimeString();
			const updatedAt = new Date().toLocaleTimeString();

			state.items.push({ ...layer, title, createdAt, updatedAt });
		},
		deleteLayersSlice: (state) => {
			return defaultLayers;
		},
	},
});

export const { addLayerSlice, deleteLayersSlice } = layersSlice.actions;
export const selectLayers = (state: RootState) => state.layers.items;
export default layersSlice.reducer;
