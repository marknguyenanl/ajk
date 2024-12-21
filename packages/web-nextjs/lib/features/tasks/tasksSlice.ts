import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

export interface Task {
	id: string;
	title: string;
	description: string;
	parentId: string;
	phase: string;
	context: string;
	time: string;
	energy: string;
	order: number;
	createdAt: string;
	updatedAt: string;
	isCompleted: boolean;
	isCalendar: boolean;
}
export const defaultTask = {
	id: "dkfj",
	title: "",
	description: "",
	parentId: "",
	phase: "",
	context: "",
	time: "",
	energy: "",
	order: 1,
	createdAt: "",
	updatedAt: "",
	isCompleted: false,
	isCalendar: false,
};

interface Tasks {
	items: Task[];
}
export const initializeTasks: Tasks = {
	items: [],
};
export const tasksSlice = createSlice({
	name: "tasks",
	initialState: initializeTasks,
	reducers: {
		addTask: (state, action: PayloadAction<Task>) => {
			state.items.push(action.payload);
		},
	},
});

export const { addTask } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.items;
export default tasksSlice.reducer;
