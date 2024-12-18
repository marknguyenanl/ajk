import { useState } from "react";
import TaskDetails from "./TaskDetails";
import { usePhasesFetch } from "@/composables/phaseFetch";
import { useContextsFetch } from "@/composables/contextFetch";
export default function Tasks(props: any) {
	const {
		phase,
		tasks,
		isCalendar,
		viewType,
		selectedTaskId,
		setSelectedTaskId,
		isContext,
	} = props;
	// const firstProcessTask = tasks.find((task: any) => task.phase === "process");
	const [enableAutoFocus, setEnableAutoFocus] = useState(false);

	interface Phases {
		title: string;
		sortedBy: string;
		asc: boolean;
	}
	interface Contexts {
		title: string;
		sortedBy: string;
		asc: boolean;
	}
	const phases: Phases[] = usePhasesFetch();
	const contexts: Contexts[] = useContextsFetch();

	const handleEdit = () => {
		setEnableAutoFocus(true);
	};

	const filteredTasksByContext = tasks.filter(
		(task: any) => task.context === isContext,
	);
	// TODO: (create sortedBy as according to Context)
	const context = contexts.filter(
		(context: any) => context.title === isContext,
	);
	const ascByContext = context.length ? context[0].asc : true;
	const sortedByCreatedByContext = ascByContext
		? filteredTasksByContext.sort(
				(a: any, b: any): any =>
					new Date(a.created).getTime() - new Date(b.created).getTime(),
			)
		: filteredTasksByContext.sort(
				(a: any, b: any): any =>
					new Date(b.created).getTime() - new Date(a.created).getTime(),
			);
	const sortedByUpdatedByContext = ascByContext
		? filteredTasksByContext.sort(
				(a: any, b: any): any =>
					new Date(a.updated).getTime() - new Date(b.updated).getTime(),
			)
		: filteredTasksByContext.sort(
				(a: any, b: any): any =>
					new Date(b.updated).getTime() - new Date(a.updated).getTime(),
			);
	const sortedByOrderByContext = ascByContext
		? filteredTasksByContext.sort((a: any, b: any) => a.order - b.order)
		: filteredTasksByContext.sort((a: any, b: any) => b.order - a.order);
	let sortedByContext;
	switch (isContext) {
		case "projects":
			sortedByContext = sortedByOrderByContext;
			break;
		case "reference":
			sortedByContext = sortedByUpdatedByContext;
			break;
		default:
			sortedByContext = sortedByCreatedByContext;
			break;
	}

	const filteredTasksByPhase = tasks.filter(
		(task: any) => task.phase === phase,
	);
	const phaseItem = phases.filter((item: any) => item.title === phase);
	const ascByPhase = phaseItem.length ? phaseItem[0].asc : true;

	const sortedByCreatedByPhase = ascByPhase
		? filteredTasksByPhase.sort(
				(a: any, b: any): any =>
					new Date(a.created).getTime() - new Date(b.created).getTime(),
			)
		: filteredTasksByPhase.sort(
				(a: any, b: any): any =>
					new Date(b.created).getTime() - new Date(a.created).getTime(),
			);
	const sortedByUpdatedByPhase = ascByPhase
		? filteredTasksByPhase.sort(
				(a: any, b: any): any =>
					new Date(a.updated).getTime() - new Date(b.updated).getTime(),
			)
		: filteredTasksByPhase.sort(
				(a: any, b: any): any =>
					new Date(b.updated).getTime() - new Date(a.updated).getTime(),
			);
	const sortedByOrderByPhase = ascByPhase
		? filteredTasksByPhase.sort((a: any, b: any) => a.order - b.order)
		: filteredTasksByPhase.sort((a: any, b: any) => b.order - a.order);

	let sortedByPhase;
	switch (phase) {
		case "process":
			sortedByPhase = sortedByUpdatedByPhase.slice(0, 1);
			break;
		case "brainstorm":
			sortedByPhase = sortedByUpdatedByPhase;
			break;
		case "organize":
			sortedByPhase = sortedByOrderByPhase;
			break;
		default:
			sortedByPhase = sortedByCreatedByPhase;
			break;
	}
	const getIndexOfSelectedTask = (sortedItems: any) => {
		const indexOfSelectedTask = sortedItems.findIndex(
			(task: any) => task.id === selectedTaskId,
		);
		return indexOfSelectedTask;
	};

	const [cursor, setCursor] = useState(getIndexOfSelectedTask(sortedByPhase));
	const handleKeyDown = (e: any) => {
		if (e.key === "ArrowDown") {
			const newCursor = Math.min(cursor + 1, sortedByPhase.length - 1);
			setCursor(newCursor);
		} else if (e.key === "ArrowUp") {
			const newCursor = Math.max(0, cursor - 1);
			setCursor(newCursor);
		} else if (e.key === "Enter" && cursor) {
			setSelectedTaskId(sortedByPhase[cursor].id);
		}
	};

	const listItemsByPhase = (task: any) => (
		<li
			className={`p-1 px-2 mb-1 space-x-2 rounded-md border ${task.id === selectedTaskId ? "border-yellow-400" : "border-yellow-900"}`}
			key={task.id}
			onClick={() => {
				setSelectedTaskId(task.id);
				console.log(selectedTaskId);
			}}
			onKeyDown={handleKeyDown}
		>
			<div className="flex space-x-2">
				<div className="flex space-x-2 grow">
					{selectedTaskId !== task.id ? (
						<>
							<img src="circle-regular.svg" width="15px" height="15px" />
							<p>{task.title}</p>
						</>
					) : phase === "capture" ? (
						<>
							<img src="circle-solid.svg" width="15px" height="15px" />
							<TaskDetails {...{ task, phase, enableAutoFocus }} />
						</>
					) : phase === "process" ? (
						<>
							<img src="circle-solid.svg" width="15px" height="15px" />
							<TaskDetails {...{ task, phase, enableAutoFocus }} />
						</>
					) : phase === "brainstorm" ? (
						<>
							<img src="circle-solid.svg" width="15px" height="15px" />
							<TaskDetails {...{ task, phase, enableAutoFocus }} />
						</>
					) : phase === "organize" ? (
						<>
							<img src="circle-solid.svg" width="15px" height="15px" />
							<TaskDetails {...{ task, phase, enableAutoFocus }} />
						</>
					) : (
						phase === "engage" && (
							<>
								<img src="circle-solid.svg" width="15px" height="15px" />
								<TaskDetails {...{ task, phase, enableAutoFocus }} />
							</>
						)
					)}
				</div>

				{phase === "capture" && <button onClick={handleEdit}>edit</button>}
			</div>
		</li>
	);

	const listItemsByContext = () => {};

	return (
		<>
			{viewType === "list" && (
				<ul>
					{/* TODO: (add to setting for phase sortby data) */}
					{!isContext && phase && sortedByPhase.map(listItemsByPhase)}
					{isContext && !phase && sortedByContext.map(listItemsByContext)}
				</ul>
			)}
			{isCalendar && <div>Calendar</div>}
		</>
	);
}
