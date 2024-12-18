import Button from "@/components/Button";
import { useCallback } from "react";

export default function Phases(props: any) {
	const { phase, listTask } = props;
	const handleClick = useCallback(
		(type: string, text: string) => {
			return () => {
				listTask(type, text);
			};
		},
		[listTask],
	);
	return (
		<div className="p-4">
			<ul className="flex space-x-4">
				<>
					<Button onClick={handleClick("phase", phase)}>
						Current phase: {phase}
					</Button>
					{/* TODO: (how to append className to the button) */}
				</>
			</ul>
			<br />
			<hr />
		</div>
	);
}
