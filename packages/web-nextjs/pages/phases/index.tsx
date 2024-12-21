import {
	addPhase,
	defaultPhase,
	Phase,
} from "@/lib/features/phases/phasesSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useGetPhasesQuery } from "@/services/api";

export default function Phases() {
	const dispatch = useAppDispatch();
	const { data: phases = [], error, isLoading } = useGetPhasesQuery();
	const handlePhase = () => {
		const newPhase: Phase = defaultPhase;
		dispatch(addPhase({ ...newPhase, title: "nameaa" }));
	};
	if (isLoading) return <div>Loading...</div>;
	if (error) console.log(error);
	return (
		<>
			<div className="p-2 text-white">
				<h1>Phases</h1>
				<button className="p-2 bg-emerald-900" onClick={handlePhase}>
					Add Phase
				</button>
				{phases.map((phase, index) => (
					<li className="text-white" key={index}>
						<p>{phase.title}</p>
						<p>{phase.createdAt}</p>
						<p>{phase.updatedAt}</p>
					</li>
				))}
			</div>
		</>
	);
}
