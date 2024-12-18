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
	const [enableAutoFocus, setEnableAutoFocus] = useState(false);

	const phases: Phases[] = usePhasesFetch();
	const contexts: Contexts[] = useContextsFetch();

	const handleEdit = () => {
		setEnableAutoFocus(true);
	};
	const handleDelete = () => {
		deleteTask(selectedTaskId);
	};

	useEffect(() => {
		// Handle side effects related to enabling auto focus
		if (enableAutoFocus) {
			// Focus logic here, e.g., focusing an input field.
			console.log("Auto focus enabled for task details.");
		}
		console.log(selectedTaskId);
	}, [enableAutoFocus, selectedTaskId]);

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

	const listItemsByPhase = (task: any) => {
		const handleSelectTask = () => {
			setSelectedTaskId(task.id);
		};

		return (
			<li
				className={`p-1 px-2 mb-1 space-x-2 rounded-md border ${task.id === selectedTaskId ? "border-yellow-400" : "border-yellow-900"}`}
				key={task.id}
				onClick={handleSelectTask}
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
								<TaskDetails
									{...{
										phase,
										enableAutoFocus,
										selectedTaskId,
									}}
								/>
							</>
						) : phase === "process" ? (
							<>
								<div className="mt-1.5">
									<img src="circle-solid.svg" width="15px" height="15px" />
								</div>
								<TaskDetails
									{...{
										phase,
										enableAutoFocus,
										selectedTaskId,
									}}
								/>
							</>
						) : phase === "brainstorm" ? (
							<>
								<div className="mt-1.5">
									<img src="circle-solid.svg" width="15px" height="15px" />
								</div>
								<TaskDetails
									{...{
										phase,
										enableAutoFocus,
										selectedTaskId,
									}}
								/>
							</>
						) : phase === "organize" ? (
							<>
								<div className="mt-1.5">
									<img src="circle-solid.svg" width="15px" height="15px" />
								</div>
								<TaskDetails
									{...{
										phase,
										enableAutoFocus,
										selectedTaskId,
									}}
								/>
							</>
						) : (
							phase === "engage" && (
								<>
									<div className="mt-1.5">
										<img src="circle-solid.svg" width="15px" height="15px" />
									</div>
									<TaskDetails
										{...{
											phase,
											enableAutoFocus,
											selectedTaskId,
										}}
									/>
								</>
							)
						)}
					</div>

					<div className="flex space-x-2">
						<button className="flex" onClick={handleEdit}>
							edit
						</button>
						<p>|</p>
						<button className="flex" onClick={handleDelete}>
							delete
						</button>
					</div>
				</div>
			</li>
		);
	};

	const listItemsByContext = () => {};

	return (
		<>
			{viewType === "list" && (
				<ul>
					{/* TODO: (add to setting for phase sortby data) */}
					{!context && phase && sortedByPhase.map(listItemsByPhase)}
					{context && !phase && sortedByContext.map(listItemsByContext)}
				</ul>
			)}
			{isCalendar && <div>Calendar</div>}
		</>
	);
}
