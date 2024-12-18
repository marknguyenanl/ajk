import { useCallback, useState } from "react";
import Button from "../Button";
import Tasks from "../Tasks";
import { convertTask as convertTask } from "@/composables/crudTask";

export default function Engage(props: any) {
	const {
		tasks,
		phase,
		setPhase,
		selectedTaskId,
		setSelectedTaskId,
		isContext,
	} = props;
	const handleTaskPhase = useCallback(
		(taskId: any, phase: string, context: string) => {
			return () => {
				console.log(
					"put to change phase to process then call component process instead of capture",
				);
				// TODO: (convert the main task to phase: engage context: project )
				// TODO: (other tasks are moved to phase: organize context: runaway)

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
					<div className={`ml-auto space-x-4 w-full flex  `}>
						{/* <Button onClick={handleAddButton(true)}>Add</Button> */}
						<Button
							onClick={handleTaskPhase(selectedTaskId, "engage", "@runaway")}
						>
							Revert to Capture
						</Button>
						<Button
							onClick={handleTaskPhase(selectedTaskId, "engage", "@runaway")}
						>
							Continue Processing
						</Button>
						<Button
							onClick={handleTaskPhase(selectedTaskId, "engage", "@runaway")}
						>
							Run away
						</Button>
					</div>
				</div>

				<Tasks
					viewType="list"
					{...{ phase, tasks, selectedTaskId, setSelectedTaskId, isContext }}
				/>
			</div>
		</>
	);
}
