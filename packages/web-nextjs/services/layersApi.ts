import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Layer } from "@/lib/features/layers/layersSlice";

// Define a service using a base URL and expected endpoints
export const ajkApi = createApi({
	reducerPath: "tasksApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	endpoints: (builder) => ({
		getLayers: builder.query<Layer[], void>({
			query: () => "layers",
		}),
		getLayerById: builder.query<Layer, string>({
			query: (id) => `layers/${id}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLayersQuery, useGetLayerByIdQuery } = layersApi;
