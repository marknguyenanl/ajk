import {
	defaultNameSpace,
	selectNameSpacesSlice,
	updateNameSpaceRedux,
} from "@/lib/features/namespace/namespaceSlice";
import {
	PhaseProps,
	selectPhasesSlice,
} from "@/lib/features/phases/phasesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { useCallback, useEffect, useMemo } from "react";
import Button from "../Button";
import { useProcessedTasks } from "@/lib/hooks/useProcessedTasks";
import { selectAll } from "@/lib/features/tasks/tasksSlice";

export default function ViewZoneNav() {
	// Constants
	const dispatch = useAppDispatch();
	const nsSlice = useAppSelector(selectNameSpacesSlice);
	const pSlice = useAppSelector(selectPhasesSlice);
	const tasks = useAppSelector(selectAll);

	// Functions
	const handleClick = useCallback(
		(phase: PhaseProps) => {
			handleNameSpaceState(phase, nsSlice.selectedTaskId);
		},
		[nsSlice.selectedTaskId],
	);

	const handleNameSpaceState = (phase: PhaseProps, selectedTaskId: any) => {
		// redux store
		dispatch(
			updateNameSpaceRedux({
				...defaultNameSpace,
				namespaceState: phase.title,
				selectedTaskId,
				sortBy: phase.sortBy,
				order: phase.order,
			}),
		);
	};

	const phaseCount = useMemo(
		() =>
			Object.fromEntries(
				pSlice.map((phase) => [
					phase.title,
					useProcessedTasks(tasks, phase.title, "createdAt", "desc")?.length,
				]),
			),
		[tasks, pSlice],
	);

	useEffect(() => {
		const finalTasks = useProcessedTasks(
			tasks,
			String(nsSlice.namespaceState),
			"createdAt",
			"desc",
		);
		if (finalTasks && finalTasks.length > 0) {
			const firstTaskId = finalTasks[0].id;
			dispatch(
				updateNameSpaceRedux({ ...nsSlice, selectedTaskId: firstTaskId }),
			);
		}
	}, [nsSlice.namespaceState, tasks, pSlice]);

	return (
		<div className="p-4">
			<ul className="flex space-x-4">
				<>
					{pSlice.map((phase: PhaseProps) => (
						<Button
							key={phase.id}
							className={`${phase.title === "Capture" ? "btn-disabled" : ""} ${
								phase.title === nsSlice.namespaceState
									? "btn-hover btn-active"
									: "btn-hover"
							}`}
							disabled={phase.title === "Capture"}
							onClick={() => handleClick(phase)}
						>
							{phase.title} {`(${phaseCount[phase.title]})`}
						</Button>
					))}
				</>
			</ul>
			<br />
			<hr />
		</div>
	);
}
