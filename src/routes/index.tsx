import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import imageCover from "../assets/cover.png";

export const Route = createFileRoute("/")({
	component: PageComponent,
});

function PageComponent() {
	return (
		<div className="w-full h-screen relative">
			<div
				className="-z-10 block w-full h-full absolute top-0 left-0 blur-lg"
				style={{
					background: `url(${imageCover}) no-repeat center / cover`,
				}}
			></div>
			<Link
				to="/memories"
				className="block w-full h-full"
				style={{
					background: `url(${imageCover}) no-repeat center / contain`,
				}}
			></Link>
		</div>
	);
}
