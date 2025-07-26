import { createFileRoute } from "@tanstack/react-router";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "../components/ui/carousel.tsx";

export const Route = createFileRoute("/boom")({
	component: PageComponent,
});

function PageComponent() {
	return (
		<div className="p-8 flex flex-col gap-6">
			<h2 className="text-2xl font-semibold	">你好</h2>
			<div className="w-72 h-80 bg-white rounded-sm shadow"></div>
			<p>哇哇哇哇哇</p>

			<div className="mt-12 flex justify-end">
				<button className="bg-white rounded-sm shadow">xiayitiao</button>
			</div>
		</div>
	);
}
