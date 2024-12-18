import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { defaultTask } from "@/constants/defaults";
import { addTask } from "@/composables/crudTask";

// post request to url with object
export function AddBrainstorm(props: any) {
	const { handleAddButton, selectedTaskId } = props;
	const [task, setTask] = useState(defaultTask);

	const handleTask = (e: any) => {
		setTask({
			...task,
			id: uuidv4(),
			title: e.target.value,
			phase: "brainstorm",
			parentId: selectedTaskId,
		});
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		addTask(task);
		setTask({ ...task, title: "" });
		console.log("Task is submitted successfully");
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-center pb-4 ml-auto space-y-2 w-1/2 text-black"
			>
				<div>
					<input
						className="p-2 px-2 w-full rounded-sm"
						type="text"
						id="task"
						autoFocus
						placeholder="Task"
						value={task.title}
						onChange={handleTask}
						onBlur={handleAddButton(false)}
					/>
				</div>
				<button className="hidden" type="submit">
					Submit
				</button>
			</form>
		</>
	);
}
