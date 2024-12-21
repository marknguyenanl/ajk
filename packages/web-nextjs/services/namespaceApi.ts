import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NameSpaceProps } from "@/lib/features/namespace/namespaceSlice";

// Define a service using a base URL and expected endpoints
export const ajkApi = createApi({
	reducerPath: "namespaceApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	endpoints: (builder) => ({
		getNameSpace: builder.query<NameSpaceProps, void>({
			query: () => "namespace",
		}),
		updateNameSpace: builder.mutation({
			query: (namespace: Partial<NameSpaceProps>) => ({
				url: `namespace`,
				method: "PATCH",
				body: namespace,
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNameSpaceQuery, useUpdateNameSpaceMutation } =
	namespaceApi;
