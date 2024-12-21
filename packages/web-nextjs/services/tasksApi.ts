import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "@/lib/features/tasks/tasksSlice";

// Define a service using a base URL and expected endpoints
export const ajkApi = createApi({
	reducerPath: "tasksApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	endpoints: (builder) => ({
		getTasks: builder.query<Task[], void>({
			query: () => "tasks",
		}),
		getTaskById: builder.query<Task, string>({
			query: (id) => `tasks/${id}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTasksQuery, useGetTaskByIdQuery } = tasksApi;
