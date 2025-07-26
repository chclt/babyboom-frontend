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
		<div>
			<Carousel>
				<CarouselContent>
					<CarouselItem>
						<div className="p-8">
							<div className="text-2xl font-semibold">你好</div>
							<div className="w-72 h-80 bg-white rounded-sm shadow"></div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="p-8">
							<div className="w-72 h-80 bg-white rounded-sm shadow"></div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="p-8">
							<div className="w-72 h-80 bg-white rounded-sm shadow"></div>
						</div>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</div>
	);
}
