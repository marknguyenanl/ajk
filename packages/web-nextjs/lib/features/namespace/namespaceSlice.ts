import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NameSpaceProps {
	namespaceState?: string | "context";
	selectedTaskId?: string;
	updatedAt?: string;
}

export const defaultNameSpace: NameSpaceProps = {
	namespaceState: "Capture",
	selectedTaskId: "",
	updatedAt: "",
};

export const namespaceSlice = createSlice({
	name: "namespace",
	initialState: defaultNameSpace,
	reducers: {
		updateNameSpaceRedux: (state, action: PayloadAction<NameSpaceProps>) => {
			state.namespaceState = action.payload.namespaceState;
			state.selectedTaskId = action.payload.selectedTaskId;
			state.updatedAt = action.payload.updatedAt;
		},
	},
});

export const { updateNameSpaceRedux } = namespaceSlice.actions;
export const selectNameSpaceRedux = (state: RootState): NameSpaceProps =>
	state.namespace;
export default namespaceSlice.reducer;
