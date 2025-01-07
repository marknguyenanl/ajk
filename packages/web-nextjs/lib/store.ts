import { combineSlices, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/tasksSlice";
import phasesReducer from "./features/phases/phasesSlice";
import namespaceReducer from "./features/namespace/namespaceSlice";
import contextsReducer from "./features/contexts/contextsSlice";
import layersReducer from "./features/layers/layersSlice";
import { contextsApi } from "@/services/contextsApi";
import { namespaceApi } from "@/services/namespaceApi";
import { layersApi } from "@/services/layersApi";
import { phasesApi } from "@/services/phasesApi";
import { tasksApi } from "@/services/tasksApi";

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (gDM) =>
			gDM().concat(
				tasksApi.middleware,
				namespaceApi.middleware,
				phasesApi.middleware,
				contextsApi.middleware,
				layersApi.middleware,
			),
	});
};

export const rootReducer = combineSlices(
	tasksApi,
	namespaceApi,
	phasesApi,
	contextsApi,
	layersApi,
	{
		tasks: tasksReducer,
		namespace: namespaceReducer,
		phases: phasesReducer,
		contexts: contextsReducer,
		layers: layersReducer,
	},
);
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// setupListeners(makeStore.dispatch);
