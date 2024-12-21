import {
	addPhase,
	defaultPhase,
	Phase,
	selectPhases,
} from "@/lib/features/phases/phasesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Phases() {
	const dispatch = useAppDispatch();
	const getPhases = useAppSelector(selectPhases);
	const handlePhase = () => {
		const newPhase: Phase = defaultPhase;
		dispatch(addPhase({ ...newPhase, title: "nameaa" }));
	};
	return (
		<>
			<div>
				<h1>Phases</h1>
				<button className="p-2 bg-emerald-300" onClick={handlePhase}>
					Add Phase
				</button>
			</div>
			{getPhases.map((phase, index) => (
				<li className="text-white" key={index}>
					<p>{phase.title}</p>
					<p>{phase.createdAt}</p>
					<p>{phase.updatedAt}</p>
				</li>
			))}
		</>
	);
}
