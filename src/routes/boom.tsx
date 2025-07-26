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
					<CarouselItem>...</CarouselItem>
					<CarouselItem>...</CarouselItem>
					<CarouselItem>...</CarouselItem>
				</CarouselContent>
			</Carousel>
		</div>
	);
}
