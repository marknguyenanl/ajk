import Button from "@/components/Button";
import {
	defaultNameSpace,
	selectNameSpace,
} from "@/lib/features/namespace/namespaceSlice";
import { useAppSelector } from "@/lib/hooks";
import { useGetLayersQuery } from "@/services/api";

export default function ViewZoneSidebar() {
	return (
		<div className="p-4">
			{/* <ul className="flex flex-col space-y-4"> */}
			{/* 	<> */}
			{/* 		{(namespace.namespaceState === "Capture" || */}
			{/* 			namespace.namespaceState === "Engage") && ( */}
			{/* 			<> */}
			{/* 				{layers.map((layer) => ( */}
			{/* 					<Button */}
			{/* 						className="pl-4 text-left" */}
			{/* 						// TODO: (merge style to component) */}
			{/* 						key={layer.id} */}
			{/* 						onClick={() => handleNameSpaceState(layer.title)} */}
			{/* 					> */}
			{/* 						{layer.title} {layer.alias ? "<" + layer.alias + ">" : ""} */}
			{/* 					</Button> */}
			{/* 				))} */}
			{/* 			</> */}
			{/* 		)} */}
			{/* 	</> */}
			{/* </ul> */}
		</div>
	);
}
