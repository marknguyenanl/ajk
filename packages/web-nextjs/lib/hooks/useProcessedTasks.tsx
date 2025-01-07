import { TaskProps } from "../features/tasks/tasksSlice";

export const useSortedTasks = (
	tasks: TaskProps[],
	namespaceSortBy: string,
	namespaceOrder: string,
) => {
	const sortedTasks = [...tasks].sort((a: TaskProps, b: TaskProps) => {
		switch (namespaceSortBy) {
			case "updatedAt":
				return namespaceOrder === "asc"
					? Number(a.updatedAt) - Number(b.updatedAt)
					: Number(b.updatedAt) - Number(a.updatedAt);
			case "order":
				return namespaceOrder === "asc"
					? Number(a.order) - Number(b.order)
					: Number(b.order) - Number(a.order);
			default:
				return Number(b.createdAt) - Number(a.createdAt);
		}
	});
	return sortedTasks;
};

export const useFilteredTasks = (
	sortedTasks: TaskProps[],
	namespaceState: string,
) => {
	const filteredTasks = () => {
		switch (namespaceState) {
			case "Capture":
				// list all capture items
				return sortedTasks?.filter((task) => task.phase === "Capture") || [];
			case "Clarify":
				// list only one capture items or only one clarify
				return sortedTasks
					?.filter((task) =>
						["Clarify", "Capture"].includes(String(task.phase)),
					)
					.sort((a, b) => (a.phase === "Clarify" ? -1 : 1))
					.slice(0, 1);
			case "Organize":
				return sortedTasks?.filter((task) => task.phase === "Organize") || [];
			case "Review":
				return sortedTasks?.filter((task) => task.phase === "Review") || [];
			case "Engage":
				return sortedTasks?.filter((task) => task.phase === "Engage") || [];
			default:
				return console.log("There is none phase that can run default");
		}
	};
	return filteredTasks();
};

export const useProcessedTasks = (
	tasks: TaskProps[],
	namespaceState: string,
	namespaceSortBy: string,
	namespaceOrder: string,
) => {
	const sortedTasks = useSortedTasks(tasks, namespaceSortBy, namespaceOrder);
	const filteredTasks = useFilteredTasks(sortedTasks, namespaceState);
	return filteredTasks;
};
