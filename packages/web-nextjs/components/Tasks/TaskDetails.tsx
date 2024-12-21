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
	const { phase, selectedTaskId } = props;
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
	}, []);

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
		<div className="flex flex-col py-1 space-y-2">
			<textarea
				value={taskDetails?.description}
				rows={10}
				className="p-1 pl-2 text-gray-100 bg-green-900 rounded-sm resize-none"
				name="description"
				onChange={handleChange}
				// TODO: (add text editor to here like tinymec)
			/>
		</div>
	);

	return (
		<form className="flex flex-col grow" onSubmit={handleSubmit}>
			<input
				className="pl-2 bg-transparent rounded-sm focus-within:bg-transparent focus-within:outline-none grow"
				value={taskDetails?.title}
				name="title"
				onChange={handleChange}
				autoFocus
			/>

			{phase === "organize" && taskDetailsHTML}
			{phase === "engage" && taskDetailsHTML}

			<button className="hidden" type="submit">
				Submit
			</button>
		</form>
	);
}
