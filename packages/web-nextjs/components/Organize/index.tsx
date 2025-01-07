import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { selectNameSpacesSlice } from "@/lib/features/namespace/namespaceSlice";
import { removeTaskSlice, selectAll } from "@/lib/features/tasks/tasksSlice";
import { useEffect, useRef, useState } from "react";
import { updateTask } from "@/composables/crudTask";

export default function Organize() {
	const dispatch = useAppDispatch();
	const nsSlice = useAppSelector(selectNameSpacesSlice);
	const projectsSlice = useAppSelector(selectAll);
	const [isClick, setIsClick] = useState(false);
	const [input, setInput] = useState("");
	const modalRefs = useRef<(HTMLInputElement | null)[]>([]);
	const [pointer, setPointer] = useState(0);
	const projectRegs = new RegExp(input, "i");
	const filteredProjectsSlice = projectsSlice.filter(
		(item: any) => projectRegs.test(item.title) && item.layer === "Projects",
	);

	const handleChange = (e: any) => {
		setInput(e.target.value);
	};
	const handleClick = () => {
		setIsClick(!isClick);
	};

	const handleKeyDown = (e: any) => {
		if (e.key === "Enter" && e.ctrlKey) {
			console.log("Ctrl + Enter is pressed");
			dispatch(updateTask);
		} else if (e.key === "Enter") {
			if (filteredProjectsSlice.length) {
				setInput(filteredProjectsSlice[pointer].title);
			}
		} else if (e.key === "ArrowDown") {
			if (input && pointer < filteredProjectsSlice.length - 1) {
				setPointer((prev) => prev + 1);
				const nextInput = modalRefs.current[pointer];
				if (nextInput) {
					nextInput.focus();
				}
			}
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			if (input && pointer > 0) {
				setPointer((prev) => prev - 1);
				const prevInput = modalRefs.current[pointer];
				if (prevInput) {
					prevInput.focus();
				}
			}
		}
	};
	useEffect(() => {
		console.log("updated pointer", pointer);
	}, [pointer]);

	return (
		<div className="flex space-x-2">
			<>
				<>
					<Button
						onClick={() => {
							dispatch(removeTaskSlice(nsSlice.selectedTaskId));
						}}
						className="btn-hover"
					>
						throw Trash
					</Button>
					<div className="flex justify-center">
						<Button
							className={`${isClick ? "hidden" : ""}`}
							onClick={handleClick}
						>
							is Reference
						</Button>
						{isClick && (
							<div
								className="flex relative justify-center w-28"
								// onBlur={() => setIsClick(false)}
							>
								<input
									className="py-1 px-2 w-28 text-black rounded-md grow"
									autoFocus
									value={input}
									onChange={handleChange}
									onKeyDown={handleKeyDown}
									onBlur={handleClick}
								/>
								{input && (
									// match project arg with the task.title===project && task.layer==="project"
									<ProjectsPrompt
										{...{ pointer, setInput, filteredProjectsSlice }}
									/>
								)}
							</div>
						)}
					</div>
					<Button onClick={() => {}}> do Someday </Button>
					<Button onClick={() => {}}> is a single Action </Button>
					<Button onClick={() => {}}> is a Project related </Button>
				</>
			</>
		</div>
	);
}

function ProjectsPrompt(props: any) {
	const { filteredProjectsSlice, setInput, pointer } = props;

	if (!filteredProjectsSlice.length) {
		return (
			<div className="absolute -bottom-2 rounded-md w-full translate-y-[100%] border border-red-900 left-0 p-2 text-black bg-white text-xs">
				Create new
			</div>
		);
	}

	const handleClick = () => {
		if (filteredProjectsSlice.length) {
			setInput(filteredProjectsSlice[pointer].title);
		}
	};

	return (
		<div className="absolute -bottom-2 rounded-md w-full translate-y-[100%] border border-red-900 text-xs left-0 p-2 text-black bg-white">
			{filteredProjectsSlice.map((item: any, index: any) => (
				<ul className="flex flex-col">
					<li
						onClick={handleClick}
						className={`${index === pointer ? "bg-gray-300" : ""} p-2 rounded-sm hover:bg-gray-300 focus:bg-gray-300`}
						key={item.id}
					>
						{item.title}
					</li>
				</ul>
			))}
		</div>
	);
}
