import { useToggle } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { degrees } from "motion/react";
import IconCircleQuestionmark from "../assets/IconCircleQuestionmark.tsx";
import IconLayoutGrid from "../assets/IconLayoutGrid.tsx";
import MemoryRecordCard from "../components/MemoryRecordCard.tsx";
import NewMemoryRecordButton from "../components/NewMemoryRecordButton.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { getMemoryRecordListQueryOptions } from "../fetchers";
import { cn } from "../libs/utils.ts";

export const Route = createFileRoute("/memories/")({
	component: PageComponent,
});

function PageComponent() {
	const { data: memoryRecords } = useQuery(getMemoryRecordListQueryOptions());
	const [layout, toggleLayout] = useToggle([
		"grid-cols-2 gap-2",
		"grid-cols-3 gap-1.5",
		"grid-cols-4 gap-0 [&>*]:-mt-8 mt-8",
		"grid-cols-1 gap-2",
	]);

	const [randomDegree, toggleRandomDegree] = useToggle([3, 3, 5, 1]);

	return (
		<>
			<div className="bg-[#eee] pb-64 flex flex-col">
				<div className="z-10 sticky top-0 right-0 p-4 flex items-center justify-end">
				<div
					className="px-2 self-end flex items-center justify-center bg-white rounded-full"
					style={{
						boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.08)",
					}}
				>
					<button className="size-12 flex items-center justify-center">
						<IconLayoutGrid
							onClick={() => {
								toggleLayout();
								toggleRandomDegree();
							}}
						/>
					</button>
					<button className="size-12 flex items-center justify-center">
						<IconCircleQuestionmark />
					</button>
				</div>
				</div>

				<ol className={cn("p-2 grid transition-all duration-150", layout)}>
					{[
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
						...memoryRecords,
					].map((record) => {
						if (record.imageList?.length) {
							const degree = randomDegree
								? (Math.random() * 2 - 1) * randomDegree
								: 0;

							console.log(degree);

							return (
								<MemoryRecordCard
									record={record}
									className="transition-all duration-150"
									style={{ transform: `rotate(${degree}deg)` }}
								/>
							);
						}
					})}
				</ol>
			</div>

			<NewMemoryRecordButton />
		</>
	);
}
