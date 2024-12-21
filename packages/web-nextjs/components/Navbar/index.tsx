import "./index.css";
import NavItem from "./NavItem";

export default function Navbar() {
	return (
		<>
			<nav className="font-bold text-gray-200 bg-green-800 h-[100vh]">
				<ul className="p-4 px-4 pt-8 space-y-4 h-full">
					{/* TODO: (change homepage to icon) */}
					<NavItem title="AJK Icon" url="" />
					<NavItem title="Docs" url="docs" />
					<NavItem title="Pricings" url="pricings" />
					<NavItem title="About us" url="about" />
					<NavItem title="Contact us" url="contact" />
					{/* TODO: (if isLogin = false then only show Login button) */}
					{/* TODO: (if isLogin = true then show this navitem dashboard) */}
					<NavItem title="Dashboard" url="dashboard" />
					{/* TODO: (if isLogin = true then show name of account at the bottom of navbar) */}
					<NavItem title="Settings" url="settings" />
					<NavItem title="Phases" url="phases" />
					{/* TODO: (add optional to turn off task properties panel) */}
				</ul>
			</nav>
		</>
	);
}
