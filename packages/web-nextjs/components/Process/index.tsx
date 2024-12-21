import { useCallback } from "react";
import Button from "../Button";
import Tasks from "../Tasks";
import { convertTask as convertTask } from "@/composables/crudTask";

export default function Process(props: any) {
	const { tasks, phase, setPhase, selectedTaskId, setSelectedTaskId, context } =
		props;
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
					<div className="flex ml-auto space-x-4 w-full">
						<Button onClick={handleTaskPhase(selectedTaskId, "capture", "")}>
							Revert to Capture
						</Button>
						<Button onClick={handleTaskPhase(selectedTaskId, "trash", "")}>
							Throw to Trash
						</Button>
						<Button
							onClick={handleTaskPhase(selectedTaskId, "engage", "@runaway")}
						>
							Define Action
						</Button>
						<Button
							onClick={handleTaskPhase(
								selectedTaskId,
								"brainstorm",
								"projects",
							)}
						>
							Brainstorm Project
						</Button>
						<Button
							onClick={handleTaskPhase(selectedTaskId, "engage", "reference")}
							// TODO: (may parentId is important here)
						>
							Note to Reference
						</Button>
						<Button
							onClick={handleTaskPhase(selectedTaskId, "engage", "someday")}
						>
							Work on Someday
						</Button>
					</div>
				</div>

				<Tasks
					viewType="list"
					{...{ phase, tasks, selectedTaskId, setSelectedTaskId, context }}
				/>
				{/*  TODO: (toggle and context do not work together, so when setIsToggle then must disable context) */}
			</div>
		</>
	);
}
