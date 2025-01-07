import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import Button from "../Button";
import {
	removeTaskSlice,
	selectAll,
	updateTaskSlice,
} from "@/lib/features/tasks/tasksSlice";
import { selectNameSpacesSlice } from "@/lib/features/namespace/namespaceSlice";
import { TaskProps } from "@/lib/types";

export default function Clarify(): any {
	const dispatch = useAppDispatch();
	const nsSlice = useAppSelector(selectNameSpacesSlice);
	const tasks = useAppSelector(selectAll);
	const task = tasks.filter(
		(task: TaskProps) => task.id === nsSlice.selectedTaskId,
	);
	const handleGoOrganize = () => {
		dispatch(
			updateTaskSlice({
				...task,
				id: nsSlice.selectedTaskId,
				phase: "Organize",
			}),
		);
	};
	return (
		<>
			<div className="flex flex-col space-y-2 w-full">
				<div className="flex flex-col space-y-2 w-1/2">
					<div className="flex space-x-2 text-white">
						<Button
							onClick={() => {
								dispatch(removeTaskSlice(nsSlice.selectedTaskId));
							}}
						>
							throw Trash
						</Button>
						<Button onClick={handleGoOrganize}>go Organize</Button>
					</div>
					<p className="py-2 px-2 text-black bg-orange-400 rounded-sm float float-start">
						Rename: (what is it), then go Organize
					</p>
				</div>
			</div>
		</>
	);
}
