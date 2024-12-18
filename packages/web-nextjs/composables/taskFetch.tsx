import { defaultTask } from "@/constants/defaults";
import { useState, useEffect } from "react";

export function useTasksFetch() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await fetch("http://localhost:3000/tasks");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setTasks(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchTasks();
	}, [tasks]);

	return tasks;
}

export const fetchTask = async (taskId: string) => {
	const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

export const deleteTask = async (taskId: string) => {
	const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
};
