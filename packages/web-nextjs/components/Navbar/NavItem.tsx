import Link from "next/link";

export default function NavItem({
	title,
	url,
}: { title: string; url: string }) {
	return (
		<>
			<Link className="group" href={`/${url}`}>
				<li className="p-2 w-full text-gray-200 whitespace-nowrap group-hover:text-orange-900 group-hover:bg-green-500 group-focus:text-red-500">
					{title}
				</li>
			</Link>
		</>
	);
}
