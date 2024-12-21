import { useState, useEffect } from "react";

export function useContextsFetch() {
	const [contexts, setContexts] = useState([]);

	useEffect(() => {
		const fetchContexts = async () => {
			try {
				const response = await fetch("http://localhost:3000/contexts");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setContexts(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchContexts();
	}, []);

	return contexts;
}
