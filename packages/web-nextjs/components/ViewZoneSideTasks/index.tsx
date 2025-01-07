import { selectNameSpacesSlice } from "@/lib/features/namespace/namespaceSlice";
import { selectAll } from "@/lib/features/tasks/tasksSlice";
import { useAppSelector } from "@/lib/hooks/redux";
import { useSortedTasks } from "@/lib/hooks/useProcessedTasks";

export default function ViewZoneSideTasks() {
	const nsSlice = useAppSelector(selectNameSpacesSlice);
	const tasks = useAppSelector(selectAll);
	const finalTasks = useSortedTasks(tasks, "createdAt", "desc");

	return (
		<div className="flex flex-col p-4 space-y-1 text-xs">
			{finalTasks
				.filter((task) => task.layer === nsSlice.selectedLayer)
				.map((task) => (
					<ul key={task.id}>
						<li className="text-gray-500 hover:text-white">{task.title}</li>
					</ul>
				))}
		</div>
	);
}
