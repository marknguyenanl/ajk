import { useEffect, useState } from "react";
import TaskDetails from "./TaskDetails";
import { usePhasesFetch } from "@/composables/phaseFetch";
import { useContextsFetch } from "@/composables/contextFetch";
import { deleteTask } from "@/composables/taskFetch";

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

export default function Tasks(props: any) {
	const {
		phase,
		tasks,
		isCalendar,
		viewType,
		selectedTaskId,
		setSelectedTaskId,
		context,
	} = props;
	// const firstProcessTask = tasks.find((task: any) => task.phase === "process");

	const phases: Phases[] = usePhasesFetch();
	const contexts: Contexts[] = useContextsFetch();

	const handleDelete = () => {
		deleteTask(selectedTaskId);
	};

	const filteredTasksByContext = tasks.filter(
		(task: any) => task.context === context,
	);
	// TODO: (create sortedBy as according to Context)
	const contextItem = contexts.filter((item: any) => item.title === context);
	const ascByContext = contextItem.length ? contextItem[0].asc : true;
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
	switch (context) {
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
	const currentPosition = sortedByPhase.findIndex(
		(item: any) => item.id === selectedTaskId,
	);
	const [cursor, setCursor] = useState(
		currentPosition >= 0 ? currentPosition : 0,
	);

	const handleKeyDown = (e: any) => {
		if (e.key === "ArrowDown") {
			let newCursor = Math.min(cursor + 1, tasks.length - 1);
			setCursor(newCursor);
		}
		if (e.key === "ArrowUp") {
			let newCursor = Math.max(0, cursor - 1);
			setCursor(newCursor);
		}
		if (e.key === "d") {
			handleDelete();
		}
	};

	const listItemsByPhase = (task: any) => {
		const handleSelectTask = () => {
			setSelectedTaskId(task.id);
		};

		return (
			<li
				className={`p-1 px-2 mb-1 space-x-2 rounded-md border ${task.id === selectedTaskId ? "border-yellow-400" : "border-yellow-900"}`}
				key={task.id}
				onClick={handleSelectTask}
				onKeyDown={handleKeyDown}
			>
				<div className="flex space-x-2">
					<div className="flex space-x-2 grow">
						{selectedTaskId !== task.id ? (
							<>
								<img src="circle-regular.svg" width="15px" height="15px" />
								<p>{task.title}</p>
							</>
						) : phase === "Capture" ? (
							<>
								<img src="circle-solid.svg" width="15px" height="15px" />
								<TaskDetails
									{...{
										phase,
										selectedTaskId,
									}}
								/>
							</>
						) : phase === "Process" ? (
							<>
								<div className="mt-1.5">
									<img src="circle-solid.svg" width="15px" height="15px" />
								</div>
								<TaskDetails
									{...{
										phase,
										selectedTaskId,
									}}
								/>
							</>
						) : phase === "Brainstorm" ? (
							<>
								<div className="mt-1.5">
									<img src="circle-solid.svg" width="15px" height="15px" />
								</div>
								<TaskDetails
									{...{
										phase,
										selectedTaskId,
									}}
								/>
							</>
						) : phase === "Organize" ? (
							<>
								<div className="mt-1.5">
									<img src="circle-solid.svg" width="15px" height="15px" />
								</div>
								<TaskDetails
									{...{
										phase,
										selectedTaskId,
									}}
								/>
							</>
						) : (
							phase === "Engage" && (
								<>
									<div className="mt-1.5">
										<img src="circle-solid.svg" width="15px" height="15px" />
									</div>
									<TaskDetails
										{...{
											phase,
											selectedTaskId,
										}}
									/>
								</>
							)
						)}
					</div>

					<div className="flex space-x-2">
						<button className="flex" onClick={handleDelete}>
							delete
						</button>
					</div>
				</div>
			</li>
		);
	};

	const listItemsByContext = () => {};
	const mappedByPhase = sortedByPhase.map(listItemsByPhase);
	const mappedByContext = sortedByContext.map(listItemsByContext);
	return (
		<>
			{viewType === "list" && (
				<ul>
					{/* TODO: (add to setting for phase sortby data) */}
					{!context && phase && mappedByPhase}
					{context && !phase && mappedByContext}
				</ul>
			)}
			{isCalendar && <div>Calendar</div>}
		</>
	);
}
