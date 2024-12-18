import Navbar from "@/components/Navbar";
export default function Layout({ children }: { children: any }) {
	return (
		<>
			<div className="flex space-x-2 max-h-[100vh]">
				<div className="w-40">
					<Navbar />
				</div>
				<div className="w-full grow bg-green-950">{children}</div>
			</div>
			{/* <Footer /> */}
		</>
	);
}
