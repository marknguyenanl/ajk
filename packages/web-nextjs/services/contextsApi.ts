import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Context } from "@/lib/features/contexts/contextsSlice";

// Define a service using a base URL and expected endpoints
export const contextsApi = createApi({
	reducerPath: "contextsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	endpoints: (builder) => ({
		getContexts: builder.query<Context[], void>({
			query: () => "contexts",
		}),
		getContextById: builder.query<Context, string>({
			query: (id) => `contexts/${id}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetContextsQuery, useGetContextByIdQuery } = contextsApi;
