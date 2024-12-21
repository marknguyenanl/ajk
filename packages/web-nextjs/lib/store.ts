import { configureStore } from "@reduxjs/toolkit";
import phasesReducer from "./features/phases/phasesSlice";
import namespaceReducer from "./features/namespace/namespaceSlice";
import contextsReducer from "./features/contexts/contextsSlice";
import layersReducer from "./features/layers/layersSlice";
import { contextsApi } from "@/services/contextsApi";
// import { setupListeners } from "@reduxjs/toolkit/query";

export const makeStore = () => {
	return configureStore({
		reducer: {
			[tasksApi.reducerPath]: tasksApi.reducer,
			[namespaceApi.reducerPath]: namespaceApi.reducer,
			[phasesApi.reducerPath]: phasesApi.reducer,
			[contextsApi.reducerPath]: contextsApi.reducer,
			namespace: namespaceReducer,
			phases: phasesReducer,
			contexts: contextsReducer,
			layers: layersReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				tasksApi.middleware,
				namespaceApi.middleware,
				phasesApi.middleware,
				contextsApi.middleware,
			),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// setupListeners(makeStore.dispatch);
