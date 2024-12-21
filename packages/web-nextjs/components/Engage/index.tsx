import { useCallback } from "react";
import Button from "../Button";
import Tasks from "../Tasks";
import { convertTask as convertTask } from "@/composables/crudTask";

export default function Engage(props: any) {
	const { tasks, phase, setPhase, selectedTaskId, setSelectedTaskId, context } =
		props;
	const handleTaskPhase = useCallback(
		(taskId: any, phase: string, context: string) => {
			return () => {
				if (taskId) {
					convertTask(taskId, phase, context);
				}
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
						<Button onClick={handleTaskPhase(selectedTaskId, "capture", "")}>
							Revert to Capture
						</Button>
						<Button onClick={() => setPhase("capture")}>
							Continue Processing
						</Button>
					</div>
				</div>

				<Tasks
					viewType="list"
					{...{ phase, tasks, selectedTaskId, setSelectedTaskId, context }}
				/>
			</div>
		</>
	);
}
