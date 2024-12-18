import { updateTask } from "@/composables/crudTask";
import { useState } from "react";

export default function TaskDetails(props: any) {
	const { task, phase, enableAutoFocus } = props;
	const [taskDetails, setTaskDetails] = useState(task);

	const handleTitle = (e: any) => {
		setTaskDetails({ ...taskDetails, title: e.target.value });
	};

	const handleContext = (e: any) => {
		setTaskDetails({ ...taskDetails, context: e.target.value });
	};

	const handleTime = (e: any) => {
		setTaskDetails({ ...taskDetails, time: e.target.value });
	};

	const handleEngergy = (e: any) => {
		setTaskDetails({ ...taskDetails, energy: e.target.value });
	};

	const handleDescription = (e: any) => {
		setTaskDetails({ ...taskDetails, description: e.target.value });
	};

	const handleParent = (e: any) => {
		// TODO: (search by task title then result to id)
		setTaskDetails({ ...taskDetails, parentId: e.target.value });
		// TODO: (need to add more of it in search algorithm)
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		updateTask(taskDetails);
	};

	const taskDetailsHTML = (
		<>
			<div className="flex flex-col pt-2 space-y-2">
				<div className="flex space-x-2 text-black">
					<select
						className="p-1 rounded-sm"
						onChange={handleContext}
						value={taskDetails.context}
					>
						<option>@office</option>
						<option>@home</option>
						<option>@computer</option>
						<option>@agenda</option>
						<option>@errands</option>
						<option>@read/review</option>
						<option>@telephone</option>
						<option>@runaway</option>
						<option>projects</option>
						<option>aors</option>
						<option>objects</option>
						<option>goals</option>
						<option>life</option>
						<option>reference</option>
						<option>someday</option>
					</select>
					<select
						className="p-1 rounded-sm"
						onChange={handleTime}
						value={taskDetails.time}
					>
						<option>~30m</option>
						<option>~1h</option>
						<option>~2h</option>
					</select>
					<select
						className="p-1 rounded-sm"
						onChange={handleEngergy}
						value={taskDetails.energy}
					>
						<option>#low</option>
						<option>#med</option>
						<option>#high</option>
					</select>
					<input
						className="p-1 rounded-sm"
						onChange={handleParent}
						value={taskDetails.parentId}
					/>
					{/* TODO: (when typing input it will show suggestions for current task can search by regex, search by title//description/attachment...)  */}
				</div>
				<textarea
					value={taskDetails.description}
					rows={10}
					className="resize-none"
					onChange={handleDescription}
				/>
			</div>
		</>
	);

	return (
		<>
			<form className={`flex flex-col grow`} onSubmit={handleSubmit}>
				<input
					className="bg-transparent rounded-sm focus-within:bg-transparent focus-within:outline-none grow"
					value={taskDetails.title}
					onChange={handleTitle}
					autoFocus={enableAutoFocus}
				/>

				{phase === "process" && taskDetailsHTML}
				{phase === "brainstorm" && taskDetailsHTML}

				<button className="hidden" type="submit">
					Submit
				</button>
				{/* TODO: (Stuck at updating a task) */}
			</form>
		</>
	);
}
