import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { addTask, selectTasks } from "./tasksSlice";

export function Tasks() {
	// The `state` arg is correctly typed as `RootState` already
	const tasks = useAppSelector(selectTasks);
	const dispatch = useAppDispatch();

	// omit rendering logic
}
