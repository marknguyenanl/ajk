import Button from "@/components/Button";
import {
	selectNameSpaceRedux,
	updateNameSpaceRedux,
} from "@/lib/features/namespace/namespaceSlice";
import { Phase } from "@/lib/features/phases/phasesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	useUpdateNameSpaceMutation,
	useGetNameSpaceQuery,
} from "@/services/namespaceApi";
import { useGetPhasesQuery } from "@/services/phasesApi";
import { useEffect } from "react";

export default function ViewZoneNav() {
	// Constants
	const dispatch = useAppDispatch();
	const nameSpaceRedux = useAppSelector(selectNameSpaceRedux);
	const { data: phases = [] } = useGetPhasesQuery();
	const [updateNameSpace] = useUpdateNameSpaceMutation();
	const { data: ns = [], refetch } = useGetNameSpaceQuery();
	// Functions
	const handleNameSpaceState = (namespaceState: string) => {
		const updatedAt: string = Date.now().toString();
		// redux store
		dispatch(
			updateNameSpaceRedux({ ...nameSpaceRedux, namespaceState, updatedAt }),
		);

		// rtk api
		updateNameSpace({ namespaceState, updatedAt });
		refetch();
		console.log("update namespace api data: ", ns);

		// sync redux store and api data
		// if error when update then...
		// if namespaceRedux.updatedAt !== api.updatedAt then...
	};

	// Effects for redux store (if use thunk or saga then wont need it)
	useEffect(() => {
		console.log("Updated namespace from Redux:", nameSpaceRedux);
	}, [nameSpaceRedux]); // Run this effect when nameSpaceRedux changes

	// Return statements
	return (
		<div className="p-4">
			<ul className="flex space-x-4">
				<>
					{phases.map((phase: Phase) => (
						<Button
							key={phase.id}
							onClick={() => handleNameSpaceState(phase.title)}
						>
							{phase.title}
						</Button>
					))}
				</>
			</ul>
			<br />
			<hr />
		</div>
	);
}
