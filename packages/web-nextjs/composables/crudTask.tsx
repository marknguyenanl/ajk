export const addTask = async (task: any) => {
	const currentTime = new Date();
	const created = currentTime;
	const updated = currentTime;
	try {
		const response = await fetch("http://localhost:3000/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...task, created, updated }),
		});
		if (!response.ok) {
			throw new Error("Could not create a task");
		}
		console.log("Task is set successfully in database");
	} catch (error) {
		console.log("Error while creating a task");
	}
};

export const updateTask = async (task: any) => {
	const currentTime = new Date();
	const updated = currentTime;
	try {
		const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...task, updated }),
		});
		if (!response.ok) {
			throw new Error("Could not create a task");
		}
		console.log("Task is set successfully updated in database");
	} catch (error) {
		console.log("Error while updating a task");
	}
};

export const fetchTask = async (taskId: any) => {
	try {
		const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Could not create a task");
		}
		console.log("Task is set successfully updated in database");
	} catch (error) {
		console.log("Error while updating a task");
	}
};

export const convertTask = async (
	taskId: any,
	phase: string,
	context: string,
) => {
	console.log("taskId prop is:", taskId);
	const updated = new Date();
	try {
		let url = "http://localhost:3000/tasks";
		if (taskId) {
			url = `http://localhost:3000/tasks/${taskId}`;
		}
		const response = await fetch(`${url}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ phase, context, updated }),
		});
		if (!response.ok) {
			throw new Error("Could not convert a task");
		}
		console.log(
			`Task is set successfully convert to phase ${phase} in database`,
		);
	} catch (error) {
		console.log(`Error while converting to phase ${phase}`);
	}
};
