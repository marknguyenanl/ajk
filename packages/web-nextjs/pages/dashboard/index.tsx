import Brainstorm from "@/components/Brainstorm";
import Button from "@/components/Button";
import Capture from "@/components/Capture";
import Engage from "@/components/Engage";
import Organize from "@/components/Organize";
import Process from "@/components/Process";
import { useTasksFetch } from "@/composables/taskFetch";
import Phases from "@/pages/dashboard/Phases";
import { useCallback, useState } from "react";

export default function Dashboard() {
	const [phase, setPhase] = useState("capture");
	const [context, setContext] = useState("");
	const [isCalendar, setIsCalendar] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState(""); // TODO: (this will be the id of the task that is selected] useState("")
	const tasks = useTasksFetch(); // an array here

	// TODO: (create addTask function with Redux)
	// TODO: (create updateTask function with Redux)
	// TODO: (create deleteTask function with Redux)

	const listTask = (type: string, text: string) => {
		if (type === "phase") {
			setPhase(text);
			setContext("");
		}
		if (type === "context") {
			setPhase("");
			setContext(text);
		}
	};

	const handleListTask = useCallback(
		(type: string, text: string) => {
			return () => listTask(type, text);
		},
		[listTask],
	);

	const handleCalendar = () => {
		setIsCalendar(!isCalendar);
	};

	return (
		<div className="flex flex-col text-white bg-green-950">
			<h1 className="pt-2 text-green-700 bg-gray-100">Dashboard</h1>
			<Phases {...{ phase, listTask }} />
			<div className="flex h-[calc(100vh-140px)]">
				<div
					id="view-zone1"
					className="overflow-y-scroll px-4 grow scroll-smooth"
				>
					{phase === "capture" && (
						<Capture
							{...{
								phase,
								tasks,
								setPhase,
								selectedTaskId,
								setSelectedTaskId,
								context,
							}}
						/>
					)}
					{phase === "process" && (
						<Process
							{...{
								phase,
								tasks,
								setPhase,
								selectedTaskId,
								setSelectedTaskId,
								context,
							}}
						/>
					)}
					{phase === "brainstorm" && (
						<Brainstorm
							{...{
								phase,
								tasks,
								setPhase,
								selectedTaskId,
								setSelectedTaskId,
								context,
							}}
						/>
					)}
					{phase === "organize" && (
						<Organize
							{...{
								phase,
								tasks,
								setPhase,
								selectedTaskId,
								setSelectedTaskId,
								context,
							}}
						/>
					)}
					{phase === "engage" && (
						<Engage
							{...{
								phase,
								tasks,
								setPhase,
								selectedTaskId,
								setSelectedTaskId,
								context,
							}}
						/>
					)}
				</div>
				<div
					id="view-zone3"
					className="px-4 space-y-2 w-48 h-full border border-transparent border-l-white"
				>
					{phase !== "process" &&
						phase !== "brainstorm" &&
						phase !== "organize" && (
							<>
								<Button onClick={handleCalendar}>Calendar</Button>
								<Button onClick={handleListTask("context", "@runaway")}>
									Runaway
								</Button>
								<Button onClick={handleListTask("context", "projects")}>
									10,000ft
								</Button>
								<Button onClick={handleListTask("context", "aors")}>
									20,000ft
								</Button>
								<Button onClick={handleListTask("context", "objects")}>
									30,000ft
								</Button>
								<Button onClick={handleListTask("context", "goals")}>
									40,000ft
								</Button>
								<Button onClick={handleListTask("context", "life")}>
									50,000ft
								</Button>
								<div className="bg-orange-700 h-[2px]"></div>
								<Button onClick={handleListTask("context", "reference")}>
									Reference
								</Button>
								<Button onClick={handleListTask("context", "someday")}>
									Someday
								</Button>
								<Button onClick={handleListTask("toggle", "trash")}>
									Trash
								</Button>
							</>
						)}
					{/* TODO: (while toggle is process, brainstorm, organize, then disable button, engage, calendar to trash) */}
					{/* TODO: (if isWizzard false then disable Button 2. 3. 4.) */}
					{/* TODO: (when isWizzard if a state of each phase is done then move to next phase) */}
				</div>
			</div>
			{/* TODO: (after click this button it will show addTask form as modal) */}
		</div>
	);
}
