import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NameSpaceProps } from "@/lib/features/namespace/namespaceSlice";

// Define a service using a base URL and expected endpoints
export const namespaceApi = createApi({
	reducerPath: "namespaceApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	tagTypes: ["Namespace"],
	endpoints: (builder) => ({
		getNameSpace: builder.query<NameSpaceProps, void>({
			query: () => "namespace",
			providesTags: ["Namespace"],
		}),
		updateNameSpace: builder.mutation({
			query: (data) => {
				const updatedAt: string = Date.now().toString();
				return {
					url: `namespace`,
					method: "PUT",
					body: { ...data, updatedAt },
				};
			},
			invalidatesTags: ["Namespace"],
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNameSpaceQuery, useUpdateNameSpaceMutation } =
	namespaceApi;
