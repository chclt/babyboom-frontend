import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import IconBookPenFill from "../assets/IconBookPenFill.tsx";
import IconGiftOutline from "../assets/IconGiftOutline.tsx";
import IconHatSparkle from "../assets/IconHatSparkle.tsx";
import IconMagicBook from "../assets/IconMagicBook.tsx";

export const Route = createRootRoute({
	component: PageComponent,
});

function PageComponent() {
	return (
		<div className="mx-auto max-w-md">
			<Outlet />

			<nav className="fixed inset-x-0 bottom-0 h-[59px] border border-solid border-neutral-200 bg-white">
				<menu className="h-full grid grid-cols-2 text-[#A6AAB2]">
					<li>
						<Link
							to="/memories"
							className="w-full h-full flex flex-col justify-center items-center group"
						>
							<IconMagicBook className="size-7 group-[.active]:text-black" />
						</Link>
					</li>
					<li>
						<Link
							to="/boom"
							className="w-full h-full flex flex-col justify-center items-center group"
						>
							<IconHatSparkle className="size-7 group-[.active]:text-black relative top-[-1.5px]" />
						</Link>
					</li>
				</menu>
			</nav>
		</div>
	);
}
