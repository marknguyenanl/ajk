import { useCallback, useState } from "react";
import Button from "../Button";
import Tasks from "../Tasks";
import { convertTask as convertTask } from "@/composables/crudTask";
import { AddBrainstorm } from "./AddBrainstorm";

export default function Brainstorm(props: any) {
	const {
		tasks,
		phase,
		setPhase,
		selectedTaskId,
		setSelectedTaskId,
		context,
	} = props;
	const [isAddBrainstormed, setIsAddBrainstormed] = useState(false);
	const handleAddBrainstorm = useCallback(
		(boolean: boolean) => {
			return () => {
				setIsAddBrainstormed(boolean);
			};
		},
		[setIsAddBrainstormed],
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
						className={`ml-auto space-x-4 w-full flex  ${isAddBrainstormed ? "hidden" : ""}`}
					>
						<Button onClick={handleTaskPhase(selectedTaskId, "capture", "")}>
							{/* TODO: (need to erase all that created in brainstorm) */}
							Revert to Capture
						</Button>
						<Button onClick={handleAddBrainstorm(true)}>Add Brainstorm</Button>

						{/* <Button onClick={handleAddButton(true)}>Add</Button> */}
						<Button
							onClick={handleTaskPhase(selectedTaskId, "organize", "@runaway")}
						>
							{/* TODO: (when click this, it convert all current brainstorm to organize) */}
							{/* TODO: (query all task with phase brainstorm into array) */}
							{/* TODO: (convert all of them to organize) */}
							To Organize
						</Button>
					</div>

					{isAddBrainstormed && (
						<AddBrainstorm
							{...{
								phase,
								handleAddButton: handleAddBrainstorm,
								selectedTaskId,
							}}
						/>
					)}
				</div>

				<Tasks
					viewType="list"
					{...{ phase, tasks, selectedTaskId, setSelectedTaskId, context }}
				/>
			</div>
		</>
	);
}
