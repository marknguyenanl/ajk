import {
	selectNameSpacesSlice,
	updateNameSpaceRedux,
} from "@/lib/features/namespace/namespaceSlice";
import { selectAll, updateTaskSlice } from "@/lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { useProcessedTasks } from "@/lib/hooks/useProcessedTasks";
import { TaskProps } from "@/lib/types";
import { useRef } from "react";

export default function ViewZoneTasksList() {
	const dispatch = useAppDispatch();
	const nsSlice = useAppSelector(selectNameSpacesSlice);
	const tasks = useAppSelector(selectAll);

	const handleTaskFocus = async (id: string) => {
		dispatch(
			updateNameSpaceRedux({
				...nsSlice,
				selectedTaskId: id,
			}),
		);
		console.log(nsSlice.selectedTaskId);
	};
	const handleTaskTitleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		task: TaskProps,
	) => {
		if (nsSlice.namespaceState === "Capture") {
			dispatch(
				updateTaskSlice({
					...task,
					title: e.target.value,
					phase: "Clarify",
					updatedAt: task.updatedAt,
				}),
			);
			dispatch(
				updateNameSpaceRedux({
					...nsSlice,
					namespaceState: "Clarify",
				}),
			);
		} else {
			dispatch(
				updateTaskSlice({
					...task,
					title: e.target.value,
					updatedAt: task.updatedAt,
				}),
			);
		}
	};

	const finalTasks = useProcessedTasks(
		tasks,
		String(nsSlice.namespaceState),
		String(nsSlice.sortBy),
		String(nsSlice.order),
	);

	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		task: TaskProps,
		index: number,
	) => {
		if (e.key === "Enter") {
			e.preventDefault();
			dispatch(updateTaskSlice({ ...task, title: e.currentTarget.value }));
			if (nsSlice.namespaceState === "Clarify") {
				dispatch(
					updateTaskSlice({
						...task,
						title: e.currentTarget.value,
						phase: "Organize",
					}),
				);
				dispatch(
					updateNameSpaceRedux({ ...nsSlice, namespaceState: "Organize" }),
				);
			}
		} else if (e.key === "ArrowUp" && index > 0) {
			e.preventDefault();
			const prevInput = inputRefs.current[index - 1];
			if (prevInput) {
				prevInput.focus();
			}
		} else if (e.key === "ArrowDown" && index < inputRefs.current.length - 1) {
			const nextInput = inputRefs.current[index + 1];
			if (nextInput) {
				nextInput.focus();
			}
		}
	};

	return (
		<div>
			<form className="flex flex-col space-y-2">
				{finalTasks?.map((task: TaskProps, index: number) => {
					return (
						<div key={task.id} className="flex flex-col space-y-2">
							<input
								type="text"
								name="title"
								className={`p-1 border-green-600 bg-green-600 px-2 rounded-sm border ${task.id === nsSlice?.selectedTaskId ? "bg-yellow-600" : "bg-yellow-950"}`}
								value={task.title}
								ref={(e) => {
									inputRefs.current[index] = e;
								}}
								autoFocus={task.id === finalTasks[0].id}
								onFocus={() => handleTaskFocus(task.id || "")}
								onChange={(e) => handleTaskTitleChange(e, task)}
								onKeyDown={(e) => handleKeyDown(e, task, index)}
								autoComplete="off"
							/>
							{task.id === nsSlice?.selectedTaskId && (
								<textarea
									name="description"
									className="p-2 bg-yellow-700 rounded-sm"
									value={task.description}
									rows={10}
								/>
							)}
						</div>
					);
				})}
			</form>
		</div>
	);
}
