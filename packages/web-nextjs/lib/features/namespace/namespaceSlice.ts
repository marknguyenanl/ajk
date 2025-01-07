import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NameSpaceProps {
	namespaceState?: string | "context";
	selectedTaskId?: string;
	selectedLayer?: string;
	sideTask?: string;
	sortBy?: string;
	order?: string;
	createdAt?: string;
	updatedAt?: string;
}

export const defaultNameSpace: NameSpaceProps = {
	namespaceState: "Clarify",
	selectedTaskId: "",
	selectedLayer: "Projects",
	sideTask: "",
	sortBy: "updatedAt",
	order: "asc",
	updatedAt: "",
};

export const namespaceSlice = createSlice({
	name: "namespace",
	initialState: defaultNameSpace,
	reducers: {
		updateNameSpaceRedux: (state, action: PayloadAction<NameSpaceProps>) => {
			state.namespaceState = action.payload.namespaceState;
			state.selectedTaskId = action.payload.selectedTaskId;
			state.selectedLayer = action.payload.selectedLayer;
			state.sortBy = action.payload.sortBy;
			state.order = action.payload.order;
			state.updatedAt = Date.now().toString();
		},
		deleteNameSpaceRedux: (state) => {},
		createNameSpaceRedux: (state, action: PayloadAction<NameSpaceProps>) => {
			state = action.payload;
		},
	},
});

export const {
	updateNameSpaceRedux,
	createNameSpaceRedux,
	deleteNameSpaceRedux,
} = namespaceSlice.actions;
export const selectNameSpacesSlice = (state: RootState): NameSpaceProps =>
	state.namespace;
export default namespaceSlice.reducer;
