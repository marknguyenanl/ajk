import { useCallback } from "react";
import Button from "../Button";
import Tasks from "../Tasks";
import { convertTask as convertTask } from "@/composables/crudTask";

export default function Organize(props: any) {
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
					<div className={`ml-auto space-x-4 w-96 flex`}>
						{/* <Button onClick={handleAddButton(true)}>Add</Button> */}
						<Button
							onClick={handleTaskPhase(selectedTaskId, "engage", "@runaway")}
						>
							To Engage
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