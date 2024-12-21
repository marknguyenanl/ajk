import { useCallback, useState } from "react";
import Button from "../Button";
import { AddItem } from "./AddItem";
import Tasks from "../Tasks";
import { convertTask } from "@/composables/crudTask";
import { useHandleTaskPhase } from "@/hooks/useHandleTaskPhase";

export default function Capture(props: any) {
	const {
		tasks,
		namespace,
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
	const handleTaskPhase = useHandleTaskPhase(convertTask, setPhase);

	return (
		<>
			<div className="flex-col space-y-4">
				<div className="flex-col h-10">
					<div
						className={`ml-auto space-x-4 w-60 flex  ${isAddItem ? "hidden" : ""}`}
					>
						<Button onClick={handleAddButton(true)}>Add Task</Button>
						<Button
							onClick={() => handleTaskPhase(selectedTaskId, "process", "")}
						>
							Process Task
						</Button>
					</div>

					{isAddItem && <AddItem {...{ namespace, handleAddButton }} />}
				</div>

				<Tasks
					viewType="list"
					{...{
						namespace,
						tasks,
						selectedTaskId,
						setSelectedTaskId,
						context,
					}}
				/>
			</div>
		</>
	);
}
