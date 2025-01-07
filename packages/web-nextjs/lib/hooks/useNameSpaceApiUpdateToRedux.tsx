import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import {
	deleteNameSpaceRedux,
	updateNameSpaceRedux,
} from "../features/namespace/namespaceSlice";
import { useGetNameSpaceQuery } from "@/services/namespaceApi";

export default function useNameSpaceApiUpdateToRedux() {
	const dispatch = useAppDispatch();
	const { data: namespace, error, isLoading } = useGetNameSpaceQuery();
	useEffect(() => {
		if (namespace) {
			dispatch(deleteNameSpaceRedux());
			dispatch(updateNameSpaceRedux(namespace));
		}
	}, [namespace, dispatch]);
	if (error) {
		const errorMessage =
			"status" in error
				? `Error loading namespace: ${error.data || "Unknown error"}`
				: `Error loading namespace: ${error.message}`;
		return <div>{errorMessage}</div>;
	}

	if (isLoading) return <div>Loading namespace in Tasks List...</div>;
}
