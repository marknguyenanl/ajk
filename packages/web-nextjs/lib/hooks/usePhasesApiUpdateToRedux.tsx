import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { useGetPhasesQuery } from "@/services/phasesApi";
import {
	addPhaseSlice,
	deletePhaseSlice,
} from "../features/phases/phasesSlice";

export default function usePhasesApiUpdateToRedux() {
	const dispatch = useAppDispatch();
	const { data: phases = [], error, isLoading } = useGetPhasesQuery();
	useEffect(() => {
		if (phases) {
			dispatch(deletePhaseSlice());
			phases.forEach((phase) => dispatch(addPhaseSlice(phase)));
		}
	}, [phases, dispatch]);
	return { error, isLoading };
}
