import { TaskProps } from "@/lib/features/tasks/tasksSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
	reducerPath: "tasksApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	tagTypes: ["Tasks"],
	endpoints: (builder) => ({
		getTasks: builder.query<TaskProps[], void>({
			query: () => "tasks",
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Tasks" as const, id })),
							"Tasks",
						]
					: ["Tasks"],
		}),
		getTask: builder.query<TaskProps, string>({
			query: (id) => `tasks/${id}`,
			providesTags: (result, error, id) => [{ type: "Tasks", id }],
		}),
		addTask: builder.mutation({
			query: (task: TaskProps) => {
				return {
					url: `tasks`,
					method: "POST",
					body: task,
				};
			},
			invalidatesTags: ({ id }) => [{ type: "Tasks", id }],
		}),
		updateTaskById: builder.mutation({
			query: (task: TaskProps) => {
				return {
					url: `tasks/${task.id}`,
					method: "PUT",
					body: task,
				};
			},
			invalidatesTags: ["Tasks"],
			onQueryStarted(task: any, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					tasksApi.util.updateQueryData("getTasks", task.id, (draft: any) => {
						Object.assign(draft, task);
					}),
				);
				queryFulfilled.catch(patchResult.undo);
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetTasksQuery,
	useGetTaskQuery,
	useAddTaskMutation,
	useUpdateTaskByIdMutation,
} = tasksApi;
