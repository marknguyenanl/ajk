import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import Button from "../Button";
import { LayerProps, selectLayers } from "@/lib/features/layers/layersSlice";
import {
	selectNameSpacesSlice,
	updateNameSpaceRedux,
} from "@/lib/features/namespace/namespaceSlice";

export default function ViewZoneSidebar() {
	const dispatch = useAppDispatch();
	const layers = useAppSelector(selectLayers);
	const nsSlice = useAppSelector(selectNameSpacesSlice);
	const handleSync = () => {
		// compare tasks local and tasks from API
		console.log("Sync started");
	};
	const handleChangeLayer = (layer: LayerProps) => {
		dispatch(updateNameSpaceRedux({ ...nsSlice, selectedLayer: layer.title }));
		console.log(
			"selectedLayer after update",
			layer.title,
			nsSlice.selectedLayer,
		);
	};

	return (
		<div className="px-1 space-y-4">
			{layers.map((layer) => (
				<Button
					className={
						layer.title === nsSlice.selectedLayer
							? "btn-active btn-hover"
							: "btn-hover"
					}
					onClick={() => handleChangeLayer(layer)}
				>
					{layer.title}
				</Button>
			))}
			<Button className="w-9" onClick={handleSync}>
				Sync
			</Button>
		</div>
	);
}
