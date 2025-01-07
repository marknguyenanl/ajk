import {
	createEntityAdapter,
	createSelector,
	createSlice,
	current,
} from "@reduxjs/toolkit";
import { v4 } from "uuid";

export interface TaskProps {
	id?: string;
	title?: string;
	description?: string;
	parentId?: string;
	phase?: string;
	layer?: string;
	sortBy?: string;
	order?: string;
	context?: string;
	time?: string;
	energy?: string;
	sequence?: number;
	createdAt?: string;
	updatedAt?: string;
	isCompleted?: boolean;
	isCalendar?: boolean;
}

export const defaultTasks: TasksProps = {
	items: [],
};

export const defaultTask: TaskProps = {
	id: v4(),
	title: "",
	description: "",
	parentId: "",
	phase: "Capture",
	layer: "",
	sortBy: "createdAt",
	order: "asc",
	context: "",
	time: "",
	energy: "",
	sequence: 1,
	createdAt: Date.now().toString(),
	updatedAt: Date.now().toString(),
	isCompleted: false,
	isCalendar: false,
};

export interface TasksProps {
	items: TaskProps[];
}
const tasksAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) => Number(b.createdAt) - Number(a.createdAt),
});

export const tasksSlice = createSlice({
	name: "tasks",
	initialState: tasksAdapter.getInitialState(),
	reducers: {
		addTaskSlice(state, action) {
			tasksAdapter.addOne(state, action.payload);
			console.log("current state of new task is: ", state);
			console.log("current action payload content is: ", action.payload);
		},

		updateTaskSlice(state, action) {
			tasksAdapter.upsertOne(state, action.payload);
			console.log("debug here", state);
		},
		removeTaskSlice(state, action) {
			tasksAdapter.removeOne(state, action.payload);
		},
		removeAllTasksSlice(state) {
			tasksAdapter.removeAll(state);
		},
	},
});

export const {
	addTaskSlice,
	updateTaskSlice,
	removeTaskSlice,
	removeAllTasksSlice,
} = tasksSlice.actions;
export const { selectAll, selectEntities, selectIds, selectTotal, selectById } =
	tasksAdapter.getSelectors((state: any) => state?.tasks);
// export const  {selectIds}  = tasksAdapter.getSelectors(selectAll());
export default tasksSlice.reducer;
