import { updateTask } from "@/composables/crudTask";
import { fetchTask } from "@/composables/taskFetch";
import { useEffect, useState } from "react";

interface TaskDetails {
	title: string;
	context: string;
	time: string;
	energy: string;
	description: string;
	parentId: string;
}

export default function TaskDetails(props: any) {
	const { phase, enableAutoFocus, selectedTaskId } = props;
	const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);

	useEffect(() => {
		const getTaskDetails = async () => {
			try {
				const task = await fetchTask(selectedTaskId);
				setTaskDetails(task);
			} catch (err) {
				console.log("Error fetching task details");
			}
		};
		getTaskDetails();
	}, [selectedTaskId]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		if (taskDetails) {
			const { name, value } = e.target;
			setTaskDetails({ ...taskDetails, [name]: value });
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (taskDetails) {
			updateTask(taskDetails);
		}
	};

	const taskDetailsHTML = (
		<div className="flex flex-col pt-2 space-y-2">
			<div className="flex space-x-2 text-black">
				<select
					className="p-1 rounded-sm"
					name="context"
					onChange={handleChange}
					value={taskDetails?.context}
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
					name="time"
					onChange={handleChange}
					value={taskDetails?.time}
				>
					<option>~30m</option>
					<option>~1h</option>
					<option>~2h</option>
				</select>
				<select
					className="p-1 rounded-sm"
					name="energy"
					onChange={handleChange}
					value={taskDetails?.energy}
				>
					<option>#low</option>
					<option>#med</option>
					<option>#high</option>
				</select>
				<input
					className="p-1 rounded-sm"
					name="parentId"
					onChange={handleChange}
					value={taskDetails?.parentId}
				/>
			</div>
			<textarea
				value={taskDetails?.description}
				rows={10}
				className="resize-none"
				name="description"
				onChange={handleChange}
			/>
		</div>
	);

	return (
		<form className="flex flex-col grow" onSubmit={handleSubmit}>
			<input
				className="bg-transparent rounded-sm focus-within:bg-transparent focus-within:outline-none grow"
				value={taskDetails?.title}
				name="title"
				onChange={handleChange}
				autoFocus={enableAutoFocus}
			/>

			{phase === "organize" && taskDetailsHTML}
			{phase === "engage" && taskDetailsHTML}

			<button className="hidden" type="submit">
				Submit
			</button>
		</form>
	);
}
