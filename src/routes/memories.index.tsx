import { useToggle } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { degrees } from "motion/react";
import { useMemo } from "react";
import IconCircleQuestionmark from "../assets/IconCircleQuestionmark.tsx";
import IconLayoutGrid from "../assets/IconLayoutGrid.tsx";
import IconTimeFiles from "../assets/IconTimeFiles.tsx";
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

	const [view, toggleView] = useToggle(["grid", "timeline"]);

	const timelineGroup = useMemo(() => {
		const groups: Record<string, typeof memoryRecords> = {};
		if (memoryRecords && memoryRecords.length) {
			memoryRecords.forEach((record) => {
				// Use createAt, format as "YYYY-MM"
				const date = new Date(record.createTime);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, "0");
				const day = String(date.getDate()).padStart(2, "0");

				const temp = String(date.getMinutes()).padStart(2, "0");

				const key = `${year}-${month}-${day} ${temp}`;
				if (!groups[key]) groups[key] = [];
				groups[key].unshift(record);
			});
		}
		return groups;
	}, [memoryRecords]);

	console.log(timelineGroup);

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
				<div className="z-10 sticky top-0 right-0 p-4 flex items-center justify-between text-neutral-800">
					<h1 className="text-2xl font-bold">
						{view === "grid" ? "全部照片" : "时间线"}
					</h1>
					<div
						className={cn(
							"px-2 self-end flex items-center justify-center bg-white rounded-full",
							"border border-solid border-white shadow-[0_3px_0_0_#ddd]",
						)}
					>
						<button
							className="size-12 flex items-center justify-center"
							onClick={() => toggleView("timeline")}
						>
							<IconTimeFiles />
						</button>

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

				{view === "timeline" &&
					Object.entries(timelineGroup).map(([key, records]) => (
						<div key={key} className="flex flex-col gap-2 p-4">
							<h2 className="text-lg font-bold">{key}</h2>
							<ol
								className={cn("p-2 grid transition-all duration-150", layout)}
							>
								{records.map((record) => {
									const degree = randomDegree
										? (Math.random() * 2 - 1) * randomDegree
										: 0;

									return (
										<MemoryRecordCard
											record={record}
											className="transition-all duration-150"
											style={{ transform: `rotate(${degree}deg)` }}
										/>
									);
								})}
							</ol>
						</div>
					))}

				{view === "grid" && (
					<ol className={cn("p-2 grid transition-all duration-150", layout)}>
						{memoryRecords.map((record) => {
							if (record.imageList?.length) {
								const degree = randomDegree
									? (Math.random() * 2 - 1) * randomDegree
									: 0;

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
				)}
			</div>

			<NewMemoryRecordButton />
		</>
	);
}
