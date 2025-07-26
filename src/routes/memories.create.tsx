import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/memories/create")({
	component: PageComponent,
});

function PageComponent() {
	return (
		<div>
			<h1>添加会议</h1>
		</div>
	);
}
