import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Phase } from "@/lib/features/phases/phasesSlice";

// Define a service using a base URL and expected endpoints
export const ajkApi = createApi({
	reducerPath: "phasesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	endpoints: (builder) => ({
		getPhases: builder.query<Phase[], void>({
			query: () => "phases",
		}),
		getPhaseById: builder.query<Phase, string>({
			query: (id) => `phases/${id}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPhasesQuery, useGetPhaseByIdQuery } = phasesApi;
