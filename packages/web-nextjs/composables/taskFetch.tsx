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
