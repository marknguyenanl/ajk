import { useCallback } from "react";

export const useHandleTaskPhase = (
	convertTask: (taskId: any, phase: string, context: string) => void,
	setPhase: (phase: string) => void,
) => {
	return useCallback(
		(taskId: any, phase: string, context: string) => {
			if (taskId) {
				convertTask(taskId, phase, context);
			}
			setPhase(phase);
		},
		[convertTask, setPhase],
	);
};
