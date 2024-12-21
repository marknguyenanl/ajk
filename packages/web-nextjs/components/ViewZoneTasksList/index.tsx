import { defaultNameSpace } from "@/lib/features/namespace/namespaceSlice";
import { Task } from "@/lib/features/tasks/tasksSlice";
import {
	useGetNameSpaceQuery,
	useGetTasksQuery,
	useUpdateNameSpaceMutation,
} from "@/services/api";

export default function ViewZoneTasksList() {
	const { data: tasks = [] } = useGetTasksQuery();
	// get namespace data from api

	const handleClick = (phase: string, taskId: string) => {};
	const handleChange = () => {
		// using api update task.title = e.target.value;
	};
	return (
		<div className="p-4">
			<ul className="flex flex-col space-y-2">
				{tasks.map((task: Task) => {
					return (
						<input
							type="text"
							className={`p-1 border-green-600 bg-green-600 px-2 rounded-md border `}
							key={task.id}
							value={task.title}
							onChange={handleChange}
							onClick={() => handleClick("Process", task.id)}
						/>
					);
				})}
			</ul>
		</div>
	);
}
