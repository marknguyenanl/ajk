import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { useGetLayersQuery } from "@/services/layersApi";
import {
	addLayerSlice,
	deleteLayersSlice,
} from "../features/layers/layersSlice";

export default function useLayersApiUpdateToRedux() {
	const dispatch = useAppDispatch();
	const { data: layers = [], error, isLoading } = useGetLayersQuery();
	useEffect(() => {
		if (layers) {
			dispatch(deleteLayersSlice());
			layers.forEach((layer) => dispatch(addLayerSlice(layer)));
		}
	}, [layers, dispatch]);
	return { error, isLoading };
}
