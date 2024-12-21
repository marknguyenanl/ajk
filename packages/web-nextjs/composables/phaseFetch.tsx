import { useState, useEffect } from "react";

export function usePhasesFetch() {
	const [phases, setPhases] = useState([]);

	useEffect(() => {
		const fetchPhases = async () => {
			try {
				const response = await fetch("http://localhost:3000/phases");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setPhases(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPhases();
	}, []);

	return phases;
}
