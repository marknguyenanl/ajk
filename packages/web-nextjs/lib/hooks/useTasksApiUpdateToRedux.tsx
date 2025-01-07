import {
	addTaskSlice,
	removeAllTasksSlice,
} from "@/lib/features/tasks/tasksSlice";
import { useGetTasksQuery } from "@/services/tasksApi";
import { useEffect } from "react";
import { useAppDispatch } from "./redux";

export default function useTasksApiUpdateToRedux() {
	const dispatch = useAppDispatch();
	const { data: tasks = [], error, isLoading } = useGetTasksQuery();
	useEffect(() => {
		if (tasks.length > 0) {
			dispatch(removeAllTasksSlice());
			tasks.forEach((task) => dispatch(addTaskSlice(task)));
		}
	}, [dispatch, tasks]);
	if (error) {
		const errorMessage =
			"status" in error
				? `Error loading tasks: ${error.data || "Unknown error"}`
				: `Error loading tasks: ${error.message}`;
		return <div>{errorMessage}</div>;
	}

	if (isLoading) return <div>Loading tasks...</div>;
}
