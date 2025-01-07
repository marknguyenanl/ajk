import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LayerProps } from "@/lib/features/layers/layersSlice";

// Define a service using a base URL and expected endpoints
export const layersApi = createApi({
	reducerPath: "layersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	endpoints: (builder) => ({
		getLayers: builder.query<LayerProps[], void>({
			query: () => "layers",
		}),
		getLayerById: builder.query<LayerProps, string>({
			query: (id) => `layers/${id}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLayersQuery, useGetLayerByIdQuery } = layersApi;
