import { useCallback, useState } from "react";
import Button from "../Button";
import { AddItem } from "./AddItem";
import Tasks from "../Tasks";
import { convertTask } from "@/composables/crudTask";

export default function Capture(props: any) {
	const {
		tasks,
		phase,
		setPhase,
		selectedTaskId,
		setSelectedTaskId,
		context,
	} = props;
	const [isAddItem, setIsAddItem] = useState(false);
	const handleAddButton = useCallback(
		(boolean: boolean) => {
			return () => {
				setIsAddItem(boolean);
			};
		},
		[setIsAddItem],
	);
	const handleTaskPhase = useCallback(
		(taskId: any, phase: string, context: string) => {
			return () => {
				console.log(
					"put to change phase to process then call component process instead of capture",
				);
				convertTask(taskId, phase, context);
				setPhase(phase);
			};
			// TODO: (useCallback here)
		},
		[setPhase],
	);

	return (
		<>
			<div className="flex-col space-y-4">
				<div className="flex-col h-10">
					<div
						className={`ml-auto space-x-4 w-60 flex  ${isAddItem ? "hidden" : ""}`}
					>
						<Button onClick={handleAddButton(true)}>Add Task</Button>
						<Button onClick={handleTaskPhase(selectedTaskId, "process", "")}>
							Process Task
						</Button>
					</div>

					{isAddItem && <AddItem {...{ phase, handleAddButton }} />}
				</div>

				<Tasks
					viewType="list"
					{...{ phase, tasks, selectedTaskId, setSelectedTaskId, context }}
				/>
			</div>
		</>
	);
}
