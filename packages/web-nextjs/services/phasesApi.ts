import { PhaseProps } from "@/lib/features/phases/phasesSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const phasesApi = createApi({
	reducerPath: "phasesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	endpoints: (builder) => ({
		getPhases: builder.query<PhaseProps[], void>({
			query: () => "phases",
		}),
		getPhaseById: builder.query<PhaseProps, string>({
			query: (id) => `phases/${id}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPhasesQuery, useGetPhaseByIdQuery } = phasesApi;
