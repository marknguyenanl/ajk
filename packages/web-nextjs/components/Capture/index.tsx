import { useState } from "react";
import Button from "../Button";
import namespaceSlice, {
	selectNameSpacesSlice,
} from "@/lib/features/namespace/namespaceSlice";
import {
	addTaskSlice,
	defaultTask,
	removeAllTasksSlice,
} from "@/lib/features/tasks/tasksSlice";
import { useAddTaskMutation } from "@/services/tasksApi";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";

export default function Capture(props: any) {
	const dispatch = useAppDispatch();
	const [showAddInput, setShowAddInput] = useState(false);
	const [taskTitle, setTaskTitle] = useState("");
	const namespaceSlice = useAppSelector(selectNameSpacesSlice);
	// const [addTask] = useAddTaskMutation();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		dispatch(
			addTaskSlice({
				...defaultTask,
				id: v4(),
				title: taskTitle,
				phase: namespaceSlice?.namespaceState,
				updatedAt: Date.now().toString(),
			}),
		);
		// addTask({
		// });
		setTaskTitle("");
		removeAllTasksSlice();
	};

	const handleAddItem = () => {
		setShowAddInput(true);
	};

	const inputAdd = (
		<form className="w-full" onSubmit={handleSubmit}>
			<input
				className="p-2 text-black focus-within:bg-green-800"
				value={taskTitle}
				autoFocus
				onChange={(e) => setTaskTitle(e.target.value)}
				onBlur={() => setShowAddInput(false)}
				onSubmit={handleSubmit}
			/>
			<button hidden>Submit</button>
		</form>
	);
	return (
		<>
			<div className="flex flex-col space-y-2">
				<div className="flex w-full text-white align-center">
					{showAddInput && inputAdd}
					{!showAddInput && (
						<div className="mr-auto">
							<Button onClick={handleAddItem}>add Capture</Button>
						</div>
					)}
					{/* TODO: (handle move namespaceState to Clarify) */}
				</div>
				<p className="py-2 px-2 text-black bg-orange-400 rounded-sm">
					You will not need to know details or edit items here. This is just to
					be aware of. If you edit first item, you will then clarify pending
					items first
				</p>
			</div>
		</>
	);
}
