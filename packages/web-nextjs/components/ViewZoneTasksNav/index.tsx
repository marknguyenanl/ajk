import { selectNameSpacesSlice } from "@/lib/features/namespace/namespaceSlice";
import { useAppSelector } from "@/lib/hooks/redux";
import Button from "../Button";
import Capture from "../Capture";
import Clarify from "../Clarify";
import Organize from "../Organize";
import Review from "../Review";
import Engage from "../Engage";

export default function ViewZoneTasksNav() {
	const namespaceSlice = useAppSelector(selectNameSpacesSlice);

	// TODO: (add handleKeyDown namespaceState factor to input enter as hook and reuse in this)
	let content;
	switch (namespaceSlice?.namespaceState) {
		case "Capture":
			content = <Capture />;
			break;
		case "Clarify":
			content = <Clarify />;
			break;
		case "Organize":
			content = <Organize />;
			break;
		case "Review":
			content = <Review />;
			break;
		case "Engage":
			content = <Engage />;
			break;
		default:
			content = (
				<div className="flex space-x-2 text-white">No actions available</div>
			);
			break;
	}

	return (
		<>
			<div className="flex mb-4 text-white">{content}</div>
		</>
	);
}
