import { useEffect, useState } from "react";
import Button from "../Button";
import ViewZoneTasksList from "../ViewZoneTasksList";
import ViewZoneTasksNav from "../ViewZoneTasksNav";
import { selectNameSpacesSlice } from "@/lib/features/namespace/namespaceSlice";
import { useAppSelector } from "@/lib/hooks/redux";

export default function ViewZoneTasks() {
	const nsSplice = useAppSelector(selectNameSpacesSlice);
	const [isModal, setIsModal] = useState(false);
	const handleClick = () => {
		setIsModal(true);
	};
	useEffect(() => {
		return () => {
			setIsModal(false);
		};
	}, [nsSplice.namespaceState]);
	return (
		<div className="flex relative flex-col p-4">
			{" "}
			<div className="absolute top-4 right-4 ml-auto">
				<Button className="" onClick={handleClick}>
					Quick Add
				</Button>
				{isModal && <ModalQuickCapture {...{ setIsModal }} />}
			</div>
			<ViewZoneTasksNav />
			<ViewZoneTasksList />
		</div>
	);
}

const ModalQuickCapture = (props: any) => {
	const { setIsModal } = props;
	const [isSet, setIsSet] = useState("");

	const handleChange = (e: any) => {
		setIsSet(e.target.value);
	};
	const handleKeyDown = (e: any) => {
		handleChange(e);
		if (e.key === "Enter") {
			console.log("here");
		}
	};

	// TODO: (add inputref so that it remains after switching window)
	return (
		<div className="fixed inset-0">
			<input
				value={isSet}
				autoFocus
				className="fixed p-2 text-black top-[50%] -translate-y-[400%] left-[50%] translate-x-[-50%] bg-white rounded-md"
				onBlur={() => setIsModal(false)}
				onChange={handleKeyDown}
			/>
		</div>
	);
};
