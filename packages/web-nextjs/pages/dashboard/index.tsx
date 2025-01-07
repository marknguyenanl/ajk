import ViewZoneNav from "@/components/ViewZoneNav";
import ViewZoneTasks from "@/components/ViewZoneTasks";
import ViewZoneSidebar from "@/components/ViewZoneSidebar";
import useTasksApiUpdateToRedux from "@/lib/hooks/useTasksApiUpdateToRedux";
import useNameSpaceApiUpdateToRedux from "@/lib/hooks/useNameSpaceApiUpdateToRedux";
import usePhasesApiUpdateToRedux from "@/lib/hooks/usePhasesApiUpdateToRedux";
import useLayersApiUpdateToRedux from "@/lib/hooks/useLayersApiUpdateToRedux";
import ViewZoneSideTasks from "@/components/ViewZoneSideTasks";
import { useState } from "react";

export default function Dashboard() {
	useTasksApiUpdateToRedux();
	useNameSpaceApiUpdateToRedux();
	usePhasesApiUpdateToRedux();
	useLayersApiUpdateToRedux();
	const [showSideTasks, setShowSideTasks] = useState("1");

	return (
		<div id="view-main" className="flex flex-col text-white bg-green-950">
			<div id="view-header">
				<h1 className="pt-2 text-green-700 bg-gray-100">Dashboard</h1>
			</div>
			<div id="view-zone">
				<div id="view-zone-nav">
					<ViewZoneNav />
				</div>
				<div id="view-zones" className="flex h-[calc(100vh-140px)]">
					<div
						id="view-zone-1"
						className="overflow-y-scroll px-4 grow scroll-smooth"
					>
						<ViewZoneTasks />
					</div>
					{showSideTasks && (
						<div
							id="view-zone-2"
							className="overflow-y-scroll px-4 w-1/6 scroll-smooth"
						>
							<ViewZoneSideTasks />
						</div>
					)}

					<div
						id="view-zone-3"
						className="px-4 space-y-2 w-56 h-full border border-transparent border-l-white"
					>
						{/* TODO: (fetch layers then list button) */}
						<ViewZoneSidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
